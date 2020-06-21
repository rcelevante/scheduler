$('#today').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm a'));

let timeSlot = {
    "8 AM": "",
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": ""
};

$(document).ready(function(){
    if(!localStorage.getItem('timeSlot')) {
      updateTasks(timeSlot);
    } else {
      updateTasks(JSON.parse(localStorage.getItem('timeSlot')));
    }
})

let counter = 1;
for(const property in timeSlot) {
  let textEntry = "#text-entry" + counter;
  $(textEntry).text(timeSlot[property]);
  let timeId = "#time" + counter;
  let currentHour = moment().hour();
  let timeString = $(timeId).text();
  let timeNumber = hourNumberFromHourString(timeString);  
  if(timeNumber < currentHour) {
    $(textEntry).addClass("past");
  } else if (timeNumber > currentHour) {
    $(textEntry).addClass("future");
  } else {
    $(textEntry).addClass("present");
  }
  counter ++;
}

$("button").click(function() {
  value = $(this).siblings("textarea").val();
  hourString = $(this).siblings("div").text();
  
  saveSchedule(hourString, value);
});

function hourNumberFromHourString(hourString) {
  switch(hourString) {
    case "8 AM": return 8;
    case "9 AM": return 9;
    case "10 AM": return 10;
    case "11 AM": return 11;
    case "12 PM": return 12;
    case "1 PM": return 13;
    case "2 PM": return 14;
    case "3 PM": return 15;
    case "4 PM": return 16;
    case "5 PM": return 17;
  }
}

function loadDataset() {
  result = localStorage.getItem('timeSlot')
  return (result ? result : timeSlot);
}

function startLocalStorage() {
  localStorage.setItem('timeSlot', JSON.stringify(timeSlot));
};

function saveLocalStorage(text) {
  localStorage.setItem('timeSlot', JSON.stringify(text));
}

function saveSchedule(hourString, val) {
  if(!localStorage.getItem('timeSlot')) {
    startLocalStorage();
  }

  let workTime = JSON.parse(localStorage.getItem('timeSlot'));
  workTime[hourString] = val

  saveLocalStorage(workTime);
}

function updateTasks(typedText) {
  $(".calendar-row").each(function(i) {
    let res = $(this).children("div");
    $(this).children("textarea").text(typedText[res.text()]);
  })
}
