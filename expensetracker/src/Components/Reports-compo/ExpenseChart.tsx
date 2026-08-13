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
      <div className="w-full max-w-[500px] h-[350px]">
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
    </>
  );
};

export default ExpenseChart;
