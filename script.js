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
});
