import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { getRestCountries } from "../services/api";
import Countries from "./Countries";
import CountryDetails from "./CountryDetails";
import getSortedData from "../util/getSortedData";
import getFilterandSearchData from "../util/getFilterandSearchData";
import useNavigation from "../hooks/useNavigation";
import CountriesSkeleton from "./skeletons/CountriesSkeleton";
import { useQuery } from "@tanstack/react-query";

const Main = () => {

  const [inputSearch, setInputSearch] = useState('')
  const [filterRegion, setFilterRegion] = useState('')
  const { currentPath } = useNavigation()

  const { data: countries = [], isLoading, error } = useQuery({
    queryKey: ['countries'], 
    queryFn: async () => {
      const data = await getRestCountries()
      return getSortedData(data)
    } 
  })

  const displayData = getFilterandSearchData(countries, filterRegion, inputSearch)

  return (
    <main>

      {
        currentPath.includes('country') 
        ?
        <CountryDetails />
        :
        <>
          <form 
            className="topbar-container"
            role="search"
            onSubmit={e => e.preventDefault()}
          >
            <label className="country-label">
              <span className="sr-only">Search for a country</span>
              <input 
                type="text" 
                name="country" 
                placeholder="Search for a country..."
                value={inputSearch}
                onChange={e => setInputSearch(e.target.value)}
              />
              <SearchIcon size={17} className="search-icon" aria-hidden="true" />
            </label>

            <div className="filter-container">
              <label className="filter-label">
                <span className="sr-only">Filter by Region</span>
                <select 
                  name="filter"
                  value={filterRegion}
                  onChange={e => setFilterRegion(e.target.value)}
                  aria-label="Filter countries by region"
                >
                  <option value='' disabled hidden>Filter by Region</option>
                  <option value="africa">Africa</option>
                  <option value="america">America</option>
                  <option value="asia">Asia</option>
                  <option value="europe">Europe</option>
                  <option value="oceania">Oceania</option>
                </select>
                <ChevronDown size={15} className="down-icon" aria-hidden='true' />
              </label>
              { 
                filterRegion &&
                <p className="clear"> 
                  <button 
                    type="button" 
                    onClick={() => setFilterRegion('')}
                  > 
                    Clear filter
                  </button>
                </p>
              } 
            </div>
          </form>
          
          
          <section 
            className="country-list-wrapper"
            aria-label="Country Results"
            aria-busy={isLoading}
          >
            <h2 className="sr-only">Country List</h2>
            {error && <p className="error-state" role="alert">{error.message}</p>}

            {!error && isLoading && (
              <>
                <CountriesSkeleton />
                <span className="sr-only" role="status">Loading countries...</span>
              </>
            )}

            {
              !error && !isLoading && (
                displayData.length > 0 ?
                <Countries countries={displayData} />
                :
                <p className="empty-state">No countries found.</p>
              )
            }
          </section>
        </>
      
      }
      
    </main>
  );
};

export default Main;
