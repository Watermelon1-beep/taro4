(function (window, document) {
  const state = {
    cards: [],
    drawn: [],
    category: null,
    lang: 'ru'
  };

  const selectors = {
    drawButton: '[data-action="draw"]',
    retryButton: '[data-action="retry"]',
    backButton: '[data-action="back"]',
    cardsWrapper: '[data-cards]',
    placeholder: '[data-placeholder]',
    categoryLabel: '[data-selected-category]',
    modal: '[data-modal]',
    modalTitle: '[data-modal-title]',
    modalOrientation: '[data-modal-orientation]',
    modalBody: '[data-modal-body]'
  };

  function init() {
    if (!window.TarotSite) return;

    const params = new URLSearchParams(window.location.search);
    const queryCategory = params.get('category');
    state.category = validateCategory(queryCategory) ? queryCategory : 'compatibility';

    const langParam = params.get('lang');
    if (langParam && langParam !== window.TarotSite.state.currentLang && window.TarotSite.translations[langParam]) {
      window.TarotSite.applyTranslations(langParam);
    }

    state.lang = window.TarotSite.state.currentLang;
    updateCategoryLabel();
    bindControls();
    bindModal();
    window.TarotSite.storeUtm();
    fetchCards();

    document.addEventListener('tarot:language-changed', handleLanguageChange);
  }

  function validateCategory(candidate) {
    return window.TarotSite.categories.some((cat) => cat.id === candidate);
  }

  function handleLanguageChange(event) {
    state.lang = event.detail.lang;
    updateCategoryLabel();
    if (state.drawn.length) {
      renderCards(state.drawn, { animate: false });
    }
    updateButtons();
  }

  function fetchCards() {
    fetch('cards.json')
      .then((response) => response.json())
      .then((data) => {
        state.cards = data;
      })
      .catch(() => {
        const placeholder = document.querySelector(selectors.placeholder);
        if (placeholder) {
          placeholder.textContent = 'Unable to load cards. Please try again later.';
        }
      });
  }

  function bindControls() {
    const drawButton = document.querySelector(selectors.drawButton);
    const retryButton = document.querySelector(selectors.retryButton);
    const backButton = document.querySelector(selectors.backButton);

    drawButton?.addEventListener('click', (event) => {
      event.preventDefault();
      handleDraw();
    });

    retryButton?.addEventListener('click', (event) => {
      event.preventDefault();
      handleDraw();
    });

    backButton?.addEventListener('click', (event) => {
      event.preventDefault();
      const utm = window.TarotSite.getStoredUtm();
      const lang = window.TarotSite.state.currentLang;
      const query = window.TarotSite.buildQuery({ ...utm, lang });
      window.location.href = query ? `index.html?${query}` : 'index.html';
    });

    updateButtons();
  }

  function updateButtons() {
    const drawButton = document.querySelector(selectors.drawButton);
    const retryButton = document.querySelector(selectors.retryButton);
    const backButton = document.querySelector(selectors.backButton);

    const drawLabel = window.TarotSite.getTranslation('buttons.draw', state.lang);
    const retryLabel = window.TarotSite.getTranslation('buttons.retry', state.lang);
    const backLabel = window.TarotSite.getTranslation('buttons.back', state.lang);

    if (drawButton) drawButton.textContent = drawLabel || 'Draw cards';
    if (retryButton) retryButton.textContent = retryLabel || 'Try again';
    if (backButton) backButton.textContent = backLabel || 'Back';
  }

  function bindModal() {
    const modal = document.querySelector(selectors.modal);
    if (!modal) return;

    const cardsWrapper = document.querySelector(selectors.cardsWrapper);
    cardsWrapper?.addEventListener('click', (event) => {
      const card = event.target.closest('.tarot-card');
      if (!card) return;
      openModal(card);
    });

    cardsWrapper?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        const card = event.target.closest('.tarot-card');
        if (card) {
          event.preventDefault();
          openModal(card);
        }
      }
    });

    modal.addEventListener('click', (event) => {
      if (event.target.matches('[data-modal-close]') || event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
  }

  function handleDraw() {
    if (!state.cards.length) return;
    const pool = [...state.cards];
    const selected = [];

    while (selected.length < 3 && pool.length) {
      const index = Math.floor(Math.random() * pool.length);
      const [card] = pool.splice(index, 1);
      const orientation = Math.random() < 0.5 ? 'upright' : 'reversed';
      selected.push({ ...card, orientation });
    }

    state.drawn = selected;
    renderCards(selected, { animate: true });
  }

  function renderCards(cards, { animate } = { animate: true }) {
    const container = document.querySelector(selectors.cardsWrapper);
    const placeholder = document.querySelector(selectors.placeholder);
    if (!container) return;

    if (placeholder) {
      placeholder.textContent = '';
    }

    container.innerHTML = '';
    const lang = state.lang;

    cards.forEach((card, index) => {
      const context = card.contexts?.[state.category]?.[card.orientation];
      const meaning = (context && (context[lang] || context.en)) || '';
      const orientationLabel = window.TarotSite.getTranslation(`reading.orientation.${card.orientation}`, lang) || card.orientation;
      const adviceLabel = window.TarotSite.getTranslation('reading.modal.more', lang) || 'Full meaning';

      const article = document.createElement('article');
      article.className = 'tarot-card';
      article.tabIndex = 0;
      article.dataset.cardId = card.id;
      article.dataset.cardName = card.name;
      article.dataset.orientationLabel = orientationLabel;
      article.dataset.orientation = card.orientation;
      article.dataset.meaning = meaning;
      article.dataset.upright = card.upright;
      article.dataset.uprightRu = card.upright_ru || '';
      article.dataset.reversed = card.reversed;
      article.dataset.reversedRu = card.reversed_ru || '';
      article.dataset.detailLabel = adviceLabel;

      article.innerHTML = `
        <div class="tarot-card__face tarot-card__face--front">✨</div>
        <div class="tarot-card__face tarot-card__face--back">
          <div class="tarot-card__image-wrapper">
            <img class="tarot-card__image" src="${card.image}" alt="${card.name}" loading="lazy" />
          </div>
          <div class="tarot-card__info">
            <h4 class="tarot-card__name">${card.name}</h4>
            <p class="tarot-card__orientation">${orientationLabel}</p>
            <p class="tarot-card__meaning">${meaning}</p>
          </div>
        </div>
      `;

      container.appendChild(article);

      if (animate) {
        article.classList.remove('flipped');
        setTimeout(() => {
          article.classList.add('flipped');
        }, 320 + index * 180);
      } else {
        article.classList.add('flipped');
      }
    });
  }

  function openModal(cardElement) {
    const modal = document.querySelector(selectors.modal);
    if (!modal) return;

    const title = document.querySelector(selectors.modalTitle);
    const orientationEl = document.querySelector(selectors.modalOrientation);
    const body = document.querySelector(selectors.modalBody);

    const cardName = cardElement.dataset.cardName;
    const orientationLabel = cardElement.dataset.orientationLabel;
    const meaning = cardElement.dataset.meaning;
    const orientationKey = cardElement.dataset.orientation;
    const lang = state.lang;
    const generalMeaning = orientationKey === 'upright'
      ? (lang === 'ru' && cardElement.dataset.uprightRu ? cardElement.dataset.uprightRu : cardElement.dataset.upright)
      : (lang === 'ru' && cardElement.dataset.reversedRu ? cardElement.dataset.reversedRu : cardElement.dataset.reversed);

    const detailIntro = cardElement.dataset.detailLabel || 'Full meaning';

    if (title) title.textContent = cardName;
    if (orientationEl) orientationEl.textContent = `${orientationLabel}`;
    if (body) {
      body.innerHTML = `
        <p>${meaning}</p>
        <p><strong>${detailIntro}:</strong> ${generalMeaning}</p>
      `;
    }

    modal.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.querySelector(selectors.modal);
    if (!modal) return;
    modal.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  function updateCategoryLabel() {
    const labelEl = document.querySelector(selectors.categoryLabel);
    if (!labelEl) return;
    const lang = state.lang;
    const categoryData = window.TarotSite.categories.find((cat) => cat.id === state.category);
    const title = window.TarotSite.getTranslation(`categories.${state.category}.title`, lang) || state.category;
    labelEl.textContent = `${categoryData?.icon || '✨'} ${title}`;
  }

  document.addEventListener('DOMContentLoaded', init);
})(window, document);
