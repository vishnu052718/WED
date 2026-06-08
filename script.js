/**
 * @param {string} id
 * @returns {HTMLElement|null}
 */
const getEl = (id) => document.getElementById(id);

// Initiating particles
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: { enable: true, speed: 2 },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
    },
    modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } },
  },
  retina_detect: true,
});

//Fade-in effect
const faders = document.querySelectorAll(".fade-up");

const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});


//locationButton
getEl("locationButton").addEventListener("click", () => {
  window.location.href = "https://www.google.com/maps/place/Sree+Raama+Function+Hall/@17.8909831,78.3678432,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcc6d00287ecbf3:0xde59a5afbf3dd805!8m2!3d17.8909831!4d78.3704181!16s%2Fg%2F11xrsmtkq0?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D"});

//Timer
const weddingDate = new Date("December 12, 2025 10:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const pad = (n) => (n < 10 ? "0" + n : n);

  const daysEl = getEl("daysCount");
  const hoursEl = getEl("hoursCount");
  const minutesEl = getEl("minutesCount");
  const secondsEl = getEl("secondsCount");

  if (distance < 0) {
    clearInterval(countdownInterval);
    if (daysEl) daysEl.innerHTML = "<span>00</span><span>Days</span>";
    if (hoursEl) hoursEl.innerHTML = "<span>00</span><span>Hours</span>";
    if (minutesEl) minutesEl.innerHTML = "<span>00</span><span>Minutes</span>";
    if (secondsEl) secondsEl.innerHTML = "<span>00</span><span>Seconds</span>";
    if (getEl("heroSection"))
      getEl("heroSection").querySelector("h2:last-of-type").textContent =
        "We Are Married!";
  } else {
    if (daysEl) daysEl.innerHTML = `<span>${pad(days)}</span><span>Days</span>`;
    if (hoursEl)
      hoursEl.innerHTML = `<span>${pad(hours)}</span><span>Hours</span>`;
    if (minutesEl)
      minutesEl.innerHTML = `<span>${pad(minutes)}</span><span>Minutes</span>`;
    if (secondsEl)
      secondsEl.innerHTML = `<span>${pad(seconds)}</span><span>Seconds</span>`;
  }
}

// Starting countdown
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Navigation
const menuIcon = getEl("menuIcon");
const navLinks = getEl("navLinks");
const rsvpModal = getEl("rsvpModal");
const rsvpButtons = [getEl("rsvpAnchor"), getEl("rsvpButton")];
const closeModalButton = document.querySelector(".modal-content .close");
const navLinksList = navLinks ? navLinks.querySelectorAll("a") : [];

//Mobile Navigation Toggle
if (menuIcon && navLinks) {
  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuIcon.querySelector("i").classList.toggle("fa-bars");
    menuIcon.querySelector("i").classList.toggle("fa-xmark");
  });

  // Close menu when a link is clicked
  navLinksList.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("active");
        menuIcon.querySelector("i").classList.remove("fa-xmark");
        menuIcon.querySelector("i").classList.add("fa-bars");
      }
    });
  });
}

//  RSVP Modal Open
if (rsvpModal) {
  rsvpButtons.forEach((button) => {
    if (button) {
      button.addEventListener("click", () => {
        rsvpModal.classList.add("show");
      });
    }
  });
}

// RSVP Modal Close
function closeModal() {
  if (rsvpModal) {
    rsvpModal.classList.remove("show");
  }
}

if (closeModalButton) {
  closeModalButton.addEventListener("click", closeModal);
}

// Close when clicking outside the modal content
if (rsvpModal) {
  rsvpModal.addEventListener("click", (e) => {
    if (e.target === rsvpModal) {
      closeModal();
    }
  });
}

//Submit RSVP
const rsvpForm = getEl("rsvpForm");
if (rsvpForm) {
  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Data
    const firstName = getEl("firstName").value;
    const eventsAttending = Array.from(
      document.querySelectorAll(".rsvpEvents input:checked")
    )
      .map((input) => input.value)
      .join(", ");

    const confirmationMessage = `Thank you, ${firstName}! Your RSVP has been received. You are confirmed for: ${eventsAttending}. We can't wait to celebrate with you!`;

    // Sending confirmation message
    const modalContent = document.querySelector(".modal-content");
    if (modalContent) {
      modalContent.innerHTML = `
                <span class="close" id="confirmationClose">&times;</span>
                <div style="text-align: center; padding: 20px;">
                    <i class="fa-solid fa-heart-circle-check" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
                    <h1 style="font-size: 2rem; color: var(--accent);">RSVP Confirmed!</h1>
                    <p style="margin-top: 1rem; color: #333;">${confirmationMessage}</p>
                </div>
            `;
      // Re-attach close listener to the new button
      getEl("confirmationClose").addEventListener("click", closeModal);
    }
  });
}

// Gallery
const addedPhotoInput = document.getElementById("addedPhoto");
const galleryGrid = document.querySelector(".galleryGrid");

if (addedPhotoInput && galleryGrid) {
  addedPhotoInput.addEventListener("change", (event) => {
    const files = event.target.files;

    if (!files || files.length === 0) return;

    const maxFiles = 10;

    for (let i = 0; i < Math.min(files.length, maxFiles); i++) {
      const file = files[i];

      // only process image files
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);

        // Create image container
        const galleryItem = document.createElement("div");
        galleryItem.className = "gallery-item";

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = `Uploaded photo ${i + 1}`;

        galleryItem.appendChild(img);
        galleryGrid.prepend(galleryItem);
      }
    }

    // Clearing input
    event.target.value = "";
  });
}