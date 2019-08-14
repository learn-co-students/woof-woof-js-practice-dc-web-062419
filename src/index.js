DOGS_URL = "http://localhost:3000/pups"

document.addEventListener("DOMContentLoaded", function(){
  console.log("DOM is loaded")
const filterButton = document.getElementById("good-dog-filter");
filterButton.addEventListener("click", (event) => getAllGoodDogs(event, filterButton));
getAllDogs()
})
