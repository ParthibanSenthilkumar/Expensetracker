interface CategoryProps {
  categoriesIncome?: Record<string, number>;
  categoriesExpense?: Record<string, number>;
  totalIncome: number;
  totalExpense: number;
}
const CategorySummary = ({
  categoriesIncome,
  categoriesExpense,
  totalIncome,
  totalExpense,
}: CategoryProps) => {
  return (
    <>
      {Object.entries(categoriesIncome ?? {}).map(([category, amount]) => {
        const precentage = (amount / (totalIncome || 1)) * 100;
        return (
          <div key={category}>
            <h5>{category}</h5>
            <p>{amount}</p>
            <p>{precentage.toFixed(2)}%</p>
          </div>
        );
      })}

      {Object.entries(categoriesExpense ?? {}).map(([category, amount]) => {
        const precentage = (amount / (totalExpense || 1)) * 100;
        return (
          <div key={category}>
            <h5>{category}</h5>
            <p>{amount}</p>
            <p>{precentage.toFixed(2)}%</p>
          </div>
        );
      })}
    </>
  );
};

export default CategorySummary;
