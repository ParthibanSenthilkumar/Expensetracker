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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
      <div className="bg-white rounded-xl shadow-custom1 p-5">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-indigo-500 font-heading">
            Income by Category
          </h3>
        </div>
        <div className="space-y-4">
          {Object.entries(categoriesIncome ?? {}).length > 0 ? (
            Object.entries(categoriesIncome ?? {}).map(
              ([category, amount]) => {
                const percentage =
                  (amount / (totalIncome || 1)) * 100;
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-medium text-gray-700">
                        {category}
                      </h5>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-green-600">
                          ₹{amount.toLocaleString("en-IN")}
                        </span>

                        <span className="text-xs text-gray-400">
                          {percentage.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <p className="text-sm text-gray-400 text-center py-6">
              No income data found
            </p>
          )}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-custom1 p-5">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-indigo-500 font-heading">
            Expense by Category
          </h3>
      
        </div>
        <div className="space-y-4">
          {Object.entries(categoriesExpense ?? {}).length > 0 ? (
            Object.entries(categoriesExpense ?? {}).map(
              ([category, amount]) => {
                const percentage =
                  (amount / (totalExpense || 1)) * 100;

                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-medium text-gray-700">
                        {category}
                      </h5>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-red-500">
                          ₹{amount.toLocaleString("en-IN")}
                        </span>

                        <span className="text-xs text-gray-400">
                          {percentage.toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-400 rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <p className="text-sm text-gray-400 text-center py-6">
              No expense data found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySummary;