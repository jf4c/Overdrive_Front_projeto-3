import { NavLink } from "react-router-dom";

import { Nav, Title, Ul, Li } from "./styles";

const Navbar = () => {
  return (
    <Nav>
      <Title>Logo</Title>
      <Ul>
        <Li>
          <NavLink to="/"> Home </NavLink>
        </Li>
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
