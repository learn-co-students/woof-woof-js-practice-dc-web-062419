document.addEventListener("DOMContentLoaded", function(){
    console.log("Dom is Loaded")
    const filterButton = document.querySelector("#good-dog-filter")
    filterButton.addEventListener("click", event => renderGoodDogs(event,filterButton))
    fetchDogs()
} )

function fetchDogs(){
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(dogArray => dogArray.forEach(renderDog))
}



function renderDog(dog){
    // Creating dogspan and appending Span to Bar
    const dogSpan = document.createElement("span")
    let classCategory = ""

    dog.isGoodDog == true ? classCategory = "visible" : classCategory = "hidden"
    dogSpan.dataset.status = `${classCategory}`
    const dogBar = document.getElementById("dog-bar")
    dogBar.appendChild(dogSpan)
    dogSpan.innerText = dog.name

    //Adding event listener to dogSpan
    dogSpan.addEventListener("click", event => showInfo(event,dog))
}

function renderGoodDogs(event, filterButton){
    let allSpans = document.querySelectorAll("span")
    if (filterButton.innerText === "Filter good dogs: OFF"){
        filterButton.innerText = "Filter good dogs: ON"
        allSpans.forEach(span =>{
            if (span.dataset.status === "hidden"){
                span.style.display = "none";
            }
        })
    }
    else if (filterButton.innerText = "Filter good dogs: ON") {
        filterButton.innerText = "Filter good dogs: OFF"
        allSpans.forEach(span =>
            span.style.display = "")
    }

}



function showInfo(event, dog){
    // selecting dogDiv and appending img and h2 tag
    const dogDiv = document.querySelector("#dog-info")
    dogDiv.innerHTML = "";
    const dogH2 = document.createElement("h2")
    const dogImg = document.createElement("img")
    dogH2.innerText = dog.name
    dogDiv.appendChild(dogImg)
    dogDiv.appendChild(dogH2)
    dogImg.src = dog.image
    renderButton(dog, dogDiv)
}

function renderButton(dog, dogDiv){
    const dogButton = document.createElement("button")
    dogButton.dataset.id = dog.id
    dogButton.addEventListener("click", event => changeStatus(dog,event))
    dogDiv.appendChild(dogButton)
    if (dog.isGoodDog){
        dogButton.innerText = "Good Dog"
    }
    else {
        dogButton.innerText = "Bad Dog"
    }   
}


function changeStatus(dog){
    const id = dog.id
    let newValue = ''
    dog.isGoodDog === true ? newValue = false : newValue = true
    let data = {
        "isGoodDog": newValue
    }
    let changeButton = event.target

    fetch(`http://localhost:3000/pups/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

    }).then(resp => resp.json())
    .then(dog => {
        changeButton.innerText === "Good Dog" ? changeButton.innerText = "Bad Dog" : changeButton.innerText = "Good Dog"
    })

}



