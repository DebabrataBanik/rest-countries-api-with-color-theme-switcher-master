const api = 'https://restcountries.com/v3.1'

export async function getRestCountries(){
  const url = `${api}/all?fields=name,capital,cca3,region,population,flags`
  const res = await fetch(url)
  if(!res.ok){
    throw new Error(`${res.status} - ${res.statusText}`)
  }
  const data = await res.json()
  return data
}

export async function getCountryDetails(id){
  const url = `${api}/alpha/${id}`
  const res = await fetch(url)
  if(!res.ok){
    throw new Error(`${res.status} - ${res.statusText}`)
  }
  const data = await res.json()
  return data
} 

export async function getBorderingCountryDetails(borderCodesArr){
  if (!borderCodesArr.length) return []
  const url = `${api}/alpha?codes=${borderCodesArr.join(',')}`
  const res = await fetch(url)
  if(!res.ok){
    throw new Error(`${res.status} - ${res.statusText}`)
  }
  const data = await res.json()
  return data
}