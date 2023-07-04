export const useFormat = () => {
  const formatName = (name) => {
    if (name) {
      const parts = name.split(" ");
      const firstName = parts[0];
      let initials = firstName + " ";

      for (let i = 1; i < parts.length - 1; i++) {
        const part = parts[i];
        initials += part.charAt(0) + ". ";
      }

      const lastName = parts[parts.length - 1];
      initials += lastName;

      return initials;
    }
  };
  const formatCompanyName = (fullName) => {
    if (!fullName) return;
    if (fullName.length > 30) {
      const nomesimplificado = fullName.slice(0, 30);
      return `${nomesimplificado}...`;
    }
    return fullName;
  };

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
    formatName,
    formatCnpj,
    formatCPF,
    formatPhone,
    formatRG,
    formatDate,
    formatCurrency,
    getSeverity,
    statusValue,
    formatCompanyName,
  };
};
