import { Cell, Pie, PieChart } from "recharts";
import styles from "./CategoryPieChart.module.css";
import { Fragment } from "react";

const COLORS = ["#ff9304", "#a000ff", "#fde006"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CategoryPieChart = ({ categoryData }) => {
  return (
    <div className={styles.categoryPieChart}>
      {categoryData.length !== 0 ? (
        <Fragment>
          <PieChart width={200} height={200}>
            <Pie
              data={categoryData}
              cx={100}
              cy={100}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>

          <div className={styles.labelInfo}>
            {categoryData.map((entry, index) => (
              <div key={index} className={styles.labels}>
                <div className={`${entry.name}Line`}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </Fragment>
      ) : (
        <p className={styles.noPiechart}>
          Add Expenses to see <br></br>A Category Pie Chart
        </p>
      )}
    </div>
  );
};

export default CategoryPieChart;
