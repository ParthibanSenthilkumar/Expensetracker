import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ChartProps {
  expenseChartData: {
    Name: string;
    value: number;
  }[];
}
const ExpenseChart = ({ expenseChartData }: ChartProps) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <>
      <div className="w-full max-w-[320px] h-[320px] shadow-custom1 rounded-md bg-white p-2.5 border-none outline-none">
        <h3 className="section_title text-2xl font-bold text-[#6366f1] font-heading my-3 ml-1.5">
          Expense Breakdown
        </h3>
        <div className="h-[245px] w-full">
        <ResponsiveContainer width="100%" height={"100%"}>
          <PieChart>
            <Pie
              data={expenseChartData}
              dataKey="value"
              nameKey="Name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {expenseChartData.map((item, index) => (
                <Cell key={item.Name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default ExpenseChart;
