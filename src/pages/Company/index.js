import { CompanyContextProvider } from "./context/CompanyContext";
import TableCompany from "./components/TableCompany";

const Company = () => {
  return (
    <section>
      <CompanyContextProvider>
        <TableCompany />
      </CompanyContextProvider>
    </section>
  );
};

export default Company;
