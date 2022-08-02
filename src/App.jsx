import { useState  } from "react";
import { useGet } from "./hooks/useGet";

import Country from "./components/Country";
import Search from "./components/Search";
import "./App.css";
import Filter from "./components/Filter";
import LoadNext from "./components/LoadNext";

function App() {
  const [items, error, loaded] = useGet("all")

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
