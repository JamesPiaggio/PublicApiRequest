// Global variables
const randomGeneratorAPI = 'https://randomuser.me/api/';
const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');

// Function that fetches data and converts to JSON
async function getRandomUser (url) {
    const user = await fetch(url);
    const userJSON = await user.json();
}

async function generateProfile () {
    
}