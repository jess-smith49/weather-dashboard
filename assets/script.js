
//getting current date - learned off stack overflow resource
//new date object
var today = new Date();
//uses new object with javascript functions to get the values
//getDate returns day of month, getMonth returns month value -- needs + 1 because January starts at 0, getFullYear returns the current year value
var date =  (today.getMonth()+ 1) + '/' + today.getDate() + '/' + today.getFullYear();
//console.log to verify date shows in format I need
//console.log(date);
var storage = [];
var previousSearchTerms = JSON.parse(localStorage.getItem("cities"));
if(previousSearchTerms !== null){
    storage = previousSearchTerms;
};

displayPreviousSearches(storage);


console.log(previousSearchTerms);
//Function get get UV Index
function getUVIndex(cityLat,cityLon, cityName, date, iconDisplay, cityTemperature, cityHumidity, cityWindSpeed){

    fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${cityLat}&lon=${cityLon}&appid=519a795400f3f1c248480dfcc8e3bf80`
    )
    .then (function(response){
        return response.json();
    })
    .then (function(data){
        console.log(data)
        //getting UV index value
        let index = data.value;
        
        //ternary operator for template literals
        //let indexColors = `<div class=${index < 3 ? 'bg-success' : 'bg-warning'}>UV Index: ${index}</div>`
        let indexColors = 
        (index < 3 ? `<div class=bg-success>UV Index: ${index}</div>` : 
        index < 7 ? `<div class=bg-warning>UV Index: ${index}</div>` : 
        index >= 7 ? `<div class=bg-danger>UV Index: ${index}</div>`:
        null
        );

        console.log(indexColors);

        let currentWeatherSection = $("#current-weather");
        //creating card
        let currentWeatherData = 
                        `
                        <div class = "border">
                        <div>
                            <h2>${cityName} ${date} <img src=${iconDisplay}>
                            </h2>
                        </div>
                        <div>Temperature: ${cityTemperature}°</div>
                        <div>Humidity: ${cityHumidity} %</div>
                        <div>Wind Speed: ${cityWindSpeed} MPH</div>
                        ${indexColors}
                        </div>
                        </br>
                        `
                        currentWeatherSection.append(currentWeatherData);
    })
}




//Function to display Current Weather
function getCurrentWeather(searchTermEl){
    dailyForecast(searchTermEl)
    event.preventDefault();

    //clears out current weather section for new search
    $("#current-weather").empty();
    
    fetch (
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTermEl}&appid=519a795400f3f1c248480dfcc8e3bf80&units=imperial`
        )
        .then(function(response){
            return response.json();
            
        
        })
        .then(function(data){
            console.log(data);
                        //variable long and lat
                        let cityLat = data.coord.lon;
                        let cityLon = data.coord.lat;
                        console.log(cityLat);
                        console.log(cityLon);
                        
                        
                        //let currentWeatherSection = $("#current-weather");
                    
                        //creating data variables
                        let cityName = data.name;
                        let cityIcon = data.weather[0].icon;

                        //url endpoint for icon variable
                        let iconDisplay = "http://openweathermap.org/img/w/" + cityIcon + ".png";

                        let cityTemperature = data.main.temp;
                        let cityHumidity = data.main.humidity;
                        let cityWindSpeed = data.wind.speed;       
                        getUVIndex(cityLat, cityLon, cityName, date, iconDisplay,cityTemperature,cityHumidity,cityWindSpeed);
                        //currentWeatherSection.append(currentWeatherData);
            
        });
    
    };
    
    
    //Function to display Daily Forecast
    function dailyForecast(searchTermEl){
        //get element input
        event.preventDefault();

        //clears out cards for new search
        $("#card-container").empty();
        //get data for 5 day forecast
        fetch (
            `http://api.openweathermap.org/data/2.5/forecast?q=${searchTermEl}&appid=519a795400f3f1c248480dfcc8e3bf80&units=imperial`
            )
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);
                    //get the class for section
                    let dailyForecastSection = $("#card-container");

                    
                                //for loop for forecast
                                for (var i = 0; i < 5; i ++){

                                //data
                                let forecastTemp = data.list[i].main.temp;
                                //console.log(forecastTemp);
            
                                let forecastImg = data.list[i].weather[0].icon;
                                //console.log(forecastImg);
                                
                                //getting icon from the url and adding the type of icon to the end of it
                                let icon = "http://openweathermap.org/img/w/" + forecastImg + ".png";

                                let forecastHumidity = data.list[i].main.humidity;
                                //console.log(forecastHumidity);

                                //creating the cards
                                let dailyCards = `
                                <div class = "col-sm-3 text-white"
                                <div class="card bg-primary" style="width: 40rem;">
                                    <div class="card-body bg-primary">
                                        <h5 class="card-title">${date}</h5>
                                        <img src=${icon}>
                                        <p class="card-text">Temp: ${forecastTemp}°F</p>
                                        <p class="card-text">Humiditiy: ${forecastHumidity} %</p>
                                    </div>
                                </div>
                                </div>
                                `
                                //appending the card
                                dailyForecastSection.append(dailyCards);
                            }
                
    
            })
    };
    

    //jquery event listener, only fires if LI element is clicked
    $("#previous-search").on("click", "li", function(){
        console.log("clicked");
        //getting the city name text value
        getCurrentWeather($(this).text());
    })


    function search (){  
    $(".search").click(function(){
        
        var searchTermEl = $("#city-name").val().trim();
        getCurrentWeather(searchTermEl); 
    
        storage.push(searchTermEl);
        event.preventDefault();
    
        //save to search history
        var previousSearch = $("#previous-search");
        let searchHistory = `
        <li class = "border bg-white saved">${searchTermEl}</li>
        `
        previousSearch.append(searchHistory);

        localStorage.setItem("cities", JSON.stringify(storage));
        localStorage.getItem(searchTermEl);
        
        
     });
    }

    function displayPreviousSearches (storage){
        var previousSearch = $("#previous-search");
         let searchHistory;
       
        for( var i = 0; i < storage.length; i ++){
            searchHistory = `
                    <li class = "border bg-white saved">${storage[i]}</li>
                    `
             previousSearch.append(searchHistory);
        }
    }


    search();

