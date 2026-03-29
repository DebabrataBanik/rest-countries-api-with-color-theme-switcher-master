import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";

const Main = () => {

  const [countryName, setCountryName] = useState('')
  const [filter, setFilter] = useState('')

  return (
    <main>
      <label className="country-label" htmlFor="country">
        <input 
          id="country"
          type="text" 
          name="country" 
          placeholder="Search for a country..."
          value={countryName}
          onChange={e => setCountryName(e.target.value)}
        />
        <SearchIcon size={17} className="search-icon" />
      </label>

      <label className="filter-label" htmlFor="filter">
        <ChevronDown size={15} className="down-icon" />
        <select 
          name="filter" 
          id="filter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value='' disabled hidden>Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </label>

      <section>
        {/* render country list */}
      </section>
      
    </main>
  );
};

export default Main;
