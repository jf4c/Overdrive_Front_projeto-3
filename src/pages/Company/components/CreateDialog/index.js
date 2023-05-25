import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import "primeicons/primeicons.css";
import { useAxios } from "../../../../hooks/useAxios";
import { useContext } from "react";
import { CompanyContext } from "../../context/CompanyContext";
import { Accordion, AccordionTab } from "primereact/accordion";

const CreateDialog = (props) => {
  let emptyCompany = {
    cnpj: "",
    openingDate: null,
    companyName: "",
    tradingName: "",
    cnae: "",
    legalNature: "",
    financeCapital: 0,
    address: {
      cep: "",
      street: "",
      bairro: "",
      number: 0,
      city: "",
    },
  };

  const { data, CreateCompany } = useAxios("Company");
  const { companyDialog, setCompanyDialog } = useContext(CompanyContext);

  const [company, setCompany] = useState(emptyCompany);
  const [companies, setCompanies] = useState(data);
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState(null);

  const hideDialog = () => {
    setSubmitted(false);
    setCompanyDialog(false);
  };

  const saveCompany = () => {
    setSubmitted(true);
    console.log(company.openingDate);
    // company.openingDate = "2001-05-03"; //date-fns
    CreateCompany(company);
    // if (company.name.trim()) {
    // let _companies = [...companies];
    // let _company = { ...company };

    // if (company.id) {
    //     const index = findIndexById(company.id);

    //     _companies[index] = _company;
    //     toast.current.show({
    //         severity: "success",
    //         summary: "Successful",
    //         detail: "Product Updated",
    //         life: 3000,
    //     });
    // } else {
    //     _company.id = createId();
    //     _companies.push(company);
    //     toast.current.show({
    //         severity: "success",
    //         summary: "Successful",
    //         detail: "Product Created",
    //         life: 3000,
    //     });
    // }
    // }

    // setCompanies(_companies);
    setCompanyDialog(false);
    setCompany(emptyCompany);
  };

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

  const companyDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveCompany} />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Dialog
        visible={companyDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Create Company"
        modal
        className="p-fluid"
        footer={companyDialogFooter}
        onHide={hideDialog}
      >
        {/* cnpj */}
        <div className="field">
          <label htmlFor="cnpj" className="font-bold">
            CNPJ
          </label>
          <InputText
            id="cnpj"
            value={company.cnpj}
            onChange={(e) => onInputChange(e, "cnpj")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !company.name,
            })}
          />
          {submitted && !company.cnpj && (
            <small className="p-error">Name is required.</small>
          )}
        </div>

        {/* openingDate */}
        <div className="field">
          <label htmlFor="openingDate" className="font-bold">
            Data de abertura
          </label>
          <Calendar
            id="openingDate"
            value={company.openingDate}
            onChange={(e) => onInputChange(e, "openingDate")}
            dateFormat="dd/mm/yy"
            showIcon
          />
        </div>

        {/* companyName */}
        <div className="field">
          <label htmlFor="companyName" className="font-bold">
            Nome da Empresa
          </label>
          <InputText
            id="companyName"
            value={company.companyName}
            onChange={(e) => onInputChange(e, "companyName")}
            autoFocus
          />
        </div>

        {/* tradingName */}
        <div className="field">
          <label htmlFor="tradingName" className="font-bold">
            Nome Fantazia
          </label>
          <InputText
            id="tradingName"
            value={company.tradingName}
            onChange={(e) => onInputChange(e, "tradingName")}
            autoFocus
          />
        </div>

        {/* cnae */}
        <div className="field">
          <label htmlFor="cnae" className="font-bold">
            CNAE
          </label>
          <InputText
            id="cnae"
            value={company.cnae}
            onChange={(e) => onInputChange(e, "cnae")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !company.cnae,
            })}
          />
          {submitted && !company.cnae && (
            <small className="p-error">cnae is required.</small>
          )}
        </div>

        {/* legalNature */}
        <div className="field">
          <label htmlFor="legalNature" className="font-bold">
            Naturesa legal
          </label>
          <InputText
            id="legalNature"
            value={company.legalNature}
            onChange={(e) => onInputChange(e, "legalNature")}
            autoFocus
          />
        </div>

        {/* financeCapital */}
        <div className="field col">
          <label htmlFor="financeCapital" className="font-bold">
            Capital Financeiro
          </label>
          <InputNumber
            id="financeCapital"
            // value={company.financeCapital}
            onValueChange={(e) => onInputNumberChange(e, "financeCapital")}
            mode="currency"
            currency="BRL"
            locale="pt-RS"
          />
        </div>

        <div>
          <Accordion>
            <AccordionTab header="Endereço">
              {/* cep */}
              <div className="field">
                <label htmlFor="cep" className="font-bold">
                  CEP
                </label>
                <InputText
                  id="companyName"
                  value={company.address.cep}
                  onChange={(e) => onInputChange(e, "cep")}
                  autoFocus
                />
              </div>

              {/* street */}
              <div className="field">
                <label htmlFor="street" className="font-bold">
                  Rua
                </label>
                <InputText
                  id="street"
                  value={company.address.street}
                  onChange={(e) => onInputChange(e, "street")}
                  autoFocus
                />
              </div>

              {/* bairro */}
              <div className="field">
                <label htmlFor="bairro" className="font-bold">
                  Bairro
                </label>
                <InputText
                  id="bairro"
                  value={company.address.bairro}
                  onChange={(e) => onInputChange(e, "bairro")}
                  autoFocus
                />
              </div>

              <div className="field">
                <label htmlFor="city" className="font-bold">
                  Cidade
                </label>
                <InputText
                  id="city"
                  value={company.address.city}
                  onChange={(e) => onInputChange(e, "city")}
                  autoFocus
                />
              </div>

              <div className="field col">
                <label htmlFor="number" className="font-bold">
                  Numero
                </label>
                <InputNumber
                  id="number"
                  value={company.address.number}
                  onValueChange={(e) => onInputNumberChange(e, "number")}
                />
              </div>
            </AccordionTab>
          </Accordion>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateDialog;
