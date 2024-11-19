import './pages/index.css';
import { createCardItemOnTemplate, setLikeCount } from './components/card';
import { openModalByClickOnObject, closeModal } from './components/modal';
import { clearValidation, enableValidation } from './components/validation';
import {
  getInfoAboutMeAndCards,
  patchProfile,
  postCard,
  patchAvatar,
  deleteCardById,
  deleteLikeOnCard,
  putLikeOnCard,
} from './components/api';

const formSelectorName = '.popup__form';
const inputSelectorName = '.popup__input';
const popupButtonSelectorName = '.popup__button';
const inputErrorClassName = 'popup__input_type_error';
const errorVisibleClassName = 'popup__error_visible';
const inactiveButtonClassName = 'popup__button_disabled';
const likeIsActiveClassName = 'card__like-button_is-active';

const cardTemplate = document.querySelector('#card-template').content;
const cardPlacesNode = document.querySelector('.places .places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileEditForm = document.forms['edit-profile'];
const profileEditFormNameInput = profileEditForm.querySelector(
  '.popup__input_type_name'
);
const profileEditFormJobInput = profileEditForm.querySelector(
  '.popup__input_type_description'
);
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const addNewCardForm = document.forms['new-place'];
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
const newAvatarForm = document.forms['new-avatar'];
const newAvatarUrlInput = popupNewAvatar.querySelector(
  '.popup__input_type_url'
);

const addCardOnPage = (card, profile) => {
  cardPlacesNode.prepend(createCard(card, profile));
};

function createCard(card, profile) {
  return createCardItemOnTemplate(
    cardTemplate,
    popupShowImage,
    card,
    profile,
    popupDeleteAccept,
    likeCard,
    openModalByClickOnObject,
    setupImage,
    initImagePopupFunc,
    deleteCardFunc
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
    patchedProfilePromise
      .then((profile) => {
        setProfileInfo(profile);
        profileEditForm.reset();
        closeModal(popupEditProfile);
      })
      .catch((err) => {
        console.error(`Got an error while load profile ${err}`);
      })
      .finally(callback());
  });
};

profileEditForm.addEventListener('submit', submitProfileEditForm);

const submitNewAvatarForm = (evt) => {
  evt.preventDefault();
  const newAvatar = {
    avatar: newAvatarUrlInput.value,
  };
  addWaitingWhileSubmit(popupNewAvatar, (callback) => {
    patchAvatar(newAvatar)
      .then((profile) => {
        setProfileInfo(profile);
        newAvatarForm.reset();
        closeModal(popupNewAvatar);
      })
      .catch((err) => {
        console.error(`Got an error while update avatar: ${err}`);
      })
      .finally(callback());
  });
};

newAvatarForm.addEventListener('submit', submitNewAvatarForm);

const setProfileInfo = (profile) => {
  profileTitle.textContent = profile.name;
  profileDesc.textContent = profile.about;
  profileImage.style.backgroundImage = `url(${profile.avatar})`;
};

const initProfileForm = () => {
  clearValidationOnForm(profileEditForm);
  if (profileEditForm) {
    profileEditForm.elements.name.value = profileTitle.textContent;
    profileEditForm.elements.description.value = profileDesc.textContent;
  }
};

const initNewAvatarForm = () => {
  newAvatarForm.reset();
  clearValidationOnForm(newAvatarForm);
};

openModalByClickOnObject(profileImage, popupNewAvatar, initNewAvatarForm);
openModalByClickOnObject(profileEditButton, popupEditProfile, initProfileForm);

const addNewCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCard = {
    name: addNewCardFormNameInput.value,
    link: addNewCardFormUrlInput.value,
  };

  addWaitingWhileSubmit(popupAddNewCard, (callback) => {
    postCard(newCard)
      .then((newCard) => {
        addNewCardForm.reset();
        closeModal(popupAddNewCard);
        addCardOnPage(newCard, newCard.owner);
      })
      .catch((err) => {
        console.error(`Got an error while post new card: ${err}`);
      })
      .finally(callback());
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

const buttonAcceptDeleteCardHandler = (evt) => {
  const target = evt.target;
  const cardId = target.cardId;
  if (cardId) {
    deleteCardById(cardId)
      .then(() => {
        deleteCardFromPage(cardId);
        target.removeEventListener('click', buttonAcceptDeleteCardHandler);
        const acceptPopup = target.acceptPopup;
        closeModal(acceptPopup);
      })
      .catch((err) => {
        console.error(`Got error: ${err}`);
      });
  }
};

const deleteCardFromPage = (cardId) => {
  const cardItem = document.querySelector(`#id_${cardId}`);
  if (cardItem) {
    cardItem.remove();
  }
};

const deleteCardFunc = (popup, clickedTrashButton) => {
  const cardId = clickedTrashButton.cardId;
  const acceptDeleteButton = popup.querySelector(popupButtonSelectorName);
  acceptDeleteButton.cardId = cardId;
  acceptDeleteButton.acceptPopup = popup;
  acceptDeleteButton.addEventListener('click', buttonAcceptDeleteCardHandler);
};

function fillPage() {
  const promises = getInfoAboutMeAndCards();
  Promise.all(promises)
    .then(([profile, cards]) => {
      setProfileInfo(profile);
      createCards(cards, profile);
    })
    .catch((err) => {
      console.error(`Got an error while load page: ${err}`);
    });
}

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
  popup.classList.add('popup__image_viewing');
};

const likeCard = (likeButton, likesCountNode, cardId) => {
  let promiseResCard;
  if (likeButton.classList.contains(likeIsActiveClassName)) {
    promiseResCard = deleteLikeOnCard(cardId);
  } else {
    promiseResCard = putLikeOnCard(cardId);
  }
  promiseResCard
    .then((card) => {
      setLikeCount(likesCountNode, card);
      likeButton.classList.toggle(likeIsActiveClassName);
    })
    .catch((err) => {
      console.error(`Got an error: ${err}`);
    });
};

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
