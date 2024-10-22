import './pages/index.css';
import { initialCards } from './scripts/cards';
import { createCardItemOnTemplate, deleteCard } from './components/card';
import { addModalByClickOnObject, closeModal } from './components/modal';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardPlacesNode = document.querySelector('.places .places__list');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
//const popupShowImage = document.querySelector('.popup_type_image');

const initProfileForm = () => {
  const profileForm = document.forms['edit-profile'];
  if (profileForm) {
    profileForm.elements.name.value =
      document.querySelector('.profile__title').textContent;
    profileForm.elements.description.value = document.querySelector(
      '.profile__description'
    ).textContent;
  }
};

const profileEditForm = popupEditProfile.querySelector('.popup__form');
const profileEditFormNameInput = profileEditForm.querySelector(
  '.popup__input_type_name'
);
const profileEditFormJobInput = profileEditForm.querySelector(
  '.popup__input_type_description'
);

const profileEditFormSubmit = (evt) => {
  evt.preventDefault();
  
  const updatingProfileTitle = document.querySelector('.profile__title');
  updatingProfileTitle.textContent = profileEditFormNameInput.value;
  const updatingProfileDesc = document.querySelector('.profile__description');
  updatingProfileDesc.textContent = profileEditFormJobInput.value;
  closeModal(popupEditProfile);
};

profileEditForm.addEventListener('submit', profileEditFormSubmit);

const profileEditButton = document.querySelector('.profile__edit-button');
addModalByClickOnObject(profileEditButton, popupEditProfile, initProfileForm);

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
