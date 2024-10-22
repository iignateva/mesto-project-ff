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

function addModalByClickOnObject(clickedObj, modal) {
  clickedObj.addEventListener('click', function (evt) {
    openModal(modal);
  });
}

export { addModalByClickOnObject, addHandleModalCrossButton };

/*
const handleEscKeyUp = (e) => {
  if (e.key === 'Escape') {
    // находим **открытый попап** с классом popup_is-opened
    closeModal(открытый_попап);
  }
};

export const openModal = (modal) => {
  // добавить класс открытия попапа
  // добавить слушатель на кнопку Escape
};

export const closeModal = (modal) => {
  // удалить класс открытия попапа
  // удалить слушатель на кнопку Escape
};

export const функцияЧтобыПовеситьСлушатели = (элементПопапа) => {
  // ищем кнопку крестик в попапе
  крестик.addEventListener('click', () => {
    // closeModal(...)
  });

  элементПопапа.addEventListener('mousedown', (event) => {
    // если event.target содержит класс "popup", то закрываем
  });
};

const попапРедактированияПрофия = document.querySelector('...');
const попапДобавленияКарточки = document.querySelector('...');
const попапКартинки = document.querySelector('...');

функцияЧтобыПовеситьСлушатели(попапРедактированияПрофия);
функцияЧтобыПовеситьСлушатели(попапДобавленияКарточки);
функцияЧтобыПовеситьСлушатели(попапКартинки);
Элемент попапа это элемент с классом popup, по сути оверлей (контейнер) попапа. 
Лучше всего задавать им уникальный класс для поиска в js для каждого попапа. 
Слушатель на него вешаешь, далее смотришь, 
если клик попал по контейнеру (оверлею) с классом popup,
 то есть event.target содержит этот класс, то закрываем попап
*/
