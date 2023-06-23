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
  BoxTable,
  Table,
  ActionTamplate,
  InputContainer,
  CompanyListDialog,
  ViewData,
  Address,
  Icon,
  TextHeader,
  Person,
  PersonData,
  PersonContainer,
  CreatePerson,
  person,
  StatusChange,
  DeletePerson,
  ViewPerson,
  EditPerson,
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
import {
  companyInstance,
  personInstance,
} from "../../../../config/axios.config";
import { useAxios } from "../../../../hooks/useAxios";
import CompanyList from "../../../pepole/components/CompanyList";

export default function TablePeople() {
  const {
    data: people,
    setData: setPeople,
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
  const [companies, setCompanies] = useState([]);
  const [editPersonDialog, setEditPersonDialog] = useState(false);
  const [companyListDialog, setCompanyListDialog] = useState(false);
  const [deletePersonDialog, setdeletePersonDialog] = useState(false);
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

  const saveCreatePerson = () => {
    setSubmitted(true);

    let _people = [...people];
    let _person = { ...person };

    const updateTable = (cpf) => {
      personInstance.get(`FindByCPF/${cpf}`).then((res) => {
        _people.push({ ...res.data });
        setPeople(_people);
      });
    };

    if (_person.name && _person.cpf.length === 11 && _person.rg.length === 9) {
      console.log("test");
      personInstance
        .post("", _person)
        .then((res) => {
          updateTable(res.data.cpf);
          notification("success", "Concluido", "Pessoa criada");
          hideCreateDialog();
        })
        .catch((err) => {
          console.log(err.response.data);
          notification("error", "Erro", err.response.data.split(":")[1]);
        })
        .finally(() => {
          setPerson(emptyPerson);
        });
    } else {
      notification("error", "Erro", "Não foi possivel criar a empresa");
    }
  };

  const saveEditPerson = () => {
    setSubmitted(true);

    let _people = [...people];
    let _person = { ...person };
    const cpf = _person.cpf;
    // const status = _person.status;

    delete _person.rg;
    delete _person.cpf;

    console.log(_person);

    Object.keys(_person).forEach((personItem) => {
      console.log(personItem);

      if (_person[personItem] == "") {
        _person[personItem] = null;
      }

      _person = { ..._person };
    });

    const updateTable = () => {
      const index = people.findIndex((p) => p.id == person.id);
      personInstance.get(`FindByCPF/${cpf}`).then((res) => {
        _people[index] = { ...res.data };
        console.log(res.data);
        setPeople(_people);
      });
    };

    if (_person.name) {
      personInstance
        .put("", _person)
        .then((res) => {
          updateTable();
          notification(
            "success",
            "Concluido",
            "dados da pessoa foram editados"
          );
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
      notification("error", "Erro", "Não foi possivel editar a pessoa");
    }

    console.log(_person);
  };

  const deletePerson = () => {
    personInstance
      .delete(`${person.id}`)
      .then(() => {
        notification("success", "Concluido", "Pessoa foi excluida");
        const _people = people.filter((val) => val.id !== person.id);
        setPeople(_people);
      })
      .catch(() => {
        notification("error", "Erro", "não foi possivel excluir essa pessoa");
      })
      .finally(() => {
        setPerson(emptyPerson);
      });

    setdeletePersonDialog(false);
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

  const openSaveEditPerson = (person) => {
    const date = new Date(person.openingDate);
    let _person = { ...person };

    _person.openingDate = date;
    console.log(person);
    setPerson(_person);
    setSubmitted(false);
    setEditPersonDialog(true);
  };

  const openConfirmdeletePerson = (person) => {
    setPerson(person);
    setdeletePersonDialog(true);
  };

  const openStatusChangeperson = (person) => {
    setPerson(person);
    setStatuspersonDialog(true);
  };

  const openCompanyList = (person) => {
    setPerson(person);
    companyInstance
      .get(``)
      .then((res) => {
        console.log(res.data);
        setCompanies(res.data);
        setCompanyListDialog(true);
        console.log(companies);
      })
      .catch()
      .finally();
  };

  //-----Hide_Dialog------

  const hideCreateDialog = () => {
    setSubmitted(false);
    setCreatePersonDialog(false);
  };

  const hideEditDialog = () => {
    setSubmitted(false);
    setPerson(emptyPerson);
    setEditPersonDialog(false);
  };

  const hidedeletePersonDialog = () => {
    setdeletePersonDialog(false);
  };

  const hideStatuspersonDialog = () => {
    setStatuspersonDialog(false);
  };

  const hideViewpersonComplete = () => {
    setCompanyListDialog(false);
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
        onClick={saveCreatePerson}
      />
    </React.Fragment>
  );

  const editPersonDialogFooter = (
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
        onClick={saveEditPerson}
        severity="warning"
      />
    </React.Fragment>
  );

  const deletePersonDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        autoFocus
        outlined
        onClick={hidedeletePersonDialog}
      />
      <Button
        label="Deletar"
        icon="pi pi-check"
        severity="danger"
        onClick={deletePerson}
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
          icon="pi pi-building"
          rounded
          // outlined
          // severity="warning"
          onClick={() => openCompanyList(rowData)}
          tooltip="Company"
          tooltipOptions={configTooltip}
        />

        <Button
          icon="pi pi-pencil"
          rounded
          // outlined
          className="mr-2"
          severity="warning"
          onClick={() => openSaveEditPerson(rowData)}
          tooltip="Editar"
          tooltipOptions={configTooltip}
        />
        <Button
          icon="pi pi-trash"
          rounded
          // outlined
          severity="danger"
          onClick={() => openConfirmdeletePerson(rowData)}
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
      <BoxTable>
        {loading ? (
          <TableLoading />
        ) : (
          <Table
            value={people}
            loading={loading}
            // selection={selectedpeople}
            onSelectionChange={(e) => setSelectedpeople(e.value)}
            dataKey="id"
            removableSort
            selectionMode="single"
            paginator
            rows={10}
            scrollable
            scrollHeight="flex"
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
          </Table>
        )}
      </BoxTable>

      <CreatePerson
        visible={createPersonDialog}
        style={{ width: "30rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Criar Pessoa"
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
                className={classNames({
                  "p-invalid": submitted && !person.name,
                })}
              />
              <label htmlFor="name">Nome</label>
            </span>
            {submitted && !person.name && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="O nome é obrigatorio"
              />
            )}
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
                    (submitted && !person.rg) ||
                    (submitted && person.rg?.length < 9),
                })}
              />
              <label htmlFor="rg">RG</label>
            </span>
            {submitted && !person.rg && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="RG é obrigatorio"
              />
            )}
          </InputContainer>

          {/* cpf */}
          <InputContainer className="cpf">
            <span className="p-float-label">
              <InputMask
                id="cnpj"
                mask="999.999.999-99"
                unmask={true}
                value={person.cpf || ""}
                onChange={(e) => onInputChange(e, "cpf")}
                required
                // autoClear={false}
                className={classNames({
                  "p-invalid":
                    (submitted && !person.cpf) ||
                    (submitted && person.cpf?.length < 11),
                })}
              />
              <label htmlFor="cnpj">CPF</label>
            </span>
            {submitted && !person.cpf && (
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
          </InputContainer>

          {/* tel */}
          <InputContainer className="phone">
            <span className="p-float-label">
              <InputMask
                id="phone"
                mask="(99) 9 9999-9999"
                onChange={(e) => onInputChange(e, "phone")}
                value={person.phone || ""}
              />
              <label htmlFor="cnae">Telefone</label>
            </span>
          </InputContainer>
        </Person>
      </CreatePerson>

      <EditPerson
        visible={editPersonDialog}
        style={{ width: "30rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Criar Pessoa"
        modal
        className="p-fluid"
        footer={editPersonDialogFooter}
        onHide={hideEditDialog}
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
                className={classNames({
                  "p-invalid": submitted && !person.name,
                })}
              />
              <label htmlFor="name">Nome</label>
            </span>
            {submitted && !person.name && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="O nome é obrigatorio"
              />
            )}
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

          {/* tel */}
          <InputContainer className="phone">
            <span className="p-float-label">
              <InputMask
                id="phone"
                mask="(99) 9 9999-9999"
                onChange={(e) => onInputChange(e, "phone")}
                value={person.phone || ""}
              />
              <label htmlFor="phone">Telefone</label>
            </span>
          </InputContainer>
        </Person>
      </EditPerson>

      <CompanyListDialog
        visible={companyListDialog}
        style={{ width: "50rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={`Informações da empresa ${person.id}`}
        modal
        className="p-fluid"
        footer={ViewpersonDialogFooter}
        onHide={hideViewpersonComplete}
      >
        <CompanyList value={companies} person={person} />
      </CompanyListDialog>

      <DeletePerson
        visible={deletePersonDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Deletar"
        modal
        footer={deletePersonDialogFooter}
        onHide={hidedeletePersonDialog}
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
          <span>Tem certeza que deseja excluir essa pessoa</span>
        </Text>
      </DeletePerson>

      <StatusChange
        headerStyle={statusChangeHeader(person)}
        visible={statuspersonDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirmar mudança de status da pessoa"
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
              Desativar Pessoa <b>{person.id}</b>
            </span>
          ) : (
            <span>
              Ativar Pessoa <b>{person.id}</b>
            </span>
          )}
        </Text>
      </StatusChange>
    </div>
  );
}
