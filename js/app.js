import { contentHandler } from './contentHandlers.js';

// Adding variables
const gridContainer = document.querySelector('.grid-container');
const header = document.querySelector('header');
const menuBtn = document.querySelector('.fa-ellipsis-v');
const headerContainer = document.querySelector('.header-container');
const randomBtn = document.querySelector('#reload-random');


// Calls contentHandler (loads page content)
contentHandler();


// Page Loader 
const loader = () => {
    const loaderDiv = document.createElement('div');
    loaderDiv.classList.add('loader-animation-container');
    loaderDiv.innerHTML = '<img src="icons/loading.png" alt="">';
    gridContainer.appendChild(loaderDiv);

    setTimeout(() => {
        loaderDiv.remove();
    }, 1600);
};
loader();


// Reloads random
randomBtn.onclick = () => {
    loader();
    contentHandler();
};


// Animation-selector for header and grid container 
menuBtn.addEventListener('click', () => { // Header hide
    if (header.classList.contains('header-display')) {
        header.classList.add('header-hide');
        header.classList.remove('header-display');
        gridContainer.classList.add('move-grid-container-back');
        headerContainer.classList.add('not-visible');

    } else {  // Header show
        header.classList.add('header-display');
        header.classList.remove('header-hide');
        gridContainer.classList.add('move-grid-container');
        gridContainer.classList.remove('move-grid-container-back');

        setTimeout(() => {
            headerContainer.classList.remove('not-visible');
        }, 100);
    };
});


