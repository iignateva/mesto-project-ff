const openedModalCssClass = 'popup_is-opened';

function findOpenModalAndCloseIt() {
  const openedModal = document.querySelector('.popup_is-opened');
  if (openedModal) {
    closeModal(openedModal);
  }
}

const handleEscKeyUp = (evt) => {
  if (evt.key === 'Escape') {
    findOpenModalAndCloseIt();
  }
};

const handleClickOnOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    findOpenModalAndCloseIt();
  }
}

const closeModal = (modal) => {
  modal.classList.remove(openedModalCssClass);
  document.removeEventListener('keyup', handleEscKeyUp);
  modal.removeEventListener('click', handleClickOnOverlay);
};

const addHandleModalCrossButton = (modal) => {
  const crossButton = modal.querySelector('.popup__close');
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

function openModalByClickOnObject(clickedObj, modal, initModalFun) {
  clickedObj.addEventListener('click', function (evt) {
    openModal(modal);
    if (initModalFun) {
      initModalFun(modal, clickedObj);
    }
  });
}

export { openModalByClickOnObject, closeModal };
