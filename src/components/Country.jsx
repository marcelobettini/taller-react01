import React from "react";
import  launchModal  from "../../utils/launchModal";

const Country = ({ item }) => {
  const handleDetails = () => {    
    launchModal(item)
  }
  return (
    <article className="card" onClick={handleDetails}>
      <div className="card-image">
        <img src={item.flag.large} alt={item.name} />
      </div>
      <div className="card-content">
        <h2 className="card-name">{item.name}</h2>
        <p>
          Official Name: <span>{item.official_name}</span>
        </p>
        <p>
          Region: <span>{item.region}</span>
        </p>
        <p>
          Subregion: <span>{item.subregion}</span>
        </p>
        <p>
          Capital: <span>{item.capital}</span>
        </p>
        <p>
          Languages: <span>{Object.values(item.languages).join(", ")}</span>
        </p>
      </div>
    </article>
  );
};

export default Country;
