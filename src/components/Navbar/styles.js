import { styled } from "../../config/stitches.config";

export const Title = styled("h1", {
    fontSize: "2 rem",
});

export const Nav = styled("nav", {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    backgroundColor: "#34f256",
    fontSize: "1rem",

    "& a": {
        textDecoration: "none",
        color: "#000",
        padding: "0.5rem",
        borderRadius: "3rem",
        transition: "0.2s",
    },
    "& a:hover": {
        backgroundColor: "Green",
        color: "#FFF",
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

//     ul {
//         display: flex;
//         margin: 0;
//     }
//     li {
//         list-style: none;
//         margin-left: 30px;
//     }

//     a {
//         text-decoration: none;
//         display: inline-block;
//     }
// `;

// export const Title = styled.nav`
//     font-size: 3rem;
// `;
