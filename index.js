var tbody = document.querySelector("tbody");
var date = document.querySelector("#date");
var city = document.querySelector("#city");
var searchBtn = document.querySelector("#search");
var selState = document.querySelector("#selState");
var selCountry = document.querySelector("#selCountry");
var selShape = document.querySelector("#selShape");

// Set filteredAddresses to addressData initially
var filtered = dataSet;

var countries = filtered.map(x => x.country);
var uniqueCountries = [...new Set(countries)];

for (var c = 0; c < uniqueCountries.length; c++) {
  var opt = document.createElement("option");
  opt.innerText = uniqueCountries[c];
  selCountry.appendChild(opt);
}

var shapes = filtered.map(x => x.shape);
var uniqueShapes = [...new Set(shapes)];

for (var c = 0; c < uniqueShapes.length; c++) {
  var opt = document.createElement("option");
  opt.innerText = uniqueShapes[c];
  selShape.appendChild(opt);
}

var states = filtered.map(x => x.state);
var uniqueStates = [...new Set(states)];

for (var c = 0; c < uniqueStates.length; c++) {
  var opt = document.createElement("option");
  opt.innerText = uniqueStates[c];
  selState.appendChild(opt);
}


// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
searchBtn.addEventListener("click", handleSearchButtonClick);

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  tbody.innerHTML = "";
  for (var i = 0; i < filtered.length; i++) {
    // Get get the current address object and its fields
    var date = filtered[i];
    var fields = Object.keys(date);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var row = tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var cell = row.insertCell(j);
      cell.innerText = date[field];
    }
  }
}

function handleSearchButtonClick() {
  var filter = {};
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  if (date.value != "") {
    var day = date.value.slice(0, 2);
    var month = date.value.slice(3, 5);
    if (day<10) {
      var newDay = day.slice(1,2);
    } else {
      newDay = day
    }
    if (month<10) {
      var newMonth = month.slice(1,2);
    } else{
      newMonth = month
    }
    var year = date.value.slice(6, 10);

    var filterDate = (newDay + "/" + newMonth + "/" + year);

    filter["datetime"] = filterDate;
  }  
  if (city.value != "") {
    var filterCity = city.value.trim().toLowerCase();
    filter["city"] = filterCity;
  }

  var country = selCountry.options[selCountry.selectedIndex].text;
  if (country != "All") {
    filter["country"] = country;
  }

  var state = selState.options[selState.selectedIndex].text;
  if (state != "All") {
    filter["state"] = state;
  }

  var shape = selShape.options[selShape.selectedIndex].text;
  if (shape != "All") {
    filter["shape"] = shape;
  }

  console.log(filter);

  filtered = filtered.filter(function(item) {
    for (var key in filter) {
      if (item[key] === undefined || item[key] != filter[key])
        return false;
    }
    return true;
  });
  
  console.log(filtered);

    // // Set filteredAddresses to an array of all addresses whose "state" matches the filter
    // filtered = dataSet.filter(function(date) {
    //   var newDate = date.datetime;

    //   // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    //   return newDate == filterDate;
    // });
    renderTable();
}

// Render the table for the first time on page load
renderTable();




