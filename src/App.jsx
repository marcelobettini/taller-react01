import { useState, useEffect } from "react";
import { api_key } from "../api_key";
import Country from "./components/Country";
import Search from "./components/Search";
import "./App.css";
import Filter from "./components/Filter";
import LoadNext from "./components/LoadNext";

function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState(""); //null?
  const [filter, setFilter] = useState(""); //null?
  const [paginate, setPaginate] = useState(12);

  function search(items) {
    return items.filter(
      (item) =>
        item.subregion.includes(filter) &&
        search_params.some((parameter) =>
          item[parameter].toString().toLowerCase().includes(query.toLowerCase())
        )
    );
  }

  function load_next() {
    setPaginate((prevState) => prevState + 12);
  }

  useEffect(() => {
    const req_headers = new Headers();
    req_headers.append("Content-Type", "text/json");
    req_headers.append("Authorization", `Bearer ${api_key}`);
    const req_options = {
      method: "GET",
      headers: req_headers,
    };

    //get data from API
    fetch("https://countryapi.io/api/all", req_options)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoaded(true);
          setItems(result);
        },
        (error) => {
          setLoaded(true);
          setError(error);
        }
      );
  }, []);
  const data = Object.values(items);
  const search_params = Object.keys(Object.assign({}, ...data));
  const filter_items = [...new Set(data.map((item) => item.subregion))];
  if (error) {
    return <> {error.message}</>;
  } else if (!loaded) {
    return <>Carganding...</>;
  } else {
    return (
      <div className="wrapper">
        <Filter filter_items={filter_items} setFilter={setFilter} />
        <Search setQuery={setQuery} />
        <section className="card-grid">
          {search(data)
          .slice(0, paginate)
          .map((item) => (
            <Country key={item.alpha3Code} item={item} />
          ))}
        </section>
        <LoadNext load_next={load_next}/>
      </div>
    );
  }
}
export default App;
