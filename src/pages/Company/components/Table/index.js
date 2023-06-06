import React, { useState, useEffect, useRef, useContext } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { useAxios } from "../../../../hooks/useAxios";
import { CompanyContext } from "../../context/CompanyContext";
import { Avatar } from "primereact/avatar";
import { Accordion, AccordionTab } from "primereact/accordion";

import TextData from "../../../../components/TextData";

import { classNames } from "primereact/utils";
import CreateDialog from "../CreateDialog";

import {
  Container,
  ViewData,
  Address,
  Icon,
  TextHeader,
  Person,
  PersonData,
  PersonContainer,
} from "./styles";

export default function Table() {
  const { data, getData, delById, getPeopleInCompany, people } = useAxios();

  const {
    emptyCompany,
    company,
    setCompany,
    companyDialog,
    setCompanyDialog,
    getByCNPJDialog,
    setGetByCNPJDialog,
  } = useContext(CompanyContext);

  const [companies, setCompanies] = useState([]);
  // const [people, setPeople] = useState([]);
  const [deleteCompanyDialog, setDeleteCompanyDialog] = useState(false);
  const [deleteCompaniesDialog, setDeleteCompaniesDialog] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    getData("Company");
  }, [data]);

  // useEffect(() => {
  // }, [company]);

  const openNew = () => {
    setCompany(emptyCompany);
    setSubmitted(false);
    setCompanyDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setCompanyDialog(false);
  };
  const hideViewDialog = () => {
    setGetByCNPJDialog(false);
  };

  const hideDeleteCompanyDialog = () => {
    setDeleteCompanyDialog(false);
  };

  const editCompany = (company) => {
    setCompany({ ...company });
    setCompanyDialog(true);
  };

  const confirmDeleteCompany = (company) => {
    setCompany(company);
    setDeleteCompanyDialog(true);
  };

  const viewCompanyComplete = (company) => {
    setCompany(company);

    getPeopleInCompany("Company/FindAllPeopleInCompany", company.id);
    setGetByCNPJDialog(true);
  };

  const deleteCompany = () => {
    // let _companies = companies.filter((val) => val.id !== company.id);
    delById("Company", company.id);
    getData("Company");
    console.log(data);

    setCompanies(data);

    console.log(data);
    console.log(companies);

    setDeleteCompanyDialog(false);
    setCompany(emptyCompany);

    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const formatCnpj = (cnpj) => {
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  };

  const formatDate = (date) => {
    if (date) {
      return date.split("T")[0].split("-").reverse().join("/");
    }
  };

  const formatCurrency = (value) => {
    if (value) {
      return value.toLocaleString("pt-RS", {
        style: "currency",
        currency: "BRL",
      });
    }
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.financeCapital);
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.openingDate);
  };

  const cnpjBodyTemplate = (rowData) => {
    return formatCnpj(rowData.cnpj);
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData)}></Tag>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Container>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editCompany(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteCompany(rowData)}
        />

        <Button
          icon="pi pi-ellipsis-h"
          rounded
          outlined
          severity="warning"
          onClick={() => viewCompanyComplete(rowData)}
        />
      </Container>
    );
  };

  const getSeverity = (company) => {
    switch (company.status) {
      case "Active":
        return "success";

      case "Pending":
        return "warning";

      case "Inactive":
        return "danger";

      default:
        return null;
    }
  };

  const header = (
    <Container>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
      <h4 classNames="m-0">Empresas</h4>

      <Button
        label="New"
        icon="pi pi-plus"
        severity="success"
        onClick={openNew}
      />
    </Container>
  );

  const companyHeader = (
    <div className="flex align-items-center">
      <Icon className="pi pi-building"></Icon>
      <TextHeader>Empresa {company.id}</TextHeader>
    </div>
  );

  const addressHeader = (
    <div className="flex align-items-center">
      <Icon className="pi pi-map-marker mr-2"></Icon>
      <TextHeader>Endereço da Empresa {company.id}</TextHeader>
    </div>
  );
  const peopleHeader = (
    <div className="flex align-items-center">
      <Icon className="pi pi-users mr-2"></Icon>
      <TextHeader>Funcionarios da Empresa {company.id}</TextHeader>
    </div>
  );

  const companyDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
    </React.Fragment>
  );

  const deleteCompanyDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteCompanyDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteCompany}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          ref={dt}
          value={data}
          selection={selectedCompanies}
          onSelectionChange={(e) => setSelectedCompanies(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} companies"
          globalFilter={globalFilter}
          header={header}
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column
            header="Id"
            field="id"
            sortable
            style={{ minWidth: "5rem" }}
          ></Column>
          <Column
            header="Nome Empresa"
            field="companyName"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            header="CNPJ"
            field="cnpj"
            body={cnpjBodyTemplate}
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            header="data de abertura"
            field="openingDate"
            body={dateBodyTemplate}
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            header="Capital Financeiro"
            field="financeCapital"
            body={priceBodyTemplate}
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          {/* <Column
                        header="Reviews"
                        field="rating"
                        body={ratingBodyTemplate}
                        sortable
                        style={{ minWidth: "12rem" }}
                    ></Column> */}
          <Column
            header="Status"
            field="status"
            body={statusBodyTemplate}
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "9rem" }}
          ></Column>
        </DataTable>
      </div>

      <CreateDialog visible={companyDialog} />

      <Dialog
        visible={getByCNPJDialog}
        style={{ width: "35rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={`Imformações da empresa ${company.id}`}
        modal
        className="p-fluid"
        footer={companyDialogFooter}
        onHide={hideViewDialog}
      >
        <Accordion>
          <AccordionTab header={companyHeader}>
            <ViewData>
              <TextData
                data={company.companyName}
                name="Nome Da empresa"
                className="companyName"
              />
              <TextData
                data={company.tradingName}
                name="Nome Fantazia"
                className="tradingName"
              />
              <TextData
                data={company.status}
                name="Status"
                className="status"
              />

              <TextData
                data={formatCnpj(company.cnpj)}
                name="CNPJ"
                className="cnpj"
              />
              <TextData data={company.cnae} name="CNAE" className="cnae" />

              <TextData
                data={company.legalNature}
                name="Natureza Legal"
                className="legalNature"
              />

              <TextData
                data={formatDate(company.openingDate)}
                name="Data de Abertura"
                className="openingDate"
              />
              <TextData
                data={formatCurrency(company.financeCapital)}
                name="Capital Financeiro"
                className="financeCapital"
              />
            </ViewData>
          </AccordionTab>

          <AccordionTab header={addressHeader}>
            <Address>
              <TextData data={company.address.cep} name="CEP" className="cep" />
              <TextData
                data={company.address.street}
                name="Rua"
                className="street"
              />
              <TextData
                data={company.address.number}
                icon="star"
                name="Numero"
                className="number"
              />
              <TextData
                data={company.address.bairro}
                icon="star"
                name="Bairro"
                className="bairro"
              />

              <TextData
                data={company.address.city}
                name="Cidade"
                className="city"
              />
            </Address>
          </AccordionTab>
          <AccordionTab header={peopleHeader}>
            <PersonContainer>
              {people.map((person) => (
                <Person>
                  <Avatar icon="pi pi-user" shape="circle" />
                  <div>
                    <PersonData>
                      <label>Nome:</label>
                      <li>{person.name.split(" ")[0]}</li>
                    </PersonData>
                    <PersonData>
                      <label>Usuario: </label>
                      <li>{person.user}</li>
                    </PersonData>
                    <PersonData>
                      <label>CPF: </label>
                      <li>{person.cpf}</li>
                    </PersonData>
                    <PersonData>
                      <label>RG: </label>
                      <li>{person.rg}</li>
                    </PersonData>
                    <PersonData>
                      <label>Tel: </label>
                      <li>{person.phone}</li>
                    </PersonData>
                  </div>
                </Person>
              ))}
            </PersonContainer>
          </AccordionTab>
        </Accordion>
      </Dialog>

      <Dialog
        visible={deleteCompanyDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteCompanyDialogFooter}
        onHide={hideDeleteCompanyDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {company && (
            <span>
              Are you sure you want to delete {/* <b>{company.name}</b>? */}
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
