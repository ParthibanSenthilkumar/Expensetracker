import { screen, render, cleanup } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import SummaryCard from "../Components/Reports-compo/SummaryCard";
import Reports from "../Pages/Reports";
import CategorySummary from "../Components/Reports-compo/CategorySummary";

vi.mock("../Hooks/useFetch", () => ({
  default: () => ({
    data: [],
    loading: false,
    error: null,
  }),
}));

describe("Report", () => {
  it("should display income and expense headings", () => {
    render(<Reports />);

    expect(
      screen.getByRole("heading", {
        name: "Transaction History",
      }),
    ).toBeInTheDocument();
  });

  it("should display total balance, income and expense", () => {
    render(
      <SummaryCard
        totalBalance={10000}
        totalIncome={15000}
        totalExpense={5000}
      />,
    );

    expect(screen.getByText("Total Balance")).toBeInTheDocument();
    expect(screen.getByText("Total Income")).toBeInTheDocument();
    expect(screen.getByText("Total Expense")).toBeInTheDocument();

    expect(screen.getByText("10000")).toBeInTheDocument();
    expect(screen.getByText("15000")).toBeInTheDocument();
    expect(screen.getByText("5000")).toBeInTheDocument();
  });

  it("should display income and expense categories with their amounts", () => {
    render(
      <CategorySummary
        categoriesIncome={{
          Investment: 7000,
          Freelancing: 3000,
        }}
        categoriesExpense={{
          Food: 1010,
          Medical: 5000,
        }}
        totalIncome={1000}
        totalExpense={2000}
      />,
    );

    expect(screen.getByText("Income by Category")).toBeInTheDocument();
    expect(screen.getByText("Expense by Category")).toBeInTheDocument();
    expect(screen.getByText("Investment")).toBeInTheDocument();
    expect(screen.getByText("Freelancing")).toBeInTheDocument();

    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("Food")).toBeInTheDocument();

    expect(screen.getByText("₹7,000")).toBeInTheDocument();
    expect(screen.getByText("₹3,000")).toBeInTheDocument();

    expect(screen.getByText("₹1,010")).toBeInTheDocument();
    expect(screen.getByText("₹5,000")).toBeInTheDocument();
  });

  it("should display empty state when category data is empty", () => {
    render(
      <CategorySummary
        categoriesIncome={{}}
        categoriesExpense={{}}
        totalIncome={0}
        totalExpense={0}
      />,
    );

    expect(screen.getByText("No income data found")).toBeInTheDocument();

    expect(screen.getByText("No expense data found")).toBeInTheDocument();
  });
});
afterEach(() => {
  cleanup();
});
