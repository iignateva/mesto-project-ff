const hideDeleteCardBtnClassName = 'card__delete-button_is-hided';

const setLikeCount = (likesCountNode, card) => {
  likesCountNode.textContent = card.likes.length > 0 ? card.likes.length : '';
};

function createCardItemOnTemplate(
  cardTemplate,
  imagePopup,
  card,
  profile,
  deleteAcceptPopup,
  likeCardFunction,
  openModalByClickOnObject,
  setupImage,
  initImagePopupFunc,
  deleteCardFunc
) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__description .card__title');
  cardTitle.textContent = card.name;
  cardItem.id = `id_${card._id}`;

  const likeCardButton = cardItem.querySelector('.card__like-button');
  likeCardButton.addEventListener('click', () =>
    likeCardFunction(likeCardButton, likesCountNode, card._id)
  );
  const likesCountNode = cardItem.querySelector('.card__likes-count');
  setLikeCount(likesCountNode, card);

  const deleteCardButton = cardItem.querySelector('.card .card__delete-button');
  if (card.owner._id === profile._id) {
    deleteCardButton.cardId = card._id;
    openModalByClickOnObject(
      deleteCardButton,
      deleteAcceptPopup,
      deleteCardFunc
    );
    deleteCardButton.classList.remove(hideDeleteCardBtnClassName);
  } else {
    deleteCardButton.classList.add(hideDeleteCardBtnClassName);
  }

  const cardImage = setupImage(cardItem, card.link, card.name, '.card__image');
  openModalByClickOnObject(cardImage, imagePopup, initImagePopupFunc);

  return cardItem;
}

export { createCardItemOnTemplate, setLikeCount };
