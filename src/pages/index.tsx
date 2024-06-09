import InfoCards from "@/components/homepage/InfoCards";
import Container from "@/components/shared/Container";
import React, { Suspense } from "react";

const Homepage = () => {
  return (
    <section>
      <Container className="flex flex-col gap-y-8 md:gap-y-16">
        <header>
          <h2 className="header_title">Homepage</h2>
          <p className="header_desc">
            Make product management easy with our platform.
          </p>
        </header>

        {/* InfoCards */}
        <Suspense fallback={<p>Loading...</p>}>
          <InfoCards />
        </Suspense>
      </Container>
    </section>
  );
};

export default Homepage;
