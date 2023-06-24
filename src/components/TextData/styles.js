import { styled } from "../../config/stitches.config";

export const Data = styled("div", {
  display: "flex",
  flexDirection: "column",
  margin: "0.2rem ",
  "& i": {
    marginRight: ".2rem",
  },
});

// export const Icon = styled("i", {
//   "&.pi": {
//     fontSize: "1.2rem",
//     // color: "#DDD",
//   },
//   background: "#DDD",
//   //   margin: "0.5rem",
//   padding: "0.5rem",

//   borderBottomLeftRadius: "10px",
//   //   width: "1rem",
//   //   border: "1px solid #222",
// });

export const Name = styled("label", {
  color: "#EEE",
  fontSize: "1.2rem",
  background: "$blue500",
  padding: "0.3rem",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  //   borderRadius: "5px",
});

export const Text = styled("span", {
  padding: "0.33rem 0.5rem",
  border: "1px solid #bbb",
  fontSize: "1.2rem",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
});
