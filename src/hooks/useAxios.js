import { useState, useEffect } from "react";
import axios from "../config/axios.config";

export const useAxios = () => {
  // const [data, setData] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [company, setCompany] = useState({});
  const [people, setPeople] = useState([]);
  const [status, setStatus] = useState("");
  const [err, setErr] = useState(0);

  const getCompanies = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        setCompanies(res.data);
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
    try {
      const res = await axios.put(`${url}/${id}`, {
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
      });
      setStatus(res.status);
    } catch {}
  };

  return {
    companies,
    getCompanies,
    setCompanies,
    status,
    createCompany,
    updateCompany,
    delById,
    changeStatus,
    getPeopleInCompany,
    people,
  };
};
