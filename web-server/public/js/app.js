console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';
    const url = '/weather?address=' + location;
    fetch(url).then((response) => {
        response.json().then((data => {
            if (data.error) {
                return messageOne.textContent = data.error;
            }

            messageOne.textContent = data.location;
            messageTwo.textContent = data.summary;
            messageThree.textContent = 'Wind Speed: ' + data.windSpeed;

            search.value = '';
        }));
    });
});