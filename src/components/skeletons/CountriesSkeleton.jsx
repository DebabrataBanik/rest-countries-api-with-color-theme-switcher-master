const CountriesSkeleton = () => {
  return (
    <div aria-hidden='true' className="list-container skeleton">
      {
        Array.from({length: 20}).map((_, idx ) => (
          <article key={idx} className="country-card">
            <div className="img-container"></div>
          </article>
        ))
      }
    </div>
  )
}

export default CountriesSkeleton