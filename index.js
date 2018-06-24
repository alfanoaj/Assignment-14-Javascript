// declare variables to be used later in the document
var tbody = document.querySelector("tbody");
var date = document.querySelector("#date");
var city = document.querySelector("#city");
var searchBtn = document.querySelector("#search");
var clearBtn = document.querySelector("#clear");
var selState = document.querySelector("#selState");
var selCountry = document.querySelector("#selCountry");
var selShape = document.querySelector("#selShape");

// Set filteredAddresses to addressData initially
var filtered = dataSet;

// create a unique array of countries and set that list to the countries dropdown
var countries = filtered.map(x => x.country);
var uniqueCountries = [...new Set(countries)];
for (var c = 0; c < uniqueCountries.length; c++) {
  var opt = document.createElement("option");
  opt.innerText = uniqueCountries[c];
  selCountry.appendChild(opt);
}

// create a unique array of shapes and set that list to the shapes dropdown
var shapes = filtered.map(x => x.shape);
var uniqueShapes = [...new Set(shapes)];
for (var c = 0; c < uniqueShapes.length; c++) {
  var opt = document.createElement("option");
  opt.innerText = uniqueShapes[c];
  selShape.appendChild(opt);
}

// create a unique array of states and set that list to the states dropdown
var states = filtered.map(x => x.state);
var uniqueStates = [...new Set(states)];
for (var c = 0; c < uniqueStates.length; c++) {
  var opt = document.createElement("option");
  opt.innerText = uniqueStates[c];
  selState.appendChild(opt);
}

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
searchBtn.addEventListener("click", handleSearchButtonClick);

// renderTable renders the filtered to the tbody
function renderTable() {
  tbody.innerHTML = "";
  for (var i = 0; i < filtered.length; i++) {
    // Get get the current object and its fields
    var date = filtered[i];
    var fields = Object.keys(date);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var row = tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the  object, create a new cell at set its inner text to be the current value at the current field
      var field = fields[j];
      var cell = row.insertCell(j);
      cell.innerText = date[field];
    }
  }
}

// define a function to handle our search filters
function handleSearchButtonClick() {
  // declare an empty object to be appended later
  var filter = {};
  // format the date input so the user can use MM/DD/YYYY formatting
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

  // Appends filter with the user input into the city form. If the input is blank, do nothing
  if (city.value != "") {
    var filterCity = city.value.trim().toLowerCase();
    filter["city"] = filterCity;
  }

  // gets the current list item from the country dropdown option and appends filter. Does nothing if set to "All"
  var country = selCountry.options[selCountry.selectedIndex].text;
  if (country != "All") {
    filter["country"] = country;
  }

  // gets the current list item from the state dropdown option and appends filter. Does nothing if set to "All"
  var state = selState.options[selState.selectedIndex].text;
  if (state != "All") {
    filter["state"] = state;
  }

  // gets the current list item from the shape dropdown option and appends filter. Does nothing if set to "All"
  var shape = selShape.options[selShape.selectedIndex].text;
  if (shape != "All") {
    filter["shape"] = shape;
  }

  console.log(filter);

  // iterate through the keys in the filter object and filter our table accordingly
  filtered = filtered.filter(function(item) {
    for (var key in filter) {
      if (item[key] === undefined || item[key] != filter[key])
        return false;
    }
    return true;
  });
    renderTable();
}

// Render the table for the first time on page load
renderTable();




