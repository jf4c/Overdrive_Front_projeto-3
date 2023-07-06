import { styled } from "~/config/stitches.config";
import { Dialog } from "primereact/dialog";

export const ViewInfo = styled("div", {
  display: "flex",
});

export const Box = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "12rem",
  height: "12rem",
  // marginTop: "3rem",
  transition: "1s",

  "& .overlay": {
    display: "none",
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "118vh",
    zIndex: "9997",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    opacity: "0",
    transition: " display 0.3s",
  },

  "&:hover": {
    width: "15rem",
    height: "15rem",
  },

  "& .active": {
    display: "flex",
    opacity: "1",
  },
});

export const Image = styled("img", {
  zIndex: "9999",
  width: "100%",
  height: "100%",

  "&:hover + .toolList": {
    opacity: "1",
    transform: "translateX(16rem)",
  },
});

export const Text = styled("span", {
  zIndex: "9999",
  background: "$grey800",
  color: "$grey200",
  fontSize: "1.5rem",
  width: "100%",
});

export const ToolList = styled("div", {
  zIndex: "9998",
  display: "flex",
  marginTop: "1.6rem",
  justifyContent: "space-between",
  position: "absolute",
  flexDirection: "column",
  transition: "1s",
  opacity: "0",
});

export const Tool = styled("span", {
  fontSize: "1.3rem",
  marginTop: "0.5rem",
  padding: "0.2rem",
  background: "$grey200",
  borderRadius: "5px",
  border: "2px solid $blackOpac",
});
