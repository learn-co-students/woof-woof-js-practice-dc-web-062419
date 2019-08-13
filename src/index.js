document.addEventListener("DOMContentLoaded", function(){
    showAllDogs()
    let filter = document.getElementById('good-dog-filter')
    filter.addEventListener('click', filterDogs)
})


function showAllDogs(){
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(dogArray => {
        dogArray.forEach(renderDogs)
    })
}

function filterDogs(e){
    if (e.target.innerText === "Filter good dogs: OFF"){
        e.target.innerText = "Filter good dogs: ON"
        
        fetch("http://localhost:3000/pups")
        .then(res => res.json())
        .then(dogs => {
            dogs.forEach((dog) => {
               if(!dog.isGoodDog){
                   document.querySelector(`.dog-${dog.id}`).style.display = "none"
               }
            })
    })
}
    else {
        e.target.innerText = "Filter good dogs: OFF"
        document.querySelectorAll("span").forEach(d => {

            d.style.display = "inherit"
        })

    }
}

function renderDogs(dog){
    let dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    document.getElementById("dog-bar").appendChild(dogSpan)
    dogSpan.className = `dog-${dog.id}`
     dogSpan.addEventListener("click", (e) => (getDogs((dog))))
}


function getDogs(e){
    // debugger
 document.getElementById("dog-info").innerText = " "
let dogImg = document.createElement('img')
let dogH2 = document.createElement('h2')
let dogBut = document.createElement('button')

document.getElementById("dog-info").appendChild(dogImg)
document.getElementById("dog-info").appendChild(dogH2)
document.getElementById("dog-info").appendChild(dogBut)

let dog = e 

dogImg.src = e.image
 dogH2.innerText = e.name
 if (e.isGoodDog === true){
     dogBut.innerText = "Good Dog!"
    }
    else{
        dogBut.innerText = "Bad Dog!"
    }
dogBut.addEventListener("click", (e) => changeGoodDog(e, dog))

}

function  changeGoodDog(e, dog){
    data = {
        isGoodDog: !dog.isGoodDog
    }
    
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers:{
            'Content-Type': "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((newDawg) => {
        dog.isGoodDog = !dog.isGoodDog

        if (newDawg.isGoodDog){
            e.target.innerText = "Good Dog!"
           }
           else{
               e.target.innerText = "Bad Dog!"
           }
         })
}

