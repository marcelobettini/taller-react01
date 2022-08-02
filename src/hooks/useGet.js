import { useEffect, useState } from 'react';
const base_url = "https://countryapi.io/api/";
import { api_key } from "../../api_key";

const req_headers = new Headers();
req_headers.append("Content-Type", "text/json");
req_headers.append("Authorization", `Bearer ${api_key}`);

const req_options = {
  method: "GET",
  headers: req_headers,
};

export const useGet = (endpoint) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const getData = async (endpoint) => {
    try {
      const res = await fetch(base_url + endpoint, req_options);
      const data = await res.json();
      setItems(data);
      setLoaded(true);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(()=>{
    getData(endpoint);
  },[endpoint]);

  return [items, error, loaded];

}
