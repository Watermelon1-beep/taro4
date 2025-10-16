(function (window, document) {
  const translations = {
    ru: {
      hero: {
        eyebrow: 'Мистический прогноз',
        title: 'Откройте тайну Таро и узнайте, что ждёт вас впереди',
        subtitle:
          'Выберите направление, которое волнует вас больше всего, а затем доверьтесь мудрости карт. Каждая раскладка уникальна и создаётся специально для вас.'
      },
      categories: {
        compatibility: {
          title: 'Совместимость с партнёром',
          description: 'Поймите энергию вашей связи и узнайте, как гармонизировать отношения.'
        },
        daily: {
          title: 'Как пройдёт день',
          description: 'Посмотрите, какие влияния будут сопровождать вас с рассвета до заката.'
        },
        loyalty: {
          title: 'Проверка партнёра',
          description: 'Раскройте истинные намерения близкого человека и скрытые мотивы.'
        },
        acceptance: {
          title: 'Принять жизненную ситуацию',
          description: 'Получите поддержку Таро, чтобы найти баланс и сделать правильный выбор.'
        },
        finance: {
          title: 'Финансовый прогноз',
          description: 'Узнайте, какие возможности и вызовы ждут ваши ресурсы и карьеру.'
        },
        advice: {
          title: 'Советы от карт',
          description: 'Три карты поделятся универсальной мудростью для вашего пути.'
        }
      },
      buttons: {
        choose: 'Вытянуть карты',
        draw: 'Вытянуть карты',
        retry: 'Попробовать снова',
        back: 'Вернуться к категориям'
      },
      reading: {
        title: 'Ваш расклад готов',
        placeholder: 'Выберите «Вытянуть карты», чтобы открыть мистическое послание.',
        orientation: {
          upright: 'Прямое положение',
          reversed: 'Перевёрнутое положение'
        },
        modal: {
          more: 'Полное значение'
        }
      },
      footer: 'For entertainment purposes only 🔮'
    },
    en: {
      hero: {
        eyebrow: 'Mystic Forecast',
        title: 'Unlock the Tarot and discover what awaits you',
        subtitle:
          'Choose the focus that calls to you, then trust the wisdom of the cards. Every spread is unique and crafted for your moment.'
      },
      categories: {
        compatibility: {
          title: 'Partner Compatibility',
          description: 'Understand the energy of your bond and how to harmonize the relationship.'
        },
        daily: {
          title: 'How the Day Will Go',
          description: 'See which influences will accompany you from sunrise to sunset.'
        },
        loyalty: {
          title: 'Partner Check',
          description: 'Reveal the true intentions and hidden motives around your loved one.'
        },
        acceptance: {
          title: 'Accept the Situation',
          description: 'Receive Tarot support to find balance and make the right decision.'
        },
        finance: {
          title: 'Financial Forecast',
          description: 'Discover the opportunities and challenges around your resources and career.'
        },
        advice: {
          title: 'Guidance from the Cards',
          description: 'Three cards share universal wisdom tailored to your path.'
        }
      },
      buttons: {
        choose: 'Draw cards',
        draw: 'Draw cards',
        retry: 'Try again',
        back: 'Back to categories'
      },
      reading: {
        title: 'Your spread is ready',
        placeholder: 'Select “Draw cards” to reveal the message meant for you.',
        orientation: {
          upright: 'Upright',
          reversed: 'Reversed'
        },
        modal: {
          more: 'Full meaning'
        }
      },
      footer: 'For entertainment purposes only 🔮'
    }
  };

  const categories = [
    { id: 'compatibility', icon: '💞' },
    { id: 'daily', icon: '☀️' },
    { id: 'loyalty', icon: '🔍' },
    { id: 'acceptance', icon: '⚖️' },
    { id: 'finance', icon: '💰' },
    { id: 'advice', icon: '🕊️' }
  ];

  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'utm_referrer'];

  const TarotSite = {
    translations,
    categories,
    state: {
      currentLang: 'ru'
    },
    getTranslation(key, lang) {
      const targetLang = lang || this.state.currentLang || 'ru';
      return key.split('.').reduce((acc, segment) => (acc && acc[segment] !== undefined ? acc[segment] : undefined), translations[targetLang]);
    },
    applyTranslations(lang) {
      if (!translations[lang]) return;
      this.state.currentLang = lang;
      localStorage.setItem('tarot-lang', lang);
      document.documentElement.setAttribute('lang', lang);

      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const value = this.getTranslation(key, lang);
        if (typeof value === 'string') {
          el.textContent = value;
        }
      });

      document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const key = el.getAttribute('data-i18n-html');
        const value = this.getTranslation(key, lang);
        if (typeof value === 'string') {
          el.innerHTML = value;
        }
      });

      const langSelect = document.querySelector('[data-lang-select]');
      if (langSelect) {
        langSelect.value = lang;
      }

      const categoryContainer = document.getElementById('category-list');
      if (categoryContainer) {
        renderCategories(categoryContainer);
      }

      document.dispatchEvent(new CustomEvent('tarot:language-changed', { detail: { lang } }));
    },
    parseUtm(search) {
      const params = new URLSearchParams(search || window.location.search);
      const utm = {};
      UTM_KEYS.forEach((key) => {
        if (params.has(key)) {
          utm[key] = params.get(key);
        }
      });
      return utm;
    },
    storeUtm(params) {
      const utm = this.parseUtm(params);
      if (Object.keys(utm).length) {
        sessionStorage.setItem('tarot-utm', JSON.stringify(utm));
      }
      return utm;
    },
    getStoredUtm() {
      try {
        const data = sessionStorage.getItem('tarot-utm');
        return data ? JSON.parse(data) : {};
      } catch (e) {
        return {};
      }
    },
    buildQuery(params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.set(key, value);
        }
      });
      return searchParams.toString();
    },
    navigateToReading(categoryId) {
      const lang = this.state.currentLang;
      const utm = this.getStoredUtm();
      const baseParams = { category: categoryId, lang };
      const queryString = this.buildQuery({ ...utm, ...baseParams });
      window.location.href = `reading.html?${queryString}`;
    },
    detectInitialLanguage() {
      const saved = localStorage.getItem('tarot-lang');
      if (saved && translations[saved]) {
        return saved;
      }
      const browserLang = (navigator.language || 'ru').slice(0, 2);
      return translations[browserLang] ? browserLang : 'ru';
    }
  };

  function renderCategories(container) {
    container.innerHTML = '';
    const lang = TarotSite.state.currentLang;
    categories.forEach(({ id, icon }) => {
      const title = TarotSite.getTranslation(`categories.${id}.title`, lang);
      const description = TarotSite.getTranslation(`categories.${id}.description`, lang);
      const buttonLabel = TarotSite.getTranslation('buttons.choose', lang);

      const card = document.createElement('article');
      card.className = 'category-card';
      card.dataset.category = id;
      card.innerHTML = `
        <div class="category-card__icon" aria-hidden="true">${icon}</div>
        <h3 class="category-card__title">${title}</h3>
        <p class="category-card__desc">${description}</p>
        <div class="category-card__action">
          <button class="button" data-category-trigger data-category="${id}">${buttonLabel}</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function initCategoryHandlers() {
    const container = document.getElementById('category-list');
    if (!container) return;

    container.addEventListener('click', (event) => {
      const target = event.target.closest('[data-category]');
      if (!target) return;
      const category = target.getAttribute('data-category');
      if (category) {
        TarotSite.navigateToReading(category);
      }
    });
  }

  function initLanguageSwitcher() {
    const langSelect = document.querySelector('[data-lang-select]');
    if (!langSelect) return;
    langSelect.addEventListener('change', (event) => {
      TarotSite.applyTranslations(event.target.value);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    TarotSite.storeUtm();
    const initialLang = TarotSite.detectInitialLanguage();
    TarotSite.applyTranslations(initialLang);
    initCategoryHandlers();
    initLanguageSwitcher();
  });

  window.TarotSite = TarotSite;
})(window, document);
