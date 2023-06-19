import Table from "./components/Table";
import React from "react";
import { PersonContextProvider } from "./context/PersonContext";

const People = () => {
  return (
    <section>
      <PersonContextProvider>
        <Table />
      </PersonContextProvider>
    </section>
  );
};

export default People;
