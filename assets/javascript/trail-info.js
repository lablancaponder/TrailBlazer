$(document).ready(function() {
  // Checklist Array - Universal
  var universalChecklist = [
    "Water",
    "Extra food",
    "First aid kit",
    "Sunglasses"
  ];

  // Checklist Arrays - Weather
  var hotChecklist = ["Breathable layers", "Sunscreen", "Rain gear"];
  var coldChecklist = ["Warm clothing", "Hat", "Gloves"];
  var rainChecklist = ["Rain gear", "Towel"];

  // Checklist Arrays - Activity
  var bikingChecklist = [
    "Bicycle",
    "Spare tubes",
    "Pump",
    "Bike shoes",
    "Socks"
  ];
  var hikingChecklist = ["Appropriate footwear", "Backpack", "Socks"];
  var campingChecklist = [
    "Tent",
    "Sleeping bag",
    "Sleeping pad",
    "Camping chairs",
    "Fire starter",
    "Extra clothes"
  ];

  // User-defined checklist Array
  var userChecklist = [];

  var trailId = localStorage.getItem("id");
  var trailWidgetUrl = "https://www.hikingproject.com/widget?v=3&map=1&type=trail&id=" + trailId + "&x=-12333477&y=5431238&z=6"

  // Testing writing trail details from local storage
  $("#trail-name-cover").text(localStorage.getItem("name"));
  $("#trail-name-interior").text(localStorage.getItem("name"));
  $("#main-image").attr("src", localStorage.getItem("imageUrl"));
  // $("#trail-description").text(localStorage.getItem("summary"));
  $("#trail-widget").html("<iframe style='width:100%; max-width:1200px; height:410px;' frameborder='0' scrolling='no' src=" + trailWidgetUrl + "></iframe>");
  $("#condition-status").text(localStorage.getItem("conditionStatus"));
  $("#condition-details").text(localStorage.getItem("conditionDetails"));
  $("#condition-date").text(localStorage.getItem("conditionDate"));


  // Check weather and activity to display appropriate checklist arrays

  // Write array to checklist area (Using universalChecklist for testing)
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

  // Add checklist item to list from user input - Should we use local storage here ?????
  $("#submit-item").on("click", function(event) {
    event.preventDefault();

    // Get item from user input and store in variable
    var newItem = $("#add-item").val().trim();
    // Remove spaces from input to store in id value
    var newItemId = newItem.replace(/\s/g, "");
    // Write to DOM
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

    userChecklist.push(newItem);
    $("#checklist").append(checkListItem);
    $("#add-item").empty();

    // Add code to save added items locally

    console.log(userChecklist);
  });
});
