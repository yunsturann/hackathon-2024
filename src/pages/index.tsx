import Container from "@/components/shared/Container";
import React from "react";

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
      </Container>
    </section>
  );
};

export default Homepage;
