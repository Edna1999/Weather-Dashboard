var searchInputs = document.querySelector('#inputVal');
var searchBtn = document.querySelector('.searchBtn');
var currentTemp = document.querySelector('.todaysTemp');
var forecasts = document.querySelector('.forecast');
var futureTemp = document.getElementById('futureTemps');
var searchList = document.querySelector('.pastSearches');

var currentDate = moment().format('L');



//function using api to gather weather forecast for the present day and five days in advance
 function getWeather(){
    var searchInputs = document.getElementById('inputVal').value;
   

    if(!searchInputs){

        searchInputs = 'Columbus';
     
    }
    
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInputs}&appid=ca6a12d35d9ce5fe46d0460230c33dbc&id=524901&units=imperial`;
   

    fetch(requestUrl)
        .then((response) => {
     return response.json();
        }).then((data) => {
            todaysResults = data;
            appendWeather();


            var lat = data.coord.lat;
            var lon = data.coord.lon;
        
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ca6a12d35d9ce5fe46d0460230c33dbc`)
              .then((response) => {
                return response.json();
              }).then((data) => {
                console.log(data)
                forecastResults = data;
                appendForecast();

              })
     
        })
       
       
    }



    //function appending weather of the present day to document
   function appendWeather(){

    var cityName = document.createElement('h2');
    var weatherContainer = document.createElement('ul')
    var todaysTemp = document.createElement('li');
    var todaysHumidity = document.createElement('li');
    var todaysWind = document.createElement('li');
   

    cityName.textContent = todaysResults.name + ' ' + '(' + currentDate + ')';
    todaysTemp.textContent = 'Temp: ' + todaysResults.main.temp;
    todaysHumidity.textContent ='Humidity: ' + todaysResults.main.humidity;
    todaysWind.textContent = 'Wind: ' + todaysResults.wind.speed;

    currentTemp.appendChild(cityName);
    currentTemp.appendChild(weatherContainer);
    weatherContainer.appendChild(todaysTemp);
    weatherContainer.appendChild(todaysHumidity);
    weatherContainer.appendChild(todaysWind);

   }


   //function appending weather for five days in advance onto document
   function appendForecast(){
    var plus = 1;
    
    for(var i = 0; i < forecastResults.list.length; i+=8){
    
     var tempBox = document.createElement('div');
     tempBox.setAttribute('class', 'box');
     futureTemp.appendChild(tempBox);
     var dates = document.createElement('span');
     dates.setAttribute('class', 'date');

     var formatedDates = moment().add(plus++, 'days').format('L');
     dates.textContent = formatedDates;

     tempBox.appendChild(dates);

     var weatherContainer = document.createElement('ul');
     tempBox.appendChild(weatherContainer);
     var icon = document.createElement('img');
     icon.setAttribute('src', `http://openweathermap.org/img/wn/${forecastResults.list[i].weather[0].icon}@2x.png`)

     var temp = document.createElement('li');
     var humidity = document.createElement('li');
     var wind = document.createElement('li');

     temp.textContent = 'Temp: ' + forecastResults.list[i].main.temp;
     humidity.textContent = 'Humidity: ' + forecastResults.list[i].main.humidity;
     wind.textContent = 'Wind: ' + forecastResults.list[i].wind.speed;

     weatherContainer.appendChild(icon);
     weatherContainer.appendChild(temp);
     weatherContainer.appendChild(humidity);
     weatherContainer.appendChild(wind);

  
    }
  
   }
  

   //search button event listener    
    searchBtn.addEventListener('click', function(event){
     
      currentTemp.textContent = '';
      futureTemp.textContent ='';


    var setSearches = localStorage.setItem('searches', searchInputs.value);

    
      

        getWeather();
        appendSearches();
  
        currentTemp.setAttribute('style', 'display:block');
      
        forecasts.setAttribute('style', 'display:block');

        searchInputs.value = '';

    });


    // function to append searches onto page using local storage
  function appendSearches(){
        
        var previousSearches = document.createElement('button');
        previousSearches.setAttribute('class', 'button');
        previousSearches.textContent = searchInputs.value;

        var getSearches = localStorage.getItem('searches');
      

          if(!previousSearches.textContent){

            previousSearches.textContent ='columbus'
        
          }

          searchList.appendChild(previousSearches);
          searchList.setAttribute('style', 'display:flex; flex-direction:column');

          console.log(getSearches);


     window.addEventListener('load', function(){

          previousSearches.textContent= getSearches;

          if(!previousSearches.textContent){

            previousSearches.setAttribute('style', 'display:none');
          }
             
          })
      
       
  previousSearches.addEventListener('click', function(){

 
   
        currentTemp.textContent = '';
        futureTemp.textContent = '';
    
  
        currentTemp.setAttribute('style', 'display:block');
      
        forecasts.setAttribute('style', 'display:block');
        
        getSearchWeather();
        
      });
     


      //nested function to fetch api data when previous searches are clicked on to 
  function getSearchWeather(){

        var searches = previousSearches.textContent;
        
        if(!searches){

          searches = 'columbus'
  
         
        }
       
        var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searches}&appid=ca6a12d35d9ce5fe46d0460230c33dbc&id=524901&units=imperial`;
     
    
      fetch(requestUrl)
          .then((response) => {
       return response.json();
          }).then((data) => {
              todaysResults = data;
              appendWeather();
    
    
              var lat = data.coord.lat;
              var lon = data.coord.lon;
          
              fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ca6a12d35d9ce5fe46d0460230c33dbc`)
                .then((response) => {
                  return response.json();
                }).then((data) => {
                  forecastResults = data;
                  appendForecast();
    
                })
       
          })
        }
    }


    

    appendSearches();
    

    
   
   

  








   
