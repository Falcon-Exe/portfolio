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

// Active navigation scroll-spy
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function updateActiveNav() {
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });

  // Clear or set when at the very top
  if (window.scrollY < 200) {
    navLinks.forEach((link) => link.classList.remove('active'));
  }
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
