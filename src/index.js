import './pages/index.css';
import { initialCards } from './scripts/cards';
import {
  createCardItemOnTemplate,
  deleteCard,
  likeCard,
} from './components/card';
import { openModalByClickOnObject, closeModal } from './components/modal';
import { clearValidation, enableValidation } from './components/validation';

const cardTemplate = document.querySelector('#card-template').content;
const cardPlacesNode = document.querySelector('.places .places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileEditForm = popupEditProfile.querySelector('.popup__form');
const profileEditFormNameInput = profileEditForm.querySelector(
  '.popup__input_type_name'
);
const profileEditFormJobInput = profileEditForm.querySelector(
  '.popup__input_type_description'
);
const updatingProfileTitle = document.querySelector('.profile__title');
const updatingProfileDesc = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileForm = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const addNewCardForm = popupAddNewCard.querySelector('.popup__form');
const addNewCardFormNameInput = addNewCardForm.querySelector(
  '.popup__input_type_card-name'
);
const addNewCardFormUrlInput = addNewCardForm.querySelector(
  '.popup__input_type_url'
);
const popupShowImage = document.querySelector('.popup_type_image');
const addNewCardButton = document.querySelector('.profile__add-button');

const submitProfileEditForm = (evt) => {
  evt.preventDefault();
  updatingProfileTitle.textContent = profileEditFormNameInput.value;
  updatingProfileDesc.textContent = profileEditFormJobInput.value;
  profileEditForm.reset();
  closeModal(popupEditProfile);
};

profileEditForm.addEventListener('submit', submitProfileEditForm);

const inputElementSelector = '.popup__input';
const inputErrorClassName = 'popup__input_type_error';
const errorVisibleClassName = 'popup__error_visible';
const submitButtonElementSelector = '.popup__button';
const inactiveButtonClassName = 'popup__button_disabled';

const clearValidationOnForm = (form) => {
  clearValidation(form, {
    inputSelector: inputElementSelector,
    inputErrorClass: inputErrorClassName,
    errorVisibleClass: errorVisibleClassName,
    buttonElementSelector: submitButtonElementSelector,
    inactiveButtonClass: inactiveButtonClassName,
  });
};

const initProfileForm = () => {
  clearValidationOnForm(profileForm);
  if (profileForm) {
    profileForm.elements.name.value = profileTitle.textContent;
    profileForm.elements.description.value = profileDesc.textContent;
  }
};

openModalByClickOnObject(profileEditButton, popupEditProfile, initProfileForm);

const addNewCardFormSubmit = (evt) => {
  evt.preventDefault();

  cardPlacesNode.prepend(
    createCard({
      name: addNewCardFormNameInput.value,
      link: addNewCardFormUrlInput.value,
    })
  );
  addNewCardForm.reset();
  closeModal(popupAddNewCard);
};

addNewCardForm.addEventListener('submit', addNewCardFormSubmit);

const initAddNewCardForm = () => {
  addNewCardForm.reset();
  clearValidationOnForm(addNewCardForm);
};

openModalByClickOnObject(
  addNewCardButton,
  popupAddNewCard,
  initAddNewCardForm
);



function createCard(card) {
  return createCardItemOnTemplate(
    cardTemplate,
    popupShowImage,
    card,
    deleteCard,
    likeCard,
    openModalByClickOnObject
  );
}

function createCards() {
  initialCards.forEach((card) => {
    cardPlacesNode.append(createCard(card));
  });
}

// Вывести карточки на страницу
createCards();

enableValidation(
  '.popup__form',
  inputElementSelector,
  submitButtonElementSelector,
  inactiveButtonClassName,
  inputErrorClassName,
  errorVisibleClassName
);
