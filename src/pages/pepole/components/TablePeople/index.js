import React, { useState, useEffect, useRef, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { InputMask } from "primereact/inputmask";
import { Message } from "primereact/message";

import { companyInstance, personInstance } from "~/config/axios.config";

import { PersonContext } from "~/pages/pepole/context/PersonContext";
import { useInputChange } from "~/pages/pepole/hooks/useInputChange";
import CompanyList from "~/pages/pepole/components/CompanyList";

import HeaderTable from "~/components/HeaderTable";
import TableLoading from "~/components/TableLoading";
import { useTemplate } from "~/hooks/useTemplate";

import {
  ActionTamplate,
  BoxTable,
  CreatePerson,
  CompanyListDialog,
  DeletePerson,
  EditPerson,
  InputContainer,
  Person,
  StatusChange,
  Table,
  Text,
} from "./styles";

export default function TablePeople() {
  const {
    nameBodyTemplate,
    cpfBodyTemplate,
    rgBodyTemplate,
    phoneBodyTemplate,
    statusBodyTemplate,
    userBodyTemplate,
    companyStatusBodyTemplate,
  } = useTemplate();

  const { onInputChange } = useInputChange();
  const navigate = useNavigate();

  const [createPersonDialog, setCreatePersonDialog] = useState(false);
  const [editPersonDialog, setEditPersonDialog] = useState(false);
  const [companyListDialog, setCompanyListDialog] = useState(false);
  const [deletePersonDialog, setdeletePersonDialog] = useState(false);
  const [statusPersonDialog, setStatuspersonDialog] = useState(false);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [selectedpeople, setSelectedpeople] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const { emptyPerson, person, setPerson, people, setPeople } =
    useContext(PersonContext);

  const toast = useRef(null);

  //-----CRUD------
  useEffect(() => {
    setLoading(true);
    personInstance
      .get()
      .then((res) => {
        setPeople(res.data);
      })
      .catch(() => {
        setErr(true);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    Object.keys(_person).forEach((personItem) => {
      console.log(personItem);

      if (_person[personItem] === "") {
        _person[personItem] = null;
      }

      _person = { ..._person };
    });

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
    console.log(_person);
    const cpf = _person.cpf;
    // const status = _person.status;

    delete _person.rg;
    delete _person.cpf;

    console.log(_person);

    Object.keys(_person).forEach((personItem) => {
      console.log(personItem);

      if (_person[personItem] === "") {
        _person[personItem] = null;
      }

      _person = { ..._person };
    });

    const updateTable = () => {
      const index = people.findIndex((p) => p.id === person.id);
      personInstance.get(`FindByCPF/${cpf}`).then((res) => {
        _people[index] = { ...res.data };
        console.log(res.data);
        setPeople(_people);
      });
    };

    if (_person.name && _person.user && _person.phone) {
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
      const index = people.findIndex((c) => c.id === person.id);
      let _person = { ...person };
      if (_person.status === "Active") {
        _person.status = "Inactive";
      } else {
        _person.status = "Active";
      }
      people[index] = _person;
      console.log(people);
    };

    const updatePeople = () => {
      const index = people.findIndex((c) => c.id === person.id);
      let _people = [...people];
      let _person = { ...person };
      if (_person.status === "Active") {
        _person.status = "Inactive";
      } else {
        _person.status = "Active";
      }
      _person.companyId = null;
      _person.company = null;

      _people[index] = _person;
      setPeople(_people);
    };

    personInstance
      .put(`ChangeStatus/${person.id}`)
      .then((res) => {
        updateStatus();
        notification("success", "Concluido", "Status Alterado");
      })
      .then(() => {
        if (person.companyId !== null) {
          notification(
            "info",
            "Atençao",
            "Essa pessoa foi retirada da empresa"
          );
          updatePeople();
        }
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
        // console.log(res.data);
        setCompanies(res.data);
        setCompanyListDialog(true);
        // console.log(companies);
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
      {person.status === "Active" ? (
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
          disabled={rowData.status !== "Active"}
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
      <BoxTable>
        {loading ? (
          <TableLoading header="Pessoas" />
        ) : (
          <Table
            value={people}
            dataKey="id"
            sortField="id"
            sortOrder={-1}
            selectionMode="single"
            paginator
            rows={10}
            scrollable
            scrollHeight="flex"
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Numero de linhas:"
            globalFilter={globalFilter}
            emptyMessage={emptyData}
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
              body={nameBodyTemplate}
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              header="User"
              field="user"
              body={userBodyTemplate}
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
              header="Empresa"
              field="companyId"
              body={companyStatusBodyTemplate}
              // sortable
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
                maxLength={100}
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
                maxLength={100}
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
                unmask={true}
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
                required
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
                required
                className={classNames({
                  "p-invalid": submitted && !person.user,
                })}
              />
              <label htmlFor="user">User</label>
            </span>
            {submitted && !person.user && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="O user é obrigatorio"
              />
            )}
          </InputContainer>

          {/* tel */}
          <InputContainer className="phone">
            <span className="p-float-label">
              <InputMask
                id="phone"
                mask="(99) 9 9999-9999"
                unmask={true}
                onChange={(e) => onInputChange(e, "phone")}
                value={person.phone || ""}
                required
                className={classNames({
                  "p-invalid": submitted && !person.phone,
                })}
              />
              <label htmlFor="phone">Telefone</label>
            </span>
            {submitted && !person.phone && (
              <Message
                style={{
                  background: "none",
                  justifyContent: "start",
                  padding: "5px",
                }}
                severity="error"
                text="O telefone é obrigatorio"
              />
            )}
          </InputContainer>
        </Person>
      </EditPerson>

      <CompanyListDialog
        visible={companyListDialog}
        style={{ width: "60rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={`Informações da empresa ${person.id}`}
        modal
        className="p-fluid"
        footer={ViewpersonDialogFooter}
        onHide={hideViewpersonComplete}
      >
        <CompanyList value={companies} personValue={person} />
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
        visible={statusPersonDialog}
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
          {person.status === "Active" ? (
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
