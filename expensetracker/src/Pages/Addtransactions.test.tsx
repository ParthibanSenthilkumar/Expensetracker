import {
  fireEvent,
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import Addtransactions from "./Addtransactions";
import { errorToast, successToast } from "../Components/Toaster";
import { Addtransaction } from "../Services/Api";

vi.mock("../Components/Toaster", () => ({
  errorToast: vi.fn(),
  successToast: vi.fn(),
}));

vi.mock("../Services/Api", () => ({
  Addtransaction: vi.fn().mockResolvedValue({}),
}));

describe("Addtransactions", () => {
  it("hould display Add Transaction heading", () => {
    render(<Addtransactions />);

    expect(
      screen.getByRole("heading", {
        name: "Add Transaction",
      }),
    ).toBeInTheDocument();
  });

  it("should display Amount input", () => {
    render(<Addtransactions />);
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();
  });
  it("should display Category select", () => {
    render(<Addtransactions />);

    expect(screen.getByLabelText("Category")).toBeInTheDocument();
  });
  it("should display Description textarea", () => {
    render(<Addtransactions />);

    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  it("should display Date input", () => {
    render(<Addtransactions />);

    expect(screen.getByLabelText("Date")).toBeInTheDocument();
  });

  it("should show Income categories when Income is selected", () => {
    render(<Addtransactions />);

    const incomeButton = screen.getByRole("button", {
      name: "Income",
    });

    fireEvent.click(incomeButton);

    expect(screen.getByRole("option", { name: "Salary" })).toBeInTheDocument();

    expect(
      screen.getByRole("option", { name: "Business" }),
    ).toBeInTheDocument();
  });

  it("should update amount input when user enters value", () => {
    render(<Addtransactions />);

    const amountInput = screen.getByLabelText("Amount");
    fireEvent.change(amountInput, {
      target: { value: "5000" },
    });

    expect(amountInput).toHaveValue("5000");
  });
  it("should select option when user select the value ", () => {
    render(<Addtransactions />);

    const selectcategory = screen.getByLabelText("Category");
    fireEvent.change(selectcategory, {
      target: { value: "Food" },
    });

    expect(selectcategory).toHaveValue("Food");
  });

  it("should show error when form is submitted empty", () => {
    render(<Addtransactions />);
    const submitButton = screen.getByRole("button", {
      name: "Add Transaction",
    });
    fireEvent.click(submitButton);
    expect(errorToast).toHaveBeenCalledWith("Fill All Feilds");
  });

  it("should submit valid transaction data", async () => {
    render(<Addtransactions />);
    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: "5000" },
    });
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "Food" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Lunch" },
    });
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2026-09-03" },
    });
    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Transaction",
      }),
    );

    expect(Addtransaction).toHaveBeenCalledWith({
      amount: "5000",
      category: "Food",
      description: "Lunch",
      date: "2026-09-03",
      transType: "Expense",
    });
    await waitFor(() => {
      expect(successToast).toHaveBeenCalledWith("Added Successfully");
    });
  });

  it("should clear amount after successful submission", async () => {
    render(<Addtransactions />);

    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: "5000" },
    });

    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "Food" },
    });

    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Lunch" },
    });

    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2026-09-03" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Add Transaction" }));

    await waitFor(() => {
      expect(screen.getByLabelText("Amount")).toHaveValue("");
    });
  });

  it("should show error toast when API fails", async () => {
    vi.mocked(Addtransaction).mockRejectedValueOnce(new Error("Server Error"));

    render(<Addtransactions />);

    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: "5000" },
    });

    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "Food" },
    });

    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Lunch" },
    });

    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2026-09-03" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Transaction",
      }),
    );

    await waitFor(() => {
      expect(errorToast).toHaveBeenCalledWith("Server Error");
    });
  });
});

afterEach(() => {
  cleanup();
});
