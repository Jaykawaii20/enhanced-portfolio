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

function myScrollToWork() {
  document.getElementById("projects").scrollIntoView({ behavior: 'smooth' });
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
    status.style.color = '#10b981';
    status.textContent = 'Message sent! I\'ll get back to you soon.';
    document.getElementById('contact-name').value    = '';
    document.getElementById('contact-email').value   = '';
    document.getElementById('contact-message').value = '';
    btn.disabled = true;
    btn.innerHTML = 'Message sent <i class="uil uil-check"></i>';
  }, function () {
    status.style.color = '#e74c3c';
    status.textContent = 'Something went wrong. Please try again.';
    btn.disabled = false;
    btn.innerHTML = 'Send message <i class="uil uil-message"></i>';
  });
}

/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText", {
  strings: [
    "automates your operations.",
    "saves your team hours.",
    "turns manual work into systems.",
    "grows with your business.",
  ],
  loop: true,
  typeSpeed: 70,
  backSpeed: 45,
  backDelay: 1800
})

/* ----- SCROLL REVEAL ANIMATION ----- */
const sr = ScrollReveal({ distance: '60px', duration: 1400, reset: false })

sr.reveal('.featured-text-card', { origin: 'top' })
sr.reveal('.featured-name',      { origin: 'top', delay: 100 })
sr.reveal('.featured-text-info', { origin: 'top', delay: 200 })
sr.reveal('.featured-text-btn',  { origin: 'top', delay: 300 })
sr.reveal('.social_icons',       { origin: 'top', delay: 400 })
sr.reveal('.featured-image',     { origin: 'right', delay: 200 })
sr.reveal('.top-header',         { origin: 'top' })
sr.reveal('.about-intro',        { origin: 'bottom', delay: 100 })
sr.reveal('.service-card',       { origin: 'bottom', interval: 100 })
sr.reveal('.tools-strip',        { origin: 'bottom', delay: 100 })
sr.reveal('.project-card',       { origin: 'bottom', interval: 80 })
sr.reveal('.contact-info',       { origin: 'left', delay: 100 })
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
    top:    s.offsetTop - 90,
    height: s.offsetHeight,
  }));
}
cacheSectionDimensions();
window.addEventListener('resize', cacheSectionDimensions);

function onScroll() {
  const scrollY = window.scrollY;

  // Header shrink/shadow — class toggle is idempotent
  navHeader.classList.toggle('scrolled', scrollY > 40);

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

/* ----- CURSOR GLOW FOLLOWER ----- */
(function () {
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;

  const finePointer  = window.matchMedia('(pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reduceMotion) return;

  let targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
  let curX = targetX, curY = targetY;
  let visible = false;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!visible) { visible = true; glow.style.opacity = '1'; }
  });
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; visible = false; });

  // Gently grow the glow over interactive elements
  const interactive = 'a, button, .icon, .service-card, .project-card, input, textarea';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest && e.target.closest(interactive)) glow.classList.add('is-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest && e.target.closest(interactive)) glow.classList.remove('is-hover');
  });

  function render() {
    curX += (targetX - curX) * 0.15;
    curY += (targetY - curY) * 0.15;
    glow.style.transform = 'translate(' + curX + 'px, ' + curY + 'px) translate(-50%, -50%)';
    requestAnimationFrame(render);
  }
  render();
})();

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
      btn.innerHTML = 'Message sent <i class="uil uil-check"></i>';
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
