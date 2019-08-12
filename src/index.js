const url = "http://localhost:3000/pups"

document.addEventListener("DOMContentLoaded", function(){
    fetchAllDogs()
    let filter = document.getElementById("good-dog-filter")
    filter.addEventListener('click', goodBoyFilter)
})

function submitHandler(event){
event.preventDefault()

let data ={
name: event.name,
isGoodDog: event.isGoodDog,
image: event.image}

fetch("http://localhost:3000/pups",{
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
})
.then(res => res.json())
.then(dogBar)}

function fetchAllDogs(){
    fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(dogArray => {
        dogArray.forEach(dogBar)
    })}
function dogBar(dog){
    let dogBar = document.getElementById("dog-bar")
    let  dogSpan = document.createElement("span")
    dogSpan.id = dog.id
    dogSpan.classList.add(`span-${dog.id}`)
    dogBar.appendChild(dogSpan)
    dogSpan.innerText = dog.name
    dogSpan.addEventListener("click", renderDog )
    
    
}

function fetchDog(dog){
    let container = document.getElementById("dog-info")
    let dogImage = document.createElement("img")
    container.appendChild(dogImage)
    dogImage.src = dog.image
    let dogName= document.createElement("h2")
    container.appendChild(dogName)
    dogName.innerText = dog.name
    let dogBtn= document.createElement("button")
    container.appendChild(dogBtn)
    dogBtn.id = `btn-${dog.id}`
    if(dog.isGoodDog == true){
    dogBtn.innerText =  "Good Dog!"
    }else{
        dogBtn.innerText = "Bad Dog!"
    }
    dogBtn.addEventListener("click", event => goodBoy(dog))

}
function goodBoy(event){                                        
    // event.preventDefault()
    let id = event.id
    fetch(`http://localhost:3000/pups/${id}`)
    .then(response => response.json())
    .then(dogArray => {
        // fetchDog(dogArray)
        if(dogArray.isGoodDog === false){
            let dogBtn= document.getElementById(`btn-${id}`)
            let goodData = {isGoodDog: true}
            dogBtn.innerText = "Good Dog!"
            fetch(`http://localhost:3000/pups/${id}`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(goodData)
            }).then(res => res.json())
            .then(() => {
            })
              .catch(() => {
                  alert("Error, try again later")
                })
            }else if (dogArray.isGoodDog === true){
                let dogoBtn= document.getElementById(`btn-${id}`)
                let goodoData = {isGoodDog: false}
                dogoBtn.innerText = "Bad Dog!"
                fetch(`http://localhost:3000/pups/${id}`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(goodoData)
              }).then(res => res.json())
              .then(() => {
              })
              .catch(() => {
                alert("Error, try again later")
              })}})}


function goodBoyFilter(event){
    event.preventDefault()
    let filter = document.getElementById("good-dog-filter")
    if (event.currentTarget.innerText === "Filter good boys: OFF"){
        document.getElementById("dog-bar").innerHTML = ""
        filter.innerText = "Filter good boys: ON"
        fetch("http://localhost:3000/pups")
        .then(response => response.json())
        .then(dogArray => dogArray.forEach(goodBoyStatus))}
    else {
        {
            document.getElementById("dog-bar").innerHTML = ""
            filter.innerText = "Filter good boys: OFF"
            fetch("http://localhost:3000/pups")
            .then(response => response.json())
            .then(dogArray => {
            dogArray.forEach(dogBar)
        
    })}}
}


function goodBoyStatus(dog){
    if (dog.isGoodDog == true){
        let dogBar = document.getElementById("dog-bar")
        let  dogSpan = document.createElement("span")
        dogSpan.id = dog.id
        dogSpan.classList.add(`span-${dog.id}`)
        dogBar.appendChild(dogSpan)
        dogSpan.innerText = dog.name
        dogSpan.addEventListener("click", renderDog )
}}




function renderDog(event){
    event.preventDefault()
    document.getElementById("dog-info").innerHTML =""

    let id = event.currentTarget.id
    fetch(`http://localhost:3000/pups/${id}`)
    .then(response => response.json())
    .then(dogArray => {
        fetchDog(dogArray)
    })}
