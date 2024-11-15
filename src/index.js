import './pages/index.css';
import {
  createCardItemOnTemplate,
  deleteCard,
  likeCard,
} from './components/card';
import { openModalByClickOnObject, closeModal } from './components/modal';
import { clearValidation, enableValidation } from './components/validation';
import {
  getInfoAboutMeAndCards,
  patchProfile,
  postCard,
  deleteCardById,
} from './components/api';

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
const profileImage = document.querySelector('.profile__image');

const inputElementSelector = '.popup__input';
const inputErrorClassName = 'popup__input_type_error';
const errorVisibleClassName = 'popup__error_visible';
const popupButtonElementSelector = '.popup__button';
const inactiveButtonClassName = 'popup__button_disabled';

const popupDeleteAccept = document.querySelector('.popup_type_action-accept');
const deleteAcceptButtonOk = popupDeleteAccept.querySelector(
  popupButtonElementSelector
);

const deleteCardHandler = () => {
  const cardId = popupDeleteAccept.cardId;
  const cardNode = popupDeleteAccept.cardNode;
  if (cardId && cardNode) {
    deleteCardById(cardId);
    deleteCard(cardNode);
  }
  closeModal(popupDeleteAccept);
};
deleteAcceptButtonOk.addEventListener('click', deleteCardHandler);

const submitProfileEditForm = (evt) => {
  evt.preventDefault();
  const newProfileInfo = {
    name: profileEditFormNameInput.value,
    about: profileEditFormJobInput.value,
  };
  const patchedProfilePromise = patchProfile(newProfileInfo);
  patchedProfilePromise.then((profile) => {
    setProfileInfo(profile);
  });
  profileEditForm.reset();
  closeModal(popupEditProfile);
};

profileEditForm.addEventListener('submit', submitProfileEditForm);

const clearValidationOnForm = (form) => {
  clearValidation(form, {
    inputSelector: inputElementSelector,
    inputErrorClass: inputErrorClassName,
    errorVisibleClass: errorVisibleClassName,
    buttonElementSelector: popupButtonElementSelector,
    inactiveButtonClass: inactiveButtonClassName,
  });
};

const setProfileInfo = (profile) => {
  profileTitle.textContent = profile.name;
  profileDesc.textContent = profile.about;
  profileImage.style.backgroundImage = `url(${profile.avatar})`;
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

  const newCard = {
    name: addNewCardFormNameInput.value,
    link: addNewCardFormUrlInput.value,
  };

  postCard(newCard).then((newCard) => {
    cardPlacesNode.prepend(createCard(newCard, newCard.owner));
    addNewCardForm.reset();
    closeModal(popupAddNewCard);
  });
};

addNewCardForm.addEventListener('submit', addNewCardFormSubmit);

const initAddNewCardForm = () => {
  addNewCardForm.reset();
  clearValidationOnForm(addNewCardForm);
};

openModalByClickOnObject(addNewCardButton, popupAddNewCard, initAddNewCardForm);

function createCard(card, profile) {
  return createCardItemOnTemplate(
    cardTemplate,
    popupShowImage,
    card,
    profile,
    deleteCard,
    popupDeleteAccept,
    likeCard,
    openModalByClickOnObject
  );
}

function createCards(cards, profile) {
  cards.forEach((card) => {
    cardPlacesNode.append(createCard(card, profile));
  });
}

function fillPage() {
  const promises = getInfoAboutMeAndCards();
  Promise.all(promises).then((results) => {
    const profile = results[0];
    setProfileInfo(profile);
    createCards(results[1], profile);
  });
}

// Вывести карточки на страницу
fillPage();

enableValidation(
  '.popup__form',
  inputElementSelector,
  popupButtonElementSelector,
  inactiveButtonClassName,
  inputErrorClassName,
  errorVisibleClassName
);
