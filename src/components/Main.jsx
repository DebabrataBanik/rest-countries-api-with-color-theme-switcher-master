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
  const [countries, setCountries] = useState([])
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
        setCountries(sortedData)
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

  const displayCountriesData = getFilterandSearchData(countries, filterRegion, inputSearch)

  return (
    <main>

      {
        currentPath.includes('country') 
        ?
        <CountryDetails setCurrentPath={setCurrentPath} />
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
                  <button type="button" onClick={clearFilter}> 
                    Clear filter
                  </button>
                </p>
              } 
            </div>
          </form>
          
          
          <section 
            className="country-list-wrapper"
            aria-label="Country Results"
          >
            <h2 className="sr-only">Country List</h2>
            {error && <p className="error-state" role="alert">{error}</p>}

            {!error && loading && <p className="loading-state">Loading countries...</p>}

            {
              !error && !loading && (
                displayCountriesData.length > 0 ?
                <Countries setCurrentPath={setCurrentPath} countries={displayCountriesData} />
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
