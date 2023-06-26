import { styled } from "~/config/stitches.config";
import { Dialog } from "primereact/dialog";

export const AddPeopleInCompany = styled(Dialog, {
  "&.p-dialog .p-dialog-header": {
    background: "$blue500",
    color: "$white",
  },
  "&.p-dialog .p-dialog-header .p-dialog-header-icon": {
    color: "$white",
  },
  "&.p-dialog .p-dialog-content": {
    padding: "0",
  },
});

export const Container = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
});

export const Company = styled("div", {
  display: "flex",
  alignItems: "center",
  width: "90%",
  justifyContent: "space-between",
});

export const CompanyInfo = styled("i", {
  //   display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  width: "80%",
});

export const CNPJ = styled("div", {
  fontSize: "1rem",
  paddingBottom: "1rem",
  "& label": {
    background: "$grey800",
    color: "$grey200",
    padding: "0.3rem",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
    // marginRight: ".2rem",
  },
  "& span": {
    border: "1px solid #000",
    padding: "0.24rem",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
});

export const Icon = styled("i", {
  background: "$grey800",
  padding: "1.5rem 1.7rem",
  borderRadius: "10px",
  color: "$grey200",
  "&.pi": {
    fontSize: "3.8rem",
    // marginRight: "0.5rem",
    verticalAlign: "middle",
  },
});

export const RemovePeopleInCompany = styled(Dialog, {
  "&.p-dialog .p-dialog-header": {
    background: "$blue500",
    color: "$white",
  },
  "&.p-dialog .p-dialog-header .p-dialog-header-icon": {
    color: "$white",
  },
  "&.p-dialog .p-dialog-content": {
    padding: "0",
  },
});

export const Text = styled("div", {
  textAlign: "center",
  paddingTop: "1rem",
  "& span": {
    fontSize: "1.2rem",
    verticalAlign: "middle",
  },
});

export const Name = styled("div", {
  fontSize: "1.5rem",
  marginBottom: "1rem",

  "& label": {
    background: "$blue500",
    color: "$grey200",
    padding: "0.3rem",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  },
  "& span": {
    border: "1px solid #000",
    padding: "0.24rem",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
});

export const TextView = styled("div", {
  fontSize: "1.5rem",
  marginBottom: "1rem",

  "& label": {
    background: "$blue500",
    color: "$grey200",
    padding: "0.3rem",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  },
  "& span": {
    border: "1px solid #000",
    padding: "0.24rem",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
});

export const IconView = styled("i", {
  background: "$blue500",
  margin: "0.3rem",
  padding: ".4rem .6rem",
  borderRadius: "10px",
  color: "$grey200",
  "&.pi": {
    fontSize: "4rem",
    // marginRight: "0.5rem",
    verticalAlign: "middle",
  },
});

export const ViewData = styled("div", {
  display: "flex",
  flexDirection: "column",
  // justifyContent: "center",
  padding: "1rem",
});

export const ViewPerson = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid rgba(0,0,0,0.30)",
  paddingBottom: "1rem",
  "& .info": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "column",
    width: "75%",
    height: "100px",
  },
});

export const ViewCompany = styled("div", {
  paddingTop: "1rem",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  "& h3": {
    gridColumnStart: "1",
    gridColumnEnd: "6",
    fontSize: "1.4rem",
    textAlign: "center",
  },
  "& .companyName": {
    gridColumnStart: "1",
    gridColumnEnd: "4",
  },
  "& .tradingName": {
    gridColumnStart: "4",
    gridColumnEnd: "6",
  },

  "& .cnae": {
    gridColumnStart: "1",
    gridColumnEnd: "2",
  },
  "& .legalNature": {
    gridColumnStart: "2",
    gridColumnEnd: "3",
  },

  "& .cnpj": {
    gridColumnStart: "3",
    gridColumnEnd: "5",
  },

  "& .openingDate": {
    gridColumnStart: "5",
    gridColumnEnd: "6",
  },
  "& .financeCapital": {
    gridColumnStart: "1",
    gridColumnEnd: "6",
  },
});
