import { Dialog } from "primereact/dialog";
import React, { useState, useRef, useEffect } from "react";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import "primeicons/primeicons.css";
import { useAxios } from "../../../../hooks/useAxios";
import { useContext } from "react";
import { CompanyContext } from "../../context/CompanyContext";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import {
  Bairro,
  CNAE,
  CNPJ,
  Cep,
  City,
  Date,
  Div,
  Finance,
  Name,
  Nature,
  Number,
  Street,
  Address,
  Company,
} from "./styles";
import { useAddress } from "../../../../hooks/useAdrress";

const CreateDialog = (props) => {
  let emptyCompany = {
    cnpj: null,
    openingDate: null,
    companyName: null,
    tradingName: null,
    cnae: null,
    legalNature: null,
    financeCapital: null,
    address: {
      cep: null,
      street: null,
      bairro: null,
      number: null,
      city: null,
    },
  };

  const { data, createCompany, getData } = useAxios();
  const { address, getAdrres } = useAddress();
  const { companyDialog, setCompanyDialog } = useContext(CompanyContext);
  const [company, setCompany] = useState(emptyCompany);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);

  const hideDialog = () => {
    setSubmitted(false);
    setCompanyDialog(false);
    setCompany(emptyCompany);
  };

  const saveCompany = () => {
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

      hideDialog();
    } else {
      toast.current.show({
        severity: "error",
        summary: "Erro",
        detail: "Empresa nao foi Criada",
        life: 3000,
      });
    }
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

  const onInputAddressChange = (e, name) => {
    const value = e.target.value || "";
    let _company = { ...company };
    let _address = { ...company.address };

    if (name.includes("cep")) {
      getAdrres(value);
      _address[`street`] = address.logradouro;
      _address[`bairro`] = address.bairro;
      _address[`city`] = address.localidade;

      _company["address"] = _address;
      console.log(address);
      setCompany(_company);
    }
    _address[`${name}`] = value;
    _company["address"] = _address;
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
      <Toast ref={toast} />
      <Dialog
        visible={companyDialog}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Create Company"
        modal
        className="p-fluid"
        footer={companyDialogFooter}
        onHide={hideDialog}
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
          <Date className="field">
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
          </Date>

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
                onValueChange={(e) => onInputNumberChange(e, "financeCapital")}
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
                mask="99999-999"
                unmask={true}
                // autoClear={false}
                onChange={(e) => onInputAddressChange(e, "cep")}
              />
              <label htmlFor="cep">CEP</label>
            </span>
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
    </React.Fragment>
  );
};

export default CreateDialog;
