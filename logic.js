//

const firebaseConfig = {
    apiKey: "AIzaSyCN01k3Tb9yCBnbJAy5zloiKYlaV-sBVrU",
    authDomain: "argon-bbc2e.firebaseapp.com",
    databaseURL: "https://argon-bbc2e.firebaseio.com",
    projectId: "argon-bbc2e",
    storageBucket: "argon-bbc2e.appspot.com",
    messagingSenderId: "719768225094",
    appId: "1:719768225094:web:6dbef24628269fcb871147"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#first-time-input").val().trim(), "HH:mm").format("HH:mm");
    var trainFrecuency = Number($("#frecuency-input").val().trim());

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: trainStart,
        frecuency: trainFrecuency
    }

    database.ref().push(newTrain);


    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFrecuency);

    

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frecuency-input").val("");


});

database.ref().on("child_added", function (childSnapshot) {

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrecuency = childSnapshot.val().frecuency;

    var firstTime = moment(trainStart, "HH:mm").subtract(1, "year");
    var frecuency = trainFrecuency;
    var diffTime = moment().diff(moment(firstTime), "minutes");
    var remainder = diffTime % frecuency;
    var minsAway = frecuency - remainder;
    var nextArrival = moment().add(minsAway, "minutes").format("hh:mm")

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrecuency),
        $("<td>").text(nextArrival),
        $("<td>").text(minsAway),
    )
    $("#train-table > tbody").append(newRow);


});