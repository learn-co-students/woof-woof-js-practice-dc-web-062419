let isFiltered = false;

document.addEventListener('DOMContentLoaded', () => {
  const filter = document.querySelector('#good-dog-filter');
  filter.addEventListener('click', filterDoggos);
  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => renderDogBar(data));
});

function goodBoysOnly(dogs) {
  return dogs.filter(dog => dog.isGoodDog);
}

function filterDoggos() {
  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {
      if (isFiltered) {
        renderDogBar(data);
        document.querySelector('#good-dog-filter').innerText =
          'Filter good dogs: OFF';
        isFiltered = !isFiltered;
      } else {
        renderDogBar(data.filter(dog => dog.isGoodDog));
        document.querySelector('#good-dog-filter').innerText =
          'Filter good dogs: ON';
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
    dogButton.addEventListener('click', e => renderDogInfo(e, dog));
    dogBar.appendChild(dogButton);
  });
}

function renderDogInfo(e, dog) {
  fetch(`http://localhost:3000/pups/${dog.id}`)
    .then(res => res.json())
    .then(dog => {
      const dogInfo = document.querySelector('#dog-info');
      dogInfo.innerHTML = `
      <img src=${dog.image} alt=${name} />
      <h1>${dog.name}</h1>
      `;
      button = dog.isGoodDog
        ? renderGoodBoyButton(dog)
        : renderGoodBoyButton(dog);
      dogInfo.appendChild(button);
    });
}

function renderGoodBoyButton(dog) {
  const button = document.createElement('button');
  dog.isGoodDog
    ? (button.innerText = 'Make Bad Boy')
    : (button.innerText = 'Make Good Boy');
  button.addEventListener('click', e => setGoodBoyStatus(e, dog));
  button.id = `dog-${dog.id}`;
  return button;
}

function setGoodBoyStatus(e, dog) {
  // update the db with the new goodboy status
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: `PATCH`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ isGoodDog: !dog.isGoodDog }),
  })
    .then(res => res.json())
    .then(dog => {
      document
        .querySelector(`#dog-${dog.id}`)
        .replaceWith(renderGoodBoyButton(dog));
      fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(dogs => renderDogBar(goodBoysOnly(dogs)));
    });
}
