//Function to display Current Weather
function getCurrentWeather(){
    var searchTermEl = $("#city-name").val().trim();
    event.preventDefault();

    //clears out current weather section for new search
    $("#current-weather").empty();
    
    fetch (
        `http://api.openweathermap.org/data/2.5/weather?q=${searchTermEl}&appid=519a795400f3f1c248480dfcc8e3bf80&units=imperial`
        )
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
    
        let currentWeatherSection = $("#current-weather");
    
    
        let cityName = data.name;
        let cityIcon = data.weather.icon;
        //have to get to normal measure
        let cityTemperature = data.main.temp;
        let cityHumidity = data.main.humidity;
        let cityWindSpeed = data.wind.speed;
        //let cityUV = 
        let currentWeatherData = 
        `
        <div class = "border">
        <div>
            <h2>${cityName} 
            DATE
            <img src = ${cityIcon}>
            </h2>
        </div>
        <div>Temperature: ${cityTemperature}</div>
        <div>Humidity: ${cityHumidity} %</div>
        <div>Wind Speed: ${cityWindSpeed} MPH</div>
        </div>
        </br>
        `
        
        currentWeatherSection.append(currentWeatherData);
            
        });
    
    };
    
    
    //Function to display Daily Forecast
    function dailyForecast(){
        //get element input
        var searchTermEl = $("#city-name").val().trim();
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
                        console.log(forecastImg);
                        
                        let forecastHumidity = data.list[i].main.humidity;
                        //console.log(forecastHumidity);

                        //creating the cards
                        let dailyCards = `
                        <div class = "row">
                        <div class = "col-sm-6"
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">Date</h5>
                                
                                <p class="card-text">Temp: ${forecastTemp}</p>
                                <p class="card-text">Humiditiy: ${forecastHumidity}</p>
                            </div>
                            </div>
                        </div>
                        </div>
                        `
                        //appending the card
                        dailyForecastSection.append(dailyCards);
                    }
                
    
            })
    };
    
    
    
    $(".search").click(function(){
        //console.log("clicked");
        getCurrentWeather(); 
        dailyForecast();
    
        var searchTermEl = $("#city-name").val().trim();
        event.preventDefault();
    
        //save to search history
        var previousSearch = $("#previous-search");
        let searchHistory = `
        <li class = "border">${searchTermEl}</li>
        </br>
        `
        previousSearch.append(searchHistory);
    });
    