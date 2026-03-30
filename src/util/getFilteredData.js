export default function getFilteredData(data, region){
  if(!region) return data

  return data.filter(countryObj => countryObj.region?.toLowerCase().includes(region))
}