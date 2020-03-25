const STORAGE_KEY = 'SoloLevelingData'
const LEVELING_FACTOR = 1.05

// Load data
let dataString = localStorage.getItem(STORAGE_KEY)
let data = dataString? JSON.parse(dataString) : []

// Retrieve or create today data
let today = new Date()
let todayKey = date2Key(today)
let todayData = data.find(data => data.day == todayKey)
if(!todayData) {
  let target = getTarget()
  todayData = {
    day : todayKey,
    puTarget : target.pu,
    puCount : 0,
    suTarget : target.su,
    suCount : 0,
  }
  data.push(todayData)
  save()
}

// Reload display
function reload() {
  $('#pu-count').text(todayData.puTarget - todayData.puCount)
  $('#su-count').text(todayData.suTarget - todayData.suCount)
}
reload()

// Set button listener
$('#pu-button').click(function() {
  todayData.puCount++
  save()
  reload()
})

$('#su-button').click(function() {
  todayData.suCount++
  save()
  reload()
})

// Save Data
function save() {
  let dataStr = JSON.stringify(data)
  localStorage.setItem(STORAGE_KEY, dataStr)
}

// Calculate 7 day average
function getTarget() {
  let pu = 0
  let su = 0
  for(let i=-7; i<=-1; i++) {
    let date = new Date()
    date.setDate(date.getDate() + i)
    let key = date2Key(date)
    let record = data.find(data => data.day == key)
    if(record) {
      pu += record.puCount
      su += record.suCount
    }
  }
  return {
    pu : Math.ceil(pu / 7 * LEVELING_FACTOR) + 1,
    su : Math.ceil(su / 7 * LEVELING_FACTOR) + 1,
  }
}