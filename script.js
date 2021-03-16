//VARIABLES
var ingredients = $()
var diet = $()

//FUNCTION

$(document).ready(function() { //prevents js from loading until the document is ready

$('.searchRecipes').on("click", function() { // activate enter button
        var searchResults = "search-results.html"
        location.assign(searchResults); 
        // ingredients.val(); // create ingredient variable
        // diet.val(); // create diet variable
        // call AJAX function
     });
        //AJAX function {}


$('.goBack').on("click", function(){
    var goBack = "index.html"
    location.assign(goBack);
})


$('.secondRecipeBtn').on("click", function(){

})


var API = 'https://http://www.cors-anywhere.herokuapp.com/https://api.edamam.com/search?app_id=1c49a61b&api_key=db0145d0d0dd134bbf428353e18af69b&q=pizza'
fetch(API)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })


});
