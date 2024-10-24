import './pages/index.css';
import { initialCards } from './scripts/cards';
import {
  createCardItemOnTemplate,
  deleteCard,
  likeCard,
} from './components/card';
import { openModalByClickOnObject, closeModal } from './components/modal';

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

const profileEditFormSubmit = (evt) => {
  evt.preventDefault();
  
  const updatingProfileTitle = document.querySelector('.profile__title');
  updatingProfileTitle.textContent = profileEditFormNameInput.value;
  const updatingProfileDesc = document.querySelector('.profile__description');
  updatingProfileDesc.textContent = profileEditFormJobInput.value;
  profileEditForm.reset();
  closeModal(popupEditProfile);
};

profileEditForm.addEventListener('submit', profileEditFormSubmit);

const profileEditButton = document.querySelector('.profile__edit-button');
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

openModalByClickOnObject(profileEditButton, popupEditProfile, initProfileForm);


const popupAddNewCard = document.querySelector('.popup_type_new-card');
const addNewCardForm = popupAddNewCard.querySelector('.popup__form');
const addNewCardFormNameInput = addNewCardForm.querySelector(
  '.popup__input_type_card-name'
);
const addNewCardFormUrlInput = addNewCardForm.querySelector(
  '.popup__input_type_url'
);

const addNewCardFormSubmit = (evt) => {
  evt.preventDefault();

  cardPlacesNode.prepend(createCard({
    name: addNewCardFormNameInput.value,
    link: addNewCardFormUrlInput.value,
  }));
  addNewCardForm.reset();
  closeModal(popupAddNewCard);
};

addNewCardForm.addEventListener('submit', addNewCardFormSubmit);

const addNewCardButton = document.querySelector('.profile__add-button');
openModalByClickOnObject(addNewCardButton, popupAddNewCard);

const popupShowImage = document.querySelector('.popup_type_image');

function createCard(card) {
  return createCardItemOnTemplate(
    cardTemplate,
    card,
    deleteCard,
    likeCard,
    popupShowImage
  );
}

function createCards() {
  initialCards.forEach((card) => {
    cardPlacesNode.append(createCard(card));
  });
}

// Вывести карточки на страницу
createCards();
