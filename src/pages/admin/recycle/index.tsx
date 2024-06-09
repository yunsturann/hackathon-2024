import RecycleTable from "@/components/admin/RecycleTable";
import Container from "@/components/shared/Container";
import React, { Suspense } from "react";

const RecyclePage = () => {
  return (
    <section>
      <Container className="flex flex-col gap-y-8 md:gap-y-16">
        <header>
          <h2 className="header_title">Recycle Points</h2>
          <p className="header_desc">
            Here you can view all the recycle points in the system.
          </p>
        </header>

        <Suspense
          fallback={<div className="text-lg bg-blue-500 ">Loading...</div>}
        >
          <RecycleTable />
        </Suspense>
      </Container>
    </section>
  );
};

export default RecyclePage;
