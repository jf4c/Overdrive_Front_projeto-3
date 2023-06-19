import { createContext, useState } from "react";

export const CompanyContext = createContext();

export const CompanyContextProvider = ({ children }) => {
  let emptyCompany = {
    cnpj: null,
    openingDate: null,
    companyName: null,
    tradingName: null,
    cnae: null,
    legalNature: null,
    financeCapital: 0,
    address: {
      cep: null,
      street: null,
      bairro: null,
      number: null,
      city: null,
    },
  };

  const [company, setCompany] = useState(emptyCompany);

  const statesTable = {
    emptyCompany,
    company,
    setCompany,
  };

  return (
    <CompanyContext.Provider value={statesTable}>
      {children}
    </CompanyContext.Provider>
  );
};
