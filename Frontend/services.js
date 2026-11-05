// =========================
// EXPLORE SERVICES BUTTON
// =========================

const exploreBtn =
    document.getElementById("exploreBtn");

exploreBtn.addEventListener("click", function () {

    document.getElementById("services").scrollIntoView({
        behavior: "smooth"
    });

});


// =========================
// SERVICE MODAL
// =========================

const modal =
    document.getElementById("serviceModal");

const closeModal =
    document.getElementById("closeModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");


const detailsButtons =
    document.querySelectorAll(".details-btn");


detailsButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const title =
            button.getAttribute("data-title");

        const description =
            button.getAttribute("data-description");


        modalTitle.textContent = title;

        modalDescription.textContent =
            description;


        modal.style.display = "flex";

    });

});


// Close modal

closeModal.addEventListener("click", function () {

    modal.style.display = "none";

});


// Close modal by clicking outside

window.addEventListener("click", function (event) {

    if (event.target === modal) {

        modal.style.display = "none";

    }

});


// =========================
// BOOKING BUTTON
// =========================

function goToBooking() {

    window.location.href = "booking.html";

}


// =========================
// FAQ
// =========================

const faqQuestions =
    document.querySelectorAll(".faq-question");


faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const faq =
            question.parentElement;


        faq.classList.toggle("active");


        const icon =
            question.querySelector("span");


        if (faq.classList.contains("active")) {

            icon.textContent = "−";

        } else {

            icon.textContent = "+";

        }

    });

});