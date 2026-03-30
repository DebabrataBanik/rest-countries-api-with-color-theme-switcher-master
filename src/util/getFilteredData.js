export default function getFilteredData(data, region){
  if(!region) return data
  if(region === 'america'){
    return data.filter(item => item.region.toLowerCase() === 'americas')
  }
  return data.filter(item => item.region.toLowerCase() === region)
}