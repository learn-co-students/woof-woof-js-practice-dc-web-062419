
let url = 'http://localhost:3000/pups/'
let goodDogFilter = document.getElementById("good-dog-filter")
let dogBar = document.getElementById("dog-bar")
let goodDogs;
let badDogsArray = []
let goodDogsArray = []
fetchAllDogs()


function fetchAllDogs(){
    
    fetch(url)
    .then(res => res.json())
    .then( dogs => dogs.forEach(showAllDogs))

}


goodDogFilter.addEventListener("click", filterDogs)

function filterDogs(){
    fetch(url)
    .then(res => res.json())
    .then( dogs => { 
       if(goodDogFilter.innerText === "Filter good dogs: OFF")
       {
        goodDogFilter.innerText = "Filter good dogs: ON"
        goodDogs = dogs.filter(dog => dog.isGoodDog === true)
        dogBar.innerText = ""
        goodDogs.forEach(dog => showAllDogs(dog))
        }
       else{
        goodDogFilter.innerText = "Filter good dogs: OFF"
        dogBar.innerText = ""
        fetchAllDogs()
       }
        
    })

    
}

// dogSpan.dataset.id = dog.id
// dogSpan.dataset.isGoodDog = dog.isGoodDog
// dogSpan.dataset.image = dog.image

function showAllDogs(dog){

let dogSpan = document.createElement('span')
dogSpan.id = dog.id
dogSpan.innerText = dog.name
dogBar.appendChild(dogSpan)
dogSpan.addEventListener("click", (e) => showDog(dog))

}

function showDog(dog){
    let dogInfo = document.getElementById("dog-info")
    dogInfo.innerText = ""
    let dogImg = document.createElement("img")
    dogImg.src = dog.image
    let dogname = document.createElement("h2")
    dogname.innerText = dog.name
    let dogButton = document.createElement("button")
    dogButton.addEventListener("click", (e) => changeGoodOrBad(dog) )
    dogInfo.appendChild(dogImg)
    dogInfo.appendChild(dogname)
    dogInfo.appendChild(dogButton)
    if (dog.isGoodDog === false){
        dogButton.innerText = "Good Dog!"
    }
    else{
        dogButton.innerText = "Bad Dog!"
    }


}

function changeGoodOrBad(dog){
    
    let dogBehavior= !dog.isGoodDog
    let dogDiv = document.getElementById(dog.id)
    data = {
        isGoodDog: dogBehavior
    }
        // debugger
    if (goodDogFilter.innerText === "Filter good dogs: ON" && dogBehavior === false){
        
        dogDiv.style.display = 'none'
    }
    else{
        dogDiv.style.display = 'inherit'
    }


    fetch((url + dog.id), {
        method: 'PATCH',
        headers: { 
        "Content-Type": "application/json", 
        "Accept": "application/json"
        }, 
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        // debugger
       showDog(res)
    })





}


