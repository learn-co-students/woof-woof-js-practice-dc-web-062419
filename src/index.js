
document.addEventListener("DOMContentLoaded", function() {
    const filterDogs = document.querySelector('#good-dog-filter')
    
    fetchDogs()
    
    filterDogs.addEventListener('click', filterGoodDogs)
    
})

function filterGoodDogs() {
    console.log('filter clicked!')
    let dogBar = document.querySelector('#dog-bar')
    if (event.currentTarget.innerText.split(" ")[3] === "OFF"){
        event.currentTarget.innerText = "Filter good dogs: ON"
        let array = Array.from(dogBar.children)
        let goodDogs = array.filter(dog => dog.dataset.goodBoy === "true")
       
        dogBar.innerHTML = ''
       
        goodDogs.forEach(dog => dogBar.appendChild(dog))
        
    } else {
        event.currentTarget.innerText = "Filter good dogs: OFF"
        dogBar.innerHTML = ''
        fetchDogs()
    }
}

function fetchDogs(){
    fetch('http://localhost:3000/pups').then(resp => resp.json()).then(dogs => dogs.forEach(displayDog))
}

function displayDog(dog){
    dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogSpan.dataset.dogId = dog.id
    dogSpan.dataset.goodBoy = dog.isGoodDog
    dogSpan.dataset.image = dog.image
    dogSpan.dataset.name = dog.name
    let dogBar = document.querySelector('#dog-bar')
    dogBar.appendChild(dogSpan)
    
    dogSpan.addEventListener("click", (e) => showDog(e))
}

function showDog(e){
    let dog = event.target
    
    console.log('clicked')
    let infoDiv = document.querySelector('#dog-info')
    infoDiv.innerHTML = ''
    let dogh2 = document.createElement('h2')
    dogh2.innerText = dog.dataset.name
    
    let dogImg = document.createElement('img')
    dogImg.src = dog.dataset.image
    infoDiv.appendChild(dogImg)
    infoDiv.appendChild(dogh2)
    let gudbttn = document.createElement('button')
    infoDiv.appendChild(gudbttn)
    gudbttn.dataset.id = dog.dataset.dogId
    gudbttn.dataset.status = dog.dataset.goodBoy
    
    if (gudbttn.dataset.status === 'true'){
        gudbttn.innerText = "Good Dog!"
    } else {
        gudbttn.innerText = "Bad Dog!"
    }

    gudbttn.addEventListener('click', toggleDog)

}

function toggleDog(e){
    let dogBar = document.querySelector('#dog-bar')
   
    let id = e.target.dataset.id
    let targetSpan = Array.from(dogBar.children).filter(dog => dog.dataset.dogId === e.target.dataset.id)
   
    let obj = {isGoodDog: true}
    if (e.target.dataset.status === 'true') {
        obj.isGoodDog = false
    }
  
    configDog = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }

    fetch(`http://localhost:3000/pups/${id}`, configDog).then(resp => resp.json()).then(dog => {
        console.log(dog.isGoodDog)
        
        e.target.dataset.status = `${dog.isGoodDog}`
        if(dog.isGoodDog === true) {
        e.target.innerText = `Good Dog!` 
        
        targetSpan[0].dataset.goodBoy = 'true'
        } else {
            e.target.innerText = 'Bad Dog!'
            targetSpan[0].dataset.goodBoy = 'false'
            if (document.querySelector('#good-dog-filter').innerText === "Filter good dogs: ON") {
                targetSpan[0].remove()
            }
        }
    })
    
}

