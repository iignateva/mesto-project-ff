// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardPlacesNode = document.querySelector('.places .places__list');

// @todo: Функция создания карточки
function createCardOnTemplate(cardTemplate, cardImageSrc, cardTitleText) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = cardImageSrc;
  card.querySelector('.card__description .card__title').textContent = cardTitleText;
  card.querySelector('.card .card__delete-button').addEventListener('click', deleteCard);
  return card;
}

function createCards() {
  initialCards.forEach((card) => {
    const cardItem = createCardOnTemplate(cardTemplate, card.link, card.name);
    cardPlacesNode.append(cardItem);
  });
}

// @todo: Функция удаления карточки
function deleteCard() {
  const cardItem = this.closest('.places__item');
  cardItem.remove();
}

// @todo: Вывести карточки на страницу
createCards();
