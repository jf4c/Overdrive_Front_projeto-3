import { useState, useEffect } from "react";
import axios from "../config/axios.config";

export const useAxios = (url) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(url).then((res) => {
            setData(res.data);
        });
    }, []);

    // const del = (id) => {
    //     axios.delete(`/v1/Company/${id}`);
    // };

    const CreateCompany = (company) => {
        axios.post(url, company, {
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
            },
        });
    };

    return { data, CreateCompany };
};
