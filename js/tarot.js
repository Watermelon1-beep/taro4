(function (window, document) {
  const app = window.TarotDestiny;
  if (!app) return;

  const state = {
    selectedCategory: null,
    drawnCards: [],
    modal: null
  };

  const ORIENTATION = ['upright', 'reversed'];

  function getCardById(id) {
    return app.cards.find((card) => Number(card.id) === Number(id));
  }

  function getCategoryTitle(category, lang) {
    return app.translations[lang]?.categories?.[category]?.title || category;
  }

  function getContextMeaning(card, orientation, category, lang) {
    const langKey = lang === 'ru' ? 'ru' : 'en';
    const categoryTitle = getCategoryTitle(category, lang);
    const base = orientation === 'upright' ? (lang === 'ru' ? card.upright_ru : card.upright) : lang === 'ru' ? card.reversed_ru : card.reversed;
    const contextBlock = card.contexts?.[category]?.[orientation]?.[langKey];
    if (contextBlock) {
      if (lang === 'ru') {
        return `В контексте «${categoryTitle}»: ${contextBlock}`;
      }
      return `Within “${categoryTitle}”: ${contextBlock}`;
    }
    if (lang === 'ru') {
      return `В контексте «${categoryTitle}» карта напоминает: ${base}`;
    }
    return `Within “${categoryTitle}” the card reminds you: ${base}`;
  }

  function renderCards() {
    const container = document.querySelector('[data-cards]');
    if (!container) return;
    container.innerHTML = '';

    if (!state.drawnCards.length) {
      return;
    }

    const lang = app.lang;
    const locale = app.translations[lang] || app.translations.ru;
    const cardsToFlip = [];

    state.drawnCards.forEach((entry, index) => {
      const card = getCardById(entry.id);
      if (!card) return;
      const orientation = entry.orientation;
      const orientationLabel = locale.reading.orientation[orientation] || orientation;
      const name = lang === 'ru' && card.name_ru ? card.name_ru : card.name;
      const meaning = getContextMeaning(card, orientation, state.selectedCategory, lang);
      const general = orientation === 'upright' ? (lang === 'ru' ? card.upright_ru : card.upright) : lang === 'ru' ? card.reversed_ru : card.reversed;

      const wrapper = document.createElement('div');
      wrapper.className = `tarot-card tarot-card--${card.energy || 'neutral'}`;
      wrapper.setAttribute('data-flipped', 'false');
      wrapper.setAttribute('tabindex', '0');
      wrapper.setAttribute('role', 'button');
      wrapper.setAttribute('aria-label', `${name} — ${orientationLabel}`);
      wrapper.dataset.cardIndex = index;

      wrapper.innerHTML = `
        <div class="tarot-card__inner">
          <div class="tarot-card__face tarot-card__face--back">Tarot Destiny</div>
          <div class="tarot-card__face tarot-card__face--front">
            <img src="${card.image}" alt="${name}" class="tarot-card__image" />
            <div class="tarot-card__body">
              <h3 class="tarot-card__name">${name}</h3>
              <p class="tarot-card__orientation">${orientationLabel}</p>
              <p class="tarot-card__context">${meaning}</p>
            </div>
          </div>
        </div>
      `;

      wrapper.addEventListener('click', () => openModal({ card, name, orientationLabel, meaning, general, orientation }));
      wrapper.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openModal({ card, name, orientationLabel, meaning, general, orientation });
        }
      });

      container.appendChild(wrapper);
      cardsToFlip.push(wrapper);
    });

    requestAnimationFrame(() => {
      cardsToFlip.forEach((card, idx) => {
        setTimeout(() => {
          card.setAttribute('data-flipped', 'true');
        }, 160 * idx + 200);
      });
    });
  }

  function openModal({ card, name, orientationLabel, meaning, general, orientation }) {
    const modal = getModal();
    const lang = app.lang;
    modal.querySelector('[data-modal-title]').textContent = name;
    modal.querySelector('[data-modal-orientation]').textContent = orientationLabel;
    modal.querySelector('[data-modal-body]').innerHTML = `
      <p>${meaning}</p>
      <p>${lang === 'ru' ? 'Общее значение:' : 'General meaning:'} ${general}</p>
    `;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = getModal();
    if (!modal) return;
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function getModal() {
    if (state.modal) return state.modal;
    state.modal = document.querySelector('[data-modal]');
    return state.modal;
  }

  function bindModal() {
    const modal = getModal();
    if (!modal) return;
    modal.addEventListener('click', (event) => {
      if (event.target === modal || event.target.hasAttribute('data-modal-close')) {
        closeModal();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
  }

  function ensureDefaultCategory() {
    if (state.selectedCategory) return;
    const list = document.querySelector('[data-category-list]');
    const first = list ? list.querySelector('.category-card') : null;
    if (first) {
      first.setAttribute('data-selected', 'true');
      state.selectedCategory = first.getAttribute('data-category');
    }
  }

  function drawCards() {
    ensureDefaultCategory();
    if (!state.selectedCategory) return;
    const cards = [...app.cards];
    if (!cards.length) return;
    const drawn = [];
    while (drawn.length < 3 && cards.length) {
      const index = Math.floor(Math.random() * cards.length);
      const [card] = cards.splice(index, 1);
      drawn.push({ id: card.id, orientation: ORIENTATION[Math.floor(Math.random() * ORIENTATION.length)] });
    }
    state.drawnCards = drawn;
    persistSpread();
    renderCards();
  }

  function persistSpread() {
    const session = app.state.session;
    if (!session) return;
    session.spread = {
      category: state.selectedCategory,
      cards: state.drawnCards
    };
    try {
      localStorage.setItem(app.storageKeys.session, JSON.stringify(session));
    } catch (error) {
      console.error('Unable to persist spread', error);
    }
  }

  function restoreSpread() {
    const session = app.state.session;
    if (session && session.spread) {
      state.selectedCategory = session.spread.category;
      state.drawnCards = session.spread.cards || [];
      const list = document.querySelector('[data-category-list]');
      if (list && state.selectedCategory) {
        list.querySelectorAll('.category-card').forEach((card) => {
          card.setAttribute('data-selected', card.getAttribute('data-category') === state.selectedCategory ? 'true' : 'false');
        });
      }
      if (state.drawnCards.length) {
        renderCards();
      }
    } else {
      ensureDefaultCategory();
    }
  }

  function handleCategoryChange(event) {
    if (event.detail && event.detail.category) {
      state.selectedCategory = event.detail.category;
      persistSpread();
      if (state.drawnCards.length) {
        renderCards();
      }
    }
  }

  function handleDrawRequest() {
    drawCards();
  }

  function bindEvents() {
    document.addEventListener('tarot:category-selected', handleCategoryChange);
    document.addEventListener('tarot:draw-requested', handleDrawRequest);
    document.addEventListener('tarot:language-changed', () => {
      if (state.drawnCards.length) {
        renderCards();
      }
    });
  }

  function init() {
    if (document.body.dataset.page !== 'reading') return;
    app.loadCards().then(() => {
      bindEvents();
      bindModal();
      restoreSpread();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})(window, document);
