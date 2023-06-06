import { useState, useEffect } from "react";
import axios from "../config/axios.config";

export const useAxios = () => {
  const [data, setData] = useState([]);
  const [company, setCompany] = useState({});
  const [people, setPeople] = useState([]);

  // useEffect(() => {
  //     axios.get(url).then((res) => {
  //         setData(res.data);
  //     });
  // }, []);

  const getData = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch();
  };

  // const getCompanyByCNPJ = async (url, cnpj) => {
  //   await axios
  //     .get(`${url}/${cnpj}`)
  //     .then((res) => {})
  //     .catch();
  // };

  const getPeopleInCompany = (url, id) => {
    axios
      .get(`${url}/${id}`)
      .then((res) => {
        setPeople(res.data.peoples);
        console.log(res.data.peoples);
        console.log(people);
      })
      .catch();
  };

  const delById = async (url, id) => {
    await axios.delete(`${url}/${id}`);
  };

  const createCompany = async (url, company) => {
    await axios.post(url, company, {
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
  };

  return {
    data,
    createCompany,
    getData,
    delById,
    getPeopleInCompany,
    people,
  };
};
