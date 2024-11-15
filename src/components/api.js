const token = '795c02ad-0380-472a-86a4-d4f6a3b46af0';
const cohortId = 'wff-cohort-26';
const baseUrl = `https://nomoreparties.co/v1/${cohortId}`;

const baseHeaders = {
  authorization: token,
};

const doFetch = (endpoint) => {
  return fetch(`${baseUrl}/${endpoint}`, {
    headers: baseHeaders,
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
  return doFetch('/users/me');
};

const getCards = () => {
  return doFetch('/cards');
};

const getInfoAboutMeAndCards = () => {
  const profileInfo = getInfoAboutMe();
  const cards = getCards();
  return [profileInfo, cards];
};

export { getInfoAboutMeAndCards };
