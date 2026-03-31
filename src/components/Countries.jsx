const Countries = ({data}) => {
  return (
    <div className="list-container">
      {
        data.map(item => {
          const name = item.name?.common || 'NA'
          const capital = item.capital?.[0] || 'NA'
          const region = item.region || 'NA'
          const population = item.population?.toLocaleString('en-US') || 0
          const imageSrc = item.flags?.svg
          const alt = item.flags?.alt || `Flag of ${name}`
          
          return (
            <article className="country-card" key={name}>
              <img 
                src={imageSrc} 
                alt={alt} 
                width={250} 
                height={150} 
                loading="lazy"
              />
              <div className="country-info">
                <h2>{name}</h2>
                <p>Population: <span>{population}</span></p>
                <p>Region: <span>{region}</span></p>
                <p>Capital: <span>{capital}</span></p>
              </div>
            </article>
          )
        })
      }
    </div>
  )
}

export default Countries