import CapacityAndFullnesPieChart from "@/components/admin/CapacityAndFullnesPieChart";
import CategoryCountPieChart from "@/components/admin/CategoryCountPieChart";
import Container from "@/components/shared/Container";
import DashboardCard from "@/components/shared/DashboardCard";
import { useDashboardStore } from "@/store/use-dashboard-store";
import React, { Suspense, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";

const AdminPage = () => {
  const dashboard = useDashboardStore((state) => state.dashboard);
  const fetchDashboard = useDashboardStore((state) => state.fetchDashboard);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <div>
      <Container className="flex flex-col gap-y-8 md:gap-y-16">
        <header>
          <h2 className="header_title">Admin Page</h2>
          <p className="header_desc">Manage your platform with ease.</p>
        </header>

        {/* Card Infos */}
        <div className="flex max-sm:justify-center flex-wrap gap-x-6 gap-y-4">
          <DashboardCard
            title="Users"
            count={dashboard?.users || 0}
            subtitle="people"
          />
          <DashboardCard
            title="Company Users"
            count={dashboard?.companies || 0}
            subtitle="people"
          />
          <DashboardCard
            title="Recycle Points"
            count={dashboard?.recyclePoints || 0}
            subtitle="points"
            Icon={<FaLocationDot />}
          />
        </div>

        {/* Pie Chart */}
        <div className="flex flex-wrap gap-x-12 gap-y-16 md:gap-x-20 max-sm:py-20">
          <Suspense fallback={<div>Loading...</div>}>
            <CategoryCountPieChart />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <CapacityAndFullnesPieChart />
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default AdminPage;
