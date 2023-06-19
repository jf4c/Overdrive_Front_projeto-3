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
import { PersonContext } from "../../context/PersonContext";
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

// import { useAddress } from "../../../../hooks/useAdrress";
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
  Createperson,
  person,
  StatusChange,
  Deleteperson,
  Viewperson,
  Editperson,
  Text,
  CalendarCreate,
  CalendarEdit,
  AddressView,
} from "./styles";
import { useTemplate } from "../../../../hooks/useTemplate";
import { useInputChange } from "../../hooks/useInputChange";
import HeaderTable from "../../../../components/HeaderTable";
import ButtonStatus from "../../../../components/ButtonStatus";
import TableLoading from "../../../../components/TableLoading";
import { personInstance } from "../../../../config/axios.config";
import { useAxios } from "../../../../hooks/useAxios";

export default function Table() {
  const {
    data: people,
    setData: setpeople,
    loading,
    error,
    fetch,
  } = useAxios();

  const {
    cpfBodyTemplate,
    rgBodyTemplate,
    phoneBodyTemplate,
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

  const { emptyPerson, person, setPerson } = useContext(PersonContext);
  const [createPersonDialog, setCreatePersonDialog] = useState(false);
  const [editpersonDialog, setEditpersonDialog] = useState(false);
  const [viewpersonComplete, setViewpersonComplete] = useState(false);
  const [deletepersonDialog, setDeletepersonDialog] = useState(false);
  const [statuspersonDialog, setStatuspersonDialog] = useState(false);
  const [selectedpeople, setSelectedpeople] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  // const { address, getAdrres } = useAddress();
  const toast = useRef(null);
  // const dt = useRef(null);
  //-----CRUD------
  useEffect(() => {
    fetch({
      axiosInstance: personInstance, // Sua instância do Axios
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

  const saveCreateperson = () => {
    setSubmitted(true);
    let _person = { ...person };
    let _address = { ...person.address };

    Object.keys(_person).forEach((personItem, i) => {
      console.log(personItem);
      if (personItem !== "address") {
        if (_person[personItem] == null) {
          _person[personItem] = "";
        }
      } else {
        Object.keys(_address).forEach((addressItem) => {
          if (_address[addressItem] == null) {
            _address[addressItem] = "";
            _person.address = { ..._address };
          }
        });
      }
      _person = { ..._person };
    });

    if (
      _person.cnpj.length === 14 &&
      _person.openingDate !== "" &&
      _person.cnae.length === 7 &&
      _address.cep.length === 8 &&
      _address.number !== ""
    ) {
      personInstance
        .post("", _person)
        .then((res) => {
          // updateStatus();
          console.log("criou");
          notification("success", "Concluido", "Empresa criada");
          hideCreateDialog();
        })
        .catch((err) => {
          console.log(err.response.data);
          notification("error", "Erro", err.response.data.split(":")[1]);
        })
        .finally(() => {
          // setPerson(emptyPerson);
        });
    } else {
      notification("error", "Erro", "Não foi possivel criar a empresa");
    }
  };

  const saveEditperson = () => {
    setSubmitted(true);
    let _people = [...people];
    let _person = { ...person };
    let _address = { ...person.address };
    const cnpj = _person.cnpj;
    // const status = _person.status;

    delete _person.cnpj;
    delete _person.status;

    console.log(_person);

    const updateEdit = () => {
      const index = people.findIndex((c) => c.id == person.id);

      personInstance.get(`FindByCNPJ/${cnpj}`).then((res) => {
        _people[index] = { ...res.data };
        console.log(res.data);
        // notification("success", "Concluido", "A empresa foi editada");
        setpeople(_people);
      });
    };

    Object.keys(_person).forEach((personItem) => {
      console.log(personItem);
      if (personItem !== "address") {
        if (_person[personItem] == "") {
          _person[personItem] = null;
        }
      } else {
        Object.keys(_address).forEach((addressItem) => {
          if (_address[addressItem] == "") {
            _address[addressItem] = null;
            _person.address = { ..._address };
          }
        });
      }
      _person = { ..._person };
    });

    if (
      // _person.cnpj.length === 14 &&
      _person.openingDate !== null &&
      _person.cnae?.length === 7 &&
      _address.cep?.length === 8 &&
      _address.number !== null
    ) {
      personInstance
        .put("", _person)
        .then((res) => {
          updateEdit();
          notification("success", "Concluido", "A empresa foi editada");
          hideEditDialog();
        })
        .catch((err) => {
          console.log(err.response.data);
          notification("error", "Erro", err.response.data.split(":")[1]);
        })
        .finally(() => {
          setPerson(emptyPerson);
        });
    } else {
      notification("error", "Erro", "Não foi possivel editar a empresa");
    }

    console.log(_person);
  };

  const deleteperson = () => {
    personInstance
      .delete(`${person.id}`)
      .then(() => {
        notification("success", "Concluido", "Empresa foi excluida");
        const _people = people.filter((val) => val.id !== person.id);
        setpeople(_people);
      })
      .catch(() => {
        notification("error", "Erro", "não foi possivel excluir a empresa");
      })
      .finally(() => {
        setPerson(emptyPerson);
      });

    setDeletepersonDialog(false);
  };

  const toggleStatus = () => {
    const updateStatus = () => {
      const index = people.findIndex((c) => c.id == person.id);
      const _person = { ...person };
      if (_person.status == "Active") {
        _person.status = "Inactive";
      } else {
        _person.status = "Active";
      }
      people[index] = _person;
      console.log(people);
    };

    personInstance
      .put(`ChangeStatus/${person.id}`)
      .then((res) => {
        updateStatus();
        notification("success", "Concluido", "Status Alterado");
      })
      .catch((err) => {
        notification("error", "Erro", "Status não pode ser alterado");
      })
      .finally(() => {
        setPerson(emptyPerson);
      });
    setStatuspersonDialog(false);
  };

  //----Open_Dialog-------
  const openCreatePerson = () => {
    setPerson(emptyPerson);
    console.log(person.cnpj === null ? "" : person.cnpj);
    setSubmitted(false);
    setCreatePersonDialog(true);
  };

  const openSaveEditperson = (person) => {
    const date = new Date(person.openingDate);
    let _person = { ...person };

    _person.openingDate = date;
    console.log(person);
    setPerson(_person);
    setSubmitted(false);
    setEditpersonDialog(true);
  };

  const openConfirmDeleteperson = (person) => {
    setPerson(person);
    setDeletepersonDialog(true);
  };

  const openStatusChangeperson = (person) => {
    setPerson(person);
    setStatuspersonDialog(true);
  };

  const openViewpersonComplete = (person) => {
    setPerson(person);
    personInstance
      .get(`FindAllPeopleInperson/${person.id}`)
      .then((res) => {
        // setPeople(res.data.peoples);
      })
      .catch()
      .finally();

    setViewpersonComplete(true);
  };

  //-----Hide_Dialog------

  const hideCreateDialog = () => {
    setSubmitted(false);
    setCreatePersonDialog(false);
  };

  const hideEditDialog = () => {
    setSubmitted(false);
    setPerson(emptyPerson);
    setEditpersonDialog(false);
  };

  const hideDeletepersonDialog = () => {
    setDeletepersonDialog(false);
  };

  const hideStatuspersonDialog = () => {
    setStatuspersonDialog(false);
  };

  const hideViewpersonComplete = () => {
    setViewpersonComplete(false);
  };

  //-----Footer_Dialog------

  const createPersonDialogFooter = (
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
        onClick={saveCreateperson}
      />
    </React.Fragment>
  );

  const editpersonDialogFooter = (
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
        onClick={saveEditperson}
        severity="warning"
      />
    </React.Fragment>
  );

  const deletepersonDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        autoFocus
        outlined
        onClick={hideDeletepersonDialog}
      />
      <Button
        label="Deletar"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteperson}
      />
    </React.Fragment>
  );

  const statusChangeDialogFooter = (
    <React.Fragment>
      <Button
        label="Não"
        icon="pi pi-times"
        outlined
        onClick={hideStatuspersonDialog}
        autoFocus
      />
      {person.status == "Active" ? (
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

  const ViewpersonDialogFooter = (
    <React.Fragment>
      <Button
        label="Fechar"
        icon="pi pi-times"
        outlined
        autoFocus
        onClick={hideViewpersonComplete}
      />
    </React.Fragment>
  );

  //------Headers_Views--------

  const personHeader = (
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
          onClick={() => openStatusChangeperson(rowData)}
          tooltip={statusTooltip(rowData)}
          tooltipOptions={configTooltip}
        />

        <Button
          icon="pi pi-search"
          rounded
          // outlined
          // severity="warning"
          onClick={() => openViewpersonComplete(rowData)}
          tooltip="View"
          tooltipOptions={configTooltip}
        />

        <Button
          icon="pi pi-pencil"
          rounded
          // outlined
          className="mr-2"
          severity="warning"
          onClick={() => openSaveEditperson(rowData)}
          tooltip="Editar"
          tooltipOptions={configTooltip}
        />
        <Button
          icon="pi pi-trash"
          rounded
          // outlined
          severity="danger"
          onClick={() => openConfirmDeleteperson(rowData)}
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
            value={people}
            loading={loading}
            // selection={selectedpeople}
            onSelectionChange={(e) => setSelectedpeople(e.value)}
            dataKey="id"
            removableSort
            selectionMode="single"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} people"
            globalFilter={globalFilter}
            header={
              <HeaderTable
                name="Pessoas"
                filter={(e) => setGlobalFilter(e.target.value)}
                open={openCreatePerson}
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
              header="Nome"
              field="name"
              // sortable
              style={{ minWidth: "16rem" }}
            ></Column>
            <Column
              header="User"
              field="user"
              // body={cnpjBodyTemplate}
              // sortable
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              header="RG"
              field="rg"
              body={rgBodyTemplate}
              sortable
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              header="CPF"
              field="cpf"
              body={cpfBodyTemplate}
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>

            <Column
              header="Telefone"
              field="phone"
              body={phoneBodyTemplate}
              sortable
              style={{ minWidth: "10rem" }}
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

      <Createperson
        visible={createPersonDialog}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Criar Empresa"
        modal
        className="p-fluid"
        footer={createPersonDialogFooter}
        onHide={hideCreateDialog}
      >
        <Person>
          {/* name */}
          <InputContainer className="name">
            <span className="p-float-label">
              <InputText
                id="name"
                value={person.name || ""}
                onChange={(e) => onInputChange(e, "name")}
                autoFocus
              />
              <label htmlFor="name">Nome</label>
            </span>
          </InputContainer>

          {/* user */}
          <InputContainer className="user">
            <span className="p-float-label">
              <InputText
                id="user"
                value={person.user || ""}
                onChange={(e) => onInputChange(e, "user")}
              />
              <label htmlFor="user">User</label>
            </span>
          </InputContainer>

          {/* rg */}
          <InputContainer className="rg">
            <span className="p-float-label">
              <InputMask
                id="rg"
                mask="99.999.999-9"
                unmask={true}
                value={person.rg || ""}
                onChange={(e) => onInputChange(e, "rg")}
                required
                // autoClear={false}
                className={classNames({
                  "p-invalid":
                    (submitted && !person.cnpj) ||
                    (submitted && person.cnpj?.length < 14),
                })}
              />
              <label htmlFor="rg">RG</label>
            </span>
          </InputContainer>

          {/* cpf */}
          <InputContainer className="cpf">
            <span className="p-float-label">
              <InputMask
                id="cnpj"
                mask="999.999.999-99"
                unmask={true}
                value={person.cnpj || ""}
                onChange={(e) => onInputChange(e, "cpf")}
                required
                // autoClear={false}
                className={classNames({
                  "p-invalid":
                    (submitted && !person.cnpj) ||
                    (submitted && person.cnpj?.length < 14),
                })}
              />
              <label htmlFor="cnpj">CPF</label>
            </span>
            {submitted && !person.cnpj && (
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
            {submitted && person.cnpj?.length < 14 && (
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

          {/* tel */}
          <InputContainer className="phone">
            <span className="p-float-label">
              <InputMask
                id="phone"
                mask="(99) 9 9999-9999"
                onChange={(e) => onInputChange(e, "phone")}
                value={person.phone || ""}
                className={classNames({
                  "p-invalid": submitted && !person.cnae,
                })}
              />
              <label htmlFor="cnae">CNAE</label>
            </span>
            {submitted && !person.cnae && (
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
            {submitted && person.cnae?.length < 7 && (
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
        </Person>
      </Createperson>

      <Editperson
        visible={editpersonDialog}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={`Edite Empresa ${person.id}`}
        modal
        className="p-fluid"
        footer={editpersonDialogFooter}
        onHide={hideEditDialog}
      >
        <person>
          {/* personName */}
          <InputContainer className="personName">
            <span className="p-float-label">
              <InputText
                id="personName"
                value={person.personName}
                onChange={(e) => onInputChange(e, "personName")}
                autoFocus
              />
              <label htmlFor="personName">Nome da Empresa</label>
            </span>
          </InputContainer>

          {/* tradingName */}
          <InputContainer className="tradingName">
            <span className="p-float-label">
              <InputText
                id="tradingName"
                value={person.tradingName}
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
                value={person.openingDate}
                onChange={(e) => onInputChange(e, "openingDate")}
                dateFormat="dd/mm/yy"
                showIcon
                required
                className={classNames({
                  "p-invalid": submitted && !person.openingDate,
                })}
              />
              <label htmlFor="openingDate">Data de abertura</label>
            </span>
            {submitted && !person.openingDate && (
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
                value={person.legalNature}
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
                value={person.cnae}
                required
                className={classNames({
                  "p-invalid": submitted && !person.cnae,
                })}
              />
              <label htmlFor="cnae">CNAE</label>
            </span>
            {submitted && !person.cnae && (
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
            {submitted && person.cnae?.length < 7 && (
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
                value={person.financeCapital}
                onValueChange={(e) => onInputNumberChange(e, "financeCapital")}
                mode="currency"
                currency="BRL"
                locale="pt-RS"
              />
              <label htmlFor="financeCapital">Capital Financeiro</label>
            </span>
          </InputContainer>
        </person>

        <Address>
          <legend>Endereço da Empresa</legend>
          {/* cep */}

          <InputContainer className="cep">
            <span className="p-float-label">
              <InputMask
                id="personName"
                mask="99999-999"
                unmask={true}
                autoClear={false}
                value={person.address.cep}
                onChange={(e) => onChangeCep(e)}
                required
                className={classNames({
                  "p-invalid": submitted && person.address.cep === null,
                })}
              />
              <label htmlFor="cep">CEP</label>
            </span>
            {submitted && !person.address.cep && (
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
            {submitted && person.address.cep?.length < 7 && (
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
                value={person.address.street}
                onChange={(e) => onInputAddressChange(e, "street")}
              />

              <label htmlFor="street">Rua</label>
            </span>
          </InputContainer>

          <InputContainer className="number">
            <span className="p-float-label">
              <InputNumber
                id="number"
                value={person.address.number}
                onValueChange={(e) => onInputAddressChange(e, "number")}
                required
                className={classNames({
                  "p-invalid": submitted && !person.address.number,
                })}
              />
              <label htmlFor="number">Numero</label>
            </span>
            {submitted && !person.address.number && (
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
                value={person.address.bairro}
                onChange={(e) => onInputAddressChange(e, "bairro")}
              />
              <label htmlFor="bairro">Bairro</label>
            </span>
          </InputContainer>

          {/* city */}
          <InputContainer className="city">
            <span className="p-float-label">
              <InputText
                id="city"
                value={person.address.city}
                onChange={(e) => onInputAddressChange(e, "city")}
              />
              <label htmlFor="city">Cidade</label>
            </span>
          </InputContainer>
        </Address>
      </Editperson>

      {/* <Viewperson
        visible={viewpersonComplete}
        style={{ width: "35rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={`Informações da empresa ${person.id}`}
        modal
        className="p-fluid"
        footer={ViewpersonDialogFooter}
        onHide={hideViewpersonComplete}
      >
        <TabView>
          <TabPanel header={personHeader}>
            <ViewData>
              <TextData
                data={person.personName}
                name="Nome Da empresa"
                className="personName"
              />
              <TextData
                data={person.tradingName}
                name="Nome Fantazia"
                className="tradingName"
              />
              <TextData data={person.status} name="Status" className="status" />

              <TextData
                data={cnpjBodyTemplate(person)}
                name="CNPJ"
                className="cnpj"
              />
              <TextData data={person.cnae} name="CNAE" className="cnae" />

              <TextData
                data={person.legalNature}
                name="Natureza Legal"
                className="legalNature"
              />

              <TextData
                data={dateBodyTemplate(person)}
                name="Data de Abertura"
                className="openingDate"
              />
              <TextData
                data={priceBodyTemplate(person)}
                name="Capital Financeiro"
                className="financeCapital"
              />
            </ViewData>
          </TabPanel>

          <TabPanel header={addressHeader}>
            <AddressView>
              <TextData data={person.address.cep} name="CEP" className="cep" />
              <TextData
                data={person.address.street}
                name="Rua"
                className="street"
              />
              <TextData
                data={person.address.number}
                icon="star"
                name="Numero"
                className="number"
              />
              <TextData
                data={person.address.bairro}
                icon="star"
                name="Bairro"
                className="bairro"
              />

              <TextData
                data={person.address.city}
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
                  <Person>
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
      </Viewperson> */}

      <Deleteperson
        visible={deletepersonDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Deletar"
        modal
        footer={deletepersonDialogFooter}
        onHide={hideDeletepersonDialog}
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
      </Deleteperson>

      <StatusChange
        headerStyle={statusChangeHeader(person)}
        visible={statuspersonDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirmar mudança de status da Empresa"
        modal
        footer={statusChangeDialogFooter}
        onHide={hideStatuspersonDialog}
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
          {person.status == "Active" ? (
            <span>
              Desativar Empresa <b>{person.id}</b>
            </span>
          ) : (
            <span>
              Ativar Empresa <b>{person.id}</b>
            </span>
          )}
        </Text>
      </StatusChange>
    </div>
  );
}
