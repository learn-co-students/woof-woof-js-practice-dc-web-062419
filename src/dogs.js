function getAllDogs(){
  fetch(DOGS_URL)
  .then(resp => resp.json())
  .then(dogs => dogs.forEach(renderDog))
}

function renderDog(dog){
  const dogDiv = document.getElementById("dog-bar")
  const dogSpan = document.createElement("span")
  if(dog.isGoodDog === true){
    dogSpan.classList.add("good-dog")
    }
  else{
    dogSpan.classList.add("bad-dog")
  }
  dogSpan.innerText = dog.name
  dogDiv.appendChild(dogSpan)
  dogSpan.addEventListener("click", event => showDogInfo(event, dog))
}

function renderButton(dog, dogButton){
  if(dog.isGoodDog == true) {
    dogButton.innerText = "Good Dog!"
  }else{
    dogButton.innerText = "Bad Dog!"
  }
  dogButton.addEventListener("click", () => goodBadDog(dog, dogButton))
}

function showDogInfo(event, dog){
  const dogInfoDiv = document.getElementById("dog-info")
  dogInfoDiv.innerHTML = ""
  const dogImage = document.createElement("img")
  dogImage.src = dog.image
  // dogInfoDiv.appendChild(dogImage)
  const dogH2 = document.createElement("h2")
  dogH2.innerText = dog.name
  // dogInfoDiv.appendChild(dogH2)
  const dogButton = document.createElement("button")
  renderButton(dog, dogButton)
  // dogDiv.appendChild(dogButton)
  dogInfoDiv.append(dogImage, dogH2, dogButton)
}

function goodBadDog(dog, dogButton){
  const data = {}

  if(dogButton.innerText === "Good Dog!") {
    dogButton.innerText = "Bad Dog!"
    data.isGoodDog = false //updates data
   } else{
    dogButton.innerText = "Good Dog!"
    data.isGoodDog = true //updates data
    }

   fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
}



// DOESN'T WORK!!

// function getAllGoodDogs(event, filterButton){
//   const dogSpan = document.getElementById("dog-bar").children
//   const goodDogClass = document.getElementsByClassName("good-dog")
//   const badDogClass = document.getElementsByClassName("good-dog")
//   if(filterButton.innerText === "Filter good dogs: OFF"){
//     filterButton.innerText = "Filter good dogs: ON"
//     document.getElementsByClassName("good-boy")
//   }
//   else if(filterButton.innerText === "Filter good dogs: ON"){
//     filterButton.innerText = "Filter good dogs: OFF"
//   }
// }