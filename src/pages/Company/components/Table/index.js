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
import { Message } from "primereact/message";

import { useAddress } from "../../../../hooks/useAdrress";
import { SpeedDial } from "primereact/speeddial";
import {
  ActionTamplate,
  InputContainer,
  ViewData,
  Address,
  Icon,
  TextHeader,
  Person,
  PersonData,
  PersonContainer,
  CreateCompany,
  Company,
  StatusChange,
  DeleteCompany,
  ViewCompany,
  EditCompany,
  Text,
  CalendarCreate,
  CalendarEdit,
} from "./styles";
import { useTemplate } from "../../../../hooks/useTemplate";
import { useInputChange } from "../../hooks/useInputChange";
import HeaderTable from "../../../../components/HeaderTable";
import ButtonStatus from "../../../../components/ButtonStatus";
import TableLoading from "../../../../components/TableLoading";
import companyInstance from "../../../../config/axios.config";
import { useAxios } from "../../../../hooks/useAxios";

export default function Table() {
  const {
    data: companies,
    setData: setCompanies,
    loading,
    error,
    fetch,
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
  // const [companies, setCompanies] = useState(data);
  // const [loadingButton, setLoadingButton] = useState(false);

  const { address, setAddress, getAdrres } = useAddress();
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
    fetch({
      axiosInstance: companyInstance, // Sua instância do Axios
      method: "GET",
    });
  }, []);

  const notification = (severity, summary, text) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: text,
      life: 3000,
    });
  };

  const saveCreateCompany = () => {
    setSubmitted(true);
    let _company = company;
    console.log(_company);

    if (_company.cnpj.length === 14 && _company.cnae.length === 7) {
      console.log("foi");

      // createCompany("Company", _company);
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
    // updateCompany("Company", _company);
    // setCompanies(data);
    console.log(_company);
  };

  const deleteCompany = () => {
    companyInstance
      .delete(`${company.id}`)
      .then(() => {
        notification("success", "Concluido", "Empresa foi excluida");
        const _companies = companies.filter((val) => val.id !== company.id);
        setCompanies(_companies);
      })
      .catch(() => {
        notification("error", "Erro", "não foi possivel excluir a empresa");
      })
      .finally(() => {
        setCompany(emptyCompany);
      });

    setDeleteCompanyDialog(false);
  };

  const toggleStatus = () => {
    const updateStatus = () => {
      const index = companies.findIndex((c) => c.id == company.id);
      const _company = { ...company };
      if (_company.status == "Active") {
        _company.status = "Inactive";
      } else {
        _company.status = "Active";
      }
      companies[index] = _company;
      console.log(companies);
    };

    companyInstance
      .put(`ChangeStatus/${company.id}`)
      .then((res) => {
        updateStatus();
        notification("success", "Concluido", "Status Alterado");
      })
      .catch((err) => {
        notification("error", "Erro", "Status não pode ser alterado");
      })
      .finally(() => {
        setCompany(emptyCompany);
      });
    setStatusCompanyDialog(false);
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
    // getPeopleInCompany("Company/FindAllPeopleInCompany", company.id);
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
        label="Cancelar"
        icon="pi pi-times"
        outlined
        onClick={hideCreateDialog}
      />
      <Button
        label="Salvar"
        icon="pi pi-check"
        severity="success"
        onClick={saveCreateCompany}
      />
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
        label="Cancelar"
        icon="pi pi-times"
        autoFocus
        outlined
        onClick={hideDeleteCompanyDialog}
      />
      <Button
        label="Deletar"
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
      {company.status == "Active" ? (
        <Button
          label="Desativar"
          icon="pi pi-check"
          // severity="success"
          severity="danger"
          onClick={toggleStatus}
        />
      ) : (
        <Button
          label="Ativar"
          icon="pi pi-check"
          // severity="success"
          severity="success"
          onClick={toggleStatus}
        />
      )}
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
      <ActionTamplate>
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
      </ActionTamplate>
    );
  };

  const statusChangeHeader = (rowData) => {
    if (rowData.status == "Active") return "inactive";
    return "active";
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        {loading ? (
          <TableLoading />
        ) : (
          <DataTable
            value={companies}
            loading={loading}
            // selection={selectedCompanies}
            onSelectionChange={(e) => setSelectedCompanies(e.value)}
            dataKey="id"
            removableSort
            selectionMode="single"
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
            <Column
              header="Id"
              field="id"
              sortable
              style={{ minWidth: "5rem" }}
            ></Column>
            <Column
              header="Nome Empresa"
              field="companyName"
              // sortable
              style={{ minWidth: "16rem" }}
            ></Column>
            <Column
              header="CNPJ"
              field="cnpj"
              body={cnpjBodyTemplate}
              // sortable
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
        )}
      </div>

      <CreateCompany
        visible={createCompanyDialog}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Criar Empresa"
        modal
        className="p-fluid"
        footer={createCompanyDialogFooter}
        onHide={hideCreateDialog}
      >
        <Company>
          {/* companyName */}
          <InputContainer className="companyName">
            <span className="p-float-label">
              <InputText
                id="companyName"
                value={company.companyName}
                onChange={(e) => onInputChange(e, "companyName")}
                autoFocus
              />
              <label htmlFor="companyName">Nome da Empresa</label>
            </span>
          </InputContainer>

          {/* tradingName */}
          <InputContainer className="tradingName">
            <span className="p-float-label">
              <InputText
                id="tradingName"
                value={company.tradingName}
                onChange={(e) => onInputChange(e, "tradingName")}
              />
              <label htmlFor="tradingName">Nome Fantazia</label>
            </span>
          </InputContainer>

          {/* openingDate */}
          <InputContainer className="openingDate">
            <span className="p-float-label">
              <CalendarCreate
                id="openingDate"
                onChange={(e) => onInputChange(e, "openingDate")}
                value={company.openingDate}
                dateFormat="dd/mm/yy"
                showIcon
              />
              <label htmlFor="openingDate">Data de abertura</label>
            </span>
          </InputContainer>

          {/* cnpj */}
          <InputContainer className="cnpj">
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
          </InputContainer>

          {/* cnae */}
          <InputContainer className="cnae">
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
          </InputContainer>

          {/* legalNature */}
          <InputContainer className="legalNature">
            <span className="p-float-label">
              <InputText
                id="legalNature"
                value={company.legalNature}
                onChange={(e) => onInputChange(e, "legalNature")}
                // autoFocus
              />
              <label htmlFor="legalNature">Naturesa legal</label>
            </span>
          </InputContainer>

          {/* financeCapital */}
          <InputContainer className="financeCapital">
            <span className="p-float-label">
              <InputNumber
                id="financeCapital"
                value={company.financeCapital}
                onValueChange={(e) => onInputNumberChange(e, "financeCapital")}
                mode="currency"
                currency="BRL"
                locale="pt-RS"
              />
              <label htmlFor="financeCapital">Capital Financeiro</label>
            </span>
          </InputContainer>
        </Company>

        <Address>
          <legend>Endereço da Empresa</legend>
          {/* cep */}

          <InputContainer className="cep">
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
          </InputContainer>

          {/* street */}
          <InputContainer className="street">
            <span className="p-float-label">
              <InputText
                id="street"
                value={company.address.street}
                onChange={(e) => onInputAddressChange(e, "street")}
              />

              <label htmlFor="street">Rua</label>
            </span>
          </InputContainer>

          <InputContainer className="number">
            <span className="p-float-label">
              <InputNumber
                id="number"
                value={company.address.number}
                onValueChange={(e) => onInputAddressChange(e, "number")}
              />
              <label htmlFor="number">Numero</label>
            </span>
          </InputContainer>

          {/* bairro */}
          <InputContainer className="bairro">
            <span className="p-float-label">
              <InputText
                id="bairro"
                value={company.address.bairro}
                onChange={(e) => onInputAddressChange(e, "bairro")}
              />
              <label htmlFor="bairro">Bairro</label>
            </span>
          </InputContainer>

          <InputContainer className="city">
            <span className="p-float-label">
              <InputText
                id="city"
                value={company.address.city}
                onChange={(e) => onInputAddressChange(e, "city")}
              />
              <label htmlFor="city">Cidade</label>
            </span>
          </InputContainer>
        </Address>
      </CreateCompany>

      <EditCompany
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
          <InputContainer className="companyName">
            <span className="p-float-label">
              <InputText
                id="companyName"
                value={company.companyName}
                onChange={(e) => onInputChange(e, "companyName")}
                autoFocus
              />
              <label htmlFor="companyName">Nome da Empresa</label>
            </span>
          </InputContainer>

          {/* tradingName */}
          <InputContainer className="tradingName">
            <span className="p-float-label">
              <InputText
                id="tradingName"
                value={company.tradingName}
                onChange={(e) => onInputChange(e, "tradingName")}
              />
              <label htmlFor="tradingName">Nome Fantazia</label>
            </span>
          </InputContainer>

          {/* openingDate */}
          <InputContainer className="openingDate">
            <span className="p-float-label">
              <CalendarEdit
                id="openingDate"
                value={company.openingDate}
                onChange={(e) => onInputChange(e, "openingDate")}
                dateFormat="dd/mm/yy"
                showIcon
              />
              <label htmlFor="openingDate">Data de abertura</label>
            </span>
          </InputContainer>

          {/* legalNature */}
          <InputContainer className="legalNature">
            <span className="p-float-label">
              <InputText
                id="legalNature"
                value={company.legalNature}
                onChange={(e) => onInputChange(e, "legalNature")}
                // autoFocus
              />
              <label htmlFor="legalNature">Naturesa legal</label>
            </span>
          </InputContainer>

          {/* cnae */}
          <InputContainer className="cnae">
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
          </InputContainer>

          {/* financeCapital */}
          <InputContainer className="financeCapitalEdit">
            <span className="p-float-label">
              <InputNumber
                id="financeCapital"
                value={company.financeCapital}
                onValueChange={(e) => onInputNumberChange(e, "financeCapital")}
                mode="currency"
                currency="BRL"
                locale="pt-RS"
              />
              <label htmlFor="financeCapital">Capital Financeiro</label>
            </span>
          </InputContainer>
        </Company>

        <Address>
          <legend>Endereço da Empresa</legend>
          {/* cep */}

          <InputContainer className="cep">
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
          </InputContainer>

          {/* street */}
          <InputContainer className="street">
            <span className="p-float-label">
              <InputText
                id="street"
                value={company.address.street}
                onChange={(e) => onInputAddressChange(e, "street")}
              />

              <label htmlFor="street">Rua</label>
            </span>
          </InputContainer>

          <InputContainer className="number">
            <span className="p-float-label">
              <InputNumber
                id="number"
                value={company.address.number}
                onValueChange={(e) => onInputAddressChange(e, "number")}
              />
              <label htmlFor="number">Numero</label>
            </span>
          </InputContainer>

          {/* bairro */}
          <InputContainer className="bairro">
            <span className="p-float-label">
              <InputText
                id="bairro"
                value={company.address.bairro}
                onChange={(e) => onInputAddressChange(e, "bairro")}
              />
              <label htmlFor="bairro">Bairro</label>
            </span>
          </InputContainer>

          <InputContainer className="city">
            <span className="p-float-label">
              <InputText
                id="city"
                value={company.address.city}
                onChange={(e) => onInputAddressChange(e, "city")}
              />
              <label htmlFor="city">Cidade</label>
            </span>
          </InputContainer>
        </Address>
      </EditCompany>

      {/* <ViewCompany
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
      </ViewCompany> */}

      <DeleteCompany
        visible={deleteCompanyDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Deletar"
        modal
        footer={deleteCompanyDialogFooter}
        onHide={hideDeleteCompanyDialog}
      >
        <Text>
          <i
            className="pi pi-exclamation-triangle"
            style={{
              fontSize: "2rem",
              margin: ".5rem",
              verticalAlign: "middle",
            }}
          />
          <span>Tem certeza que deseja deletar essa empresa</span>
        </Text>

        {/* <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {company && (
            <span>
              Are you sure you want to delete
            </span>
          )}
        </div> */}
      </DeleteCompany>

      <StatusChange
        headerStyle={statusChangeHeader(company)}
        visible={statusCompanyDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirmar mudança de status da Empresa"
        modal
        footer={statusChangeDialogFooter}
        onHide={hideStatusCompanyDialog}
      >
        <Text>
          <i
            className="pi pi-info-circle"
            style={{
              fontSize: "2rem",
              margin: ".5rem",
              verticalAlign: "middle",
            }}
          />
          {company.status == "Active" ? (
            <span>
              Desativar Empresa <b>{company.id}</b>
            </span>
          ) : (
            <span>
              Ativar Empresa <b>{company.id}</b>
            </span>
          )}
        </Text>
      </StatusChange>
    </div>
  );
}
