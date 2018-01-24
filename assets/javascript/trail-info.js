$(document).ready(function() {
  // Checklist Array - Universal
  var universalChecklist = [
    "Water",
    "Extra food",
    "Clothing layers",
    "First aid kit",
    "Sunglasses",
    "Sunscreen"
  ];

  // Create Variables for Weather Widget From Local Storage
  var weatherLatitude = parseFloat(localStorage.getItem('cityLat')).toFixed(2).replace('.', 'd');
  console.log(weatherLatitude);
  var weatherLongitude = parseFloat(localStorage.getItem('cityLong')).toFixed(2).replace('.', 'd').replace('-', 'n');
  console.log(weatherLongitude);
  var weatherCity = localStorage.getItem('cityName').toLowerCase().replace(/ /g, '-');
  console.log(weatherCity);
  var weatherCityUpper = weatherCity.toUpperCase().replace(/-/g, ' ');
  console.log(weatherCityUpper);

  // Dynamically Updates Weather Widget in HTML
  $('.weather-widget').html('<a class="weatherwidget-io" href="https://forecast7.com/en/' + weatherLatitude + weatherLongitude + '/' + weatherCity + '/" data-label_1="' + weatherCityUpper + '" data-label_2="WEATHER" data-font="Roboto" data-icons="Climacons Animated" data-theme="mountains">' + weatherCityUpper + ' WEATHER</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://weatherwidget.io/js/widget.min.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","weatherwidget-io-js");</script>')

  // User-defined checklist Array
  var userChecklist = [];

  var trailId = localStorage.getItem("id");
  var trailWidgetUrl = "https://www.hikingproject.com/widget?v=3&map=1&type=trail&id=" + trailId + "&x=-12333477&y=5431238&z=6"

  // Testing writing trail details from local storage
  $("#trail-name-cover").prepend(localStorage.getItem("name"));
  $("#trail-name-interior").prepend(localStorage.getItem("name"));
  $("#main-image").attr("src", localStorage.getItem("imageUrl"));
  // $("#trail-description").text(localStorage.getItem("summary"));
  $("#trail-widget").html("<iframe style='width:100%; max-width:1200px; height:410px;' frameborder='0' scrolling='no' src=" + trailWidgetUrl + "></iframe>");

  if (localStorage.getItem("conditionStatus") !== "Unknown") {
    $("#trail-conditions").html("<h3>Reported Trail Conditions:</h3><p id='condition-status'><strong>Condition Status:</strong> " + localStorage.getItem('conditionStatus') + "</p><p id='condition-details'><strong>Condition Details:</strong> " + localStorage.getItem('conditionDetails') + "</p><p id='condition-date'><strong>Date Reported:</strong> " + localStorage.getItem('conditionDate') + "</p><br>");
  }

  // Write universalChecklist array to checklist area
  for (var i = 0; i < universalChecklist.length; i++) {
    // Remove spaces from item to store in id value
    var newItemId = universalChecklist[i].replace(/\s/g, "");
    // Write to DOM
    var checkListItem = $("<p>");
    var newInputItem = $("<input>");
    newInputItem.attr("type", "checkbox");
    newInputItem.addClass("checkbox");
    newInputItem.attr("id", newItemId);

    var labelTag = $("<label>");
    labelTag.attr("for", newItemId);
    labelTag.addClass("checklist-item");
    labelTag.append(universalChecklist[i]);
    checkListItem.append(newInputItem);
    checkListItem.append(labelTag);

    $("#checklist").append(checkListItem);
  }

  function writeUserChecklist() {
    var localList = JSON.parse(localStorage.getItem("userChecklist"));

    if (localList != null) {

      for (var i = 0; i < localList.length; i++) {
        // Remove spaces from item to store in id value
        var newItemId = localList[i].replace(/\s/g, "");
        // Write to DOM
        var checkListItem = $("<p>");
        var newInputItem = $("<input>");
        newInputItem.attr("type", "checkbox");
        newInputItem.addClass("checkbox");
        newInputItem.attr("id", newItemId);

        var labelTag = $("<label>");
        labelTag.attr("for", newItemId);
        labelTag.addClass("checklist-item");
        labelTag.append(localList[i]);
        checkListItem.append(newInputItem);
        checkListItem.append(labelTag);

        $("#checklist").append(checkListItem);
      }
    }
  }

  writeUserChecklist();

  // Add checklist item to list from user input
  $("#submit-item").on("click", function(event) {
    event.preventDefault();

    // Get item from user input and store in variable - clear input
    var newItem = $("#add-item").val().trim();
    $("#add-item").val("");

    // Check for locally saved inputs, add new todo to our local list variable and adding it to local storage
    userChecklist = JSON.parse(localStorage.getItem("userChecklist"));
    userChecklist.push(newItem);
    localStorage.setItem("userChecklist", JSON.stringify(userChecklist));

    // Remove spaces from input to store in id value
    var newItemId = newItem.replace(/\s/g, "");
    // // Write to DOM
    var checkListItem = $("<p>");
    var newInputItem = $("<input>");
    newInputItem.attr("type", "checkbox");
    newInputItem.addClass("checkbox");
    newInputItem.attr("id", newItemId);

    var labelTag = $("<label>");
    labelTag.attr("for", newItemId);
    labelTag.addClass("checklist-item");
    labelTag.append(newItem);
    checkListItem.append(newInputItem);
    checkListItem.append(labelTag);

    $("#checklist").append(checkListItem);
    // writeUserChecklist();

  });
});
