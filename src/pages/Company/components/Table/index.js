import React, { useState, useEffect, useRef, useContext } from "react";
import { SplitButton } from "primereact/splitbutton";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { TabView, TabPanel } from "primereact/tabview";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { useAxios } from "../../../../hooks/useAxios";
import { CompanyContext } from "../../context/CompanyContext";
import { Avatar } from "primereact/avatar";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Skeleton } from "primereact/skeleton";
import TextData from "../../../../components/TextData";

import { classNames } from "primereact/utils";

// import { Dialog } from "primereact/dialog";
// import React, { useState, useRef, useEffect } from "react";
// import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
// import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
// import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import "primeicons/primeicons.css";
// import { useAxios } from "../../../../hooks/useAxios";
// import { useContext } from "react";
// import { CompanyContext } from "../../context/CompanyContext";
import { Message } from "primereact/message";
// import { Toast } from "primereact/toast";

import { useAddress } from "../../../../hooks/useAdrress";
import { SpeedDial } from "primereact/speeddial";
import {
  Container,
  ViewData,
  Address,
  Icon,
  TextHeader,
  Person,
  PersonData,
  PersonContainer,
  CreateCompany,
  Bairro,
  CNAE,
  CNPJ,
  Cep,
  City,
  Data,
  Div,
  Finance,
  Name,
  Nature,
  Number,
  Street,
  Company,
  StatusChange,
  DeleteCompany,
  ViewCompany,
  EditCompany,
} from "./styles";
import { useTemplate } from "../../../../hooks/useTemplate";
import { useInputChange } from "../../hooks/useInputChange";
import HeaderTable from "../../../../components/HeaderTable";
import ButtonStatus from "../../../../components/ButtonStatus";

export default function Table() {
  const {
    data,
    getData,
    delById,
    createCompany,
    updateCompany,
    getPeopleInCompany,
    changeStatus,
    people,
  } = useAxios();

  const {
    cnpjBodyTemplate,
    dateBodyTemplate,
    priceBodyTemplate,
    statusBodyTemplate,
  } = useTemplate();
  const {
    onInputChange,
    onInputNumberChange,
    onInputAddressChange,
    onChangeCep,
    cep,
    existCep,
  } = useInputChange();

  const { emptyCompany, company, setCompany } = useContext(CompanyContext);
  const { address, setAddress, getAdrres } = useAddress();

  const [companies, setCompanies] = useState([]);
  const [createCompanyDialog, setCreateCompanyDialog] = useState(false);
  const [editCompanyDialog, setEditCompanyDialog] = useState(false);
  const [viewCompanyComplete, setViewCompanyComplete] = useState(false);
  const [deleteCompanyDialog, setDeleteCompanyDialog] = useState(false);
  const [statusCompanyDialog, setStatusCompanyDialog] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  // const { address, getAdrres } = useAddress();
  const toast = useRef(null);
  const dt = useRef(null);

  //-----CRUD------
  useEffect(() => {
    getData("Company");
  }, [data]);

  const saveCreateCompany = () => {
    setSubmitted(true);
    let _company = company;
    console.log(_company);

    if (_company.cnpj.length === 14 && _company.cnae.length === 7) {
      console.log("foi");

      createCompany("Company", _company);
      toast.current.show({
        severity: "success",
        summary: "Concluido",
        detail: "Empresa Criada",
        life: 3000,
      });

      hideCreateDialog();
    } else {
      toast.current.show({
        severity: "error",
        summary: "Erro",
        detail: "Empresa nao foi Criada",
        life: 3000,
      });
    }
  };

  const saveEditCompany = () => {
    let _company = { ...company };
    delete _company.cnpj;
    delete _company.status;
    updateCompany("Company", _company);
    setCompanies(data);
    console.log(_company);
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

  const toggleStatus = () => {
    changeStatus("Company/ChangeStatus", company.id);
    getData("Company");
    setCompanies(data);
    setStatusCompanyDialog(false);
    setCompany(emptyCompany);

    toast.current.show({
      severity: "success",
      summary: "Concluido",
      detail: "Status Alterado",
      life: 3000,
    });
  };

  //----Open_Dialog-------
  const openCreateCompany = () => {
    setCompany(emptyCompany);
    setSubmitted(false);
    setCreateCompanyDialog(true);
  };

  const openSaveEditCompany = (company) => {
    const date = new Date(company.openingDate);
    let _company = company;

    _company.openingDate = date;
    console.log(company);
    setCompany(_company);
    setSubmitted(false);
    setEditCompanyDialog(true);
  };

  const openConfirmDeleteCompany = (company) => {
    setCompany(company);
    setDeleteCompanyDialog(true);
  };

  const openStatusChangeCompany = (company) => {
    setCompany(company);
    setStatusCompanyDialog(true);
  };

  const openViewCompanyComplete = (company) => {
    setCompany(company);
    getPeopleInCompany("Company/FindAllPeopleInCompany", company.id);
    setViewCompanyComplete(true);
  };

  //-----Hide_Dialog------

  const hideCreateDialog = () => {
    setSubmitted(false);
    setCreateCompanyDialog(false);
  };

  const hideEditDialog = () => {
    setSubmitted(false);
    setCompany(emptyCompany);
    setAddress(null);
    setEditCompanyDialog(false);
  };

  const hideDeleteCompanyDialog = () => {
    setDeleteCompanyDialog(false);
  };

  const hideStatusCompanyDialog = () => {
    setStatusCompanyDialog(false);
  };

  const hideViewCompanyComplete = () => {
    setViewCompanyComplete(false);
  };

  //-----Footer_Dialog------

  const createCompanyDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        outlined
        onClick={hideCreateDialog}
      />
      <Button label="Save" icon="pi pi-check" onClick={saveCreateCompany} />
    </React.Fragment>
  );

  const editCompanyDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        outlined
        onClick={hideEditDialog}
      />
      <Button label="Save" icon="pi pi-check" onClick={saveEditCompany} />
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

  const statusChangeDialogFooter = (
    <React.Fragment>
      <Button
        label="Não"
        icon="pi pi-times"
        outlined
        onClick={hideStatusCompanyDialog}
        autoFocus
      />
      <Button
        label="Sim"
        icon="pi pi-check"
        severity="success"
        onClick={toggleStatus}
      />
    </React.Fragment>
  );

  const ViewCompanyDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        outlined
        onClick={hideViewCompanyComplete}
      />
    </React.Fragment>
  );

  //------Headers_Views--------

  const companyHeader = (
    <div className="flex align-items-center">
      <Icon className="pi pi-building"></Icon>
      <TextHeader>Empresa</TextHeader>
    </div>
  );

  const addressHeader = (
    <div className="flex align-items-center">
      <Icon className="pi pi-map-marker mr-2"></Icon>
      <TextHeader>Endereço</TextHeader>
    </div>
  );

  const peopleHeader = (
    <div className="flex align-items-center">
      <Icon className="pi pi-users mr-2"></Icon>
      <TextHeader>Funcionarios</TextHeader>
    </div>
  );

  //-----Action_Template------

  const actionBodyTemplate = (rowData) => {
    const statusSeverity = (data) => {
      if (data.status == "Active") {
        return "danger";
      }
      if (data.status == "Pending") {
        return "secondary";
      }
      return "success";
    };

    const statusIcon = (data) => {
      if (data.status == "Active") {
        return "thumbs-down";
      }
      return "thumbs-up";
    };

    const statusDisabled = (data) => {
      if (data.status == "Pending") {
        return true;
      }
      return false;
    };

    const statusTooltip = (data) => {
      if (data.status == "Active") {
        return "Desativa Empresa";
      }
      if (data.status == "pending") {
        return "pendente";
      }

      return "Ativa Empresa";
    };

    const configTooltip = {
      position: "top",
      // mouseTrack: true,
      // mouseTrackTop: 15,
      showDelay: 800,
    };

    return (
      <Container>
        <Button
          rounded
          icon={`pi pi-${statusIcon(rowData)}`}
          disabled={statusDisabled(rowData)}
          severity={statusSeverity(rowData)}
          onClick={() => openStatusChangeCompany(rowData)}
          tooltip={statusTooltip(rowData)}
          tooltipOptions={configTooltip}
        />

        <Button
          icon="pi pi-search"
          rounded
          // outlined
          // severity="warning"
          onClick={() => openViewCompanyComplete(rowData)}
          tooltip="View"
          tooltipOptions={configTooltip}
        />

        <Button
          icon="pi pi-pencil"
          rounded
          // outlined
          className="mr-2"
          severity="warning"
          onClick={() => openSaveEditCompany(rowData)}
          tooltip="Editar"
          tooltipOptions={configTooltip}
        />
        <Button
          icon="pi pi-trash"
          rounded
          // outlined
          severity="danger"
          onClick={() => openConfirmDeleteCompany(rowData)}
          tooltip="Deletar"
          tooltipOptions={configTooltip}
        />
      </Container>
    );
  };

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
          header={
            <HeaderTable
              name="Empresas"
              filter={(e) => setGlobalFilter(e.target.value)}
              open={openCreateCompany}
            />
          }
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

          <Column
            header="Status"
            field="status"
            body={statusBodyTemplate}
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "9rem" }}
          ></Column>
        </DataTable>
      </div>

      <CreateCompany>
        <Dialog
          visible={createCompanyDialog}
          style={{ width: "40rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Create Company"
          modal
          className="p-fluid"
          footer={createCompanyDialogFooter}
          onHide={hideCreateDialog}
        >
          <Company>
            {/* companyName */}
            <Name className="company">
              <span className="p-float-label">
                <InputText
                  id="companyName"
                  value={company.companyName}
                  onChange={(e) => onInputChange(e, "companyName")}
                  autoFocus
                />
                <label htmlFor="companyName">Nome da Empresa</label>
              </span>
            </Name>

            {/* tradingName */}
            <Name className="trading">
              <span className="p-float-label">
                <InputText
                  id="tradingName"
                  value={company.tradingName}
                  onChange={(e) => onInputChange(e, "tradingName")}
                />
                <label htmlFor="tradingName">Nome Fantazia</label>
              </span>
            </Name>

            {/* openingDate */}
            <Data className="field">
              <span className="p-float-label">
                <Calendar
                  id="openingDate"
                  onChange={(e) => onInputChange(e, "openingDate")}
                  value={company.openingDate}
                  dateFormat="dd/mm/yy"
                  showIcon
                />
                <label htmlFor="openingDate">Data de abertura</label>
              </span>
            </Data>

            {/* cnpj */}
            <CNPJ>
              <span className="p-float-label">
                <InputMask
                  id="cnpj"
                  mask="99.999.999/9999-99"
                  unmask={true}
                  value={company.cnpj}
                  onChange={(e) => onInputChange(e, "cnpj")}
                  required
                  // autoClear={false}
                  className={classNames({
                    "p-invalid":
                      (submitted && !company.cnpj) ||
                      (submitted && company.cnpj.length < 14),
                  })}
                />
                <label htmlFor="cnpj">CNPJ</label>
              </span>
              {submitted && !company.cnpj && (
                <Message
                  style={{
                    background: "none",
                    justifyContent: "start",
                    padding: "5px",
                  }}
                  severity="error"
                  text="CNPJ é obrigatorio"
                />
              )}
              {submitted && company.cnpj.length < 14 && (
                <Message
                  style={{
                    background: "none",
                    justifyContent: "start",
                    padding: "5px",
                  }}
                  severity="error"
                  text="CNPJ tem 14 numeros."
                />
              )}
            </CNPJ>

            {/* cnae */}
            <CNAE className="field">
              <span className="p-float-label">
                <InputMask
                  id="cnae"
                  mask="9999999"
                  onChange={(e) => onInputChange(e, "cnae")}
                  value={company.cnae}
                  required
                  className={classNames({
                    "p-invalid":
                      submitted &&
                      !company.cnae &&
                      (submitted && company.cnae.length) < 7,
                  })}
                />
                <label htmlFor="cnae">CNAE</label>
              </span>
              {submitted && !company.cnae && (
                <Message
                  style={{
                    background: "none",
                    justifyContent: "start",
                    padding: "5px",
                  }}
                  severity="error"
                  text="CNAE é obrigatório."
                />
              )}
              {submitted && company.cnae.length < 7 && (
                <Message
                  style={{
                    background: "none",
                    justifyContent: "start",
                    padding: "5px",
                  }}
                  severity="error"
                  text="Minimo de 7 caracteres."
                />
              )}
            </CNAE>

            {/* legalNature */}
            <Nature className="field">
              <span className="p-float-label">
                <InputText
                  id="legalNature"
                  value={company.legalNature}
                  onChange={(e) => onInputChange(e, "legalNature")}
                  // autoFocus
                />
                <label htmlFor="legalNature">Naturesa legal</label>
              </span>
            </Nature>

            {/* financeCapital */}
            <Finance className="field col">
              <span className="p-float-label">
                <InputNumber
                  id="financeCapital"
                  value={company.financeCapital}
                  onValueChange={(e) =>
                    onInputNumberChange(e, "financeCapital")
                  }
                  mode="currency"
                  currency="BRL"
                  locale="pt-RS"
                />
                <label htmlFor="financeCapital">Capital Financeiro</label>
              </span>
            </Finance>
          </Company>

          <Address>
            <legend>Endereço da Empresa</legend>
            {/* cep */}

            <Cep className="field">
              <span className="p-float-label">
                <InputMask
                  id="companyName"
                  required
                  mask="99999-999"
                  unmask={true}
                  autoClear={false}
                  onChange={(e) => onChangeCep(e)}
                />
                <label htmlFor="cep">CEP</label>
              </span>
              {submitted && !company.address.cep && (
                <Message
                  style={{
                    background: "none",
                    justifyContent: "start",
                    padding: "5px",
                  }}
                  severity="error"
                  text="CEP é obrigatório."
                />
              )}
              {submitted && company.address.cep < 7 && (
                <Message
                  style={{
                    background: "none",
                    justifyContent: "start",
                    padding: "5px",
                  }}
                  severity="error"
                  text="Minimo de 7 caracteres."
                />
              )}
              {existCep == false && (
                <Message
                  style={{
                    background: "none",
                    justifyContent: "start",
                    padding: "5px",
                  }}
                  severity="error"
                  text="cep não encontrado "
                />
              )}
            </Cep>

            {/* street */}
            <Street className="field">
              <span className="p-float-label">
                <InputText
                  id="street"
                  value={company.address.street}
                  onChange={(e) => onInputAddressChange(e, "street")}
                />

                <label htmlFor="street">Rua</label>
              </span>
            </Street>

            <Number className="field col">
              <span className="p-float-label">
                <InputNumber
                  id="number"
                  value={company.address.number}
                  onValueChange={(e) => onInputAddressChange(e, "number")}
                />
                <label htmlFor="number">Numero</label>
              </span>
            </Number>

            {/* bairro */}
            <Bairro className="field">
              <span className="p-float-label">
                <InputText
                  id="bairro"
                  value={company.address.bairro}
                  onChange={(e) => onInputAddressChange(e, "bairro")}
                />
                <label htmlFor="bairro">Bairro</label>
              </span>
            </Bairro>

            <City className="field">
              <span className="p-float-label">
                <InputText
                  id="city"
                  value={company.address.city}
                  onChange={(e) => onInputAddressChange(e, "city")}
                />
                <label htmlFor="city">Cidade</label>
              </span>
            </City>
          </Address>
        </Dialog>
      </CreateCompany>

      <EditCompany>
        <Dialog
          visible={editCompanyDialog}
          style={{ width: "40rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header={`Edite Empresa ${company.id}`}
          modal
          className="p-fluid"
          footer={editCompanyDialogFooter}
          onHide={hideEditDialog}
        >
          <Company>
            {/* companyName */}
            <Name className="company">
              <span className="p-float-label">
                <InputText
                  id="companyName"
                  value={company.companyName}
                  onChange={(e) => onInputChange(e, "companyName")}
                  autoFocus
                />
                <label htmlFor="companyName">Nome da Empresa</label>
              </span>
            </Name>

            {/* tradingName */}
            <Name className="trading">
              <span className="p-float-label">
                <InputText
                  id="tradingName"
                  value={company.tradingName}
                  onChange={(e) => onInputChange(e, "tradingName")}
                />
                <label htmlFor="tradingName">Nome Fantazia</label>
              </span>
            </Name>

            {/* openingDate */}
            <Data className="field">
              <span className="p-float-label">
                <Calendar
                  id="openingDate"
                  value={company.openingDate}
                  onChange={(e) => onInputChange(e, "openingDate")}
                  dateFormat="dd/mm/yy"
                  showIcon
                />
                <label htmlFor="openingDate">Data de abertura</label>
              </span>
            </Data>

            {/* cnae */}
            <CNAE className="field">
              <span className="p-float-label">
                <InputMask
                  id="cnae"
                  mask="9999999"
                  onChange={(e) => onInputChange(e, "cnae")}
                  value={company.cnae}
                  required
                  className={classNames({
                    "p-invalid":
                      submitted &&
                      !company.cnae &&
                      (submitted && company.cnae.length) < 7,
                  })}
                />
                <label htmlFor="cnae">CNAE</label>
              </span>
              {submitted && !company.cnae && (
                <Message
                  style={{
                    background: "none",
                    justifyContent: "start",
                    padding: "5px",
                  }}
                  severity="error"
                  text="CNAE é obrigatório."
                />
              )}
              {submitted && company.cnae.length < 7 && (
                <Message
                  style={{
                    background: "none",
                    justifyContent: "start",
                    padding: "5px",
                  }}
                  severity="error"
                  text="Minimo de 7 caracteres."
                />
              )}
            </CNAE>

            {/* legalNature */}
            <Nature className="field">
              <span className="p-float-label">
                <InputText
                  id="legalNature"
                  value={company.legalNature}
                  onChange={(e) => onInputChange(e, "legalNature")}
                  // autoFocus
                />
                <label htmlFor="legalNature">Naturesa legal</label>
              </span>
            </Nature>

            {/* financeCapital */}
            <Finance className="field col">
              <span className="p-float-label">
                <InputNumber
                  id="financeCapital"
                  value={company.financeCapital}
                  onValueChange={(e) =>
                    onInputNumberChange(e, "financeCapital")
                  }
                  mode="currency"
                  currency="BRL"
                  locale="pt-RS"
                />
                <label htmlFor="financeCapital">Capital Financeiro</label>
              </span>
            </Finance>
          </Company>

          <Address>
            <legend>Endereço da Empresa</legend>
            {/* cep */}

            <Cep className="field">
              <span className="p-float-label">
                <InputMask
                  id="companyName"
                  required
                  mask="99999-999"
                  unmask={true}
                  autoClear={false}
                  value={company.address.cep}
                  onChange={(e) => onInputAddressChange(e)}
                />
                <label htmlFor="cep">CEP</label>
              </span>
              {submitted && !company.address.cep && (
                <Message
                  style={{
                    background: "none",
                    justifyContent: "start",
                    padding: "5px",
                  }}
                  severity="error"
                  text="CEP é obrigatório."
                />
              )}
              {submitted && company.address.cep < 7 && (
                <Message
                  style={{
                    background: "none",
                    justifyContent: "start",
                    padding: "5px",
                  }}
                  severity="error"
                  text="Minimo de 7 caracteres."
                />
              )}
              {existCep == false && (
                <Message
                  style={{
                    background: "none",
                    justifyContent: "start",
                    padding: "5px",
                  }}
                  severity="error"
                  text="cep não encontrado "
                />
              )}
            </Cep>

            {/* street */}
            <Street className="field">
              <span className="p-float-label">
                <InputText
                  id="street"
                  value={company.address.street}
                  onChange={(e) => onInputAddressChange(e, "street")}
                />

                <label htmlFor="street">Rua</label>
              </span>
            </Street>

            <Number className="field col">
              <span className="p-float-label">
                <InputNumber
                  id="number"
                  value={company.address.number}
                  onValueChange={(e) => onInputAddressChange(e, "number")}
                />
                <label htmlFor="number">Numero</label>
              </span>
            </Number>

            {/* bairro */}
            <Bairro className="field">
              <span className="p-float-label">
                <InputText
                  id="bairro"
                  value={company.address.bairro}
                  onChange={(e) => onInputAddressChange(e, "bairro")}
                />
                <label htmlFor="bairro">Bairro</label>
              </span>
            </Bairro>

            <City className="field">
              <span className="p-float-label">
                <InputText
                  id="city"
                  value={company.address.city}
                  onChange={(e) => onInputAddressChange(e, "city")}
                />
                <label htmlFor="city">Cidade</label>
              </span>
            </City>
          </Address>
        </Dialog>
      </EditCompany>

      <ViewCompany>
        <Dialog
          visible={viewCompanyComplete}
          style={{ width: "35rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header={`Informações da empresa ${company.id}`}
          modal
          className="p-fluid"
          footer={ViewCompanyDialogFooter}
          onHide={hideViewCompanyComplete}
        >
          <TabView>
            <TabPanel header={companyHeader}>
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
                  data={cnpjBodyTemplate(company)}
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
                  data={dateBodyTemplate(company)}
                  name="Data de Abertura"
                  className="openingDate"
                />
                <TextData
                  data={priceBodyTemplate(company)}
                  name="Capital Financeiro"
                  className="financeCapital"
                />
              </ViewData>
            </TabPanel>

            <TabPanel header={addressHeader}>
              <Address>
                <TextData
                  data={company.address.cep}
                  name="CEP"
                  className="cep"
                />
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
            </TabPanel>
            <TabPanel header={peopleHeader}>
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
            </TabPanel>
          </TabView>
        </Dialog>
      </ViewCompany>

      <DeleteCompany>
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
      </DeleteCompany>

      <StatusChange>
        <Dialog
          visible={statusCompanyDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirmar mudança de status"
          modal
          footer={statusChangeDialogFooter}
          onHide={hideStatusCompanyDialog}
        >
          <div className="confirmation-content">
            {/* <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            /> */}
            {company && (
              <span>
                Alterar Status Da Empresa <b>{company.name}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </StatusChange>
    </div>
  );
}
