import React from "react";
import { PersonContextProvider } from "./context/PersonContext";
import TablePeople from "./components/TablePeople";

const People = () => {
  return (
    <section>
      <PersonContextProvider>
        <TablePeople />
      </PersonContextProvider>
    </section>
  );
};

export default People;
