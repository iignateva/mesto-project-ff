const openedModalCssClass = 'popup_is-opened';
const openedModalSelector = '.popup_is-opened';
const modalCrossButtonSelector = '.popup__close';

function findOpenModalAndClose() {
  const openedModal = document.querySelector(openedModalSelector);
  if (openedModal) {
    closeModal(openedModal);
  }
}

const handleEscKeyUp = (evt) => {
  if (evt.key === 'Escape') {
    findOpenModalAndClose();
  }
};

const handleClickOnOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    findOpenModalAndClose();
  }
}

const closeModal = (modal) => {
  modal.classList.remove(openedModalCssClass);
  document.removeEventListener('keyup', handleEscKeyUp);
  modal.removeEventListener('click', handleClickOnOverlay);
};

const addHandleModalCrossButton = (modal) => {
  const crossButton = modal.querySelector(modalCrossButtonSelector);
  if (crossButton) {
    crossButton.addEventListener('click', () => {
      closeModal(modal);
    });
  }
};

const openModal = (modal) => {
  modal.classList.add(openedModalCssClass);
  document.addEventListener('keyup', handleEscKeyUp);
  modal.addEventListener('click', handleClickOnOverlay);
  addHandleModalCrossButton(modal);
};

function addModalByClickOnObject(clickedObj, modal, initModalFun) {
  clickedObj.addEventListener('click', function (evt) {
    openModal(modal);
    if (initModalFun) {
      initModalFun(modal, clickedObj);
    }
  });
}

export { addModalByClickOnObject, addHandleModalCrossButton, closeModal };
