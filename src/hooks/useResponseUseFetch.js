import { useEffect, useState } from "react";
import { fetchData } from "../services/apiServices";
// Response ile data içinde veri dönen api endpointlerinde kullanılacak olan hook 

const useResponseUseFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchData(endpoint);

        // API yanıtından `data` kısmını al
        if (response && response.data) {
          setData(response.data); // Sadece `data` kısmını set ediyoruz
        } else {
          throw new Error("No data found");
        }
      } catch (err) {
        setError(err);
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) {
      getData();
    }
  }, [endpoint]);

  return { data, loading, error };
};

export default useResponseUseFetch;
