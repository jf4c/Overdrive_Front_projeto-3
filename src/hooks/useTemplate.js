import { useFormat } from "./useFormat";
import { Tag } from "primereact/tag";

export const useTemplate = () => {
  const { formatCnpj, formatDate, formatCurrency, getSeverity, statusValue } =
    useFormat();

  const cnpjBodyTemplate = (rowData) => {
    return formatCnpj(rowData.cnpj);
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

  return {
    cnpjBodyTemplate,
    dateBodyTemplate,
    priceBodyTemplate,
    statusBodyTemplate,
  };
};
