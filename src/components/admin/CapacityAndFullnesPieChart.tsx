import { useDashboardStore } from "@/store/use-dashboard-store";
import React, { useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";

const CapacityAndFullnesPieChart = () => {
  const capacityAndFullness = useDashboardStore(
    (state) => state.capacityAndFullness
  );

  const getCapacityAndFullness = useDashboardStore(
    (state) => state.getCapacityAndFullness
  );

  useEffect(() => {
    getCapacityAndFullness();
  }, [getCapacityAndFullness]);

  const data = [
    {
      title: "Capacity",
      value: capacityAndFullness?.capacity || 0,
      color: "#81D8D0",
    },
    {
      title: "Fullness",
      value: capacityAndFullness?.fullness || 0,
      color: "#E27171",
    },
  ];

  return (
    <div className="size-80">
      <h3 className="mb-3 text-center text-lg font-medium">
        Capacity and Fullness
      </h3>
      <PieChart
        data={data}
        label={({ dataEntry }) => dataEntry.percentage.toFixed(2) + "%"}
        labelStyle={{
          fontSize: "4px",
          fontFamily: "sans-serif",
          fill: "#121212",
        }}
        labelPosition={70}
      />
    </div>
  );
};

export default CapacityAndFullnesPieChart;
