const bookingForm = document.getElementById("bookingForm");

const bookingMessage =
    document.getElementById("bookingMessage");

//This section detects when the user submits the booking form and prevents the page from refreshing
bookingForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    // Get form values
//Here, we collect all booking details from the HTML form and store them in JavaScript variables
    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const phone =
        document.getElementById("phone").value;

    const passengers =
        document.getElementById("passengers").value;

    const from =
        document.getElementById("from").value;

    const to =
        document.getElementById("to").value;

    const date =
        document.getElementById("date").value;

    const travelClass =
        document.getElementById("class").value;


    // Check departure and destination

    if (from === to) {

        bookingMessage.textContent =
            "Departure and destination cannot be the same.";

        bookingMessage.style.color = "red";

        return;
    }


    try {
//Connecting frontend with backend using Fetch API
        const response = await fetch(
            "http://localhost:5000/api/bookings",
            {
                //"POST" sends booking data to the server
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },
//converts a JavaScript object into a JSON string when we send request by HTTP method we need conversion
                body: JSON.stringify({
// property name (the key).
//JavaScript variable (the value)
                    name: name,

                    email: email,

                    phone: phone,

                    passengers: Number(passengers),

                    from: from,

                    to: to,

                    date: date,

                    travelClass: travelClass

                })
            }
        );

//Receiving the backend response
        const data = await response.json();


        if (response.ok) {

            bookingMessage.textContent =
                data.message +
                " Booking ID: " +
                data.bookingId;

            bookingMessage.style.color = "green";

            bookingForm.reset();
//else Handling unsuccessful booking
        } else {

            bookingMessage.textContent =
                data.message;

            bookingMessage.style.color = "red";
        }


    } catch (error) {

        console.log(error);

        bookingMessage.textContent =
            "Unable to connect to the server.";

        bookingMessage.style.color = "red";
    }

});