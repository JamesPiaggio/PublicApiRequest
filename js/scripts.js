// Global variables
const randomGeneratorAPI = 'https://randomuser.me/api/?results=12';
const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');

// Function that fetches data and converts to JSON
async function getRandomUser (url) {
    const user = await fetch(url);
    const userJSON = await user.json();
    return userJSON;
};

async function generateProfile () {
    const userList = await getRandomUser(randomGeneratorAPI);
    let userHTML = '';
    for (let i = 0; i < userList.results.length; i++) {
        const currUser = userList.results[i];
        userHTML += `<div class="card">
                        <div class="card-img-container">
                            <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${currUser.name.first} ${currUser.name.last}</h3>
                            <p class="card-text">${currUser.email}</p>
                            <p class="card-text cap">${currUser.location.city}, ${currUser.location.state}</p>
                        </div>
                    </div><br>`;
    };
    gallery.innerHTML = userHTML;
};
console.log(generateProfile());
