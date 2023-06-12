import { styled } from "../../../../config/stitches.config";

export const Container = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const ViewData = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  "& .companyName": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },
  "& .tradingName": {
    gridColumnStart: "1",
    gridColumnEnd: "4",
  },
  "& .id": {
    gridColumnStart: "1",
    gridColumnEnd: "2",
  },
  "& .cnpj": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },
  "& .status": {
    // Estilos para a classe .status
  },

  "& .cnae": {
    gridColumnStart: "3",
    gridColumnEnd: "5",
  },
  "& .legalNature": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },
  "& .openingDate": {
    gridColumnStart: "3",
    gridColumnEnd: "5",
  },
  "& .financeCapital": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },
});

export const Address = styled("div", {
  gridColumnStart: "1",
  gridColumnEnd: "5",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  "& .cep": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },
  "& .street": {
    gridColumnStart: "1",
    gridColumnEnd: "4",
  },
  "& .number": {
    gridColumnStart: "4",
    gridColumnEnd: "5",
  },
  "& .bairro": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },
  "& .city": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },
});

export const Icon = styled("i", {
  "&.pi": {
    fontSize: "1.2rem",
    marginRight: "0.4rem",
    verticalAlign: "middle",
  },
});

export const TextHeader = styled("i", {
  fontSize: "1rem",
  textAlign: "center",
  verticalAlign: "middle",
});

export const PersonContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
});

export const Person = styled("div", {
  display: "flex",
  margin: ".2rem",
  fontSize: "1.2rem",
});

export const PersonData = styled("div", {
  display: "flex",
  margin: ".2rem",
  alignItems: "center",

  "& label": {
    background: "$blue700",
    color: "$grey200",
    padding: ".3rem",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
  },
  "& li": {
    listStyle: "none",
    background: "$grey300",
    padding: ".3rem",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    width: "100%",
  },
});

export const CreateCompany = styled("div", {});

const container = styled("div", {
  margin: "1rem 1rem",
  display: "inline-block",
  "& .p-float-label input:focus ~ label, .p-float-label input:-webkit-autofill ~ label, .p-float-label input.p-filled ~ label, .p-float-label textarea:focus ~ label, .p-float-label textarea.p-filled ~ label, .p-float-label .p-inputwrapper-focus ~ label, .p-float-label .p-inputwrapper-filled ~ label, .p-float-label .p-tooltip-target-wrapper ~ label ":
    {
      color: "#222",
      fontSize: "18px",
      top: "-0.95rem",
      left: "0.5rem",
    },
});

export const Company = styled("div", {
  marginTop: "1rem",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
});

export const Name = styled(container, {
  "&.company": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },
  "&.trading": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },
});
export const Data = styled(container, {
  gridColumnStart: "3",
  gridColumnEnd: "5",
});

export const CNPJ = styled(container, {
  gridColumnStart: "1",
  gridColumnEnd: "3",
});

export const CNAE = styled(container, {
  gridColumnStart: "3",
  gridColumnEnd: "5",
});

export const Nature = styled(container, {
  gridColumnStart: "1",
  gridColumnEnd: "3",
});

export const Finance = styled(container, {
  gridColumnStart: "3",
  gridColumnEnd: "5",
});

// export const Address = styled("fieldset", {
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr 1fr 1fr",
//   marginTop: "1rem",
//   border: "2px solid rgb(102 102 102 / 18%)",
//   paddingTop: "1rem",
//   "& legend": {
//     fontSize: "20px",
//     marginLeft: "1rem",
//   },
// });

export const Cep = styled(container, {
  gridColumnStart: "1",
  gridColumnEnd: "5",
});
export const Street = styled(container, {
  gridColumnStart: "1",
  gridColumnEnd: "4",
});

export const Number = styled(container, {});

export const Bairro = styled(container, {
  gridColumnStart: "1",
  gridColumnEnd: "5",
});
export const City = styled(container, {
  gridColumnStart: "1",
  gridColumnEnd: "5",
});

export const StatusChange = styled("div", {});
export const DeleteCompany = styled("div", {});
export const ViewCompany = styled("div", {});
export const EditCompany = styled("div", {});
