function createCardItemOnTemplate(
  cardTemplate,
  imagePopup,
  card,
  deleteCardFunction,
  likeCardFunction,
  openModalByClickOnObject
) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__description .card__title');
  cardTitle.textContent = card.name;

  const deleteCardButton = cardItem.querySelector('.card .card__delete-button');
  const likeCardButton = cardItem.querySelector('.card__like-button');
  const likesCount = cardItem.querySelector('.card__likes-count');
  if (card.likes.length > 0) {
    likesCount.textContent = card.likes.length;
  }
  deleteCardButton.addEventListener('click', () =>
    deleteCardFunction(cardItem)
  );
  likeCardButton.addEventListener('click', () =>
    likeCardFunction(likeCardButton)
  );

  const cardImage = setupImage(cardItem, card.link, card.name, '.card__image');
  openModalByClickOnObject(cardImage, imagePopup, initImagePopupFunc);

  return cardItem;
}

function deleteCard(cardItem) {
  cardItem.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

function setupImage(parentNode, srcProp, altProp, classSelector) {
  const imageNode = parentNode.querySelector(classSelector);
  imageNode.src = srcProp;
  imageNode.alt = altProp;
  return imageNode;
}

const initImagePopupFunc = (popup, imageNode) => {
  setupImage(popup, imageNode.src, imageNode.alt, '.popup__image');
  const caption = popup.querySelector('.popup__caption');
  caption.textContent = imageNode.alt;
  popup.setAttribute('style', 'background-color: rgba(0, 0, 0, .9)');
};

export { createCardItemOnTemplate, deleteCard, likeCard };
