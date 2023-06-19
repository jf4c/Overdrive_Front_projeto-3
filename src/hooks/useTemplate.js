import { useFormat } from "./useFormat";
import { Tag } from "primereact/tag";

export const useTemplate = () => {
  const {
    formatCnpj,
    formatCPF,
    formatRG,
    formatDate,
    formatPhone,
    formatCurrency,
    getSeverity,
    statusValue,
  } = useFormat();

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

  const phoneBodyTemplate = (rowData) => {
    return formatPhone(rowData.phone);
  };

  return {
    cnpjBodyTemplate,
    cpfBodyTemplate,
    rgBodyTemplate,
    dateBodyTemplate,
    priceBodyTemplate,
    statusBodyTemplate,
    phoneBodyTemplate,
  };
};
