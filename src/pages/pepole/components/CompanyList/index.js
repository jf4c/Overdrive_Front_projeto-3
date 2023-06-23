import "primeflex/primeflex.css";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

import React, { useState } from "react";
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
} from "./styles";
import {
  companyInstance,
  personInstance,
} from "../../../../config/axios.config";
import TextData from "../../../../components/TextData";

const CompanyList = ({ value, person }) => {
  const {
    getSeverity,
    formatCnpj,
    formatDate,
    formatCurrency,
    formatCPF,
    formatRG,
  } = useFormat();

  const [company, setCompany] = useState(null);
  const [addPeopleInCompanyDialog, setAddPeopleInCompanyDialog] =
    useState(false);

  const addPeopleInCompany = () => {
    console.log(company);
    console.log(person);
    // personInstance
    //   .put(`AddPeopleInCompany/${person.id}/${company.id}`)
    //   .then((res) => {
    //     console.log(res);
    //     hideAddPeopleInCompanyDialog();
    //   });
  };

  const openAddPeopleInCompanyDialog = (company) => {
    setCompany(company);
    setAddPeopleInCompanyDialog(true);
  };

  const hideAddPeopleInCompanyDialog = () => {
    setAddPeopleInCompanyDialog(false);
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

  const propleHasCompany = (
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

  const companyMain = (company) => {
    // return (
    //     {person.companyId != null && <Container>
    //         <Company>
    //           <Icon className="pi pi-building"></Icon>
    //           <CompanyInfo>
    //             <Name>
    //               <label htmlFor="">Nome:</label>
    //               <span>{company.companyName}</span>
    //             </Name>
    //             <CNPJ>
    //               <label htmlFor="">CNPJ:</label>
    //               <span>{formatCnpj(company.cnpj)}</span>
    //             </CNPJ>
    //             <Tag value={company.status} severity={getSeverity(company)}></Tag>
    //           </CompanyInfo>
    //         </Company>
    //         <Button
    //           icon="pi pi-user-plus"
    //           size="large"
    //           className="p-button-rounded"
    //           disabled={company.status !== "Active"}
    //           onClick={() => openAddPeopleInCompanyDialog(company)}
    //         ></Button>
    //       </Container>}
    // );
  };

  return (
    <div>
      {person.companyId != null ? (
        <ViewData>
          <ViewPerson>
            <IconView className="pi pi-user view"></IconView>
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
              onClick={() => openAddPeopleInCompanyDialog(company)}
            ></Button>

            {/* <TextData data={person.name} name="Nome" className="companyName" />
            <TextData
              data={person.rg}
              name="Nome Fantazia"
              className="tradingName"
            />
            <TextData
              data={
                <Tag value={person.status} severity={getSeverity(person)}></Tag>
              }
              name="Status"
              className="status"
            />

            <TextData
              data={formatCnpj(person.company.cnpj)}
              name="CNPJ"
              className="cnpj"
            /> */}
          </ViewPerson>

          <ViewCompany>
            <IconView className="pi pi-building view"></IconView>
            <TextData
              data={person.company.companyName}
              name="Nome Da empresa"
              className="companyName"
            />
            <TextData
              data={person.company.tradingName}
              name="Nome Fantazia"
              className="tradingName"
            />
            <TextData
              data={
                <Tag
                  value={person.company.status}
                  severity={getSeverity(person.company)}
                ></Tag>
              }
              name="Status"
              className="status"
            />

            <TextData
              data={formatCnpj(person.company.cnpj)}
              name="CNPJ"
              className="cnpj"
            />
            <TextData data={person.company.cnae} name="CNAE" className="cnae" />

            <TextData
              data={person.company.legalNature}
              name="Natureza Legal"
              className="legalNature"
            />

            <TextData
              data={formatDate(person.company.openingDate)}
              name="Data de Abertura"
              className="openingDate"
            />
            <TextData
              data={formatCurrency(person.company.captalFinance)}
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
    </div>
  );
};

export default CompanyList;
