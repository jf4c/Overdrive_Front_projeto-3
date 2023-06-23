import { useAxios } from "../../hooks/useAxios";
import { CompanyContextProvider } from "./context/CompanyContext";
import TableCompany from "./components/TableCompany";

const Company = () => {
  return (
    <section>
      {/* <h2>Empresas</h2> */}
      <CompanyContextProvider>
        <TableCompany />
      </CompanyContextProvider>
    </section>
  );
};

export default Company;
