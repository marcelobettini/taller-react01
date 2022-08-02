import { useEffect, useState } from 'react';
import { API } from '../API';
export const useGet = (endpoint) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const getData = async (endpoint) => {
    try {
      const {data} = await API.get(endpoint);      
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
