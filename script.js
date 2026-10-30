// Update copyright year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Copy email address with feedback
const copyEmailBtn = document.getElementById('copy-email-btn');
const contactEmail = document.getElementById('contact-email');

if (copyEmailBtn && contactEmail) {
  copyEmailBtn.addEventListener('click', async () => {
    const email = contactEmail.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      const originalText = copyEmailBtn.textContent;
      copyEmailBtn.textContent = 'copied!';
      copyEmailBtn.classList.add('copied');
      setTimeout(() => {
        copyEmailBtn.textContent = originalText;
        copyEmailBtn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      copyEmailBtn.textContent = 'copied!';
      copyEmailBtn.classList.add('copied');
      setTimeout(() => {
        copyEmailBtn.textContent = 'copy';
        copyEmailBtn.classList.remove('copied');
      }, 2000);
    }
  });
}

// Active navigation scroll-spy using getBoundingClientRect
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function updateActiveNav() {
  let currentSectionId = '';
  
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    // If top of section is within top 200px of viewport and bottom is still below 100px
    if (rect.top <= 200 && rect.bottom >= 100) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('resize', updateActiveNav, { passive: true });
updateActiveNav();
