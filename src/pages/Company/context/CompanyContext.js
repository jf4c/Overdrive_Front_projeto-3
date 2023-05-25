import { createContext, useState } from "react";

export const CompanyContext = createContext();

export const CompanyContextProvider = ({ children }) => {
  const [companyDialog, setCompanyDialog] = useState(null);
  return (
    <CompanyContext.Provider value={{ companyDialog, setCompanyDialog }}>
      {children}
    </CompanyContext.Provider>
  );
};
