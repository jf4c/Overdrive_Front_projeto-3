import "primeflex/primeflex.css";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

import React, { useContext, useRef, useState } from "react";
import { useFormat } from "../../../../hooks/useFormat";
import {
  Container,
  Company,
  Name,
  Icon,
  CompanyInfo,
  CNPJ,
  Text,
  AddPeopleInCompany,
  ViewData,
  IconView,
  ViewPerson,
  ViewCompany,
  TextView,
  RemovePeopleInCompany,
} from "./styles";
import {
  companyInstance,
  personInstance,
} from "../../../../config/axios.config";
import TextData from "../../../../components/TextData";
import { PersonContext } from "../../context/PersonContext";
import { Toast } from "primereact/toast";

const CompanyList = ({ value, personValue }) => {
  const {
    getSeverity,
    formatCnpj,
    formatDate,
    formatCurrency,
    formatCPF,
    formatRG,
  } = useFormat();

  const [company, setCompany] = useState(null);
  const { person, setPerson, people, setPeople } = useContext(PersonContext);
  const [addPeopleInCompanyDialog, setAddPeopleInCompanyDialog] =
    useState(false);
  const [removePeopleInCompanyDialog, setRemovePeopleInCompanyDialog] =
    useState(false);
  const toast = useRef(null);

  const notification = (severity, summary, text) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: text,
      life: 3000,
    });
  };

  const addPeopleInCompany = () => {
    let _company = { ...company };
    let _person = { ...person };
    let _people = [...people];

    _person.companyId = _company.id;
    _person.company = _company;

    const index = people.findIndex((p) => p.id == _person.id);
    _people[index] = _person;

    personInstance
      .put(`AddPeopleInCompany/${person.id}/${company.id}`)
      .then((res) => {
        console.log(res.data.id);
        setPerson(_person);
        setPeople(_people);
        console.log(_people);
        console.log(_person);
        notification(
          "success",
          "Concluido",
          "A pessoa foi adicionada em empresa"
        );
        hideAddPeopleInCompanyDialog();
      });
  };

  const removePeopleInCompany = () => {
    let _person = { ...person };
    let _people = [...people];

    _person.companyId = null;
    _person.company = null;

    const index = people.findIndex((p) => p.id == _person.id);
    _people[index] = _person;

    personInstance.put(`RemovePeopleInCompany/${person.id}`).then(() => {
      setPerson(_person);
      setPeople(_people);
      console.log(_people);
      console.log(_person);
      notification("success", "Concluido", "A pessoa foi removida da empresa");
      hideRemovePeopleInCompanyDialog();
    });
  };

  const openAddPeopleInCompanyDialog = (company) => {
    setCompany(company);
    setAddPeopleInCompanyDialog(true);
  };

  const openRemovePeopleInCompanyDialog = (company) => {
    setCompany(company);
    setRemovePeopleInCompanyDialog(true);
  };

  const hideAddPeopleInCompanyDialog = () => {
    setAddPeopleInCompanyDialog(false);
  };

  const hideRemovePeopleInCompanyDialog = () => {
    setRemovePeopleInCompanyDialog(false);
  };

  const addPeopleInCompanyDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        autoFocus
        outlined
        onClick={hideAddPeopleInCompanyDialog}
      />
      <Button
        label="Adicionar"
        icon="pi pi-check"
        severity="success"
        onClick={addPeopleInCompany}
      />
    </React.Fragment>
  );
  const removePeopleInCompanyDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        autoFocus
        outlined
        onClick={hideRemovePeopleInCompanyDialog}
      />

      <Button
        label="Remover"
        icon="pi pi-check"
        severity="danger"
        onClick={removePeopleInCompany}
      />
    </React.Fragment>
  );

  const companyList = (company) => {
    return (
      <Container>
        <Company>
          <Icon className="pi pi-building"></Icon>
          <CompanyInfo>
            <Name>
              <label htmlFor="">Nome:</label>
              <span>{company.companyName}</span>
            </Name>
            <CNPJ>
              <label htmlFor="">CNPJ:</label>
              <span>{formatCnpj(company.cnpj)}</span>
            </CNPJ>
            <Tag value={company.status} severity={getSeverity(company)}></Tag>
          </CompanyInfo>
        </Company>
        <Button
          icon="pi pi-user-plus"
          size="large"
          className="p-button-rounded"
          disabled={company.status !== "Active"}
          onClick={() => openAddPeopleInCompanyDialog(company)}
        ></Button>
      </Container>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      {person.companyId != null ? (
        <ViewData>
          <ViewPerson>
            <IconView className="pi pi-id-card view"></IconView>
            <div className="info">
              <TextView>
                <label htmlFor="">Nome:</label>
                <span>{person.name}</span>
              </TextView>
              <TextView>
                <label htmlFor="">CPF:</label>
                <span>{formatCPF(person.cpf)}</span>
              </TextView>
              <TextView>
                <label htmlFor="">RG:</label>
                <span>{formatRG(person.rg)}</span>
              </TextView>
              <TextView>
                <label htmlFor="">Telefone:</label>
                <span>{person.phone}</span>
              </TextView>
            </div>

            <Button
              icon="pi pi-user-minus"
              size="large"
              className="p-button-rounded"
              severity="danger"
              // disabled={company.status !== "Active"}
              onClick={() => openRemovePeopleInCompanyDialog(company)}
            ></Button>
          </ViewPerson>

          <ViewCompany>
            <h3>Empresa</h3>
            <TextData
              icon="pi-briefcase"
              data={person.company.companyName}
              name="Nome Da empresa"
              className="companyName"
            />
            <TextData
              data={person.company.tradingName}
              name="Nome Fantazia"
              className="tradingName"
            />
            <TextData data={person.company.cnae} name="CNAE" className="cnae" />

            <TextData
              data={person.company.legalNature}
              name="Natureza Legal"
              className="legalNature"
            />
            <TextData
              icon="pi-building"
              data={formatCnpj(person.company.cnpj)}
              name="CNPJ"
              className="cnpj"
            />

            <TextData
              icon="pi-calendar"
              data={formatDate(person.company.openingDate)}
              name="Abertura"
              className="openingDate"
            />

            <TextData
              icon="pi-dollar"
              data={formatCurrency(person.company.financeCapital)}
              name="Capital Financeiro"
              className="financeCapital"
            />
          </ViewCompany>
        </ViewData>
      ) : (
        <DataView value={value} itemTemplate={companyList} />
      )}

      <AddPeopleInCompany
        visible={addPeopleInCompanyDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Adicionar pessoa em empresa"
        modal
        footer={addPeopleInCompanyDialogFooter}
        onHide={hideAddPeopleInCompanyDialog}
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
          <span>Adicionar a pessoa {person.id} nessa impresa </span>
        </Text>
      </AddPeopleInCompany>

      <RemovePeopleInCompany
        visible={removePeopleInCompanyDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Remover pessoa da empresa"
        modal
        footer={removePeopleInCompanyDialogFooter}
        onHide={hideRemovePeopleInCompanyDialog}
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
          <span>Adicionar a pessoa {person.id} nessa impresa </span>
        </Text>
      </RemovePeopleInCompany>
    </div>
  );
};

export default CompanyList;
