import Table from "./components/Table";

import { useAxios } from "../../hooks/useAxios";
import { CompanyContextProvider } from "./context/CompanyContext";

const Company = () => {
  return (
    <section>
      {/* <h2>Empresas</h2> */}
      <CompanyContextProvider>
        <Table />
      </CompanyContextProvider>
    </section>
  );
};

export default Company;
