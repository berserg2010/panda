'use strict';

import { documentClickEvent, headerBarClickEvent } from './common';


const chatButton = document.querySelector('.header-link');

const openChatHandler = () => {
  const menuExpandButton = document.querySelector('.menu-arrow');
  const menuList = document.querySelector('.menu-list');
  const chat = document.getElementById('chat')
  const personalArea = document.querySelector('.personalArea');
  const headerBar = document.querySelector('.header-bar');
  const menu = personalArea.querySelector('.menu');

  const chatOn = () => {
    chat.style.display = 'block';
    menuExpandButton.style.display = 'none';
    menuList.style.display = '';
    menu.classList.add('menu--open');

    document.removeEventListener('click', documentClickEvent);
    headerBar.removeEventListener('click', headerBarClickEvent);
  };

  const chatOff = () => {
    menu.classList.remove('menu--open');
    chat.style.display = '';
    menuExpandButton.style.display = 'block';
    menuList.style.display = 'block';

    document.addEventListener('click', documentClickEvent);
    headerBar.addEventListener('click', headerBarClickEvent);
  };

  const chatIsOpen = chat.style.display !== '';
  if (chatIsOpen) {
    if (localStorage.leftMenuIsOpen === 'true') {
      chatOff();
    } else {
      chatOff();
      personalArea.classList.add('personalArea-active');
    }
  } else {
    localStorage.leftMenuIsOpen = !personalArea.classList.contains('personalArea-active');

    if (localStorage.leftMenuIsOpen === 'true') {
      chatOn();
    } else {
      personalArea.classList.remove('personalArea-active');
      chatOn();
    }
  }
};

chatButton.addEventListener('click', openChatHandler);
