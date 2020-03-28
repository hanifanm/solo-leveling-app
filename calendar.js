const STORAGE_CALENDAR_KEY = 'SoloLevelingCalendarData'

// Load data
let calendarDataString = localStorage.getItem(STORAGE_CALENDAR_KEY)
let calendarData = calendarDataString ? JSON.parse(calendarDataString) : {}

// Load Calendar UI
function loadCalculation() {
  let todayKey = date2Key(new Date())
  let keys = Object.keys(calendarData)
    .map(keyStr => parseInt(keyStr))
    .filter(key => calendarData[key])
    .sort((a, b) => b - a)
  let sum = 0
  let n = 0
  console.log('Ranges')
  for (let i = 0, j = 1; i < keys.length, j < keys.length; i++ , j++) {
    console.log(`${keys[i]} -- ${keys[j]}`)
    let date1 = key2Date(keys[i])
    let date2 = key2Date(keys[j])
    let count = countDay(date1, date2)
    sum += count
    n += 1
  }
  let avg = n === 0? 0 : sum / n
  avg = avg.toPrecision(2)
  $('#calendar-target').text(avg)
  $('#calendar-count').text(keys[0] ? todayKey - keys[0] : 0)

}

function loadCalendarUI() {
  let calendarContainer = $('#calendar-container')
  calendarContainer.empty()
  for (let i = 0; i >= -59; i--) {
    let date = new Date()
    date.setDate(date.getDate() + i)
    let key = date2Key(date)
    let btnClass = "btn-primary"
    if (calendarData[key]) {
      btnClass = "btn-danger"
    }
    calendarContainer.append(`
    <div class="col-2 p-1">
      <button class="btn ${btnClass} btn-sm col-12"
        onclick="handleToggleCalendar(${key})">
        ${date.getDate()}
      </button>
    </div>
    `)
  }
  loadCalculation()
}
loadCalendarUI()

// Create click event

function handleToggleCalendar(dateKey) {
  if (prompt("Are you sure? Enter password:") === "sure") {
    if (calendarData[dateKey]) {
      calendarData[dateKey] = false
    } else {
      calendarData[dateKey] = true
    }
    loadCalendarUI()
  }
}

// Save Data
function saveCalendar() {
  let calendarDataStr = JSON.stringify(calendarData)
  localStorage.setItem(STORAGE_CALENDAR_KEY, calendarDataStr)
}

