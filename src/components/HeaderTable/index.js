import React from "react";
import { Container } from "./styles";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const HeaderTable = ({ name, filter, open }) => {
  return (
    <Container>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={filter} placeholder="Search..." />
      </span>
      <h4 classNames="m-0">{name}</h4>
      <Button label="New" icon="pi pi-plus" severity="success" onClick={open} />
    </Container>
  );
};

export default HeaderTable;
