import { useState, useEffect } from "react"
import { getCountryDetails } from "../api"
import { ArrowLeft } from "lucide-react"

const CountryDetails = ({countryList, setCurrentPath}) => {

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
  }, [id])

  function handleClick(id){
    setCurrentPath(`/country/${id}`)
    window.history.pushState({}, '', id)
  }

  if(error) return <p className="error-state">{error}</p>
  if(loading) return <p className="loading-state">Loading country details...</p>

  const borderCodes = data.borders || []; 
  const borderCountries = countryList.filter(item => 
    borderCodes.includes(item.cca3)
  );

  const name = data.name?.common || 'N/A'
  const nativeName = data.name?.nativeName 
  ? Object.values(data.name.nativeName)[0]?.common 
  : data.name?.common;
  const currencies = data.currencies ? Object.values(data.currencies).map(cur => cur.name).join(', ') : 'N/A'
  const languages = data.languages ? Object.values(data.languages).join(', ') : 'N/A'
  const tld = data.tld?.join(', ') || 'N/A'

  return (
    <div className="country-details-container">
      <button onClick={() => window.history.back()} className="back-btn">
        <ArrowLeft size={15} />
        Back
      </button>

      <section className="info-container">
        <img 
          src={data.flags.svg} 
          alt={data.flags.alt || `Flag of ${name}`} 
          width={500}
          height={333}
        />

        <div className="details-section">
          <h2>{name}</h2>

          <div className="details">
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
          </div>

          <div className="border-countries-container">
            <h3>Border Countries:</h3>
            <div className="countries">
              {borderCountries.length > 0 ? (
                borderCountries.map(border => (
                  <button 
                    key={border.cca3} 
                    className="country-btn"
                    onClick={() => handleClick(border.cca3)}
                  >
                    {border.name.common}
                  </button>
                ))
              ) : (
                <span>No bordering countries</span>
              )}
            </div>
          </div>
        </div>

      </section>
      
    </div>
  )
}

export default CountryDetails