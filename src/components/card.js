// Функция создания карточки
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


//  Функция удаления карточки
function deleteCard(cardItem) {
  cardItem.remove();
}


export { createCardItemOnTemplate, deleteCard };
