import ProductTable from "@/components/homepage/ProductTable";
import Container from "@/components/shared/Container";
import React, { Suspense } from "react";

const ProductPage = () => {
  return (
    <section>
      <Container className="flex flex-col gap-y-8 md:gap-y-16">
        <header>
          <h2 className="header_title">Products</h2>
          <p className="header_desc">
            Make product management easy with our platform.
          </p>
        </header>

        <Suspense
          fallback={<div className="text-lg bg-blue-500 ">Loading...</div>}
        >
          <ProductTable />
        </Suspense>
      </Container>
    </section>
  );
};

export default ProductPage;
