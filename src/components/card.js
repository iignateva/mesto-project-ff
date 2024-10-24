import { addModalByClickOnObject } from './modal';

const cardImageSelector = '.card__image';

function createCardItemOnTemplate(cardTemplate, card, deleteCardFunction, imagePopup) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardItem.querySelector(cardImageSelector);
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardItem.querySelector('.card__description .card__title').textContent =
    card.name;
  cardItem
    .querySelector('.card .card__delete-button')
    .addEventListener('click', () => deleteCardFunction(cardItem));
  const likeButton = cardItem.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeCard(likeButton));
  
  addModalByClickOnObject(cardImage, imagePopup, initImagePopupFunc);
  
  return cardItem;
}

const initImagePopupFunc  = (popup, imageNode) => {
  const imageNodeOnPopup = popup.querySelector('.popup__image');
  imageNodeOnPopup.src = imageNode.src;
  imageNodeOnPopup.alt = imageNode.alt;
  const caption = popup.querySelector('.popup__caption');
  caption.textContent = imageNode.alt;
  popup.setAttribute('style', 'background-color: rgba(0, 0, 0, .9)');
}


//  Функция удаления карточки
function deleteCard(cardItem) {
  cardItem.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
 


export { createCardItemOnTemplate, deleteCard, likeCard };
