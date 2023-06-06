import { styled } from "../../../../config/stitches.config";

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
export const Date = styled(container, {
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

export const Address = styled("fieldset", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  marginTop: "1rem",
  border: "2px solid rgb(102 102 102 / 18%)",
  paddingTop: "1rem",
  "& legend": {
    fontSize: "20px",
    marginLeft: "1rem",
  },
});

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
