import './pages/index.css';
import { initialCards } from './scripts/cards';
import { createCardItemOnTemplate, deleteCard } from './components/card';
import { addModalByClickOnObject } from './components/modal';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardPlacesNode = document.querySelector('.places .places__list');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
//const popupShowImage = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');
addModalByClickOnObject(profileEditButton, popupEditProfile);
const addNewCardButton = document.querySelector('.profile__add-button');
addModalByClickOnObject(addNewCardButton, popupAddNewCard);

function createCards() {
  initialCards.forEach((card) => {
    const cardItem = createCardItemOnTemplate(cardTemplate, card, deleteCard);
    cardPlacesNode.append(cardItem);
  });
}

// Вывести карточки на страницу
createCards();
