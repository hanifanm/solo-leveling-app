// Date to key
function date2Key(date) {
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  return year * 10000 + month * 100 + day
}