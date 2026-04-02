import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { getRestCountries } from "../api";
import Countries from "./Countries";
import CountryDetails from "./CountryDetails";
import getSortedData from "../util/getSortedData";
import getFilterandSearchData from "../util/getFilterandSearchData";

const Main = () => {

  const [inputSearch, setInputSearch] = useState('')
  const [filterRegion, setFilterRegion] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    
    async function fetchData(){
      setLoading(true)
      setError('')
      try {
        const data = await getRestCountries()
        const sortedData = getSortedData(data)
        setData(sortedData)
      } catch (error) {
        setError(error.message)
      } finally{
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePathChange)
    return () => window.removeEventListener('popstate', handlePathChange)
  }, [])

  function clearFilter(){
    setFilterRegion('')
  }

  const displayCountriesData = getFilterandSearchData(data, filterRegion, inputSearch)

  return (
    <main>

      {
        currentPath.includes('country') 
        ?
        <CountryDetails countryList={data} setCurrentPath={setCurrentPath} />
        :
        <>
          <div className="topbar-container">
            <label className="country-label" htmlFor="country">
              <input 
                id="country"
                type="text" 
                name="country" 
                placeholder="Search for a country..."
                value={inputSearch}
                onChange={e => setInputSearch(e.target.value)}
              />
              <SearchIcon size={17} className="search-icon" />
            </label>

            <div className="filter-container">
              <label className="filter-label" htmlFor="filter">
                <select 
                  name="filter" 
                  id="filter"
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
                <ChevronDown size={15} className="down-icon" />
              </label>
              { 
                filterRegion &&
                <p className="clear"> 
                  <button onClick={clearFilter}> 
                  Clear filter
                  </button>
                </p>
              } 
            </div>
          </div>
          
          
          <section className="country-list-wrapper">
            {error && <p className="error-state">{error}</p>}

            {!error && loading && <p className="loading-state">Loading countries...</p>}

            {
              !error && !loading && (
                displayCountriesData.length > 0 ?
                <Countries setCurrentPath={setCurrentPath} data={displayCountriesData} />
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
