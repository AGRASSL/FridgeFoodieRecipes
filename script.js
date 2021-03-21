$(document).ready(function () {
    //prevents js from loading until the document is ready
  
    var ingredientsArr = [];
    var ingredStorageArr = [];
    var dietResArr = [];
  
    //EVENT LISTENER ON LANDING PAGE BUTTON TO GET TO SEARCH RESULTS HTML
    $(".getStarted").on("click", function () {
      var searchResults = "search-results.html";
      location.assign(searchResults);
    });
  
    //EVENT LISTENER ON THE SEARCH RESULTS HTML TO TAKE YOU BACK TO LANDING PAGE
    $(".goBack").on("click", function () {
      var goBack = "index.html";
      location.assign(goBack);
    });
  
    //EVENT LISTENER ON 'VIEW RECIPES' BUTTON TO RENDER RECIPE RESULTS AND STORES INPUTS TO LOCAL STORAGE
    $(".secondRecipeBtn").on("click", function () {
      ingredientsArr.length = 0;
      let ingredient1 = $("#searchItem1").val();
      let ingredient2 = $("#searchItem2").val();
      let ingredient3 = $("#searchItem3").val();
      let dietaryRes = $(".custom-select").val();
      dietResArr.push(dietaryRes);
      ingredientsArr.push(ingredient1, ingredient2, ingredient3);
      ingredStorageArr.push(ingredient1, ingredient2, ingredient3);
      let oldIngred =
        JSON.parse(window.localStorage.getItem(ingredStorageArr)) || [];
      let oldDiet = JSON.parse(window.localStorage.getItem(dietResArr)) || [];
      oldIngred.push(ingredStorageArr);
      oldDiet.push(dietResArr);
      console.log(ingredientsArr);
      console.log(dietaryRes);
      window.localStorage.setItem("userIngred", JSON.stringify(ingredStorageArr));
      window.localStorage.setItem("userDietRes", JSON.stringify(dietResArr));
  
      $(".cardCol")[0].style.display = "block";
      $(".cardCol")[1].style.display = "block";
      $(".cardCol")[2].style.display = "block";
      if (dietaryRes == "Dietary Restrictions?") {
        sendApiRequestIngred(ingredientsArr);
      } else {
        sendApiRequest(ingredientsArr, dietaryRes);
      }
  
      getWine(ingredientsArr);
    });
  
    //API CALL TO DISPLAY RECIPES BASED ON USER INPUTS
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
      //HIDE ALL CARDS IF NO RECIPES ARE RETURNED BY API, DISPLAY 'NO RESULTS'
      if (data["count"] > 0) {
        cardPop(data);
      } else {
        $(".cardCol")[0].style.display = "none";
        $(".cardCol")[1].style.display = "none";
        $(".cardCol")[2].style.display = "none";
        $(".noRes")[0].style.display = "block";
      }
      //POPULATES CARDS WITH RECIPE INFORMATION
      function cardPop(ingData) {
        console.log(ingData);
  
        for (var i = 1; i < 10; i++) {
          $("#cardTitle" + i).text(ingData["hits"][i]["recipe"]["label"]);
          $("#cardInfo" + i).text(ingData["hits"][i]["recipe"]["source"]);
          var cardLinkURL = ingData["hits"][i]["recipe"]["url"];
          $("#cardLink" + i).attr("href", cardLinkURL); // create a property path
          var cardImgURL = ingData["hits"][i]["recipe"]["image"];
          $("#cardImg" + i).attr("src", cardImgURL); // create a property path
        }
      }
      cardPop(data);
    }
  
    //SECOND API CALL TO GET WINE PAIRINGS BASED OFF USER INGREDIENTS INPUT
    async function getWine() {
        let ingredient1 = $("#searchItem1").val();
        if(!ingredient1){
          //display error message code here
          return false
        }
  
        //ingredient1 defined: proceed to fetch.
        let API_KEY = "aba6772464154899a2eec582fbee5c92";
        let response = await fetch(
          `https://api.spoonacular.com/food/wine/pairing?food=` +
            ingredient1 +
            `&apiKey=${API_KEY}`
        );
        console.log(response);
        let wData = await response.json();
        console.log(wData);
        // useWineData(wData)
  
        //update HTML with data from spoonacular!
        document.querySelector("#wine-box").innerHTML = `
                <div class="wine-body">
                <h5 class="wine-hding" id="wine-hding">Drink Up!</h5>
                <h5 class="wine-title" id="wineTitle">${wData.pairedWines}</h5>
                <p class="wine-text" id="wineInfo">${wData.pairingText}</p>
              </div>
          </div>
          `;
      }
  
    //second function-working on diet res
  
    async function sendApiRequestIngred(ingredientsArr) {
      let APP_ID = "1c49a61b";
      let API_KEY = "db0145d0d0dd134bbf428353e18af69b";
      let response = await fetch(
        "https://api.edamam.com/search?q=" +
          ingredientsArr +
          "&app_id=1c49a61b&app_key=db0145d0d0dd134bbf428353e18af69b"
      );
  
      let data = await response.json();
      console.log(data);
      //HIDE ALL CARDS IF NO RECIPES ARE RETURNED BY API, DISPLAY 'NO RESULTS'
      if (data["count"] > 0) {
        cardPop(data);
      } else {
        $(".cardCol")[0].style.display = "none";
        $(".cardCol")[1].style.display = "none";
        $(".cardCol")[2].style.display = "none";
        $(".noRes")[0].style.display = "block";
      }
      //POPULATES CARDS WITH RECIPE INFORMATION
      function cardPop(ingData) {
        console.log(ingData);
  
        for (var i = 1; i < 10; i++) {
          $("#cardTitle" + i).text(ingData["hits"][i]["recipe"]["label"]);
          $("#cardInfo" + i).text(ingData["hits"][i]["recipe"]["source"]);
          var cardLinkURL = ingData["hits"][i]["recipe"]["url"];
          $("#cardLink" + i).attr("href", cardLinkURL); // create a property path
          var cardImgURL = ingData["hits"][i]["recipe"]["image"];
          $("#cardImg" + i).attr("src", cardImgURL); // create a property path
        }
      }
      cardPop(data);
    }
  
  });