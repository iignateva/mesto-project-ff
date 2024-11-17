import './pages/index.css';
import { createCardItemOnTemplate, likeCard } from './components/card';
import { openModalByClickOnObject, closeModal } from './components/modal';
import { clearValidation, enableValidation } from './components/validation';
import {
  getInfoAboutMeAndCards,
  patchProfile,
  postCard,
  patchAvatar,
} from './components/api';
import { popupButtonSelectorName } from './components/const';

const formSelectorName = '.popup__form';
const inputSelectorName = '.popup__input';
const inputErrorClassName = 'popup__input_type_error';
const errorVisibleClassName = 'popup__error_visible';
const inactiveButtonClassName = 'popup__button_disabled';

const cardTemplate = document.querySelector('#card-template').content;
const cardPlacesNode = document.querySelector('.places .places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileEditForm = popupEditProfile.querySelector(formSelectorName);
const profileEditFormNameInput = profileEditForm.querySelector(
  '.popup__input_type_name'
);
const profileEditFormJobInput = profileEditForm.querySelector(
  '.popup__input_type_description'
);
const profileEditButton = document.querySelector('.profile__edit-button');
const profileForm = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const addNewCardForm = popupAddNewCard.querySelector(formSelectorName);
const addNewCardFormNameInput = addNewCardForm.querySelector(
  '.popup__input_type_card-name'
);
const addNewCardFormUrlInput = addNewCardForm.querySelector(
  '.popup__input_type_url'
);
const popupShowImage = document.querySelector('.popup_type_image');
const addNewCardButton = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');

const popupDeleteAccept = document.querySelector('.popup_type_action-accept');

const popupNewAvatar = document.querySelector('.popup_type_update-avatar');
const newAvatarForm = popupNewAvatar.querySelector(formSelectorName);
const NewAvatarUrlInput = popupNewAvatar.querySelector(
  '.popup__input_type_url'
);

const addCardOnPage = (card, profile) => {
  cardPlacesNode.append(createCard(card, profile));
};

function createCard(card, profile) {
  return createCardItemOnTemplate(
    cardTemplate,
    popupShowImage,
    card,
    profile,
    popupDeleteAccept,
    likeCard,
    openModalByClickOnObject
  );
}

function createCards(cards, profile) {
  cards.forEach((card) => {
    addCardOnPage(card, profile);
  });
}

const clearValidationOnForm = (form) => {
  clearValidation(form, {
    inputSelector: inputSelectorName,
    inputErrorClass: inputErrorClassName,
    errorVisibleClass: errorVisibleClassName,
    buttonElementSelector: popupButtonSelectorName,
    inactiveButtonClass: inactiveButtonClassName,
  });
};

const submitProfileEditForm = (evt) => {
  evt.preventDefault();
  const newProfileInfo = {
    name: profileEditFormNameInput.value,
    about: profileEditFormJobInput.value,
  };
  addWaitingWhileSubmit(popupEditProfile, (callback) => {
    const patchedProfilePromise = patchProfile(newProfileInfo);
    patchedProfilePromise.then((profile) => {
      setProfileInfo(profile);
    });
    callback();
  });
  profileEditForm.reset();
  closeModal(popupEditProfile);
};

profileEditForm.addEventListener('submit', submitProfileEditForm);

const submitNewAvatarForm = (evt) => {
  evt.preventDefault();
  const newAvatar = {
    avatar: NewAvatarUrlInput.value,
  };
  addWaitingWhileSubmit(popupNewAvatar, (callback) => {
    patchAvatar(newAvatar).then((profile) => {
      setProfileInfo(profile);
      callback();
    });
  });
  newAvatarForm.reset();
  closeModal(popupNewAvatar);
};

newAvatarForm.addEventListener('submit', submitNewAvatarForm);

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

openModalByClickOnObject(profileImage, popupNewAvatar);
openModalByClickOnObject(profileEditButton, popupEditProfile, initProfileForm);

const addNewCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCard = {
    name: addNewCardFormNameInput.value,
    link: addNewCardFormUrlInput.value,
  };

  addWaitingWhileSubmit(popupAddNewCard, (callback) => {
    postCard(newCard).then((newCard) => {
      addNewCardForm.reset();
      closeModal(popupAddNewCard);
      addCardOnPage(newCard, newCard.owner);
      callback();
    });
  });
};

const addWaitingWhileSubmit = (submitFormNode, submitFunc) => {
  const button = submitFormNode.querySelector(popupButtonSelectorName);
  const baseText = button.textContent;
  button.textContent = baseText + '...';
  submitFunc(() => {
    button.textContent = baseText;
  });
};

addNewCardForm.addEventListener('submit', addNewCardFormSubmit);

const initAddNewCardForm = () => {
  addNewCardForm.reset();
  clearValidationOnForm(addNewCardForm);
};

openModalByClickOnObject(addNewCardButton, popupAddNewCard, initAddNewCardForm);

function fillPage() {
  const promises = getInfoAboutMeAndCards();
  Promise.all(promises).then((results) => {
    const profile = results[0];
    const cards = results[1];
    setProfileInfo(profile);
    createCards(cards, profile);
  });
}

enableValidation(
  formSelectorName,
  inputSelectorName,
  popupButtonSelectorName,
  inactiveButtonClassName,
  inputErrorClassName,
  errorVisibleClassName
);

// Вывести карточки на страницу
fillPage();
