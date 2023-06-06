import { createContext, useState } from "react";

export const CompanyContext = createContext();

export const CompanyContextProvider = ({ children }) => {
  let emptyCompany = {
    id: null,
    cnpj: "",
    status: "",
    openingDate: null,
    companyName: "",
    tradingName: "",
    cnae: "",
    legalNature: "",
    financeCapital: null,
    address: {
      cep: "",
      street: "",
      bairro: "",
      number: null,
      city: "",
    },
  };

  const [company, setCompany] = useState(emptyCompany);
  const [companyDialog, setCompanyDialog] = useState(null);
  const [getByCNPJDialog, setGetByCNPJDialog] = useState(false);

  const statesTable = {
    emptyCompany,
    company,
    setCompany,
    companyDialog,
    setCompanyDialog,
    getByCNPJDialog,
    setGetByCNPJDialog,
  };

  return (
    <CompanyContext.Provider value={statesTable}>
      {children}
    </CompanyContext.Provider>
  );
};
