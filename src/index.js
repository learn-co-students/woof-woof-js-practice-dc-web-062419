document.addEventListener('DOMContentLoaded', function(e) {
    fetchDogs()
    


})

function fetchDogs(){
    fetch("http://localhost:3000/pups")
    .then(r => r.json())
    .then(dogs => {
        dogs.forEach((dog) => renderDog(dog))
    })
    
}

function renderDog(dogObj){
    let dogSpan = document.createElement('span')
        dogSpan.dataset.id = dogObj.id 
        dogSpan.innerText = dogObj.name
        dogSpan.addEventListener('click', (e) => showInfo(dogObj))
        

    let dogBar = document.getElementById('dog-bar')
        dogBar.appendChild(dogSpan)


}

function showInfo(dogObj){
    let showCard = document.getElementById('dog-info')
        showCard.innerHTML = ""

    let picTag = document.createElement('img')
        picTag.src = dogObj.image
    let nameTag = document.createElement('h2')
        nameTag.innerText = dogObj.name
    let gbButton = document.createElement('button')
        gbButton.addEventListener('click', (e) => changeStatus(e, dogObj))
    
    if(dogObj.isGoodDog === true){
        gbButton.innerText = "Good Dog"
    }else {
        gbButton.innerText = "Bad Dog"
    }

    showCard.appendChild(picTag)
    showCard.appendChild(nameTag)
    showCard.appendChild(gbButton)
    



}

function changeStatus(e, dogObj){
    if(dogObj.isGoodDog){
        dogObj.isGoodDog = false
    }else {
        dogObj.isGoodDog = true
    }
    
    fetch(`http://localhost:3000/pups/${dogObj.id}`, {
        method: "PATCH", 
        headers: {"Content-Type":"application/json", Accept: "application/json"}, 
        body: JSON.stringify(dogObj)
    })
    .then(res => res.json())
    .then(updatedDog => {
        showInfo(updatedDog)
    })

    
}




