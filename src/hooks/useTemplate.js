import { useFormat } from "./useFormat";
import { Tag } from "primereact/tag";

export const useTemplate = () => {
  const {
    formatName,
    formatCnpj,
    formatCPF,
    formatRG,
    formatDate,
    formatPhone,
    formatCurrency,
    getSeverity,
    statusValue,
    formatCompanyName,
  } = useFormat();

  const companyNameBodyTemplate = (rowData) => {
    const fullName = rowData.companyName;

    return formatCompanyName(rowData.companyName);
  };

  const nameBodyTemplate = (rowData) => {
    return formatName(rowData.name);
  };

  const cnpjBodyTemplate = (rowData) => {
    return formatCnpj(rowData.cnpj);
  };

  const cpfBodyTemplate = (rowData) => {
    return formatCPF(rowData.cpf);
  };

  const rgBodyTemplate = (rowData) => {
    return formatRG(rowData.rg);
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.openingDate);
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.financeCapital);
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={statusValue(rowData)} severity={getSeverity(rowData)}></Tag>
    );
  };

  const userBodyTemplate = (rowData) => {
    const response = () => {
      if (rowData.user !== null) {
        return rowData.user;
      } else {
        return <Tag value={"sem dado"} severity="warning"></Tag>;
      }
    };
    return response();
  };

  const phoneBodyTemplate = (rowData) => {
    const response = () => {
      if (rowData.phone !== null) {
        return formatPhone(rowData.phone);
      } else {
        return <Tag value={"sem dado"} severity="warning"></Tag>;
      }
    };
    return response();
  };

  const companyStatusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.companyId !== null ? "Com empresa" : "sem empresa"}
        severity={rowData.companyId !== null && "success"}
      ></Tag>
    );
  };

  return {
    nameBodyTemplate,
    cnpjBodyTemplate,
    cpfBodyTemplate,
    rgBodyTemplate,
    dateBodyTemplate,
    priceBodyTemplate,
    statusBodyTemplate,
    phoneBodyTemplate,
    userBodyTemplate,
    companyStatusBodyTemplate,
    companyNameBodyTemplate,
  };
};
