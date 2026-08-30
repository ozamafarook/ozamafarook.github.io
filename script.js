/* =========================================================
   OZAMA FAROOK PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", function () {

        navbar.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navbar.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    const mobileLinks = navbar.querySelectorAll("a");

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navbar.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    });

}


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".navbar a");

function updateActiveNavigation() {

    let currentSection = "home";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 180;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navigationLinks.forEach(function (link) {

        const linkTarget = link.getAttribute("href");

        link.style.color = "";

        if (linkTarget === "#" + currentSection) {

            link.style.color = "#3aa0ff";

        }

    });

}


window.addEventListener("scroll", updateActiveNavigation);
window.addEventListener("load", updateActiveNavigation);


/* ================= CLOSE MOBILE MENU ON RESIZE ================= */

window.addEventListener("resize", function () {

    if (window.innerWidth > 1000 && navbar) {

        navbar.classList.remove("active");

        if (menuToggle) {

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    }

});


/* ================= SCROLL REVEAL ANIMATION ================= */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-text, " +
    ".about-item, " +
    ".project-card, " +
    ".service-card, " +
    ".experience-card, " +
    ".expertise-item, " +
    ".contact-text, " +
    ".contact-card"
);


/* INITIAL HIDDEN STYLE */

revealElements.forEach(function (element) {

    element.style.opacity = "0";
    element.style.transform = "translateY(28px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

});


/* OBSERVER */

const revealObserver = new IntersectionObserver(

    function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


/* START OBSERVING */

revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* ================= HEADER SCROLL EFFECT ================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", function () {

    if (!header) return;

    if (window.scrollY > 40) {

        header.style.background = "rgba(7, 11, 18, 0.98)";
        header.style.boxShadow =
            "0 8px 30px rgba(0, 0, 0, 0.20)";

    } else {

        header.style.background = "rgba(7, 11, 18, 0.94)";
        header.style.boxShadow = "none";

    }

});