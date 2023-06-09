import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";
import HeaderTable from "../HeaderTable";
import { Buttons } from "./styles";

const TableLoading = ({ header }) => {
  const items = Array.from({ length: 5 }, (v, i) => i);

  const cellTemplate = () => {
    return <Skeleton></Skeleton>;
  };
  const buttonTemplate = () => {
    return (
      <Buttons>
        <Skeleton shape="circle" size="2.4rem" className="mr-2"></Skeleton>
        <Skeleton shape="circle" size="2.4rem" className="mr-2"></Skeleton>
        <Skeleton shape="circle" size="2.4rem" className="mr-2"></Skeleton>
        <Skeleton shape="circle" size="2.4rem" className="mr-2"></Skeleton>
      </Buttons>
    );
  };

  return (
    <DataTable
      value={items}
      dataKey="id"
      removableSort
      header={<HeaderTable name={header} />}
    >
      <Column
        header="Id"
        // field="id"
        sortable
        body={cellTemplate}
        style={{ minWidth: "5rem" }}
      ></Column>
      <Column
        header="Nome Empresa"
        field="companyName"
        // sortable
        body={cellTemplate}
        style={{ minWidth: "16rem" }}
      ></Column>
      <Column
        header="CNPJ"
        field="cnpj"
        body={cellTemplate}
        // sortable
        style={{ minWidth: "8rem" }}
      ></Column>
      <Column
        header="data de abertura"
        field="openingDate"
        body={cellTemplate}
        sortable
        style={{ minWidth: "10rem" }}
      ></Column>
      <Column
        header="Capital Financeiro"
        field="financeCapital"
        body={cellTemplate}
        sortable
        style={{ minWidth: "8rem" }}
      ></Column>

      <Column
        header="Status"
        field="status"
        body={cellTemplate}
        sortable
        style={{ minWidth: "8rem" }}
      ></Column>
      <Column
        body={buttonTemplate}
        exportable={false}
        style={{ minWidth: "9rem" }}
      ></Column>
    </DataTable>
  );
};

export default TableLoading;
