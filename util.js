// Date to key
function date2Key(date) {
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  return year * 10000 + month * 100 + day
}

function key2Date(key) {
  if(key < 10000000 || key > 99999999) return new Date()
  let year = parseInt(key / 10000)
  let month = parseInt((key - year * 10000) / 100)
  let day = parseInt(key - year * 10000 - month * 100)
  return new Date(year, month - 1, day)
}

function countDay(date1, date2) {
  return (date1 - date2) / 24 / 60 / 60 / 1000
}