document.addEventListener("DOMContentLoaded", () =>{
  const dogBar = document.getElementById("dog-bar")
  const dogInfo = document.getElementById("dog-info")
  const goodDogFilter = document.getElementById("good-dog-filter")
  let filter = false;

  function fetchDoggos() {
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(dogArray => dogArray.forEach(renderDog))
  }

  function renderDog(dog) {
    if ((filter && dog.isGoodDog) || !filter) {
      const newDogEl = document.createElement("span")
      newDogEl.innerText = dog.name
      dogBar.appendChild(newDogEl)
      newDogEl.addEventListener("click", () => showDogInfo(dog))
    }
  }

  function showDogInfo(dog){
    const dogImg = document.createElement("img");
    const dogH2 = document.createElement("h2");
    const dogButton = document.createElement("button");
    dogInfo.innerHTML = "";
    dogInfo.appendChild(dogImg);
    dogInfo.appendChild(dogH2);
    dogInfo.appendChild(dogButton);
    dogImg.src = dog.image;
    dogH2.innerText = dog.name;
    if (dog.isGoodDog === true) {
      dogButton.innerText = "Good Dog!"
    } else {
      dogButton.innerText = "Bad Dog!"
    };
    dogButton.addEventListener("click", (e) => updateDog(e, dog, dogButton))
  }

  function updateDog(e, dog, dogButton){
    fetch(`http://localhost:3000/pups/${dog.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json",
                Accept: "application/json"}
    })
    .then(resp => resp.json())
    .then(dogData => {
      if (dog.isGoodDog === true) {
        dog.isGoodDog = false;
        dogButton.innerText = "Bad Dog!";
      } else {
        dog.isGoodDog = true;
        dogButton.innerText = "Good Dog!";
      };
    })
  }

  fetchDoggos()

  goodDogFilter.addEventListener("click", () => {
    filter = !filter
    dogBar.innerHTML = ""
    goodDogFilter.innerText = "Filter good dogs: ON"
    fetchDoggos()
  })
})
