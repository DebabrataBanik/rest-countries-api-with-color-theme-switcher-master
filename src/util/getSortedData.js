export default function getSortedData(data){
  
  return data.sort((a, b) => {
    const name1 = a.name.common
    const name2 = b.name.common

    return name1.localeCompare(name2)
  })
}