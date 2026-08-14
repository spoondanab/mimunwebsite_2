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

const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {

  // Move main golden cursor
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  // Create red particle trail
  if (Math.random() < 0.3) {

    const particle = document.createElement('div');

    particle.className = 'gold-particle';

    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 800);
  }
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

