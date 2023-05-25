import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import "primeicons/primeicons.css";
import { useAxios } from "../../../../hooks/useAxios";
import CreateDialog from "../CreateDialog";
import { useContext } from "react";
import { CompanyContext } from "../../context/CompanyContext";
import Company from "../..";
import { Container } from "./styles";

export default function Table() {
  let emptyCompany = {
    id: null,
    cnpj: "",
    status: "",
    openingDate: null,
    companyName: "",
    tradingName: "",
    cnae: "",
    legalNature: "",
    financeCapital: null,
    address: {
      cep: "",
      street: "",
      bairro: "",
      number: null,
      city: "",
    },
  };

  const { data } = useAxios("Company");
  const { companyDialog, setCompanyDialog } = useContext(CompanyContext);
  const [company, setCompany] = useState(emptyCompany);
  const [companies, setCompanies] = useState(data);
  const [deleteCompanyDialog, setDeleteCompanyDialog] = useState(false);
  const [deleteCompaniesDialog, setDeleteCompaniesDialog] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const formatCurrency = (value) => {
    // const val = toString(value);
    return value.toLocaleString("pt-RS", {
      style: "currency",
      currency: "BRL",
    });
  };

  const openNew = () => {
    setCompany(emptyCompany);
    setSubmitted(false);
    setCompanyDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setCompanyDialog(false);
  };

  const hideDeleteCompanyDialog = () => {
    setDeleteCompanyDialog(false);
  };

  const hideDeleteCompaniesDialog = () => {
    setDeleteCompaniesDialog(false);
  };

  const saveCompany = () => {
    setSubmitted(true);

    if (company.name.trim()) {
      let _companies = [...companies];
      let _company = { ...company };

      if (company.id) {
        const index = findIndexById(company.id);

        _companies[index] = _company;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _company.id = createId();
        _companies.push(company);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      setCompanies(_companies);
      setCompanyDialog(false);
      setCompany(emptyCompany);
    }
  };

  const editCompany = (company) => {
    setCompany({ ...company });
    setCompanyDialog(true);
  };

  const confirmDeleteCompany = (company) => {
    setCompany(company);
    setDeleteCompanyDialog(true);
  };

  const deleteCompany = () => {
    let _companies = companies.filter((val) => val.id !== company.id);

    setCompanies(_companies);
    setDeleteCompanyDialog(false);
    setCompany(emptyCompany);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  // const findIndexById = (id) => {
  //     let index = -1;

  //     for (let i = 0; i < products.length; i++) {
  //         if (products[i].id === id) {
  //             index = i;
  //             break;
  //         }
  //     }

  //     return index;
  // };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < companies.length; i++) {
      if (company[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const formatCnpj = (cnpj) => {
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  };

  const formatDate = (date) => {
    return date.split("T")[0].split("-").reverse().join("/");
  };

  const confirmDeleteSelected = () => {
    setDeleteCompaniesDialog(true);
  };

  const deleteSelectedCompanies = () => {
    let _companies = companies.filter(
      (val) => !selectedCompanies.includes(val)
    );

    setCompanies(_companies);
    setDeleteCompaniesDialog(false);
    setSelectedCompanies(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onCategoryChange = (e) => {
    let _company = { ...company };

    _company["category"] = e.value;
    setCompany(_company);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _company = { ...company };

    _company[`${name}`] = val;

    setCompany(_company);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _company = { ...company };

    _company[`${name}`] = val;

    setCompany(_company);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        {/* <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        /> */}
        {/* <Button
                    label="Delete"
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={confirmDeleteSelected}
                    disabled={!selectedProducts || !selectedProducts.length}
                /> */}
      </div>
    );
  };

  // const rightToolbarTemplate = () => {
  //   return (
  //     <Button
  //       label="Export"
  //       icon="pi pi-upload"
  //       className="p-button-help"
  //       onClick={exportCSV}
  //     />
  //   );
  // };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.financeCapital);
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.openingDate);
  };

  const cnpjBodyTemplate = (rowData) => {
    return formatCnpj(rowData.cnpj);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
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
          // onClick={() => expandCompanyInfo(rowData)}
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
      <h4 className="m-0">Empresas</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>

      <Button
        label="New"
        icon="pi pi-plus"
        severity="success"
        onClick={openNew}
      />
    </Container>
  );
  const companyDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveCompany} />
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
  const deleteCompaniesDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteCompaniesDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedCompanies}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        {/* <Toolbar
          className="mb-4"
          // left={leftToolbarTemplate}
          // right={rightToolbarTemplate}
        ></Toolbar> */}

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

      {/* <Dialog
                visible={deleteProductsDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={deleteProductsDialogFooter}
                onHide={hideDeleteProductsDialog}
            >
                <div className="confirmation-content">
                    <i
                        className="pi pi-exclamation-triangle mr-3"
                        style={{ fontSize: "2rem" }}
                    />
                    {product && (
                        <span>
                            Are you sure you want to delete the selected
                            products?
                        </span>
                    )}
                </div>
            </Dialog> */}
    </div>
  );
}
