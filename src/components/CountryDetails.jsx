import { useState, useEffect } from "react"
import { getCountryDetails } from "../api"
import { ArrowLeft } from "lucide-react"

const CountryDetails = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const path = window.location.pathname
  const id = path.split('/').pop()

  useEffect(() => {
      
      async function fetchData(){
        setLoading(true)
        setError('')
        try {
          const data = await getCountryDetails(id)
          setData(data[0])
        } catch (error) {
          setError(error.message)
        } finally{
          setLoading(false)
        }
      }
      fetchData()
    }, [])

    function handleBackNav(){
      window.history.back()
    }

  if(error) return <p className="error-state">{error}</p>

  if(loading) return <p className="loading-state">Loading country details...</p>

  const name = data.name?.common || 'N/A'
  const nativeName = data.name?.nativeName 
  ? Object.values(data.name.nativeName)[0]?.common 
  : data.name?.common;
  const currencies = data.currencies ? Object.values(data.currencies).map(cur => cur.name).join(', ') : 'N/A'
  const languages = data.languages ? Object.values(data.languages).join(', ') : 'N/A'
  const tld = data.tld.join(', ') || 'N/A'

  return (
    <div className="country-details-container">
      <button onClick={handleBackNav} className="back-btn">
        <ArrowLeft size={15} />
        Back
      </button>

      <section className="details-section">
        <img src={data.flags.svg} alt={data.flags.alt || `Flag of ${name}`} />

        <h2>{name}</h2>

        <div className="top-details">
          <strong>Native Name: 
            <span>{nativeName}</span>
          </strong>
          <strong>Population: 
            <span>{data.population?.toLocaleString('eng-US')}</span>
          </strong>
          <strong>Region: 
            <span>{data.region}</span>
          </strong>
          <strong>Sub Region: 
            <span>{data.subregion}</span>
          </strong>
          <strong>Capital: 
            <span>{data.capital?.join(', ') || 'N/A'}</span>
          </strong>
        </div>

        <div className="bottom-details">
          <strong>Top Level Domain: 
            <span>{tld}</span>
          </strong>
          <strong>Currencies: 
            <span>
              {currencies}
            </span>
          </strong>
          <strong>Languages: 
            <span>{languages}</span>
          </strong>
        </div>

        <div className="border-countries">
          <h3>Border Countries:</h3>
        </div>

      </section>
      
    </div>
  )
}

export default CountryDetails