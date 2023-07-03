import { styled } from "~/config/stitches.config";

import { MdSentimentVeryDissatisfied } from "react-icons/md";
import { Button } from "primereact/button";

export const Main = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "84vh",
  textAlign: "center",
  padding: "1rem",
  "& p": {
    fontSize: "1.6rem",
    color: "$grey600",
  },

  "& div": {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export const Btn = styled(Button, {
  "&.p-button": {
    width: "80%",
    fontSize: "1.2rem",
    marginTop: "1rem",
  },
  "& .p-button-icon": {
    fontSize: "2rem",
  },
});

export const Icon = styled(MdSentimentVeryDissatisfied, {
  // display:"",
  fontSize: "10rem",
  background: "$red500",
  borderRadius: "15px",
});

export const Warning = styled("span", {
  // display: "block",
  fontSize: "3rem",
  color: "$grey600",
});
