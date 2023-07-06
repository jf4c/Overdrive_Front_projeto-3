import { useFormat } from "./useFormat";
import { Tag } from "primereact/tag";

export const useTemplate = () => {
  const {
    formatEmptyData,
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
    return formatEmptyData(formatCompanyName(rowData.companyName));
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
    return formatEmptyData(formatCurrency(rowData.financeCapital));
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={statusValue(rowData)} severity={getSeverity(rowData)}></Tag>
    );
  };

  const userBodyTemplate = (rowData) => {
    return formatEmptyData(rowData.user);
  };

  const phoneBodyTemplate = (rowData) => {
    return formatEmptyData(formatPhone(rowData.phone));
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
