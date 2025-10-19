(function (window, document) {
  const STORAGE_KEYS = {
    session: 'tarot-destiny-session',
    saved: 'tarot-destiny-saved',
    lang: 'tarot-destiny-lang',
    utm: 'tarot-destiny-utm'
  };

  const translations = {
    ru: {
      tagline: 'Discover what destiny whispers ✨',
      language: {
        label: 'Язык'
      },
      hero: {
        eyebrow: 'Мистический портал',
        title: 'Tarot Destiny — персональные послания и расклады',
        subtitle:
          'Введите свои данные, чтобы раскрыть Жизненный, Судьбоносный и Годовой арканы, а затем доверьтесь картам Таро для личного послания.'
      },
      form: {
        title: 'Раскройте свои арканы',
        lead: 'Мы используем дату рождения, чтобы вычислить ваши проводники судьбы. Данные остаются только на вашем устройстве.',
        fields: {
          name: 'Ваше имя *',
          birth: 'Дата рождения *'
        },
        hints: {
          name: 'Имя поможет персонализировать послание.',
          birth: 'Выберите дату в формате ГГГГ-ММ-ДД.'
        },
        submit: 'Получить расклад',
        reset: 'Очистить форму',
        utmNote: 'Добавьте UTM-метки в ссылку, чтобы отслеживать трафик — система автоматически сохранит их.'
      },
      partner: {
        title: 'Дополнительный партнёр',
        hint: 'Заполните, чтобы рассчитать общий Аркан Партнёрства.',
        fields: {
          name: 'Имя партнёра',
          birth: 'Дата рождения партнёра'
        }
      },
      reading: {
        eyebrow: 'Ваш портал готов',
        title: 'Персональный расклад и предсказания',
        greeting: 'Привет, {name}! {message}',
        orientation: {
          upright: 'Прямое положение',
          reversed: 'Перевёрнутое положение'
        },
        sections: {
          arcanes: 'Ваши арканы',
          forecast: 'Индивидуальные прогнозы',
          choose: 'Выберите тип расклада',
          hint: 'Выберите направление, затем нажмите «Вытянуть карты», чтобы получить 3 карты из полной колоды.'
        },
        actions: {
          draw: 'Вытянуть карты',
          retry: 'Новая раскладка',
          back: 'Вернуться на главную',
          share: 'Поделиться',
          save: 'Сохранить результат'
        },
        arcanaLabels: {
          life: 'Жизненный аркан',
          destiny: 'Аркан Судьбы',
          year: 'Аркан текущего года',
          partnership: 'Аркан партнёрства'
        },
        timeframes: {
          today: {
            title: 'Сегодня',
            template: '{card} освещает ваш день: {meaning}. Доверяйте подсказкам и реагируйте сердцем.'
          },
          week: {
            title: 'Неделя',
            template: 'На ближайшую неделю энергия {card} советует: {meaning}. Будьте внимательны к встречам и возможностям.'
          },
          month: {
            title: 'Месяц',
            template: 'В течение месяца {card} напоминает: {meaning}. Планируйте шаги и берегите баланс.'
          }
        },
        share: {
          title: 'Мой расклад Tarot Destiny',
          text: 'Я получил персональный расклад Таро и хочу поделиться его мудростью!',
          x: 'Поделиться в X',
          telegram: 'Поделиться в Telegram',
          copy: 'Скопировать ссылку'
        },
        empty: 'Добавьте информацию на главной странице, чтобы увидеть свой расклад.'
      },
      categories: {
        compatibility: {
          icon: '💞',
          title: 'Совместимость с партнёром',
          description: 'Как взаимодействуют ваши энергии и куда вести отношения.'
        },
        day: {
          icon: '☀️',
          title: 'Как пройдёт день',
          description: 'Основные акценты и настроения ближайших часов.'
        },
        finance: {
          icon: '💰',
          title: 'Финансовый путь',
          description: 'Ресурсы, карьера и материальные возможности.'
        },
        solution: {
          icon: '⚖️',
          title: 'Ключ к решению',
          description: 'Подход к важному выбору или сложной ситуации.'
        },
        warning: {
          icon: '🕯️',
          title: 'Предупреждение от судьбы',
          description: 'Что следует предусмотреть, чтобы избежать ловушек.'
        },
        guidance: {
          icon: '🔮',
          title: 'Совет Высших сил',
          description: 'Общее послание для вашей души.'
        }
      },
      admin: {
        placeholder: 'Здесь появится панель администратора для редактирования карт и текстов.'
      },
      toasts: {
        saved: 'Расклад сохранён в вашей коллекции.',
        copied: 'Ссылка скопирована.'
      }
    },
    en: {
      tagline: 'Discover what destiny whispers ✨',
      language: {
        label: 'Language'
      },
      hero: {
        eyebrow: 'Mystic gateway',
        title: 'Tarot Destiny — personalised arcana insights',
        subtitle:
          'Enter your details to reveal the Life, Destiny and Year arcana, then draw a unique Tarot spread tailored for you.'
      },
      form: {
        title: 'Reveal your arcana',
        lead: 'We use your birth date to calculate guiding arcana. Everything stays safely in your browser.',
        fields: {
          name: 'Your name *',
          birth: 'Date of birth *'
        },
        hints: {
          name: 'Your name lets us personalise the guidance.',
          birth: 'Select a date in YYYY-MM-DD format.'
        },
        submit: 'Reveal my reading',
        reset: 'Clear form',
        utmNote: 'Append UTM parameters to the link to track traffic — they will be stored automatically.'
      },
      partner: {
        title: 'Partner (optional)',
        hint: 'Provide to calculate a shared Partnership Arcana.',
        fields: {
          name: "Partner's name",
          birth: "Partner's birth date"
        }
      },
      reading: {
        eyebrow: 'Your portal is ready',
        title: 'Personal spread & prophecies',
        greeting: 'Welcome, {name}! {message}',
        orientation: {
          upright: 'Upright',
          reversed: 'Reversed'
        },
        sections: {
          arcanes: 'Your arcana',
          forecast: 'Individual forecasts',
          choose: 'Select your spread focus',
          hint: 'Choose a focus and press “Draw cards” to reveal three cards from the full deck.'
        },
        actions: {
          draw: 'Draw cards',
          retry: 'New spread',
          back: 'Back to start',
          share: 'Share',
          save: 'Save result'
        },
        arcanaLabels: {
          life: 'Life Arcana',
          destiny: 'Destiny Arcana',
          year: 'Year Arcana',
          partnership: 'Partnership Arcana'
        },
        timeframes: {
          today: {
            title: 'Today',
            template: '{card} colours your day: {meaning}. Trust the subtle nudges and follow your heart.'
          },
          week: {
            title: 'Week',
            template: 'For the coming week, the energy of {card} suggests: {meaning}. Stay receptive to meetings and openings.'
          },
          month: {
            title: 'Month',
            template: 'Across this month, {card} reminds you: {meaning}. Plan deliberately and honour your balance.'
          }
        },
        share: {
          title: 'My Tarot Destiny reading',
          text: 'I received a personalised Tarot spread and wanted to share the wisdom!',
          x: 'Share on X',
          telegram: 'Share on Telegram',
          copy: 'Copy link'
        },
        empty: 'Add your details on the main page to see the reading.'
      },
      categories: {
        compatibility: {
          icon: '💞',
          title: 'Partner compatibility',
          description: 'How your energies weave together and where they lead.'
        },
        day: {
          icon: '☀️',
          title: 'How the day unfolds',
          description: 'Key moods and highlights for the next hours.'
        },
        finance: {
          icon: '💰',
          title: 'Financial path',
          description: 'Resources, career, and material opportunities.'
        },
        solution: {
          icon: '⚖️',
          title: 'Key to a solution',
          description: 'Approach an important decision or complex situation.'
        },
        warning: {
          icon: '🕯️',
          title: 'Warning from destiny',
          description: 'What to foresee to avoid hidden pitfalls.'
        },
        guidance: {
          icon: '🔮',
          title: 'Higher guidance',
          description: 'A universal message for your soul.'
        }
      },
      admin: {
        placeholder: 'An admin console will appear here to edit cards and interpretations.'
      },
      toasts: {
        saved: 'Reading saved to your collection.',
        copied: 'Link copied.'
      }
    }
  };

  const categories = ['compatibility', 'day', 'finance', 'solution', 'warning', 'guidance'];

  const majorArcanaOrder = [
    'The Magician',
    'The High Priestess',
    'The Empress',
    'The Emperor',
    'The Hierophant',
    'The Lovers',
    'The Chariot',
    'Strength',
    'The Hermit',
    'Wheel of Fortune',
    'Justice',
    'The Hanged Man',
    'Death',
    'Temperance',
    'The Devil',
    'The Tower',
    'The Star',
    'The Moon',
    'The Sun',
    'Judgement',
    'The World',
    'The Fool'
  ];

  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'utm_referrer'];

  const state = {
    lang: 'ru',
    cards: [],
    utm: {},
    session: null,
    starfieldMounted: false
  };

  function resolveTranslation(obj, path) {
    return path.split('.').reduce((acc, segment) => (acc && acc[segment] !== undefined ? acc[segment] : undefined), obj);
  }

  function reduceByDigits(value) {
    let result = Math.abs(Number(value));
    while (result > 22) {
      result = result
        .toString()
        .split('')
        .reduce((sum, digit) => sum + Number(digit), 0);
    }
    if (result === 0) {
      result = 22;
    }
    return result;
  }

  function clampArcana(value) {
    let result = Math.abs(Number(value));
    while (result > 22) {
      result -= 22;
    }
    if (result === 0) {
      result = 22;
    }
    return result;
  }

  function sumDigitsFromString(str) {
    return (str.match(/\d/g) || []).reduce((acc, digit) => acc + Number(digit), 0);
  }

  function computeArcanaSet(primaryBirth, partnerBirth) {
    const digits = primaryBirth ? primaryBirth.replace(/\D/g, '') : '';
    const dateParts = primaryBirth.split('-').map((part) => Number(part || 0));
    const [year, month, day] = dateParts;
    const lifeBase = day + month + year;
    const life = reduceByDigits(lifeBase);
    const destinyBase = sumDigitsFromString(primaryBirth);
    const destiny = clampArcana(destinyBase);
    const currentYear = new Date().getFullYear();
    const yearArc = reduceByDigits(day + month + currentYear);
    let partnership = null;
    if (partnerBirth) {
      const combined = digits + partnerBirth.replace(/\D/g, '');
      partnership = clampArcana(sumDigitsFromString(combined));
    }
    return {
      life,
      destiny,
      year: yearArc,
      partnership
    };
  }

  function getMajorArcanaCard(number) {
    const index = number - 1;
    const cardName = majorArcanaOrder[index] || 'The Fool';
    return state.cards.find((card) => card.name === cardName) || null;
  }

  function formatArcanaEntry(key, number, lang) {
    const locale = translations[lang] || translations.ru;
    const label = resolveTranslation(locale, `reading.arcanaLabels.${key}`) || key;
    if (!number) {
      return { label, number: '—', cardName: '—', meaning: '' };
    }
    const card = getMajorArcanaCard(number);
    const name = card ? (lang === 'ru' && card.name_ru ? card.name_ru : card.name) : `№${number}`;
    const meaning = card
      ? lang === 'ru'
        ? card.upright_ru
        : card.upright
      : '';
    return {
      label,
      number,
      cardName: name,
      meaning
    };
  }

  function buildForecasts(arcana, lang) {
    const mapping = {
      today: arcana.life,
      week: arcana.destiny,
      month: arcana.year
    };
    return Object.entries(mapping).map(([key, arc]) => ({
      key,
      arc
    }));
  }

  function applyTranslations(lang) {
    if (!translations[lang]) {
      lang = 'ru';
    }
    state.lang = lang;
    localStorage.setItem(STORAGE_KEYS.lang, lang);
    document.documentElement.setAttribute('lang', lang);

    const locale = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.getAttribute('data-i18n');
      const value = resolveTranslation(locale, key);
      if (typeof value === 'string') {
        node.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((node) => {
      const key = node.getAttribute('data-i18n-html');
      const value = resolveTranslation(locale, key);
      if (typeof value === 'string') {
        node.innerHTML = value;
      }
    });

    const langSelect = document.querySelector('[data-lang-select]');
    if (langSelect) {
      langSelect.value = lang;
    }

    renderCategoryList();
    renderArcanaSection();
    renderForecastsSection();

    document.dispatchEvent(new CustomEvent('tarot:language-changed', { detail: { lang } }));
  }

  function renderCategoryList() {
    const container = document.querySelector('[data-category-list]');
    if (!container) return;
    container.innerHTML = '';
    const locale = translations[state.lang] || translations.ru;
    const selectedCategory = state.session?.spread?.category || null;
    categories.forEach((key) => {
      const config = locale.categories[key];
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'category-card';
      card.setAttribute('data-category', key);
      card.setAttribute('data-selected', selectedCategory === key ? 'true' : 'false');
      card.innerHTML = `
        <div class="category-card__icon">${config.icon}</div>
        <div class="category-card__title">${config.title}</div>
        <p class="category-card__description">${config.description}</p>
      `;
      container.appendChild(card);
    });
    if (!selectedCategory && document.body.dataset.page === 'reading') {
      const first = container.querySelector('.category-card');
      if (first) {
        first.setAttribute('data-selected', 'true');
      }
    }
  }

  function renderArcanaSection() {
    const grid = document.querySelector('[data-arcana-grid]');
    if (!grid) return;
    const session = state.session;
    grid.innerHTML = '';
    if (!session) return;
    const locale = translations[state.lang] || translations.ru;
    const keys = ['life', 'destiny', 'year', 'partnership'];
    keys.forEach((key) => {
      const arc = session.arcana[key];
      if (!arc && key === 'partnership') {
        return;
      }
      const info = formatArcanaEntry(key, arc, state.lang);
      const item = document.createElement('article');
      item.className = 'arcana-chip';
      item.innerHTML = `
        <span class="arcana-chip__label">${info.label}</span>
        <p class="arcana-chip__value">${info.cardName} · ${info.number}</p>
        <p class="arcana-chip__card">${info.meaning}</p>
      `;
      grid.appendChild(item);
    });

    const greetingNode = document.querySelector('[data-reading-greeting]');
    if (greetingNode && session.profile && session.profile.name) {
      const template = locale.reading.greeting;
      const message = session.arcana.life
        ? template
            .replace('{name}', session.profile.name)
            .replace(
              '{message}',
              state.lang === 'ru'
                ? 'Ваши арканы загружены — выберите направление и откройте подсказки.'
                : 'Your arcana are ready — choose a focus and reveal the guidance.'
            )
        : template.replace('{name}', session.profile.name).replace('{message}', '');
      greetingNode.textContent = message;
    }
  }

  function renderForecastsSection() {
    const container = document.querySelector('[data-forecast-grid]');
    if (!container) return;
    container.innerHTML = '';
    if (!state.session) return;
    const forecasts = state.session.forecasts || [];
    const locale = translations[state.lang] || translations.ru;
    forecasts.forEach((item) => {
      const card = getMajorArcanaCard(item.arc);
      const name = card ? (state.lang === 'ru' && card.name_ru ? card.name_ru : card.name) : `№${item.arc}`;
      const meaning = card
        ? state.lang === 'ru'
          ? card.upright_ru
          : card.upright
        : '';
      const config = locale.reading.timeframes[item.key];
      const text = config.template.replace('{card}', name).replace('{meaning}', meaning);
      const el = document.createElement('article');
      el.className = 'forecast-card-item';
      el.innerHTML = `
        <h3 class="forecast-card-item__title">${config.title}</h3>
        <p class="forecast-card-item__text">${text}</p>
      `;
      container.appendChild(el);
    });
  }

  function storeSession(session) {
    state.session = session;
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
  }

  function loadSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.session);
      if (raw) {
        state.session = JSON.parse(raw);
      }
    } catch (error) {
      console.error('Failed to parse session', error);
      state.session = null;
    }
    return state.session;
  }

  function storeUtmFromUrl(search) {
    const params = new URLSearchParams(search || window.location.search);
    const utm = {};
    UTM_KEYS.forEach((key) => {
      if (params.has(key)) {
        utm[key] = params.get(key);
      }
    });
    if (Object.keys(utm).length) {
      state.utm = utm;
      sessionStorage.setItem(STORAGE_KEYS.utm, JSON.stringify(utm));
    } else {
      try {
        const cached = sessionStorage.getItem(STORAGE_KEYS.utm);
        if (cached) {
          state.utm = JSON.parse(cached);
        }
      } catch (error) {
        state.utm = {};
      }
    }
    return state.utm;
  }

  function getShareUrl() {
    const base = `${window.location.origin}${window.location.pathname.replace('reading.html', 'index.html')}`;
    if (!state.utm || !Object.keys(state.utm).length) {
      return base;
    }
    const search = new URLSearchParams(state.utm).toString();
    return `${base}?${search}`;
  }

  function attachFormHandlers() {
    const form = document.querySelector('[data-destiny-form]');
    if (!form) return;
    const clearBtn = form.querySelector('[data-action="clear"]');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = (formData.get('name') || '').toString().trim();
      const birth = formData.get('birth') || '';
      if (!name || !birth) {
        form.reportValidity();
        return;
      }
      const partnerName = (formData.get('partnerName') || '').toString().trim();
      const partnerBirth = formData.get('partnerBirth') || '';
      const arcana = computeArcanaSet(birth, partnerBirth || null);
      const forecasts = buildForecasts(arcana, state.lang);
      const session = {
        profile: {
          name,
          birth
        },
        partner: partnerName || partnerBirth ? { name: partnerName || null, birth: partnerBirth || null } : null,
        arcana,
        forecasts,
        lang: state.lang,
        utm: state.utm,
        timestamp: new Date().toISOString()
      };
      storeSession(session);
      const targetUrl = new URL('reading.html', window.location.href);
      targetUrl.searchParams.set('lang', state.lang);
      Object.entries(state.utm || {}).forEach(([key, value]) => {
        targetUrl.searchParams.set(key, value);
      });
      window.location.href = targetUrl.toString();
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        form.reset();
        localStorage.removeItem(STORAGE_KEYS.session);
        state.session = null;
      });
    }
  }

  function attachLangSwitcher() {
    const select = document.querySelector('[data-lang-select]');
    if (!select) return;
    select.addEventListener('change', (event) => {
      applyTranslations(event.target.value);
    });
  }

  function attachReadingActions() {
    const root = document.querySelector('[data-reading-root]');
    if (!root) return;
    root.addEventListener('click', (event) => {
      const action = event.target.closest('[data-action]');
      if (!action) return;
      const actionType = action.getAttribute('data-action');
      switch (actionType) {
        case 'draw':
          document.dispatchEvent(new CustomEvent('tarot:draw-requested'));
          break;
        case 'retry':
          document.dispatchEvent(new CustomEvent('tarot:draw-requested', { detail: { force: true } }));
          break;
        case 'back':
          window.location.href = 'index.html';
          break;
        case 'share':
          shareReading();
          break;
        case 'save-session':
          saveCurrentReading();
          break;
        default:
          break;
      }
    });
  }

  function shareReading() {
    if (!state.session) return;
    const locale = translations[state.lang] || translations.ru;
    const shareUrl = getShareUrl();
    const shareData = {
      title: locale.reading.share.title,
      text: `${locale.reading.share.text}`,
      url: shareUrl
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
      return;
    }

    let sheet = document.querySelector('.share-sheet');
    if (!sheet) {
      sheet = document.createElement('div');
      sheet.className = 'share-sheet';
      sheet.innerHTML = `
        <button type="button" class="share-sheet__close" data-share-close aria-label="Close">✕</button>
        <h3 class="share-sheet__title">${shareData.title}</h3>
        <p class="share-sheet__text">${shareData.text}</p>
        <div class="share-sheet__actions">
          <a class="button button--primary" data-share-x target="_blank" rel="noopener"></a>
          <a class="button button--ghost" data-share-telegram target="_blank" rel="noopener"></a>
          <button type="button" class="button button--ghost" data-share-copy></button>
        </div>
      `;
      document.body.appendChild(sheet);
      sheet.querySelector('[data-share-close]').addEventListener('click', () => {
        sheet.removeAttribute('data-visible');
      });
      sheet.addEventListener('mouseleave', () => {
        sheet.removeAttribute('data-visible');
      });
    }

    const xLink = sheet.querySelector('[data-share-x]');
    const telegramLink = sheet.querySelector('[data-share-telegram]');
    const copyButton = sheet.querySelector('[data-share-copy]');
    sheet.querySelector('.share-sheet__title').textContent = shareData.title;
    sheet.querySelector('.share-sheet__text').textContent = shareData.text;
    const xUrl = new URL('https://twitter.com/intent/tweet');
    xUrl.searchParams.set('text', `${shareData.title}\n${shareData.text}`);
    xUrl.searchParams.set('url', shareData.url);
    xLink.href = xUrl.toString();
    xLink.textContent = locale.reading.share.x;

    const tgUrl = new URL('https://t.me/share/url');
    tgUrl.searchParams.set('url', shareData.url);
    tgUrl.searchParams.set('text', `${shareData.title}\n${shareData.text}`);
    telegramLink.href = tgUrl.toString();
    telegramLink.textContent = locale.reading.share.telegram;

    copyButton.textContent = locale.reading.share.copy;
    copyButton.onclick = () => {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => showToast(locale.toasts.copied || translations.ru.toasts.copied))
        .catch(() => {
          showToast(locale.toasts.copied || translations.ru.toasts.copied);
        });
    };

    sheet.setAttribute('data-visible', 'true');
  }

  function saveCurrentReading() {
    if (!state.session) return;
    let saved = [];
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.saved) || '[]');
    } catch (error) {
      saved = [];
    }
    saved.unshift(state.session);
    localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(saved.slice(0, 10)));
    showToast(translations[state.lang]?.toasts?.saved || translations.ru.toasts.saved);
  }

  function showToast(message) {
    let toast = document.querySelector('.saved-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'saved-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.setAttribute('data-visible', 'true');
    setTimeout(() => {
      toast.removeAttribute('data-visible');
    }, 2800);
  }

  function attachCategorySelection() {
    const container = document.querySelector('[data-category-list]');
    if (!container) return;
    container.addEventListener('click', (event) => {
      const target = event.target.closest('.category-card');
      if (!target) return;
      container.querySelectorAll('.category-card').forEach((card) => card.setAttribute('data-selected', 'false'));
      target.setAttribute('data-selected', 'true');
      document.dispatchEvent(new CustomEvent('tarot:category-selected', { detail: { category: target.getAttribute('data-category') } }));
    });
  }

  function mountStarfield() {
    if (state.starfieldMounted) return;
    state.starfieldMounted = true;
    // Additional particle effects could be attached here in the future.
  }

  function loadCards() {
    if (state.cards.length) {
      return Promise.resolve(state.cards);
    }
    return fetch('cards.json')
      .then((response) => response.json())
      .then((data) => {
        state.cards = data;
        return state.cards;
      });
  }

  function initIndexPage() {
    attachFormHandlers();
  }

  function initReadingPage() {
    const session = loadSession();
    if (!session) {
      const locale = translations[state.lang] || translations.ru;
      const root = document.querySelector('[data-reading-root]');
      if (root) {
        root.innerHTML = `<section class="card"><p>${locale.reading.empty}</p></section>`;
      }
      return;
    }
    renderArcanaSection();
    renderForecastsSection();
    attachReadingActions();
    attachCategorySelection();
  }

  function hydrateFromSession() {
    const session = loadSession();
    if (session) {
      if (session.lang) {
        state.lang = session.lang;
      }
      state.session = session;
    }
  }

  function init() {
    mountStarfield();
    state.utm = storeUtmFromUrl();
    const savedLang = localStorage.getItem(STORAGE_KEYS.lang);
    if (savedLang && translations[savedLang]) {
      state.lang = savedLang;
    }
    hydrateFromSession();
    loadCards().then(() => {
      applyTranslations(state.lang);
      attachLangSwitcher();
      if (document.body.dataset.page === 'index') {
        initIndexPage();
      }
      if (document.body.dataset.page === 'reading') {
        initReadingPage();
      }
    });
  }

  window.TarotDestiny = {
    translations,
    state,
    categories,
    loadCards,
    applyTranslations,
    storageKeys: STORAGE_KEYS,
    get cards() {
      return state.cards;
    },
    get lang() {
      return state.lang;
    }
  };

  document.addEventListener('DOMContentLoaded', init);
})(window, document);
