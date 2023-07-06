import { styled } from "~/config/stitches.config";
import { Button } from "primereact/button";

export const Container = styled("div", {
  width: "80%",
  marginTop: "1rem",
  cursor: "pointer",

  display: "flex",
  flexDirection: "column",
  "&:hover .img": {
    height: "22vw",
  },
  "&:hover .overlay": {
    backgroundColor: "$black",
  },

  "& .container-img": {
    position: "relative",
    display: "inline-block",
    top: "5px",
    left: "0",
  },

  "& .overlay": {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    opacity: "0.6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },

  "& .overlay span": {
    zIndex: "5",
    color: "$white",
    fontSize: "24px",
    fontWeight: "bold",
  },

  "&:hover .btn": {
    borderTopLeftRadius: "0",
    borderTopRightRadius: "0",
  },
});

export const Image = styled("img", {
  width: "100%",
  height: "0px",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  transition: ".5s",
});

export const Btn = styled(Button, {
  "&.p-button": {
    width: "100%",
    fontSize: "1.2rem",
  },

  "& .p-button-icon": {
    fontSize: "2rem",
  },
});
