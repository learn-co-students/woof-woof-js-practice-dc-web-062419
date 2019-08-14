// const dogInfo = document.getElementById("dog-info")

document.addEventListener("DOMContentLoaded", event => {
    const dogBar = document.getElementById("dog-bar")

    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(res => res.forEach(dog => spanDog(dog)))

    function spanDog(dog){
        const tile = document.createElement("span")
        tile.innerText = dog.name
        tile.id = `dog-${dog.id}`
        tile.addEventListener("click", event => displayDog(dog.id))
        dogBar.append(tile)
        console.log(dog)
    }

    console.log("it okay")
})


function displayDog(id){
    fetch(`http://localhost:3000/pups/${id}`)
    .then(res => res.json())
    .then(res => showDog(res))

}

function showDog(dog){
    const dogInfo = document.getElementById("dog-info")
    dogInfo.innerText = ""
    let dogName = document.createElement("h2")
    let dogPic = document.createElement("img")
    let statusButton = document.createElement("button")
    if (dog.isGoodDog == true) {
        statusButton.innerText = "Good Dog!"
        
    }else{
        statusButton.innerText = "Bad Dog!"
    }
    statusButton.addEventListener("click", event=>{whosAGoodDog(dog)})
    dogPic.src= dog.image   
    dogName.innerText = dog.name
    dogInfo.append(dogName, dogPic, statusButton)
}

function whosAGoodDog(dog){
    let data = () => {
        if (dog.isGoodDog) {
            return {isGoodDog: false}
        }else{return {isGoodDog: true}} 
    } 

      
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data())
    }).then(res => res.json())
    .then(res => showDog(res))
}