import { getBorderingCountryDetails, getCountryDetails } from "../services/api"
import { ArrowLeft } from "lucide-react"
import useNavigation from "../hooks/useNavigation"
import { useQuery } from "@tanstack/react-query";

const CountryDetails = () => {

  const { navigate } = useNavigation()

  const path = window.location.pathname
  const id = path.split('/').pop()

  const { data, isLoading, error} = useQuery({
    queryKey: ['country', id],
    queryFn: async () => {
      const res = await getCountryDetails(id)
      return res[0]
    }
  })

  const borderCodes = data?.borders || []

  const { data: borderingCountries = [], isLoading: bordersLoading } = useQuery({
    queryKey: ['borders', id],
    queryFn: () => getBorderingCountryDetails(borderCodes),
    enabled: borderCodes.length > 0
  })

  function handleClick(id){
    navigate(`/country/${id}`)
  }

  if(error) return <p className="error-state">{error.message}</p>
  if(isLoading) return <p className="loading-state">Loading country details...</p>

  const name = data.name?.common || 'N/A'
  const nativeName = data.name?.nativeName 
  ? Object.values(data.name.nativeName)[0]?.common 
  : data.name?.common;
  const currencies = data.currencies ? Object.values(data.currencies).map(cur => cur.name).join(', ') : 'N/A'
  const languages = data.languages ? Object.values(data.languages).join(', ') : 'N/A'
  const tld = data.tld?.join(', ') || 'N/A'

  return (
    <div className="country-details-container">
      <button type="button" onClick={() => window.history.back()} className="back-btn">
        <ArrowLeft size={15} />
        Back
      </button>

      <section className="info-container">
        <img 
          src={data?.flags?.svg} 
          alt={data?.flags?.alt || `Flag of ${name}`} 
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
                <span>{data.population?.toLocaleString('en-US')}</span>
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

              {
                bordersLoading ? 
                ( 
                  <span>Loading...</span> 
                ) :
                borderingCountries.length > 0 ? (
                borderingCountries.map(border => (
                  <button
                    type="button"
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