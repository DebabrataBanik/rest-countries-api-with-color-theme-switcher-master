const url = 'https://restcountries.com/v3.1/all?fields=name,capital,borders,languages,population,region,subregion,tld,currencies,flags'

export default async function getRestCountries(){
  const res = await fetch(url)
  if(!res.ok){
    throw new Error(`${res.status} - ${res.statusText}`)
  }
  const data = await res.json()
  return data
}