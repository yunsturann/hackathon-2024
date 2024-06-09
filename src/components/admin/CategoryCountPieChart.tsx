import { multipleCategoryItems } from "@/constants";
import { useDashboardStore } from "@/store/use-dashboard-store";
import React, { useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";

const CategoryCountPieChart = () => {
  const productCategoryItems = useDashboardStore(
    (state) => state.productCategoryItems
  );
  const getProductCountByCategory = useDashboardStore(
    (state) => state.getProductCountByCategory
  );

  useEffect(() => {
    getProductCountByCategory();
  }, [getProductCountByCategory]);

  const allData = productCategoryItems.map((item) => ({
    title: item.category,
    value: item.count,
    color: multipleCategoryItems.find((c) => c.value === item.category)!.color,
  }));

  const filteredData = allData.filter((item) => item.value > 0);

  return (
    <div className="size-80">
      <h3 className="mb-3 text-center text-lg font-medium">
        Product Category Distribution
      </h3>
      <PieChart
        data={filteredData}
        label={({ dataEntry }) =>
          dataEntry.title + " " + dataEntry.percentage.toFixed(2) + "%"
        }
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

export default CategoryCountPieChart;
