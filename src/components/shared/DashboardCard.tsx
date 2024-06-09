import React from "react";
import { FaRegUser } from "react-icons/fa";

interface DashboardCardProps {
  title: string;
  count: number;
  subtitle: string;
  Icon?: React.ReactNode;
}

const DashboardCard = (props: DashboardCardProps) => {
  const { title, count, subtitle, Icon } = props;

  return (
    <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg w-52">
      <div className="mb-4 flex items-center justify-between text-blue-400">
        <h3 className="text-lg text-black dark:text-white">{title}</h3>
        {Icon ? Icon : <FaRegUser />}
      </div>
      <p className="text-4xl font-semibold">
        {count} <span className="text-lg font-light">{subtitle}</span>
      </p>
    </div>
  );
};

export default DashboardCard;
