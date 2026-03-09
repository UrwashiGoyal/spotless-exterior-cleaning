// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('hero');

if (heroSection) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const pos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  });
});

// ===== SCROLL ANIMATIONS =====
const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(el => fadeObserver.observe(el));

const animateElements = document.querySelectorAll('.service-card, .process-step, .stat-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => { entry.target.classList.add('visible'); }, i * 120);
      cardObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

animateElements.forEach(el => cardObserver.observe(el));

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.dataset.target);
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { counter.textContent = target; clearInterval(timer); }
        else { counter.textContent = Math.floor(current); }
      }, duration / steps);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ===== TESTIMONIAL CAROUSEL =====
const carouselTrack = document.querySelector('.testimonial-slides');
if (carouselTrack) {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  let currentSlide = 0;
  let autoPlay;

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlide = index;
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoPlay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoPlay(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goToSlide(i); resetAutoPlay(); }));

  function startAutoPlay() { autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000); }
  function resetAutoPlay() { clearInterval(autoPlay); startAutoPlay(); }
  startAutoPlay();

  let touchStartX = 0;
  carouselTrack.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
  carouselTrack.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
      resetAutoPlay();
    }
  });
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.style.display = 'none';
    formSuccess.classList.add('show');
    setTimeout(() => {
      contactForm.style.display = 'block';
      contactForm.reset();
      formSuccess.classList.remove('show');
    }, 5000);
  });
}

// ===== PARALLAX =====
if (heroSection) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && scrolled < 800) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });
}
