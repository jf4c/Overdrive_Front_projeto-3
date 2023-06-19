export const useFormat = () => {
  const formatCnpj = (cnpj) => {
    if (cnpj) {
      return cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    }
  };

  const formatCPF = (cpf) => {
    if (cpf) {
      return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
  };

  const formatRG = (rg) => {
    if (rg) {
      return rg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
    }
  };

  const formatPhone = (phone) => {
    if (phone) {
      return phone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
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

  const statusValue = (company) => {
    switch (company.status) {
      case "Active":
        return "Ativo";

      case "Pending":
        return "Pendente";

      case "Inactive":
        return "Inativo";

      default:
        return null;
    }
  };

  return {
    formatCnpj,
    formatCPF,
    formatPhone,
    formatRG,
    formatDate,
    formatCurrency,
    getSeverity,
    statusValue,
  };
};
