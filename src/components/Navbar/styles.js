import { styled } from "../../config/stitches.config";

export const Title = styled("h1", {
  fontSize: "2 rem",
  color: "$grey200",
});

export const Nav = styled("nav", {
  height: "8vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "$grey800",
  fontSize: "1rem",
  padding: "0 1rem",

  "& a": {
    textDecoration: "none",
    color: "$grey200",
    padding: "0.7rem",
    borderRadius: "10px",
    transition: "0.2s",
  },
  "& a:hover": {
    backgroundColor: "$grey200",
    color: "$black",
  },
  "& .active": {
    backgroundColor: "$grey200",
    color: "$black",
  },
});

export const Ul = styled("ul", {
  display: "flex",
  margin: 0,
});

export const Li = styled("li", {
  listStyle: "none",
  marginLeft: "30px",
});
