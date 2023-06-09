import React, { useState, useEffect, useRef, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { classNames } from "primereact/utils";
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from "primereact/inputmask";
import { Message } from "primereact/message";
import { addLocale } from "primereact/api";

import { companyInstance } from "~/config/axios.config";
import { ptBr } from "~/config/ptConfig";

import { CompanyContext } from "~/pages/Company/context/CompanyContext";
import { useInputChange } from "~/pages/Company/hooks/useInputChange";

import TextData from "~/components/TextData";
import HeaderTable from "~/components/HeaderTable";
import TableLoading from "~/components/TableLoading";

import { useTemplate } from "~/hooks/useTemplate";
import { useFormat } from "~/hooks/useFormat";

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
  AddressView,
  BoxTable,
} from "./styles";

export default function TableCompany() {
  const { formatEmptyData } = useFormat();
  const {
    cnpjBodyTemplate,
    dateBodyTemplate,
    priceBodyTemplate,
    statusBodyTemplate,
    companyNameBodyTemplate,
  } = useTemplate();

  const {
    onInputChange,
    onInputNumberChange,
    onInputAddressChange,
    onChangeCep,
    existCep,
  } = useInputChange();

  const navigate = useNavigate();

  const [createCompanyDialog, setCreateCompanyDialog] = useState(false);
  const [editCompanyDialog, setEditCompanyDialog] = useState(false);
  const [viewCompanyComplete, setViewCompanyComplete] = useState(false);
  const [deleteCompanyDialog, setDeleteCompanyDialog] = useState(false);
  const [statusCompanyDialog, setStatusCompanyDialog] = useState(false);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const [people, setPeople] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const { emptyCompany, company, setCompany } = useContext(CompanyContext);
  const toast = useRef(null);

  addLocale("pt", ptBr);

  //-----CRUD------
  useEffect(() => {
    setLoading(true);
    companyInstance
      .get()
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((error) => {
        setErr(true);
      })
      .finally(() => {
        setLoading(false);
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
    let _company = { ...company };
    let _address = { ...company.address };
    let _companies = [...companies];

    Object.keys(_company).forEach((companyItem, i) => {
      if (companyItem !== "address") {
        if (_company[companyItem] === "") {
          _company[companyItem] = null;
        }
      } else {
        Object.keys(_address).forEach((addressItem) => {
          if (_address[addressItem] === "") {
            _address[addressItem] = null;
            _company.address = { ..._address };
          }
        });
      }
      _company = { ..._company };
    });

    const updateTable = (cnpj) => {
      companyInstance.get(`FindByCNPJ/${cnpj}`).then((res) => {
        _companies.push({ ...res.data });
        setCompanies(_companies);
      });
    };

    if (
      _company.cnpj?.length === 14 &&
      _company.openingDate &&
      _company.cnae?.length === 7 &&
      _address.cep?.length === 8 &&
      _address.number &&
      _address.street &&
      _address.bairro &&
      _address.number &&
      _address.city
    ) {
      companyInstance
        .post("", _company)
        .then((res) => {
          updateTable(res.data.cnpj);
          notification("success", "Concluido", "Empresa criada");
          hideCreateDialog();
        })
        .catch((err) => {
          notification("error", "Erro", err.response.data.split(":")[1]);
        })
        .finally(() => {
          setCompany(emptyCompany);
        });
    } else {
      notification("error", "Erro", "Não foi possivel criar a empresa");
    }
  };

  const saveEditCompany = () => {
    setSubmitted(true);
    let _companies = [...companies];
    let _company = { ...company };
    let _address = { ...company.address };
    const cnpj = _company.cnpj;
    // const status = _company.status;

    delete _company.cnpj;
    delete _company.status;

    const updateEdit = () => {
      const index = companies.findIndex((c) => c.id === company.id);

      companyInstance.get(`FindByCNPJ/${cnpj}`).then((res) => {
        _companies[index] = { ...res.data };
        // notification("success", "Concluido", "A empresa foi editada");
        setCompanies(_companies);
      });
    };

    Object.keys(_company).forEach((companyItem) => {
      if (companyItem !== "address") {
        if (_company[companyItem] === "") {
          _company[companyItem] = null;
        }
      } else {
        Object.keys(_address).forEach((addressItem) => {
          if (_address[addressItem] === "") {
            _address[addressItem] = null;
            _company.address = { ..._address };
          }
        });
      }
      _company = { ..._company };
    });

    if (
      _company.companyName &&
      _company.tradingName &&
      _company.legalNature &&
      _company.financeCapital &&
      _company.openingDate &&
      _company.cnae?.length === 7 &&
      _address.cep?.length === 8 &&
      _address.street &&
      _address.bairro &&
      _address.number &&
      _address.city
    ) {
      companyInstance
        .put("", _company)
        .then((res) => {
          updateEdit();
          notification("success", "Concluido", "A empresa foi editada");
          hideEditDialog();
        })
        .catch((err) => {
          notification("error", "Erro", err.response.data.split(":")[1]);
        })
        .finally(() => {
          setCompany(emptyCompany);
        });
    } else {
      notification("error", "Erro", "Não foi possivel editar a empresa");
    }
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
      const index = companies.findIndex((c) => c.id === company.id);
      let _company = { ...company };
      if (_company.status === "Active") {
        _company.status = "Inactive";
      } else {
        _company.status = "Active";
      }
      companies[index] = _company;
    };

    const updateCompanies = () => {
      let _companies = [...companies];
      let _company = { ...company };
      if (_company.status === "Active") {
        _company.status = "Inactive";
      } else {
        _company.status = "Active";
      }
      const index = companies.findIndex((c) => c.id === company.id);
      _company.peoples = [];
      _companies[index] = _company;
      setCompanies(_companies);
    };

    companyInstance
      .put(`ChangeStatus/${company.id}`)
      .then((res) => {
        updateStatus();
        notification("success", "Concluido", "Status Alterado");
      })
      .then((res) => {
        if (company.peoples?.length > 0) {
          notification(
            "info",
            "Atençao",
            "pessoa(as) foram retiradas da empresa"
          );
          updateCompanies();
        }
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
    let _company = { ...company };

    _company.openingDate = date;
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
    companyInstance
      .get(`FindAllPeopleInCompany/${company.id}`)
      .then((res) => {
        setPeople(res.data.peoples);
      })
      .catch()
      .finally();

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
      <Button
        label="Save"
        icon="pi pi-check"
        onClick={saveEditCompany}
        severity="warning"
      />
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
      {company.status === "Active" ? (
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
        label="Fechar"
        icon="pi pi-times"
        outlined
        autoFocus
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
      if (data.status === "Active") {
        return "danger";
      }
      if (data.status === "Pending") {
        return "secondary";
      }
      return "success";
    };

    const statusIcon = (data) => {
      if (data.status === "Active") {
        return "thumbs-down";
      }
      return "thumbs-up";
    };

    const statusDisabled = (data) => {
      if (data.status === "Pending") {
        return true;
      }
      return false;
    };

    const statusTooltip = (data) => {
      if (data.status === "Active") {
        return "Desativa Empresa";
      }
      if (data.status === "pending") {
        return "pendente";
      }

      return "Ativa Empresa";
    };

    const configTooltip = {
      position: "top",
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
          onClick={() => openViewCompanyComplete(rowData)}
          tooltip="View"
          tooltipOptions={configTooltip}
        />

        <Button
          icon="pi pi-pencil"
          rounded
          className="mr-2"
          severity="warning"
          onClick={() => openSaveEditCompany(rowData)}
          tooltip="Editar"
          tooltipOptions={configTooltip}
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => openConfirmDeleteCompany(rowData)}
          tooltip="Deletar"
          disabled={rowData.peoples?.length > 0}
          tooltipOptions={configTooltip}
        />
      </ActionTamplate>
    );
  };

  const statusChangeHeader = (rowData) => {
    if (rowData.status === "Active") return "inactive";
    return "active";
  };

  const emptyData = () => {
    return (
      <Message
        style={{
          // background: "none",
          justifyContent: "center ",
          padding: "5px",
        }}
        severity="info"
        text="Tabela Vazia"
      />
    );
  };

  return (
    <div>
      {err && navigate("/erro")}
      <Toast ref={toast} />
      <BoxTable className="card">
        {loading ? (
          <TableLoading header="Empresas" />
        ) : (
          <DataTable
            value={companies}
            dataKey="id"
            selectionMode="single"
            paginator
            scrollable
            scrollHeight="flex"
            sortField="id"
            sortOrder={-1}
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Numero de linhas:"
            globalFilter={globalFilter}
            emptyMessage={emptyData}
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
              body={companyNameBodyTemplate}
              style={{ minWidth: "16rem" }}
            ></Column>
            <Column
              header="CNPJ"
              field="cnpj"
              body={cnpjBodyTemplate}
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
              style={{ minWidth: "5rem" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "9rem" }}
            ></Column>
          </DataTable>
        )}
      </BoxTable>

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
                value={company.companyName || ""}
                onChange={(e) => onInputChange(e, "companyName")}
                autoFocus
                maxLength={100}
              />
              <label htmlFor="companyName">Nome da Empresa</label>
            </span>
          </InputContainer>

          {/* tradingName */}
          <InputContainer className="tradingName">
            <span className="p-float-label">
              <InputText
                id="tradingName"
                value={company.tradingName || ""}
                onChange={(e) => onInputChange(e, "tradingName")}
                maxLength={100}
              />
              <label htmlFor="tradingName">Nome Fantasia</label>
            </span>
          </InputContainer>

          {/* openingDate */}
          <InputContainer className="openingDate">
            <span className="p-float-label">
              <CalendarCreate
                id="openingDate"
                onChange={(e) => onInputChange(e, "openingDate")}
                value={company.openingDate || ""}
                dateFormat="dd/mm/yy"
                showIcon
                required
                locale="pt"
                className={classNames({
                  "p-invalid": submitted && !company.openingDate,
                })}
              />
              <label htmlFor="openingDate">Data de abertura</label>
            </span>
            {submitted && !company.openingDate && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="Data de abertura é obrigatorio"
              />
            )}
          </InputContainer>

          {/* cnpj */}
          <InputContainer className="cnpj">
            <span className="p-float-label">
              <InputMask
                id="cnpj"
                mask="99.999.999/9999-99"
                unmask={true}
                value={company.cnpj || ""}
                onChange={(e) => onInputChange(e, "cnpj")}
                required
                className={classNames({
                  "p-invalid":
                    (submitted && !company.cnpj) ||
                    (submitted && company.cnpj?.length < 14),
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
            {submitted && company.cnpj?.length < 14 && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="info"
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
                value={company.cnae || ""}
                required
                className={classNames({
                  "p-invalid": submitted && !company.cnae,
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
            {submitted && company.cnae?.length < 7 && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="info"
                text="Minimo de 7 caracteres."
              />
            )}
          </InputContainer>

          {/* legalNature */}
          <InputContainer className="legalNature">
            <span className="p-float-label">
              <InputText
                id="legalNature"
                value={company.legalNature || ""}
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
                value={company.financeCapital || ""}
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
                id="cep"
                mask="99999-999"
                unmask={true}
                autoClear={false}
                onChange={(e) => onChangeCep(e)}
                required
                className={classNames({
                  "p-invalid": submitted && company.address.cep === null,
                })}
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
                severity="info"
                text="Minimo de 7 caracteres."
              />
            )}
            {existCep === false && (
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
                value={company.address.street || ""}
                onChange={(e) => onInputAddressChange(e, "street")}
                required
                className={classNames({
                  "p-invalid": submitted && company.address.street === null,
                })}
              />
              <label htmlFor="street">Rua</label>
            </span>
            {submitted && !company.address.street && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="Rua é obrigatório."
              />
            )}
          </InputContainer>

          <InputContainer className="number">
            <span className="p-float-label">
              <InputNumber
                id="number"
                value={company.address.number || ""}
                onValueChange={(e) => onInputAddressChange(e, "number")}
                required
                className={classNames({
                  "p-invalid": submitted && !company.address.number,
                })}
              />
              <label htmlFor="number">Numero</label>
            </span>
            {submitted && !company.address.number && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="Numero é obrigatório."
              />
            )}
          </InputContainer>

          {/* bairro */}
          <InputContainer className="bairro">
            <span className="p-float-label">
              <InputText
                id="bairro"
                value={company.address.bairro || ""}
                onChange={(e) => onInputAddressChange(e, "bairro")}
                required
                className={classNames({
                  "p-invalid": submitted && company.address.bairro === null,
                })}
              />
              <label htmlFor="bairro">Bairro</label>
            </span>
            {submitted && !company.address.bairro && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="bairro é obrigatório."
              />
            )}
          </InputContainer>

          <InputContainer className="city">
            <span className="p-float-label">
              <InputText
                id="city"
                value={company.address.city || ""}
                onChange={(e) => onInputAddressChange(e, "city")}
                required
                className={classNames({
                  "p-invalid": submitted && company.address.city === null,
                })}
              />
              <label htmlFor="city">Cidade</label>
            </span>
            {submitted && !company.address.city && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="cidade é obrigatório."
              />
            )}
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
                maxLength={100}
                required
                className={classNames({
                  "p-invalid": submitted && !company.companyName,
                })}
              />
              <label htmlFor="companyName">Nome da Empresa</label>
            </span>
            {submitted && !company.companyName && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="Nome da empresa é obrigatório."
              />
            )}
          </InputContainer>

          {/* tradingName */}
          <InputContainer className="tradingName">
            <span className="p-float-label">
              <InputText
                id="tradingName"
                value={company.tradingName}
                maxLength={100}
                onChange={(e) => onInputChange(e, "tradingName")}
                required
                className={classNames({
                  "p-invalid": submitted && !company.tradingName,
                })}
              />
              <label htmlFor="tradingName">Nome Fantasia</label>
            </span>
            {submitted && !company.tradingName && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="Nome fantasia é obrigatório."
              />
            )}
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
                required
                locale="pt"
                className={classNames({
                  "p-invalid": submitted && !company.openingDate,
                })}
              />
              <label htmlFor="openingDate">Data de abertura</label>
            </span>
            {submitted && !company.openingDate && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="Data de abertura é obrigatorio"
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
                required
                className={classNames({
                  "p-invalid": submitted && !company.legalNature,
                })}
              />
              <label htmlFor="legalNature">Naturesa legal</label>
            </span>
            {submitted && !company.legalNature && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="Natureza Legal é obrigatória."
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
                  "p-invalid": submitted && !company.cnae,
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
            {submitted && company.cnae?.length < 7 && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="info"
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
                required
                className={classNames({
                  "p-invalid": submitted && !company.financeCapital,
                })}
              />
              <label htmlFor="financeCapital">Capital Financeiro</label>
            </span>
            {submitted && !company.financeCapital && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="Capital Financeiro é obrigatório."
              />
            )}
          </InputContainer>
        </Company>

        <Address>
          <legend>Endereço da Empresa</legend>
          {/* cep */}
          <InputContainer className="cep">
            <span className="p-float-label">
              <InputMask
                id="companyName"
                mask="99999-999"
                unmask={true}
                autoClear={false}
                value={company.address.cep}
                onChange={(e) => onChangeCep(e)}
                required
                className={classNames({
                  "p-invalid": submitted && !company.address.cep,
                })}
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
            {submitted && company.address.cep?.length < 7 && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="info"
                text="Minimo de 7 caracteres."
              />
            )}
            {existCep === false && (
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
                required
                className={classNames({
                  "p-invalid": submitted && !company.address.street,
                })}
              />

              <label htmlFor="street">Rua</label>
            </span>
            {submitted && !company.address.street && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="Rua é obrigatório."
              />
            )}
          </InputContainer>

          {/* Number */}
          <InputContainer className="number">
            <span className="p-float-label">
              <InputNumber
                id="number"
                value={company.address.number}
                onValueChange={(e) => onInputAddressChange(e, "number")}
                required
                className={classNames({
                  "p-invalid": submitted && !company.address.number,
                })}
              />
              <label htmlFor="number">Numero</label>
            </span>
            {submitted && !company.address.number && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="Numero é obrigatório."
              />
            )}
          </InputContainer>

          {/* bairro */}
          <InputContainer className="bairro">
            <span className="p-float-label">
              <InputText
                id="bairro"
                value={company.address.bairro}
                onChange={(e) => onInputAddressChange(e, "bairro")}
                required
                className={classNames({
                  "p-invalid": submitted && !company.address.bairro,
                })}
              />
              <label htmlFor="bairro">Bairro</label>
            </span>
            {submitted && !company.address.bairro && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="Bairro é obrigatório."
              />
            )}
          </InputContainer>

          {/* city */}
          <InputContainer className="city">
            <span className="p-float-label">
              <InputText
                id="city"
                value={company.address.city}
                onChange={(e) => onInputAddressChange(e, "city")}
                required
                className={classNames({
                  "p-invalid": submitted && !company.address.city,
                })}
              />
              <label htmlFor="city">Cidade</label>
            </span>
            {submitted && !company.address.city && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="cidade é obrigatório."
              />
            )}
          </InputContainer>
        </Address>
      </EditCompany>

      <ViewCompany
        visible={viewCompanyComplete}
        style={{ width: "50rem" }}
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
                data={formatEmptyData(company.companyName)}
                name="Nome Da empresa"
                className="companyName"
              />
              <TextData
                data={formatEmptyData(company.tradingName)}
                name="Nome Fantasia"
                className="tradingName"
              />
              <TextData
                data={statusBodyTemplate(company)}
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
                data={formatEmptyData(company.legalNature)}
                name="Natureza Legal"
                className="legalNature"
              />

              <TextData
                data={dateBodyTemplate(company)}
                name="Data de Abertura"
                className="openingDate"
              />
              <TextData
                data={formatEmptyData(priceBodyTemplate(company))}
                name="Capital Financeiro"
                className="financeCapital"
              />
            </ViewData>
          </TabPanel>

          <TabPanel header={addressHeader}>
            <AddressView>
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
            </AddressView>
          </TabPanel>
          <TabPanel header={peopleHeader}>
            {people.length === 0 ? (
              <div> Sem Funcionarios</div>
            ) : (
              <PersonContainer>
                {people.map((person, i) => (
                  <Person key={person.id}>
                    <Avatar icon="pi pi-user" shape="circle" />
                    <div>
                      <PersonData>
                        <label>Nome:</label>
                        <li key={i}>{person.name.split(" ")[0]}</li>
                      </PersonData>
                      <PersonData>
                        <label>Usuario: </label>
                        <li key={i}>{person.user}</li>
                      </PersonData>
                      <PersonData>
                        <label>CPF: </label>
                        <li key={i}>{person.cpf}</li>
                      </PersonData>
                      <PersonData>
                        <label>RG: </label>
                        <li key={i}>{person.rg}</li>
                      </PersonData>
                      <PersonData>
                        <label>Tel: </label>
                        <li key={i}>{person.phone}</li>
                      </PersonData>
                    </div>
                  </Person>
                ))}
              </PersonContainer>
            )}
          </TabPanel>
        </TabView>
      </ViewCompany>

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
          {company.status === "Active" ? (
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
