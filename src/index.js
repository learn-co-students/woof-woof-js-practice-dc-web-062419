document.addEventListener('DOMContentLoaded', ()=>{
    console.log("you had me at hello world")
    fetchPups()
    // document.querySelector('#good-dog-filter').addEventListener('click', toggleButt)
})

// function toggleButt(event){
//     if (event.target.innerText === 'Filter good dogs: OFF') {
//         event.target.innerText = 'Filter good dogs: ON'
//     } else {
//         event.target.innerText = 'Filter good dogs: OFF' 
//     }
// }

function filterPups(){
    const dogBar = document.querySelector('#dog-bar')
    console.log(dogBar)
}

function fetchPups(){
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(puppers => puppers.forEach(renderPupSpan))
}

function renderPupSpan(pupper){

    const dogBar = document.querySelector('#dog-bar')
    const dogSpan = document.createElement('span')
    
    dogSpan.innerText = pupper.name
    dogSpan.dataset.puppyId = pupper.id

    dogBar.appendChild(dogSpan)

    dogSpan.addEventListener('click', (event) => renderPupInfo(event, pupper))

}

function renderPupInfo(event, pupper) {
    const dogDiv = document.querySelector('#dog-info')
    if (pupper.isGoodDog) {
        dogDiv.innerHTML = `
            <img src = ${pupper.image}>
            <h2>${pupper.name}</h2>
            <button id=good-or-bad data-puppy-id=${pupper.id}>Good Dog!</button>
        `
    } else {
        dogDiv.innerHTML = `
        <img src = ${pupper.image}>
        <h2>${pupper.name}</h2>
        <button id=good-or-bad data-puppy-id=${pupper.id}>Bad Dog!</button>
    `
    }
    const goodButton = document.querySelector('#good-or-bad')
    goodButton.addEventListener('click', togglePup)
}

function togglePup(event){
    let pupperId = event.target.dataset.puppyId

    if (event.target.innerText === "Good Dog!") {
        fetch(`http://localhost:3000/pups/${pupperId}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({isGoodDog: false})
        })
        .then(res => res.json())
        .then(event.target.innerText = "Bad Dog!")
    } else {
        fetch(`http://localhost:3000/pups/${pupperId}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({isGoodDog: true})
        })        
        .then(res => res.json())
        .then(event.target.innerText = "Good Dog!")
    }
}
