/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  var menuBtn = document.getElementById("myNavMenu");
  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

function myButtonHireFunction() {
  document.getElementById("contact").scrollIntoView({ behavior: 'smooth' });
}

function myDownloadCv() {
  const link = document.createElement('a');
  link.href = 'assets/cv/Enrico Mabuka Jr.pdf';
  link.download = 'Enrico Mabuka Jr.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ----- CONTACT FORM ----- */
function sendMessage() {
  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const status  = document.getElementById('form-status');
  const btn     = document.getElementById('send-btn');

  if (localStorage.getItem('msg_sent')) {
    status.style.color = '#e74c3c';
    status.textContent = 'You have already sent a message. Please reach out directly via email.';
    return;
  }

  if (!name || !email || !message) {
    status.style.color = '#e74c3c';
    status.textContent = 'Please fill in all fields.';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending...';
  status.textContent = '';

  emailjs.send('service_9d8237n', 'template_4s13ptm', {
    title:   name,
    name:    name,
    email:   email,
    message: message,
  }).then(function () {
    localStorage.setItem('msg_sent', '1');
    status.style.color = '#27ae60';
    status.textContent = 'Message sent! I\'ll get back to you soon.';
    document.getElementById('contact-name').value    = '';
    document.getElementById('contact-email').value   = '';
    document.getElementById('contact-message').value = '';
    btn.disabled = true;
    btn.innerHTML = 'Message Sent <i class="uil uil-check"></i>';
  }, function () {
    status.style.color = '#e74c3c';
    status.textContent = 'Something went wrong. Please try again.';
    btn.disabled = false;
    btn.innerHTML = 'Send Message <i class="uil uil-message"></i>';
  });
}

/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText", {
  strings: ["Software Developer", "App Developer", "DevOps Engineer"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000
})

/* ----- SCROLL REVEAL ANIMATION ----- */
const sr = ScrollReveal({ distance: '80px', duration: 2000, reset: true })

sr.reveal('.featured-text-card', { origin: 'top' })
sr.reveal('.featured-name',      { origin: 'top', delay: 100 })
sr.reveal('.featured-text-info', { origin: 'top', delay: 200 })
sr.reveal('.featured-text-btn',  { origin: 'top', delay: 200 })
sr.reveal('.social_icons',       { origin: 'top', delay: 200 })
sr.reveal('.featured-image',     { origin: 'top', delay: 300 })
sr.reveal('.top-header',         { origin: 'top' })
sr.reveal('.about-info',         { origin: 'left', delay: 100 })
sr.reveal('.contact-info',       { origin: 'left', delay: 100 })
sr.reveal('.skills-box',         { origin: 'right', delay: 100 })
sr.reveal('.form-control',       { origin: 'right', delay: 100 })

/* ----- SCROLL HANDLERS ----- */
const navHeader    = document.getElementById("header");
const backToTopBtn = document.getElementById('backToTop');
const sections     = document.querySelectorAll('section[id]');

// Cache nav links as a Map for O(1) lookups
const navLinkMap = new Map();
sections.forEach(s => {
  const link = document.querySelector('.nav-menu a[href*=' + s.getAttribute('id') + ']');
  if (link) navLinkMap.set(s.getAttribute('id'), link);
});

// Cache section dimensions — updated on resize to avoid reflow on every scroll tick
let sectionCache = [];
function cacheSectionDimensions() {
  sectionCache = Array.from(sections).map(s => ({
    id:     s.getAttribute('id'),
    top:    s.offsetTop - 50,
    height: s.offsetHeight,
  }));
}
cacheSectionDimensions();
window.addEventListener('resize', cacheSectionDimensions);

// Guard to avoid redundant DOM writes in the header shadow logic
let headerScrolled = false;

function onScroll() {
  const scrollY = window.scrollY;

  // Header shadow — only write when state changes
  const shouldScroll = scrollY > 50;
  if (shouldScroll !== headerScrolled) {
    headerScrolled = shouldScroll;
    if (shouldScroll) {
      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";
    } else {
      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";
    }
  }

  // Active nav link — uses cached dimensions
  sectionCache.forEach(({ id, top, height }) => {
    const link = navLinkMap.get(id);
    if (!link) return;
    if (scrollY > top && scrollY <= top + height) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });

  // Back to top
  backToTopBtn.classList.toggle('visible', scrollY > 300);
}

window.addEventListener('scroll', onScroll);

/* ----- DARK MODE TOGGLE ----- */
function myThemeFunction() {
  document.body.classList.toggle('dark-mode');
  const themeIcon = document.querySelector('#theme-btn i');
  if (document.body.classList.contains('dark-mode')) {
    themeIcon.className = 'uil uil-sun';
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.className = 'uil uil-moon';
    localStorage.setItem('theme', 'light');
  }
}

// Dynamic copyright year
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// Disable send button if already sent from this device
(function () {
  if (localStorage.getItem('msg_sent')) {
    const btn = document.getElementById('send-btn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = 'Message Sent <i class="uil uil-check"></i>';
    }
  }
})();

// Restore saved theme on load
(function () {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    const themeIcon = document.querySelector('#theme-btn i');
    if (themeIcon) themeIcon.className = 'uil uil-sun';
  }
})();
