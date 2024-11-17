import { putLikeOnCard, deleteLikeOnCard, deleteCardById } from './api';
import { popupButtonSelectorName } from './const';
import { closeModal } from './modal';

const hideDeleteCardBtnClassName = 'card__delete-button_is-hided';
const likeIsActiveClassName = 'card__like-button_is-active';

const deleteCardFromPage = (cardItem) => {
  cardItem.remove();
};

const deleteCardHandler = (evt) => {
  const target = evt.target;
  const cardId = target.cardId;
  const cardNode = target.cardNode;
  if (cardId && cardNode) {
    deleteCardById(cardId);
    deleteCardFromPage(cardNode);
  }
  target.removeEventListener('click', deleteCardHandler);
  const acceptPopup = target.acceptPopup;
  closeModal(acceptPopup);
};

const setupImage = (parentNode, srcProp, altProp, classSelector) => {
  const imageNode = parentNode.querySelector(classSelector);
  imageNode.src = srcProp;
  imageNode.alt = altProp;
  return imageNode;
};

const initImagePopupFunc = (popup, imageNode) => {
  setupImage(popup, imageNode.src, imageNode.alt, '.popup__image');
  const caption = popup.querySelector('.popup__caption');
  caption.textContent = imageNode.alt;
  popup.setAttribute('style', 'background-color: rgba(0, 0, 0, .9)');
};

const setLikeCount = (likesCountNode, card) => {
  likesCountNode.textContent = card.likes.length > 0 ? card.likes.length : '';
};

const likeCard = (likeButton, likesCountNode, cardId) => {
  let promiseResCard;
  if (likeButton.classList.contains(likeIsActiveClassName)) {
    promiseResCard = deleteLikeOnCard(cardId);
  } else {
    promiseResCard = putLikeOnCard(cardId);
  }
  promiseResCard.then((card) => {
    setLikeCount(likesCountNode, card);
  });
  likeButton.classList.toggle(likeIsActiveClassName);
};

function createCardItemOnTemplate(
  cardTemplate,
  imagePopup,
  card,
  profile,
  deleteAcceptPopup,
  likeCardFunction,
  openModalByClickOnObject
) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__description .card__title');
  cardTitle.textContent = card.name;

  const likeCardButton = cardItem.querySelector('.card__like-button');
  likeCardButton.addEventListener('click', () =>
    likeCardFunction(likeCardButton, likesCountNode, card._id)
  );
  const likesCountNode = cardItem.querySelector('.card__likes-count');
  setLikeCount(likesCountNode, card);

  const deleteCardButton = cardItem.querySelector('.card .card__delete-button');
  if (card.owner._id === profile._id) {
    openModalByClickOnObject(deleteCardButton, deleteAcceptPopup, () => {
      const deleteAcceptButtonOk = deleteAcceptPopup.querySelector(
        popupButtonSelectorName
      );
      deleteAcceptButtonOk.cardId = card._id;
      deleteAcceptButtonOk.cardNode = cardItem;
      deleteAcceptButtonOk.acceptPopup = deleteAcceptPopup;
      deleteAcceptButtonOk.addEventListener('click', deleteCardHandler);
    });
    deleteCardButton.classList.remove(hideDeleteCardBtnClassName);
  } else {
    deleteCardButton.classList.add(hideDeleteCardBtnClassName);
  }

  const cardImage = setupImage(cardItem, card.link, card.name, '.card__image');
  openModalByClickOnObject(cardImage, imagePopup, initImagePopupFunc);

  return cardItem;
}

export { createCardItemOnTemplate, likeCard };
