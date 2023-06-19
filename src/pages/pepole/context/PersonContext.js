import { createContext, useState } from "react";

export const PersonContext = createContext();

export const PersonContextProvider = ({ children }) => {
  let emptyPerson = {
    name: null,
    user: null,
    rg: null,
    cpf: null,
    phone: null,
  };

  const [person, setPerson] = useState(emptyPerson);

  const statesTable = {
    emptyPerson,
    person,
    setPerson,
  };

  return (
    <PersonContext.Provider value={statesTable}>
      {children}
    </PersonContext.Provider>
  );
};
