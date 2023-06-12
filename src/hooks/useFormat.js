export const useFormat = () => {
  const formatCnpj = (cnpj) => {
    if (cnpj) {
      return cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    }
  };

  const formatDate = (date) => {
    if (date && typeof date == "string") {
      return date.split("T")[0].split("-").reverse().join("/");
    }
  };

  const formatCurrency = (value) => {
    if (value) {
      return value.toLocaleString("pt-RS", {
        style: "currency",
        currency: "BRL",
      });
    }
  };

  const getSeverity = (company) => {
    switch (company.status) {
      case "Active":
        return "success";

      case "Pending":
        return "warning";

      case "Inactive":
        return "danger";

      default:
        return null;
    }
  };

  return {
    formatCnpj,
    formatDate,
    formatCurrency,
    getSeverity,
  };
};
