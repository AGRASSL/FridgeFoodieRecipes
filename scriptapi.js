$(document).ready(function () {
    //prevents js from loading until the document is ready

    var ingredientsArr = [];

    $(".getStarted").on("click", function () {
        // activate enter button
        var searchResults = "search-results.html";
        location.assign(searchResults);
    });

    $(".goBack").on("click", function () {
        var goBack = "index.html";
        location.assign(goBack);
    });

    $(".secondRecipeBtn").on("click", function () {
        let ingredient1 = $("#searchItem1").val();
        let ingredient2 = $("#searchItem2").val();
        let ingredient3 = $("#searchItem3").val();
        let dietaryRes = $(".custom-select").val();
        ingredientsArr.push(ingredient1, ingredient2, ingredient3);
        console.log(ingredientsArr);
        console.log(dietaryRes);
        window.localStorage.setItem("Ingredients", ingredientsArr);

        sendApiRequest(ingredientsArr, dietaryRes);
        getWine(ingredientsArr)
    });

    async function sendApiRequest(ingredientsArr, dietaryRes) {
        let APP_ID = "1c49a61b";
        let API_KEY = "db0145d0d0dd134bbf428353e18af69b";
        let response = await fetch(
            "https://api.edamam.com/search?q=" +
            ingredientsArr +
            "&health=" +
            dietaryRes +
            "&app_id=1c49a61b&app_key=db0145d0d0dd134bbf428353e18af69b"
        );

        let data = await response.json();
        console.log(data);

        function cardPop(ingData) {
            console.log(ingData);
            
            for (var i = 1; i < 10; i++) {
                $("#cardTitle" + i).text(ingData["hits"][i]["recipe"]["label"]);
                $("#cardInfo" + i).text(ingData["hits"][i]["recipe"]["source"]);
                var cardLinkURL = (ingData["hits"][i]["recipe"]["url"]);
                $("#cardLink" + i).attr("href", cardLinkURL); // create a property path 
                var cardImgURL = (ingData["hits"][i]["recipe"]["image"]);
                $("#cardImg" + i).attr("src", cardImgURL); // create a property path 
            }
        }
        cardPop(data);
    }

    async function getWine() {
        let ingredient1 = $("#searchItem1").val();
        let API_KEY = "aba6772464154899a2eec582fbee5c92"
        let response = await fetch(`https://api.spoonacular.com/food/wine/pairing?food=` + ingredient1 + `&apiKey=${API_KEY}`);
        console.log(response)
        let wData = await response.json()
        console.log(wData)
        useWineData(wData);
        
      
      };

      function useWineData(wData){
        document.querySelector("#wine-box").innerHTML = `
        <div class="wine-body">
        <h5 class="wine-hding" id="wine-hding">Drink Up!</h5>
        <h5 class="wine-title" id="wineTitle">${wData.pairedWines}</h5>
        <p class="wine-text" id="wineInfo">${wData.pairingText}</p>
      </div>
   </div>
   `  
      }
      
    

});