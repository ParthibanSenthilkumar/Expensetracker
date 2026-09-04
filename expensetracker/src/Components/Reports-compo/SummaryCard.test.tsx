import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SummaryCard from "./SummaryCard";

describe("SummaryCard", () => {
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
});
