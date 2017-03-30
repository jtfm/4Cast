var apiKey = "2d580250e461384d710135677c32907c";
var latitude = 0;
var longitude = 0;
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
	});
} else console.log("Location not found.");

var weatherText = document.getElementById("weather-text");
var weatherImage = document.getElementById("weather-image");
var textInput = document.getElementById("textInput");
var submit = document.getElementById("submit");

function renderHTML(data) {
	document.getElementById("location").innerHTML = data.name;
	var d = new Date();
	var htmlString = "";
	htmlString += "<img height='100px' width='100px' src='" + "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'><br>";
	htmlString += d.getHours() + ":" + d.getMinutes() + " <br>";
	htmlString += d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + "<br><br>";
	htmlString += "Conditions: " + data.weather[0].description + "<br>";
	htmlString += "Temperature: " + (data.main.temp - 273.15).toFixed(2) + "&degC<br>";
	htmlString += "Humidity: " + data.main.humidity + "%<br>";
	htmlString += "Pressure: " + data.main.pressure + " hPa<br>";
	htmlString += "Wind Speed: " + data.wind.speed + " m/s";
	weatherText.innerHTML = htmlString;
	/*weatherImage.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";*/
	$("body").css("background-image", "url('https://res.cloudinary.com/jtfm/image/upload/v1490891187/" + data.weather[0].icon + ".jpg')");
}

submit.addEventListener("click", function() {
	console.log("Query received");
	var ourRequest = new XMLHttpRequest();
	var requestString = "http://api.openweathermap.org/data/2.5/weather?q=" + textInput.value + "&appid=" + apiKey;
	console.log(requestString);
	ourRequest.open('GET', requestString);
	ourRequest.onload = function() {
		var myData = JSON.parse(ourRequest.responseText);
		renderHTML(myData);
	};
	ourRequest.send();
});

document.getElementById("gps").addEventListener("click", function() {
	var ourRequest = new XMLHttpRequest();
	var requestString = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
	ourRequest.open('GET', requestString);
	ourRequest.onload = function() {
		var myData = JSON.parse(ourRequest.responseText);
		renderHTML(myData);
	};
	ourRequest.send();
});