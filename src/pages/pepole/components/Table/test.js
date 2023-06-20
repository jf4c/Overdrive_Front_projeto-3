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
</Editperson>;
