// ^===============================================================> Main Functions
async function searchByName(name){
closeSideBar()
emptyDataContainer()
$(".inner-loading-screen").fadeIn(300);
let baseUrl =  "https://www.themealdb.com/api/json/v1/1/"
let response= await fetch(`${baseUrl}search.php?s=${name}`)
let {meals} = await response.json();
displayMeals(meals  ? meals : [])
$(".inner-loading-screen").fadeOut(300);
}
async function searchByFirstLetter(FirstLetter){
  emptyDataContainer()
  $(".inner-loading-screen").fadeIn(300);
  FirstLetter== "" || FirstLetter== " " ? FirstLetter="a" : ""
  let baseUrl =  "https://www.themealdb.com/api/json/v1/1/"
  let response= await fetch(`${baseUrl}search.php?f=${FirstLetter}`)
  let {meals} = await response.json();
  displayMeals(meals  ? meals : [])
  $(".inner-loading-screen").fadeOut(300);
  }
async function getMealDetails(idMeal){
emptyDataContainer();
$(".inner-loading-screen").fadeIn(300)
  let baseUrl =  "https://www.themealdb.com/api/json/v1/1/"
  let response= await fetch(`${baseUrl}lookup.php?i=${idMeal}`)
  let {meals} = await response.json();
  selectedMeal = meals[0]
  displayMealDetails(selectedMeal)
  $(".inner-loading-screen").fadeOut(300)
}
async function getCategories(){
  hideSearchContainer()
  emptyDataContainer()
  closeSideBar()
  $(".inner-loading-screen").fadeIn(300)
  let baseUrl =  "https://www.themealdb.com/api/json/v1/1/"
  let response= await fetch(`${baseUrl}categories.php`)
  let {categories} = await response.json();
  console.log(categories);
  displayCategories(categories);
  $(".inner-loading-screen").fadeOut(300)
}
async function getAreas(){
  hideSearchContainer()
 closeSideBar()
 emptyDataContainer()
  $(".inner-loading-screen").fadeIn(300)
  let baseUrl =  "https://www.themealdb.com/api/json/v1/1/"
  let response= await fetch(`${baseUrl}list.php?a=list$`)
  let {meals} = await response.json();
  Areas = meals
  displayAreas(Areas)
  $(".inner-loading-screen").fadeOut(300)
}
async function getIngredients(){
hideSearchContainer()
closeSideBar()
emptyDataContainer()
  $(".inner-loading-screen").fadeIn(300)
  let baseUrl =  "https://www.themealdb.com/api/json/v1/1/"
  let response= await fetch(`${baseUrl}list.php?i=list$`)
  let {meals} = await response.json();
  ingredients = meals
  displayIngredients(ingredients)
  $(".inner-loading-screen").fadeOut(300)
}
async  function getCategoryMeals(category){
  emptyDataContainer()
$(".inner-loading-screen").fadeIn(300)
  let baseUrl =  "https://www.themealdb.com/api/json/v1/1/"
  let response= await fetch(`${baseUrl}filter.php?c=${category}`)
  let {meals} = await response.json();
  console.log(category);
  let categoryMeals = meals
  displayMeals(categoryMeals.slice(0,20))
  $(".inner-loading-screen").fadeOut(300)
}
async function getAreaMeals(area){
  emptyDataContainer()
  $(".inner-loading-screen").fadeIn(300)
  let baseUrl =  "https://www.themealdb.com/api/json/v1/1/"
  let response= await fetch(`${baseUrl}filter.php?a=${area}`)
  let {meals} = await response.json();
  let areaMeals = meals
  displayMeals(areaMeals.slice(0,20))
  $(".inner-loading-screen").fadeOut(300)
}
async function getIngredientMeals(ingredient){
  emptyDataContainer()
  $(".inner-loading-screen").fadeIn(300)
  let baseUrl =  "https://www.themealdb.com/api/json/v1/1/"
  let response= await fetch(`${baseUrl}filter.php?i=${ingredient}`)
  let {meals} = await response.json();
 ingredient = meals
  displayMeals(ingredient.slice(0,20))
  $(".inner-loading-screen").fadeOut(300)
}
function displayMealDetails(selectedMeal){
let ingredients =""
  for (let i = 0; i < 20; i++) {
if (selectedMeal[`strIngredient${i}`]){
    ingredients += `<li class="alert alert-info me-2 p-1">${selectedMeal[`strMeasure${i}`]} ${selectedMeal[`strIngredient${i}`]}</li>`
  }
  }

  let tags =""
if (selectedMeal["strTags"]){
  selectedMeal["strTags"].split(",").forEach(function(tag){tags += `<li class="alert alert-danger me-2 p-1">${tag}</li>`})
  } 
let HTMLContent = `
  <div class="col-md-4">
  <img src='${selectedMeal["strMealThumb"]}' class="w-100 rounded-2">
    <h3>${selectedMeal["strMeal"]}</h3>
  </div>
  <div class="col-md-8">
    <h3>Instructions</h3>
    <p>${selectedMeal["strInstructions"]}</p>
    <h3>Area: ${selectedMeal["strArea"]} </h3>
    <h3>Category: ${selectedMeal["strCategory"]} </h3>
    <h3>Recipes:</h3>
    <ul id="recipes" class="list-unstyled d-flex flex-wrap pt-2">
    ${ingredients}
    </ul>
    <h3>Tags:</h3>
    <ul id="Tags" class="list-unstyled d-flex flex-wrap pt-2">
    ${tags}
    </ul>
<a class="btn btn-success me-2" href="${selectedMeal["strSource"]}" target="_blank">Source</a>
<a class="btn btn-danger" href="${selectedMeal["strYoutube"]}" target="_blank">Youtube</a>
  </div>`
$("#data").html(HTMLContent)
}
function displayMeals(meals){
let cardsHTML = ""
  for (let i = 0; i < meals.length; i++) {
cardsHTML +=`<div class="col-md-3">
<div class="meals position-relative overflow-hidden rounded-2" onclick="getMealDetails('${meals[i]["idMeal"]}')">
<img src="${meals[i]["strMealThumb"]}" class="w-100">
<div class="meals-layer d-flex align-items-center position-absolute top-100 start-0  w-100 h-100">${meals[i]["strMeal"]}</div>
</div>
</div>`
  }
$("#data").html(cardsHTML)
}
function displayCategories(categories){
let cardsHTML = ""
  for (let i = 0; i < categories.length; i++) {
cardsHTML +=`<div class="col-md-3">
<div class="categories overflow-hidden position-relative rounded-2" onclick="getCategoryMeals('${categories[i]["strCategory"]}')">
<img src="${categories[i]["strCategoryThumb"]}" class="w-100">
<div class="categories-layer position-absolute top-100 start-0  w-100 h-100"><h3 class="text-center">${categories[i]["strCategory"]}</h3>
<p>${categories[i]["strCategoryDescription"].split(" ",20).join(" ")}<p></div>
</div>
</div>`
  }
$("#data").html(cardsHTML)
}
function displayAreas(areas){
  let cardsHTML = ""
    for (let i = 0; i < areas.length; i++) {
      cardsHTML +=`<div class="col-md-3">
      <div class="areas cursorPointer text-white text-center" onclick="getAreaMeals('${areas[i]["strArea"]}')">
      <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h3>${areas[i]["strArea"]}</h3>
      </div>
      </div>`
    }
  $("#data").html(cardsHTML)
}
  function displayIngredients(ingredients) {
    let cardsHTML = ""
      for (let i = 0; i < ingredients.length && i<20; i++) {
        cardsHTML +=`<div class="col-md-3">
        <div class="ingredients cursorPointer text-white text-center" onclick="getIngredientMeals('${ingredients[i]["strIngredient"]}')">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${ingredients[i]["strIngredient"]}</h3>
        <p>${ingredients[i]["strDescription"] ? ingredients[i]["strDescription"].split(" ",20).join(" ") : ""}</p>
        </div>
        </div>`
      }
    $("#data").html(cardsHTML)
}
function showSearchContainer(){
  closeSideBar()
  emptyDataContainer()
  let searchContainerHTML =`<div class="row py-4">
  <div class="col-md-6">
  <div><input type="text" placeholder="Search By Name" id="searchByName" onkeyup="searchByName(this.value)" class="form-control text-white bg-transparent">
  </div>
  </div>
  <div class="col-md-6">
  <div><input type="text" placeholder="Search By First Letter" id="searchFirstLetter" maxlength="1" onkeyup="searchByFirstLetter(this.value)" class="form-control text-white bg-transparent">
  </div>
  </div>
  </div>`
  $("#searchContainer").html(searchContainerHTML) ;  
}
function showContacts() {
closeSideBar()
emptyDataContainer()
hideSearchContainer()
let contactUsContainerHTML =`<div class="contact-us-content  min-vh-100 d-flex justify-content-center align-items-center">
<div class="container w-75">
<div class="row g-4">
<div class="col-md-6">
<input type="text" placeholder="Enter Your Name" id="name" class="form-control">
<div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
Special characters and numbers not allowed
</div>
</div>
<div class="col-md-6">
<input type="email" placeholder="Enter Your Email" id="email"  class="form-control">
<div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
Email not valid *exemple@yyy.zzz
</div>
</div>
<div class="col-md-6">
<input type="tel" placeholder="Enter Your Phone" id="phone" class="form-control">
<div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
Enter valid Phone Number
</div>
</div>
<div class="col-md-6">
<input type="number" placeholder="Enter Your Age" id="age"  class="form-control">
<div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
Enter valid age
</div>
</div>
<div class="col-md-6">
<input type="password" placeholder="Enter Your Password" id="password" class="form-control">
<div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
Enter valid password *Minimum eight characters, at least one letter and one number:*
</div>
</div>
<div class="col-md-6">
<input type="password" placeholder="Repassword" id="repassword"  class="form-control">
<div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
Enter valid repassword 
</div>
</div>

<button id="submitBtn" onClick="clearForm()" type="submit" disabled class="btn btn-outline-danger cursorPointer px-2 mt-3 mx-auto">Submit</button>
</div>
</div>`
$("#data").html(contactUsContainerHTML) ;  
// *=========================================> Focus validation Event Handler
$("#name").on('input',()=>{
  if (nameValidation()) {
    $("#nameAlert").addClass("d-none").removeClass("d-block")
    inputFieldsValidation()
  }
  else {$("#nameAlert").addClass("d-block").removeClass("d-none")}
})

$("#email").on('input',()=>{
  if (emailValidation()) {
    $("#emailAlert").addClass("d-none").removeClass("d-block")
    inputFieldsValidation()
  }
  else {
    $("#emailAlert").addClass("d-block").removeClass("d-none")}
})
$("#phone").on("input",()=>{
  if (phoneValidation()) {
    $("#phoneAlert").addClass("d-none").removeClass("d-block")
    inputFieldsValidation()
  }
  else {$("#phoneAlert").addClass("d-block").removeClass("d-none")}
})
$("#age").on("input",()=>{
  if (ageValidation()) {
    $("#ageAlert").addClass("d-none").removeClass("d-block")
    inputFieldsValidation()
  }
  else {$("#ageAlert").addClass("d-block").removeClass("d-none")}
})
$("#password").on("input",()=>{
  if (passwordValidation()) {
    
    $("#passwordAlert").addClass("d-none").removeClass("d-block")
    inputFieldsValidation()
  }
  else {$("#passwordAlert").addClass("d-block").removeClass("d-none")}
})
$("#repassword").on("input",()=>{
  if (repasswordValidation()) {
    
    $("#repasswordAlert").addClass("d-none").removeClass("d-block")
    inputFieldsValidation()
  }
  else {$("#repasswordAlert").addClass("d-block").removeClass("d-none")}
})  
}
// ^===============================================================> Helper Functions
function emptyDataContainer(){
  $("#data").html("")
}
function openCloseSideBar(){
const sideBarCurrentPosition = $(".sideBar-container").css("left")
if (sideBarCurrentPosition ==="0px"){
closeSideBar()
}
else{
openSideBar()
}
}
function closeSideBar(){
  const sideBarWidth = $(".sideBar").innerWidth();
    $("#toggleBtn").addClass("fa-align-justify").removeClass("fa-x");
    $(".sideBar-container").animate({left:-sideBarWidth},500)
    sideBarLinksCloseAnimation()
}
function openSideBar(){
const sideBarWidth = $(".sideBar").innerWidth();
$("#toggleBtn").addClass("fa-x").removeClass("fa-align-justify");
$(".sideBar-container").animate({left:"0px"},500)
sideBarLinksOpenAnimation()
}
function sideBarLinksCloseAnimation(){
  for (let i = 0; i < $(".animation").length; i++) {
    // console.log($(".animation"))
     $(".animation").eq(i).animate({top:"300Px"}, 500)
  }
}
function sideBarLinksOpenAnimation(){
  for (let i = 0; i < $(".animation").length; i++) {
    // console.log($(".animation"))
     $(".animation").eq(i).animate({top:"0Px"}, (i+5)*100)
  }
}
function hideSearchContainer(){
    $("#searchContainer").html("")
}
function clearForm(){
  $("#name").val("")
  $("#nameAlert").addClass("d-none").removeClass("d-block")
  $("#email").val("")
  $("#emailAlert").addClass("d-none").removeClass("d-block")
  $("#age").val("")
  $("#ageAlert").addClass("d-none").removeClass("d-block")
  $("#phone").val("")
  $("#phoneAlert").addClass("d-none").removeClass("d-block")
  $("#password").val("")
  $("#passwordAlert").addClass("d-none").removeClass("d-block")
  $("#repassword").val("")
  $("#repasswordAlert").addClass("d-none").removeClass("d-block")
}
// !===============================================================> Validation functions
function nameValidation() {
  return (/^[a-zA-Z ]+$/.test($("#name").val()))
}

function emailValidation() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($("#email").val()))
}

function phoneValidation() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test($("#phone").val()))
}

function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test($("#age").val()))
}

function passwordValidation() {
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test($("#password").val()))
}

function repasswordValidation() {
  return $("#repassword").val() == $("#password").val()
}

function inputFieldsValidation(){
  if(nameValidation() &&
  emailValidation() &&
  phoneValidation() &&
  ageValidation() &&
  passwordValidation() &&
  repasswordValidation()) {
  $("#submitBtn").removeAttr("disabled")
} else {
  $("#submitBtn").attr("disabled")
}
}

// *==============================================================> Event Handlers
// *=========================================> Toggle Side Bar Menu
$("#toggleBtn").click(openCloseSideBar)
// *=========================================> Ready Event Handler
$("document").ready(async ()=>{ await searchByName("")
$(".loading-screen").fadeOut(500)})
// *=========================================> Category button Event Handler
$("#category").click(()=>{
  getCategories()
})
// *=========================================> Area button Event Handler
$("#area").click(()=>{
  getAreas()
})
// *=========================================> ingredient button Event Handler
$("#ingredients").click(()=>{
  getIngredients()
})
// *=========================================> search button Event Handler
$("#search").click(()=>{
showSearchContainer()
})
// *=========================================> Contact Us button Event Handler
$("#contactUs").click(()=>{
showContacts()
})
