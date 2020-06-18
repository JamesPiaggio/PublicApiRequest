// Global variables
const randomGeneratorAPI = 'https://randomuser.me/api/?results=12&nat=us';
const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');

// Function that fetches data and converts to JSON
async function getRandomUser (url) {
    // Uses Fetch API on url provided as parameter
    const user = await fetch(url);
    // Converts response data to JSON format
    const userJSON = await user.json();
    // Returns data in JSON
    return userJSON;
};

// Function that appends searchbar
function appendSearch () {
    searchContainer.innerHTML = `<form action="#" method="get">
                                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                                    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                                </form>`;
};

// Function to create card with user info
function appendCard (user, userHTML) {
    // Template literal to add HTML
    userHTML = `<div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${user.picture.large}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="card-text">${user.email}</p>
                        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                    </div>
                </div>`;
    return userHTML;
};

// Function to create modal windows with user info
function appendModal (user, modalContainer) {
    modalContainer = `<div class="modal-container" hidden>
                            <div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                                    <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                                    <p class="modal-text">${user.email}</p>
                                    <p class="modal-text cap">${user.location.city}</p>
                                    <hr>
                                    <p class="modal-text">${user.phone}</p>
                                    <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                                    <p class="modal-text">Birthday: ${user.dob.date.substring(5, 7)}/${user.dob.date.substring(8, 10)}/${user.dob.date.substring(0, 4)}</p>
                                </div>
                            </div>
                            <div class="modal-btn-container">
                                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                <button type="button" id="modal-next" class="modal-next btn">Next</button>
                            </div>
                        </div>`;
    return modalContainer;
};

// Function that creates page
async function createPage () {
    appendSearch();
    // Fetches data for users
    const userList = await getRandomUser(randomGeneratorAPI);
    // Empty variables for Template literals
    let userHTML = '';
    let modalContainer = '';
    // For loop to create each card
    for (let i = 0; i < userList.results.length; i++) {
        const currUser = userList.results[i];
        gallery.innerHTML += appendCard(currUser, userHTML);
    };
    // For loop to create modal for each user
    for (let j = 0; j < userList.results.length; j++) {
        const currUser = userList.results[j];
        body.innerHTML += appendModal(currUser, modalContainer);
    };
    // For loop to add event listeners to each card and modal
    const cards = document.getElementsByClassName('card');
    const modals = document.getElementsByClassName('modal-container');
    for(let x = 0; x < cards.length; x++) {
        cards[x].addEventListener('click', () => {
            modals[x].hidden = false;
        });
        // Event listener to close the modal
        const closeBtn = document.getElementsByClassName('modal-close-btn');
        closeBtn[x].addEventListener('click', () => {
            modals[x].hidden = true;
        });
        // Event listener for the Prev and Next buttons
        const modalBtn = document.querySelectorAll('.modal-btn-container');
        modalBtn[x].addEventListener('click', (e) => {
            if (e.target.textContent === 'Prev') {
                if (x !== 0) {
                    modals[x].hidden = true;
                    modals[x - 1].hidden = false;
                } else {
                    modals[x].hidden = true;
                };
            } else if (e.target.textContent === 'Next') {
                if (x !== (modals.length -1)) {
                    modals[x].hidden = true;
                    modals[x + 1].hidden = false;
                } else {
                    modals[x].hidden = true;
                };
            };
        });
    };
};

createPage();








