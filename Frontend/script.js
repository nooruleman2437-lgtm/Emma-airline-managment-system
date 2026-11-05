function showMessage() {
    alert("Welcome to SkyWay Airlines! Explore our available flights.");
}


function searchFlight() {

    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let date = document.getElementById("date").value;

    let result = document.getElementById("result");

    if (from === "" || to === "" || date === "") {

        result.innerHTML = "Please enter From, To and Date.";

        result.style.color = "red";

    } else {

        result.innerHTML =
            "Flights available from " +
            from +
            " to " +
            to +
            " on " +
            date;

        result.style.color = "green";
    }
}