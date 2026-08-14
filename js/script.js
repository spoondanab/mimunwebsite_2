/* ==========================================================================
   MIMUN 6.0 — Interactive Logic & Scroll Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Scroll-Reveal Observer (Fade-In Sections)
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Committee Modal System
  const openBtns = document.querySelectorAll('.open-modal-btn');
  const closeBtns = document.querySelectorAll('.close-modal');
  const overlays = document.querySelectorAll('.modal-overlay');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) targetModal.classList.add('open');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay').classList.remove('open');
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });
});


// Paste your deployed Google Apps Script Web App URL here
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwq-Hd4yc28EmofTePBaZwi2yFRCvBUoFPC-8oOjs2z682JH87ge4EUtj4xJ5fvwnSzoA/exec";

document.addEventListener('DOMContentLoaded', () => {
  const regForm = document.getElementById('registrationForm');
  const formResponse = document.getElementById('formResponse');

  // Modal Controls
  const successModal = document.getElementById('successModal');
  const closeSuccessModal = document.getElementById('closeSuccessModal');
  const modalOkBtn = document.getElementById('modalOkBtn');

  closeSuccessModal?.addEventListener('click', () => {
    successModal?.classList.remove('open');
  });

  modalOkBtn?.addEventListener('click', () => {
    successModal?.classList.remove('open');
  });

  if (regForm) {
    regForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (formResponse) {
        formResponse.style.color = 'var(--gold-yellow)';
        formResponse.innerText = 'Sealing thy scroll and transmitting to the High Secretariat...';
      }

      const fileInput = document.getElementById('paymentProof');
      const file = fileInput ? fileInput.files[0] : null;

      // Send payload matching the exact HTML IDs
      const sendToGoogleSheets = async (fileData = null, fileName = null, fileMimeType = null) => {
        const payload = {
          fullname: document.getElementById('fullName').value,       // Fixed ID
          email: document.getElementById('email').value,
          contactNumber: document.getElementById('contactNumber').value,
          institute: document.getElementById('institute').value,
          gradeYear: document.getElementById('gradeYear').value,
          pastExperience: document.getElementById('pastExperience').value,
          committeePref1: document.getElementById('commPref1').value, // Fixed ID
          portfolioPref1: document.getElementById('portPref1').value, // Fixed ID
          committeePref2: document.getElementById('commPref2').value, // Fixed ID
          portfolioPref2: document.getElementById('portPref2').value, // Fixed ID
          fileData: fileData,
          fileName: fileName,
          fileMimeType: fileMimeType
        };

        try {
          // Using mode: 'no-cors' prevents CORS errors on Google Apps Script
          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
          });

          // Show Success Modal
          if (successModal) {
            successModal.classList.add('open');
          } else if (formResponse) {
            formResponse.style.color = '#2e7d32';
            formResponse.innerHTML = '✦ Thy scroll has been sealed! Thy record is registered in the royal archives.';
          }

          regForm.reset();

        } catch (err) {
          console.error('Submission Error:', err);
          if (formResponse) {
            formResponse.style.color = 'var(--blood-red)';
            formResponse.innerText = '⚠️ Transmission failed. Please verify internet connection and try again.';
          }
        }
      };

      // Convert image to base64 if present, then send
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          sendToGoogleSheets(event.target.result, file.name, file.type);
        };
        reader.readAsDataURL(file);
      } else {
        sendToGoogleSheets();
      }
    });
  }
});

// Dynamic File Upload Feedback
const receiptInput = document.getElementById('paymentProof');
const filePrompt = document.getElementById('filePrompt');

if (receiptInput && filePrompt) {
  receiptInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      filePrompt.innerText = `✦ Selected: ${e.target.files[0].name}`;
      filePrompt.style.color = '#2e7d32';
    } else {
      filePrompt.innerText = 'Click or drag payment screenshot here';
      filePrompt.style.color = 'var(--blood-red)';
    }
  });

  
}

const revealElements = document.querySelectorAll('.scroll-reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

revealElements.forEach(element => observer.observe(element));

/* ==========================================================================
   SECRETARIAT DATASTORE
   ========================================================================== */
const secretariatMembers = [
  {
    name: "Albert Einstein",
    role: "SECRETARY-GENERAL",
    image: "assets/mimun6.0_logo.jpeg", // Replace with your image paths
    bio: "Guiding the next generation of smartypants"
  },
  {
    name: "Robinson Crusoe",
    role: "DIRECTOR-GENERAL",
    image: "assets/mimun6.0_logo.jpeg",
    bio: "Overseeing adventurous operations"
  },
  {
    name: "Mahatma Gandhi",
    role: "USG Delegate Affairs",
    image: "assets/mimun6.0_logo.jpeg",
    bio: "Managing idiots."
  },
  {
    name: "Tom Holland",
    role: "Charge D'Affaires",
    image: "assets/mimun6.0_logo.jpeg",
    bio: "Donning fancy ass French names"
  },
  {
    name: "Marcus Aurelius",
    role: "USG Design",
    image: "assets/mimun6.0_logo.jpeg",
    bio: "Making utter BS look pretty"
  },
  {
    name: "Mr. Brainrotter",
    role: "USG EB Affairs",
    image: "assets/mimun6.0_logo.jpeg",
    bio: "Dealing with smart jerks"
  }
];

/* ==========================================================================
   RENDER SECRETARIAT CARDS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("secretariatGrid");
  if (!grid) return;

  secretariatMembers.forEach(member => {
    const card = document.createElement("div");
    card.className = "sec-card gold-border";

    // Fallback image handling
    const imageSrc = member.image || "https://via.placeholder.com/150";

    card.innerHTML = `
      <div class="sec-headshot-wrapper">
        <img src="${imageSrc}" alt="${member.name}" class="sec-headshot">
      </div>
      <h3 class="sec-name">${member.name}</h3>
      <div class="sec-role">${member.role}</div>
      <p class="sec-bio">${member.bio}</p>
    `;

    grid.appendChild(card);
  });
});

/* ========================================================================== 
   GOLDEN CURSOR + TRAIL
   ========================================================================== */

const cursor = document.getElementById("cursor");

if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    // Create a trail particle
    const particle = document.createElement("div");
    particle.className = "gold-particle";

    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;

    document.body.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      particle.remove();
    }, 800);
  });
}

/* ==========================================================================
   MIMUN COUNTDOWN
   ========================================================================== */

const conferenceDate = new Date("2026-10-10T09:00:00").getTime();

function updateCountdown() {

  const now = new Date().getTime();
  const difference = conferenceDate - now;

  if (difference <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  const daysElement = document.getElementById("days");

  if (!daysElement) return;

  daysElement.textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ==========================================================================
   FLOATING HERO PARTICLES
   ========================================================================== */

const particleContainer =
  document.querySelector(".hero-particles");

if (particleContainer) {

  for (let i = 0; i < 35; i++) {

    const particle =
      document.createElement("span");

    particle.className =
      "floating-particle";

    particle.style.left =
      `${Math.random() * 100}%`;

    particle.style.animationDuration =
      `${8 + Math.random() * 12}s`;

    particle.style.animationDelay =
      `${Math.random() * 10}s`;

    const size =
      2 + Math.random() * 4;

    particle.style.width =
      `${size}px`;

    particle.style.height =
      `${size}px`;

    particleContainer.appendChild(particle);
  }
}

/* ==========================================================================
   PAGE TRANSITIONS
   ========================================================================== */

const transition =
  document.createElement("div");

transition.id = "page-transition";

document.body.appendChild(transition);


document.querySelectorAll("a").forEach(link => {

  const href = link.getAttribute("href");

  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("http") ||
    link.target === "_blank"
  ) {
    return;
  }


  link.addEventListener("click", event => {

    event.preventDefault();

    transition.classList.add("active");

    setTimeout(() => {
      window.location.href = href;
    }, 550);

  });

});

/* ==========================================================================
   MOBILE HAMBURGER MENU
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (!hamburger || !navLinks) {
    console.log("Hamburger menu elements not found.");
    return;
  }

  hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");

  });

  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      hamburger.classList.remove("active");
      navLinks.classList.remove("open");

    });

  });

});