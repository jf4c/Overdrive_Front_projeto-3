import { styled } from "~/config/stitches.config";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";

export const ActionTamplate = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const BoxTable = styled("div", {
  height: "84vh",
});

export const CreatePerson = styled(Dialog, {
  "&.p-dialog .p-dialog-header": {
    background: "$green500",
    color: "$white",
  },
  "&.p-dialog .p-dialog-header .p-dialog-header-icon": {
    color: "$white",
  },
});

export const CompanyListDialog = styled(Dialog, {
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

export const DeletePerson = styled(Dialog, {
  "&.p-dialog .p-dialog-header": {
    background: "$red500",
    color: "$white",
  },
  "&.p-dialog .p-dialog-header .p-dialog-header-icon": {
    color: "$white",
  },
});

export const EditPerson = styled(Dialog, {
  "&.p-dialog .p-dialog-header": {
    background: "$yellow500",
    color: "$white",
  },
  "&.p-dialog .p-dialog-header .p-dialog-header-icon": {
    color: "$white",
  },
});

export const InputContainer = styled("div", {
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

export const Person = styled("div", {
  marginTop: "1rem",
  display: "grid",
  // gridTemplateColumns: "1fr 1fr 1fr 1fr",
});

export const StatusChange = styled(Dialog, {
  variants: {
    headerStyle: {
      active: {
        "&.p-dialog .p-dialog-header": {
          background: "$green500",
          color: "$white",
        },
        "&.p-dialog .p-dialog-header .p-dialog-header-icon": {
          color: "$white",
        },
      },

      inactive: {
        "&.p-dialog .p-dialog-header": {
          background: "$red500",
          color: "$white",
        },
        "&.p-dialog .p-dialog-header .p-dialog-header-icon": {
          color: "$white",
        },
      },
    },
  },
});

export const Table = styled(DataTable, {});

export const Text = styled("div", {
  textAlign: "center",
  paddingTop: "1rem",
  "& span": {
    fontSize: "1.2rem",
    verticalAlign: "middle",
  },
});

export const TextHeader = styled("i", {
  fontSize: "1rem",
  textAlign: "center",
  verticalAlign: "middle",
});
