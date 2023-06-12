import { useState, useEffect } from "react";
import axios from "../config/axios.config";

export const useAxios = () => {
  const [data, setData] = useState([]);
  const [company, setCompany] = useState({});
  const [people, setPeople] = useState([]);

  const getData = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch();
  };

  const createCompany = async (url, company) => {
    await axios.post(url, company, {
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
  };

  const updateCompany = async (url, company) => {
    await axios.put(url, company, {
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
  };

  const getPeopleInCompany = async (url, id) => {
    await axios
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

  const changeStatus = async (url, id) => {
    await axios.put(`${url}/${id}`, {
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
  };

  return {
    data,
    getData,
    createCompany,
    updateCompany,
    delById,
    changeStatus,
    getPeopleInCompany,
    people,
  };
};
