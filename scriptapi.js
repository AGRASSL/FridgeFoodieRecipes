let searchButton = document.querySelector("#search")

searchButton.addEventListener("click", ()=>{
    console.log("button pressed")
    sendApiRequest()
})

async function sendApiRequest(){
    let APP_ID = "1c49a61b"
    let API_KEY = "db0145d0d0dd134bbf428353e18af69b"
    let response = await fetch("https://api.edamam.com/search?q=pizza&app_id=1c49a61b&app_key=db0145d0d0dd134bbf428353e18af69b");
    console.log(response)
    let data = await response.json()
    console.log(data)
    useApiData(data)
}

// Create the XHR object.
// function createCORSRequest(method, url) {
//     var xhr = new XMLHttpRequest();
//     if ("withCredentials" in xhr) {
//       // XHR for Chrome/Firefox/Opera/Safari.
//       xhr.open(method, url, true);
//     } else if (typeof XDomainRequest != "undefined") {
//       // XDomainRequest for IE.
//       xhr = new XDomainRequest();
//       xhr.open(method, url);
//     } else {
//       // CORS not supported.
//       xhr = null;
//     }
//     return xhr;
//   }
  
//   // Make the actual CORS request.
//   function makeCorsRequest() {
//     let APP_ID = document.getElementById('app_id').value;
//     let app_key = document.getElementById('app_key').value;
//     let recipe = document.getElementById('recipe').value;
//     let pre = document.getElementById('response');
  
//     var url = 'https://api.edamam.com/api/nutrition-details?app_id=' + app_id + '&app_key=' + app_key;
  
//     var xhr = createCORSRequest('POST', url);
//     if (!xhr) {
//       alert('CORS not supported');
//       return;
//     }
  
//     // Response handlers.
//     xhr.onload = function() {
//       var text = xhr.responseText;
//       pre.innerHTML = text;
//     };
  
//     xhr.onerror = function() {
//       alert('Woops, there was an error making the request.');
//     };
  
//     pre.innerHTML = 'Loading...';
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(recipe);
//   }



// function useApiData(data){
//        document.querySelector("#content").innerHTML = `
//        <div class="card" style="width: 18rem;">
//   <img src="..." class="card-img-top" alt="...">
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>
//        `
// } 