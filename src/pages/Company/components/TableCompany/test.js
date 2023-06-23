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
          required
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
          value={company.cnpj}
          onChange={(e) => onInputChange(e, "cnpj")}
          required
          // autoClear={false}
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
</CreateCompany>;
