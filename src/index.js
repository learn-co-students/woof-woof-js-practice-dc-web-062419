let isFiltered = false;

document.addEventListener('DOMContentLoaded', () => {
  const filter = document.querySelector('#good-dog-filter');
  filter.addEventListener('click', filterDoggos);
  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => renderDogBar(data));
});

function filterDoggos() {
  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {
      if (isFiltered) {
        renderDogBar(data);
        isFiltered = !isFiltered;
      } else {
        renderDogBar(data.filter(dog => dog.isGoodDog === true));
        isFiltered = !isFiltered;
      }
    });
}

function renderDogBar(dogs) {
  const dogBar = document.querySelector('#dog-bar');
  dogBar.innerHTML = '';
  dogs.forEach(dog => {
    dogButton = document.createElement('button');
    dogButton.innerText = dog.name;
    dogButton.id = dog.id;
    dogButton.addEventListener('click', renderDogInfo);
    dogBar.appendChild(dogButton);
  });
}

function renderDogInfo(e) {
  dogId = parseInt(e.target.id, 10);
  fetch(`http://localhost:3000/pups/${dogId}`)
    .then(res => res.json())
    .then(dog => {
      const dogInfo = document.querySelector('#dog-info');
      dogInfo.innerHTML = `
      <img src=${dog.image} alt=${name} />
      <h1>${dog.name}</h1>
      <p>${dog.isGoodDog}</p>
      `;
      button = dog.isGoodDog
        ? renderGoodBoyButton(true)
        : renderGoodBoyButton(false);
      dogInfo.appendChild(button);
    });
}

function renderGoodBoyButton(status) {
  const button = document.createElement('button');
  status
    ? (button.innerText = 'Make Bad Boy')
    : (button.innerText = 'Make Good Boy');
  button.addEventListener('click', setGoodBoyStatus);
  return button;
}

function setGoodBoyStatus(e) {
  console.log(e);
}
