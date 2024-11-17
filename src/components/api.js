const token = '795c02ad-0380-472a-86a4-d4f6a3b46af0';
const cohortId = 'wff-cohort-26';
const baseUrl = `https://nomoreparties.co/v1/${cohortId}`;

const baseHeaders = {
  authorization: token,
  'Content-Type': 'application/json',
};

const doFetch = (endpoint, method, body) => {
  return fetch(`${baseUrl}/${endpoint}`, {
    method: method,
    headers: baseHeaders,
    body: body,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getInfoAboutMe = () => {
  return doFetch('/users/me', 'GET');
};

const getCards = () => {
  return doFetch('/cards', 'GET');
};

const getInfoAboutMeAndCards = () => {
  const profileInfo = getInfoAboutMe();
  const cards = getCards();
  return [profileInfo, cards];
};

const patchProfile = (profile) => {
  return doFetch('/users/me', 'PATCH', JSON.stringify(profile));
};

const postCard = (card) => {
  return doFetch('/cards', 'POST', JSON.stringify(card));
};

const deleteCardById = (cardId) => {
  if (cardId) {
    return doFetch(`/cards/${cardId}`, 'DELETE');
  }
};

const putLikeOnCard = (cardId) => {
  if (cardId) {
    return doFetch(`/cards/likes/${cardId}`, 'PUT');
  }
};

const deleteLikeOnCard = (cardId) => {
  if (cardId) {
    return doFetch(`/cards/likes/${cardId}`, 'DELETE');
  }
};

const patchAvatar = (avatar) => {
  if (avatar && avatar.avatar) {
    return doFetch('/users/me/avatar', 'PATCH', JSON.stringify(avatar));
  }
};

export {
  getInfoAboutMeAndCards,
  patchProfile,
  postCard,
  deleteCardById,
  putLikeOnCard,
  deleteLikeOnCard,
  patchAvatar,
};
