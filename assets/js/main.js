/**
 * 🚀 Сайт педагога — Основной JavaScript
 * Романова Алина Евгеньевна — Учитель физики
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initBackToTop();
  initFAQ();
  initFilters();
  initSmoothScroll();
  initCounterAnimation();
  initFormValidation();
});

/* --- Шапка: тень при скролле --- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Мобильное меню --- */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  // Закрытие при клике на ссылку
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Закрытие при клике вне меню
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target) && menu.classList.contains('open')) {
      toggle.classList.remove('active');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* --- Анимации при скролле --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* --- Кнопка «Наверх» --- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  const onScroll = () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- FAQ аккордеон --- */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Закрыть все
      items.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Открыть текущий (если был закрыт)
      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Открыть первый элемент по умолчанию
  if (items.length) {
    items[0].classList.add('active');
    const firstAnswer = items[0].querySelector('.faq-answer');
    if (firstAnswer) firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
  }
}

/* --- Фильтры ресурсов --- */
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const resourceCards = document.querySelectorAll('.resource-card[data-category]');
  if (!filterBtns.length || !resourceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Обновить активную кнопку
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Фильтрация карточек
      resourceCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.classList.add('animated');
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- Плавная прокрутка к якорям --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = document.querySelector('.header')?.offsetHeight || 72;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* --- Анимация счётчиков --- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const duration = 2000;
      const startTime = performance.now();
      const startValue = 0;

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(startValue + (target - startValue) * easeOutQuart);

        el.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      };

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* --- Валидация форм --- */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  if (!forms.length) return;

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

      inputs.forEach(input => {
        const errorEl = input.parentElement.querySelector('.form-error');

        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'var(--error)';
          if (errorEl) errorEl.textContent = 'Это поле обязательно для заполнения';
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
          isValid = false;
          input.style.borderColor = 'var(--error)';
          if (errorEl) errorEl.textContent = 'Введите корректный email';
        } else {
          input.style.borderColor = '';
          if (errorEl) errorEl.textContent = '';
        }
      });

      if (isValid) {
        // Здесь можно добавить отправку данных
        showFormSuccess(form);
      }
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormSuccess(form) {
  const successMsg = form.querySelector('.form-success');
  if (successMsg) {
    successMsg.style.display = 'flex';
  }

  form.reset();

  setTimeout(() => {
    if (successMsg) successMsg.style.display = 'none';
  }, 5000);
}

/* --- Параллакс для hero (лёгкий) --- */
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    const heroImage = hero.querySelector('.hero-image-main');
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
  }
}, { passive: true });
