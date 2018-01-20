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

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBEwnr_R2pjbyqaKWxKuSyQBtm3LbTdgS4",
    authDomain: "trailblazer-project.firebaseapp.com",
    databaseURL: "https://trailblazer-project.firebaseio.com",
    projectId: "trailblazer-project",
    storageBucket: "trailblazer-project.appspot.com",
    messagingSenderId: "615321105967"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

  // Initial Values
  var city = "";
  var trailName = "";
  var trailDescription = "";
  var trailThumbnailUrl = "";

  // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
  dataRef.ref("/trails/").on(
    "value",
    function(childSnapshot) {
      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().trailName);

      // Write trail name to <h1> tag
      $("#trail-name").text(childSnapshot.val().trailName);
      $(".weatherwidget-io").attr(
        "href",
        "https://forecast7.com/en/39d25n106d29/" +
          childSnapshot.val().trailCity +
          "/?unit=us"
      );
      $(".weatherwidget-io").attr(
        "data-label_1",
        childSnapshot.val().trailCity + ", " + childSnapshot.val().trailState
      );
      $("#cityState").text(
        childSnapshot.val().trailCity + ", " + childSnapshot.val().trailState
      );
      $(".locationName").text(
        childSnapshot.val().trailCity + ", " + childSnapshot.val().trailState
      );
      $(".weatherInfo").attr(
        "href",
        "//forecast7.com/en/39d25n106d29/" +
          childSnapshot.val().trailCity +
          "/?unit=us"
      );

      // Handle the errors
    },
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );

  // Check weather and activity (from Firebase) to display appropriate checklist arrays

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
    var newItem = $("#add-item")
      .val()
      .trim();
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
