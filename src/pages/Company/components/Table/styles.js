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
    fontSize: "1.7rem",
    marginRight: "0.4rem",
    verticalAlign: "middle",
  },
});

export const TextHeader = styled("i", {
  fontSize: "1.3rem",
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
