"use strict";

function getWeather(city) {
  let api = "e2f24173e8444332ac3155530212107";
  // let city = "Paris";
  var result,
    cityname,
    region,
    tz_id,
    temperatureC,
    last_updated,
    condition_icon,
    condition_text;
  fetch(`http://api.weatherapi.com/v1/current.json?key=${api}&q=${city}&aqi=no`)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      result = myJson;
      cityname = myJson.location.name;
      region = myJson.location.region;
      tz_id = myJson.location.tz_id;

      condition_icon = myJson.current.condition.icon;
      condition_text = myJson.current.condition.text;
      temperatureC = myJson.current.feelslike_c;
      last_updated = myJson.current.last_updated;
    });

  setTimeout(() => {
    // console.log(cityname ,region , tz_id );
    if (cityname == undefined || cityname == "") {
      alert("Enter a valid city name");
    } else {
      console.log(condition_icon);
      document.getElementById("resultat").innerHTML = `
        <div>
            <div class="widget">
                <div class="left-panel panel">
                    <div class="date">
                    ${last_updated}
                    </div>
                    
                    <div class="city">
                    ${cityname}
                    </div>
                    <div class="date">
                    ${condition_text}
                    </div>
                    <div class="temp">
                       <img src="http://${condition_icon}" alt="" width="60">
                       ${temperatureC}&deg;
                    </div>
                </div>
                <div class="right-panel panel">
                    <img src="https://source.unsplash.com/800x600/?$${cityname}" alt="" width="160">
                </div>
                <div class="copyright">Developed by <a href="https://www.linkedin.com/in/m-mediouni/" target="_blank">Mohamed Mediouni</a>  <i class="fas fa-heart"></i> </div>
                </div>
            </div>
            
          </div>
            `;
    }
  }, 500);
}
function loadCity() {
  var currentCity = document.getElementById("inputCity").value;
  if (currentCity.length < 2) {
    alert("City name must have at least 2 characters");
  } else {
    console.log(currentCity);
    getWeather(currentCity);
  }
}



var input = document.getElementById("inputCity");
console.log(input);
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    loadCity();
  }
});