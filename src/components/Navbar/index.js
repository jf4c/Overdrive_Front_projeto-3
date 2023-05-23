import { NavLink } from "react-router-dom";

import { Nav, Title, Ul, Li } from "./styles";

const Navbar = () => {
    return (
        <Nav>
            <Title>Page</Title>
            <Ul>
                <Li>
                    <NavLink to="/company"> Empresas </NavLink>
                </Li>
                <Li>
                    <NavLink to="/people"> pessoas </NavLink>
                </Li>
            </Ul>
        </Nav>
    );
};

export default Navbar;
