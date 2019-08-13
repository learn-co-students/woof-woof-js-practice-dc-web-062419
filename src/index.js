document.addEventListener("DOMContentLoaded", function(){
    fetchAllPups()
    let filterButton = document.getElementById("good-dog-filter")
    filterButton.addEventListener("click", filterDogs)
})

function filterDogs(){
    let filterButton = document.getElementById("good-dog-filter")
    if (filterButton.innerText === "Filter good dogs: OFF"){
        filterButton.innerText = "Filter good dogs: ON"
        fetch("http://localhost:3000/pups")
        .then(response => response.json())
        .then(pups => {
            let goodBoyArray = pups.filter( pup => pup.isGoodDog === true)
            document.getElementById("dog-bar").innerHTML = ""
            goodBoyArray.forEach(renderPup)
        })
    }
    else{
        filterButton.innerText = "Filter good dogs: OFF"
        document.getElementById("dog-bar").innerHTML = ""
        fetchAllPups()
    }
    
}

function fetchAllPups(){
    fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(pupsArray => {
        pupsArray.forEach( renderPup )
    })
}

function renderPup(pup){
    //create pup span
    let pupSpan = document.createElement("span")
    pupSpan.innerText = pup.name
    pupSpan.dataset.id = `pup-${pup.id}`
    document.getElementById("dog-bar").appendChild(pupSpan)
    pupSpan.addEventListener("click", (event) => (doggoClick(pup)))
}


function doggoClick(selectedPup){
    document.getElementById("dog-info").innerHTML = ""
    let dogInfoDiv = document.getElementById("dog-info")
    // create pup img
    let pupImg = document.createElement("img")
    pupImg.src = selectedPup.image
    dogInfoDiv.appendChild(pupImg)

    // create pup h2
    let pupH2 = document.createElement("h2")
    pupH2.innerText = selectedPup.name
    dogInfoDiv.appendChild(pupH2)

    // create pup button
    let pupButton = document.createElement("button")
    if (selectedPup.isGoodDog === true){
        pupButton.innerText = "Good Dog!"
    }
    else{
        pupButton.innerText = "Bad Dog!"
    }
    dogInfoDiv.appendChild(pupButton)

    pupButton.addEventListener("click", (event) => (changeGoodDog(event, selectedPup)))

}

function changeGoodDog(event, selectedPup){
    let id = selectedPup.id
    data = {
        isGoodDog: !selectedPup.isGoodDog
    }
    fetch(`http://localhost:3000/pups/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        
        body: JSON.stringify(data)
        
    })
    .then(response => response.json())
    .then((newPup) => {
        doggoClick(newPup)
    })
   
}


