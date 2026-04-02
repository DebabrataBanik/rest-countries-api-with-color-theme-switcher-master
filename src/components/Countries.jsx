const Countries = ({data, setCurrentPath}) => {

  function handleClick(e, id){
    e.preventDefault()
    setCurrentPath(`/country/${id}`)
    window.history.pushState({}, '', `country/${id}`)
  }

  return (
    <div className="list-container">
      {
        data.map(item => {
          const id = item.cca3
          const name = item.name?.common || 'N/A'
          const capital = item.capital?.[0] || 'N/A'
          const region = item.region || 'N/A'
          const population = item.population?.toLocaleString('en-US') ?? 0
          const imageSrc = item.flags?.svg
          const alt = item.flags?.alt || `Flag of ${name}`
          
          return (
            <article className="country-card" key={id || name}>
              <a
                href={`/country/${id}`}
                onClick={(e) => handleClick(e, id)}
              >
                <img 
                  src={imageSrc}
                  alt={alt} 
                  width={300}
                  height={180}
                  loading="lazy"
                />
                <div className="country-info">
                  <h2>{name}</h2>
                  <p>Population: <span>{population}</span></p>
                  <p>Region: <span>{region}</span></p>
                  <p>Capital: <span>{capital}</span></p>
                </div>
              </a>
            </article>
          )
        })
      }
    </div>
  )
}

export default Countries