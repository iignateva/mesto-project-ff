!function(){"use strict";var e="https://nomoreparties.co/v1/".concat("wff-cohort-26"),t={authorization:"795c02ad-0380-472a-86a4-d4f6a3b46af0","Content-Type":"application/json"},n=function(n,r,o){return fetch("".concat(e,"/").concat(n),{method:r,headers:t,body:o}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))},r=".popup__button",o="popup_is-opened";function c(){var e=document.querySelector(".popup_is-opened");e&&u(e)}var a=function(e){"Escape"===e.key&&c()},i=function(e){e.target.classList.contains("popup")&&c()},u=function(e){e.classList.remove(o),document.removeEventListener("keyup",a),e.removeEventListener("click",i),l(e,!1)},s=function(){c()},l=function(e,t){var n=e.querySelector(".popup__close");n&&(t?n.addEventListener("click",s):n.removeEventListener("click",s))};function p(e,t,n){e.addEventListener("click",(function(r){!function(e){e.classList.add(o),document.addEventListener("keyup",a),e.addEventListener("click",i),l(e,!0)}(t),n&&n(t,e)}))}var d="card__delete-button_is-hided",f="card__like-button_is-active",_=function(e){var t=e.target,r=t.cardId,o=t.cardNode;r&&o&&(function(e){e&&n("/cards/".concat(e),"DELETE")}(r),o.remove()),t.removeEventListener("click",_);var c=t.acceptPopup;u(c)},v=function(e,t,n,r){var o=e.querySelector(r);return o.src=t,o.alt=n,o},y=function(e,t){v(e,t.src,t.alt,".popup__image"),e.querySelector(".popup__caption").textContent=t.alt,e.setAttribute("style","background-color: rgba(0, 0, 0, .9)")},m=function(e,t){e.textContent=t.likes.length>0?t.likes.length:""},S=function(e,t,r){var o;o=e.classList.contains(f)?function(e){if(e)return n("/cards/likes/".concat(e),"DELETE")}(r):function(e){if(e)return n("/cards/likes/".concat(e),"PUT")}(r),o.then((function(e){m(t,e)})),e.classList.toggle(f)},q=function(e,t,n,r){e.classList.remove(t),n.textContent="",n.classList.remove(r)},E=function(e,t){e.disabled=!0,e.classList.add(t)},L=function(e,t){e.disabled=!1,e.classList.remove(t)},b=".popup__form",k=".popup__input",h="popup__input_type_error",g="popup__error_visible",C="popup__button_disabled",x=document.querySelector("#card-template").content,A=document.querySelector(".places .places__list"),P=document.querySelector(".popup_type_edit"),T=P.querySelector(b),M=T.querySelector(".popup__input_type_name"),N=T.querySelector(".popup__input_type_description"),w=document.querySelector(".profile__edit-button"),D=document.forms["edit-profile"],O=document.querySelector(".profile__title"),j=document.querySelector(".profile__description"),I=document.querySelector(".popup_type_new-card"),J=I.querySelector(b),V=J.querySelector(".popup__input_type_card-name"),B=J.querySelector(".popup__input_type_url"),G=document.querySelector(".popup_type_image"),H=document.querySelector(".profile__add-button"),z=document.querySelector(".profile__image"),U=document.querySelector(".popup_type_action-accept"),F=document.querySelector(".popup_type_update-avatar"),K=F.querySelector(b),Q=F.querySelector(".popup__input_type_url"),R=function(e,t){A.append(function(e,t){return function(e,t,n,o,c,a,i){var u=e.querySelector(".card").cloneNode(!0);u.querySelector(".card__description .card__title").textContent=n.name;var s=u.querySelector(".card__like-button");s.addEventListener("click",(function(){return a(s,l,n._id)}));var l=u.querySelector(".card__likes-count");m(l,n);var p=u.querySelector(".card .card__delete-button");return n.owner._id===o._id?(i(p,c,(function(){var e=c.querySelector(r);e.cardId=n._id,e.cardNode=u,e.acceptPopup=c,e.addEventListener("click",_)})),p.classList.remove(d)):p.classList.add(d),i(v(u,n.link,n.name,".card__image"),t,y),u}(x,G,e,t,U,S,p)}(e,t))},W=function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.buttonElementSelector);n.forEach((function(n){var r=e.querySelector(".".concat(n.id,"-error"));q(n,t.inputErrorClass,r,t.errorVisibleClass)})),E(r,t.inactiveButtonClass)}(e,{inputSelector:k,inputErrorClass:h,errorVisibleClass:g,buttonElementSelector:r,inactiveButtonClass:C})};T.addEventListener("submit",(function(e){e.preventDefault();var t={name:M.value,about:N.value};oe(P,(function(e){var r;(r=t,n("/users/me","PATCH",JSON.stringify(r))).then((function(e){X(e)})),e()})),T.reset(),u(P)})),K.addEventListener("submit",(function(e){e.preventDefault();var t={avatar:Q.value};oe(F,(function(e){(function(e){if(e&&e.avatar)return n("/users/me/avatar","PATCH",JSON.stringify(e))})(t).then((function(t){X(t),e()}))})),K.reset(),u(F)}));var X=function(e){O.textContent=e.name,j.textContent=e.about,z.style.backgroundImage="url(".concat(e.avatar,")")};p(z,F),p(w,P,(function(){W(D),D&&(D.elements.name.value=O.textContent,D.elements.description.value=j.textContent)}));var Y,Z,$,ee,te,ne,re,oe=function(e,t){var n=e.querySelector(r),o=n.textContent;n.textContent=o+"...",t((function(){n.textContent=o}))};J.addEventListener("submit",(function(e){e.preventDefault();var t={name:V.value,link:B.value};oe(I,(function(e){var r;(r=t,n("/cards","POST",JSON.stringify(r))).then((function(t){J.reset(),u(I),R(t,t.owner),e()}))}))})),p(H,I,(function(){J.reset(),W(J)})),Y=b,Z=k,$=r,ee=C,te=h,ne=g,Array.from(document.querySelectorAll(Y)).forEach((function(e){var t=e.querySelector($),n=Array.from(e.querySelectorAll(Z));n.forEach((function(r){r.addEventListener("input",(function(){(function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));if(t.validity.valid)q(t,n,o,r);else{var c=t.validationMessage;switch(!0){case t.validity.patternMismatch:c=t.dataset.errorPatternMismatchMessage;break;case t.validity.valueMissing:c=t.dataset.errorEmptyValueMessage}!function(e,t,n,r,o){e.classList.add(t),n.textContent=r,n.classList.add(o)}(t,n,o,c,r)}})(e,r,te,ne),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?L(t,n):E(t,n)}(n,t,ee)}))}))})),re=[n("/users/me","GET"),n("/cards","GET")],Promise.all(re).then((function(e){var t=e[0],n=e[1];X(t),function(e,t){e.forEach((function(e){R(e,t)}))}(n,t)}))}();