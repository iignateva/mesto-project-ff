// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardPlacesNode = document.querySelector('.places .places__list');

// @todo: Функция создания карточки
function createCardItemOnTemplate(cardTemplate, card, deleteCardFunction) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardItem.querySelector('.card__description .card__title').textContent =
    card.name;
  cardItem
    .querySelector('.card .card__delete-button')
    .addEventListener('click', () => deleteCardFunction(cardItem));
  return cardItem;
}

function createCards() {
  initialCards.forEach((card) => {
    const cardItem = createCardItemOnTemplate(cardTemplate, card, deleteCard);
    cardPlacesNode.append(cardItem);
  });
}

// @todo: Функция удаления карточки
function deleteCard(cardItem) {
  cardItem.remove();
}

// @todo: Вывести карточки на страницу
createCards();
