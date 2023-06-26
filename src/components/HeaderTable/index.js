import React from "react";
import { Container, Text } from "./styles";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const HeaderTable = ({ name, filter, open }) => {
  return (
    <Container>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={filter} placeholder="Buscar..." />
      </span>
      <Text>{name}</Text>
      <Button
        label="Adicionar"
        icon="pi pi-plus"
        severity="success"
        onClick={open}
      />
    </Container>
  );
};

export default HeaderTable;
