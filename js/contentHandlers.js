
// Variables
const body = document.querySelector('body');
const searchInput = document.querySelector('#search');
const searchTypeElement = document.querySelector('#search-type');
const gridContainer = document.querySelector('.grid-container');
const placeholderImg = 'images/placehold_beer.png';


export const contentHandler = () => {

    // Stores requested data fron server
    let beers = [];

    // Get random data
    const getRandomData = async () => {

        for (let i = 0; i < 7; ++i) { // Loop for collecting random get-requests
            const res = await fetch('https://api.punkapi.com/v2/beers/random');
            const randomData = await res.json();
            beers.push(randomData[0]);
        };
        displayData(beers); // Calls display data function
    };
    getRandomData().catch(err => console.error(err)); // Error handling


    // Get searched data
    searchInput.addEventListener('keyup', (e) => {
        beers = []; // Dumps beer-array 
        let searchType = searchTypeElement.value; // Stores input type
        let keyInput = e.target.value; // Stores value of user input when searching
        let keyChar = e.key; // Stores single char when key press 
        keyChar === 'Backspace' ? keyInput = ' ' : keyInput; // Conditioan for dumping array when pressing backspase



        const getSearchedData = async () => {
            const res = await fetch(`https://api.punkapi.com/v2/beers?${searchType}=${keyInput}&per_page=7`);
            const searchedData = await res.json();
            beers.push(searchedData);
            displayData(beers[0]); // Calls display data function
        };
        getSearchedData().catch(err => console.error(err)); // Error handling
    });


    // Display searched data
    const displayData = (beers) => {

        gridContainer.innerHTML = ' ';  // Clears content section 

        beers.forEach((beer, i) => {

            const { name, image_url, tagline, description, food_pairing, ph } = beer;

            gridContainer.innerHTML += `
            <section style="background-image: url(${image_url ? image_url : placeholderImg});" class="box-${i + 1} box">
            <div class="box-text-wrapper">
            <h2 id="name">${name}</h2>
            <p id="tagline"><span>"${tagline}"</span></p>
            <div class="hidden">
            <p id="description">${description}</p>
            <p id="food-pairing"><em>Food pairing tips: ${food_pairing.join(' - ')}</em></p>
            <p id="alc">Vol. ${ph}%</p>
            </div>
            </div>
            <div></div>
            </section >`;
            const boxes = document.querySelectorAll('.box');
            const infoHidden = document.querySelectorAll('.hidden');
            boxes.forEach((box, i) => { // Add event listeners to grid boxes
                box.addEventListener('click', () => { // Toggles where you can click on the screen, adding hidden information about cards and presents single bigger box.
                    box.classList.toggle(`box-change`);
                    body.classList.toggle(`pointer-events-off`);
                    box.classList.toggle(`pointer-events-on`);
                    infoHidden[i].classList.toggle('info-show');

                });
            });
        });
    };
};

