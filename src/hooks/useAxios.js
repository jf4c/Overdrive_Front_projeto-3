import { useState, useEffect } from "react";

export const useAxios = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetch = async (configApi) => {
    const { axiosInstance, method, url = "", requestConfig = {} } = configApi;
    try {
      setLoading(true);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
      });
      setData(res.data);
    } catch (err) {
      console.log(err.menssage);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    setData,
    loading,
    error,
    fetch,
  };
};
