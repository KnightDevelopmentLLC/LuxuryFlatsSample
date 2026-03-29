// ===== SHARED JAVASCRIPT =====

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Hamburger + Mobile Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Fade-in on scroll (IntersectionObserver)
const fadeEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

fadeEls.forEach(el => observer.observe(el));

// Staggered children
document.querySelectorAll('[data-stagger]').forEach(parent => {
  parent.querySelectorAll(':scope > *').forEach((child, i) => {
    child.classList.add('fade-in');
    child.dataset.delay = i * 120;
    observer.observe(child);
  });
});

// ===== CHATBOT =====
const chatbotData = {
  'view-apartments': {
    user: '🏢 View Apartments',
    bot: 'We offer exclusive 2BHK, 3BHK & Penthouse residences. Explore our <a href="properties.html" style="color:var(--gold)">Properties page</a> for full listings with pricing and floor plans.'
  },
  'book-visit': {
    user: '📅 Book Site Visit',
    bot: 'To schedule a private site visit, please contact us on WhatsApp at <strong style="color:var(--gold)">+91 98765 43210</strong>. Our concierge will confirm your preferred slot within 2 hours.'
  },
  'pricing': {
    user: '💰 Pricing Details',
    bot: 'Our apartments start from <strong style="color:var(--gold)">₹1.2 Cr</strong> for 2BHK and go up to <strong style="color:var(--gold)">₹8 Cr+</strong> for penthouses. All prices include premium fittings & car parking.'
  },
  'location': {
    user: '📍 Project Location',
    bot: 'Our flagship project is located in <strong style="color:var(--gold)">Jubilee Hills, Hyderabad</strong> — minutes from Banjara Hills, HITECH City & international schools. <a href="contact.html" style="color:var(--gold)">View on map →</a>'
  },
  'call': {
    user: '📞 Call Now',
    bot: 'You can reach our sales team directly at <strong style="color:var(--gold)">+91 98765 43210</strong> or email <strong style="color:var(--gold)">sales@elysiaresidences.com</strong>. Available Mon–Sat, 9am–7pm.'
  }
};

function initChatbot() {
  const toggle = document.querySelector('.chatbot-toggle');
  const panel = document.querySelector('.chatbot-panel');
  const messages = document.querySelector('.chatbot-messages');

  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    panel.classList.toggle('open');
  });

  document.querySelectorAll('.chat-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.action;
      const data = chatbotData[key];
      if (!data) return;

      // User message
      const userMsg = document.createElement('div');
      userMsg.className = 'chat-msg user';
      userMsg.textContent = data.user;
      messages.appendChild(userMsg);
      messages.scrollTop = messages.scrollHeight;

      // Bot typing indicator
      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-msg bot';
        botMsg.innerHTML = data.bot;
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
      }, 600);
    });
  });
}

initChatbot();

// Parallax subtle effect
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.3;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// Number counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));
