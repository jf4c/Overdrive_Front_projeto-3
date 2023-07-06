import { styled } from "~/config/stitches.config";

export const Title = styled("h1", {
  fontSize: "2rem",
});

export const Text = styled("p", {
  maxWidth: "800px",
  textAlign: "justify",
  "& span": {
    fontSize: "4rem",
    float: "left",
    marginRight: "0.1em",
    lineHeight: "0.9",
  },
});

export const Main = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  height: "110vh",
  textAlign: "center",
  padding: "1rem",
  "& p": {
    fontSize: "1.6rem",
    color: "$grey600",
  },
});
export const Container = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "80%",
});

export const Infos = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "50%",
  height: "30vw",
  margin: "1rem",
});

export const ActionButtons = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "50%",
  height: "100%",
  alignItems: "center",
  justifyContent: "start",
});
