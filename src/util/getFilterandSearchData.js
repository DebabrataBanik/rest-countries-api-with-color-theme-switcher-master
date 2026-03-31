export default function getFilterAndSearchData(data, region, searchQuery){
  const countryQuery = searchQuery.toLowerCase()

  return data.filter(item => {
    const matchedRegion = item.region?.toLowerCase().includes(region)

    const matchedSearch = item.name?.common?.toLowerCase().includes(countryQuery)

    return matchedRegion && matchedSearch
  })
}