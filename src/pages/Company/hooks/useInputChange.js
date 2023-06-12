import { useContext, useEffect, useState } from "react";
import { useAddress } from "../../../hooks/useAdrress";
import { CompanyContext } from "../context/CompanyContext";

export const useInputChange = () => {
  const { emptyCompany, company, setCompany } = useContext(CompanyContext);
  const { address, getAdrres } = useAddress();
  const [cep, setCep] = useState(null);
  const [existCep, setExistCep] = useState(true);

  useEffect(() => {
    if (cep) {
      getAdrres(cep);
    }
  }, [cep]);

  // useEffect(() => {
  //   if (address) {
  //     const { street, bairro, city } = address;
  //     let _company = { ...company };
  //     let _address = { ...company.address };

  //     _address.street = street || "";
  //     _address.bairro = bairro || "";
  //     _address.city = city || "";

  //     _company.address = _address;
  //     setCompany(_company);
  //   }
  // }, [address]);

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

  const onChangeCep = (e) => {
    let _company = { ...company };
    let _address = { ...company.address };

    _address[`street`] = "";
    _address[`bairro`] = "";
    _address[`city`] = "";
    _company["address"] = _address;

    // console.log(_address);

    let _cep = e.target.value;
    if (_cep?.length != 8) {
      setExistCep(null);
      setCompany(_company);
      return;
    }

    setCep(_cep);
    if (Object.keys(address)?.length != 1) {
      _address[`cep`] = cep;
      _address[`street`] = address.logradouro;
      _address[`bairro`] = address.bairro;
      _address[`city`] = address.localidade;
      _company["address"] = _address;
      setExistCep(true);
    } else {
      setExistCep(false);
    }
    setCompany(_company);
    console.log(company);
    console.log(cep);
  };

  const onInputAddressChange = (e, name) => {
    const value = e.target.value || "";
    let _company = { ...company };
    let _address = { ...company.address };

    _address[`${name}`] = value;
    _company["address"] = _address;
    setCompany(_company);
    console.log(_company);
  };

  return {
    onInputChange,
    onInputNumberChange,
    onInputAddressChange,
    onChangeCep,
    cep,
    existCep,
  };
};
