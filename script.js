const currentTimeT = () => {
                //Time Script
                var time = new Date();
                //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                
                const currentTime1 = document.getElementById('currentTime');
                currentTime1.textContent = time.toLocaleString(('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
}
currentTimeT();

const apiKey = "5V3GoOkajbyA0UecBFfzMhtzOLVblpo6";
const apiUrl = "https://dataservice.accuweather.com/locations/v1/cities/search?q=";
const apiUrlgeoPosition = "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=";




// ----------START of Functions for GeoPosition Search
const btnLocation = document.getElementById('btnlocation');

document.body.onload = function (){
  userLocation();
};

const userLocation = () => {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(currentLocation);
  } else {
    showLocation.innerHTML = "Your browser does not support this feature.";
  }
}

const currentLocation = async (lat) => {
  const currentPositionlat = lat.coords.latitude;
  const currentPositionlong = lat.coords.longitude;
  const locationResult = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=${currentPositionlat},${currentPositionlong}`, config2);

   getCurrentLocation(locationResult.data);

}

const getCurrentLocation = async (data) => {
  const localizedName = document.getElementById('localizedName');
  const cityName = data.ParentCity.LocalizedName;
  const countryID = data.AdministrativeArea.CountryID;
  const locationKey = data.Key;
  localizedName.textContent = data.LocalizedName + ', '+ cityName + ', ' + countryID;

  if(data.Key){
           
    const checkCurrent = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?`, config2);
  
    currentWeather(checkCurrent.data);
}
dailyForcastGeo(data);
airQualityGeo(data);

}
const airQualityGeo = async (data) => {
    const locationKey = data.Key;
   const air = await axios.get(`http://dataservice.accuweather.com/indices/v1/daily/1day/${locationKey}/-10?`,config2);
  //  const airCategory = air.data;
   //console.log(air);
  for(let cat of air.data){
    console.log(cat.Category)
   const airQuality = document.getElementById('airQuality');
   const airCategory = cat.Category;
   if (airCategory === "Good") {
     airQuality.setAttribute('style','color:blue');
   }
   if (airCategory === "Excellent") {
     airQuality.setAttribute('style','color:green');
   }
   if (airCategory === "Poor") {
     airQuality.setAttribute('style','color:red');
   }
   airQuality.innerHTML = cat.Category;
  }
}

const dailyForcastGeo = async (data) => {
 

       
      const locationKey = data.Key;
      const checkday = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?`, config2);
   //   console.log(checkday.data.DailyForecasts);
        const dayCheck = checkday.data.DailyForecasts;

        for (let days of dayCheck){

         // console.log(days.Temperature);

          const dayTemp = document.getElementById('dayTemp');
          const nightTemp = document.getElementById('nightTemp');
        
          const imgDay = document.getElementById('wIconday');
        
          const imgNight = document.getElementById('wIconnight');

          const statusDay = document.getElementById('statusDay');

          const statusNight = document.getElementById('statusNight');

     
  
          const minTemp = days.Temperature.Minimum.Value;
 
          const maxTemp = days.Temperature.Maximum.Value;

          const celciusMin = ((minTemp - 32) * 5 / 9);

          const celciusMax = ((maxTemp - 32) * 5 / 9);

          const iconWday = days.Day.IconPhrase;

          if(iconWday === "Sunny") {
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/01-s.png');
          }
          if(iconWday === "Mostly sunny") {
            imgDay.setAttribute('src', ' https://developer.accuweather.com/sites/default/files/02-s.png');
          }
          if(iconWday === "Partly sunny") {
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/03-s.png');
          }
          if(iconWday === "Intermittent clouds") {
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/04-s.png');
          }
          if(iconWday === "Hazy sunshine") {
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/05-s.png');
          }
          if(iconWday === "Mostly cloudy") {
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/06-s.png');
          }
          if(iconWday === "Cloudy"){
              imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/07-s.png'); 
          }
          if(iconWday === "Dreary (Overcast)"){
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/08-s.png'); 
        }

        if(iconWday === "Fog"){
          imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/11-s.png'); 
        }
        if(iconWday === "Showers"){
          imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/12-s.png'); 
        }
        if(iconWday === "Mostly cloudy w/ Showers"){
          imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/13-s.png'); 
        }
        if(iconWday === "Partly sunny w/ showers"){
          imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/14-s.png'); 
        }
        if(iconWday === "T-Storms"){
          imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/15-s.png'); 
        }
        if(iconWday === "Mostly cloudy w/ t-Storms"){
          imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/16-s.png'); 
        }
        if(iconWday === "Partly sunny w/ t-Storms"){
          imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/17-s.png'); 
        }
        if(iconWday === "Rain"){
          imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/18-s.png'); 
        }
        if(iconWday === "Flurries"){
          imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/19-s.png'); 
        }
        if(iconWday === "Mostly cloudy w/ flurries"){
          imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/20-s.png'); 
        }
        if(iconWday === "Partly sunny w/ flurries"){
          imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/21-s.png'); 
        }
          if(iconWday === "Rain shower"){
            imgDay.setAttribute('src', './images/Rainy.png')
          }
          if(iconWday === "Thunderstorms"){
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/15-s.png')
          }
          if(iconWday === "Showers"){
              imgDay.setAttribute('src', './images/rain.png')
            }
            
            if(iconWday === "Partly cloudy"){
              imgDay.setAttribute('src', './images/clouds2.png')
          }
  
          

          dayTemp.textContent = Math.round(celciusMin) 
          document.getElementById('real').textContent = Math.round(celciusMax) + "°C" ;
          nightTemp.textContent = Math.round(celciusMax) 


          const iconWnight = days.Night.IconPhrase;

          const HasPrecipitation = days.Day.HasPrecipitation;
          if(HasPrecipitation == true){
            document.getElementById('HasPrecipitation').innerHTML = days.Day.HasPrecipitation;
            document.getElementById('PrecipitationType').innerHTML = days.Day.PrecipitationType;
            document.getElementById('PrecipitationIntensity').innerHTML = days.Day.PrecipitationIntensity;
           }else {
            document.getElementById('HasPrecipitation').innerHTML = days.Day.HasPrecipitation;
            document.getElementById('PrecipitationType').innerHTML = "none";
            document.getElementById('PrecipitationIntensity').innerHTML = "none";
          }

          if(iconWnight === "Cloudy"){
            imgNight.setAttribute('src', './images/clouds2.png'); 
          }
          if(iconWnight === "Rain shower"){
            imgNight.setAttribute('src', './images/Rainy.png')
          }
          if(iconWday === "Thunderstorms"){
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/15-s.png')
          }
          if(iconWnight === "Showers"){
              imgNight.setAttribute('src', './images/Rainy.png')
            }
            if(iconWnight === "Partly cloudy"){
              imgNight.setAttribute('src', './images/clouds2.png')
          }
          if(iconWnight === "Clear"){
            imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/33-s.png')
          }
          if(iconWnight === "Mostly clear"){
            imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/34-s.png')
          }
          if(iconWnight === "Partly cloudy"){
            imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/35-s.png')
          }
          if(iconWnight === "Intermittent clouds"){
            imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/36-s.png')
          }
          if(iconWnight === "Hazy moonlight"){
            imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/37-s.png')
          }
          if(iconWnight === "Mostly cloudy"){
            imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/38-s.png')
          }
          if(iconWnight === "Partly cloudy w/ showers"){
            imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/39-s.png')
          }
          if(iconWnight === "Mostly cloudy w/ showers"){
            imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/40-s.png')
          }
          if(iconWnight === "Partly cloudy w/ t-Storms"){
            imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/41-s.png')
          }
          if(iconWnight === "Mostly cloudy w/ t-Storms"){
            imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/42-s.png')
          }
          if(iconWnight === "Mostly cloudy w/ flurries"){
            imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/43-s.png')
          }
          if(iconWnight === "	Mostly cloudy w/ snow"){
            imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/44-s.png')
          }
          statusDay.textContent = days.Day.IconPhrase;
          statusNight.textContent = days.Night.IconPhrase;
        }
    
}

// ----------END OF Functions for GeoPosition Search

// ----------START OF Functions for City Search

const form = document.querySelector('#searchCity');
const searchCity = form.elements.q.value;

const config2 = {params: {apikey: apiKey}, headers:{}};



form.addEventListener('submit', async function(e) {
	e.preventDefault();
	 const searchTerm = form.elements.q.value;
    const config = {params: {q: searchTerm, apikey: apiKey}, headers:{}};
    const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?`, config);

    checkCity(res.data);

    dailyForcast(res.data);

    form.elements.q.value = '';		
})

const checkCity = async (data) => {
    for(let current of data){
      
            const localizedName = document.getElementById('localizedName');
            const countryCode = document.getElementById('countryCode');
            const countryID = current.AdministrativeArea.CountryID;
            localizedName.textContent = current.LocalizedName + ', '+ countryID;
      
            const locationKey = current.Key;

        if(current.Key){
           
                const checkCurrent = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?`, config2);
              
                currentWeather(checkCurrent.data);
               
        }
      }
      checkAirQuality(data);
}

const checkAirQuality = async (data) => {

  for (let datas of data) {
    const locationKey = datas.Key;
   
    const airQuality = document.getElementById('airQuality');
  
    const res = await axios.get(`http://dataservice.accuweather.com/indices/v1/daily/1day/${locationKey}/-10?`,config2);
    
    for (let cat of res.data){
     // console.log(cat.Category);
     const airCategory = cat.Category;
        if (airCategory === "Good") {
          airQuality.setAttribute('style','color:blue');
        }
        if (airCategory === "Excellent") {
          airQuality.setAttribute('style','color:green');
        }
        if (airCategory === "Poor") {
          airQuality.setAttribute('style','color:red');
        }
      airQuality.textContent = airCategory;

    }
 
  }
}

const currentWeather = async (datacurrent) => {
            const img = document.getElementById('wIcon');
            const currentTemp = document.getElementById('currentTemp');
            const status = document.getElementById('status');

            for(data of datacurrent){
                
                const iconW = data.WeatherText;
                if(iconW === "Sunny") {
                  img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/01-s.png');
                }
                if(iconW === "Mostly sunny") {
                  img.setAttribute('src', ' https://developer.accuweather.com/sites/default/files/02-s.png');
                }
                if(iconW === "Partly sunny") {
                  img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/03-s.png');
                }
                if(iconW === "Intermittent clouds") {
                  img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/04-s.png');
                }
                if(iconW === "Hazy sunshine") {
                  img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/05-s.png');
                }
                if(iconW === "Mostly cloudy") {
                  img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/06-s.png');
                }
                if(iconW === "Cloudy"){
                    img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/07-s.png'); 
                }
                if(iconW === "Dreary (Overcast)"){
                  img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/08-s.png'); 
              }
 
              if(iconW === "Fog"){
                img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/11-s.png'); 
              }
              if(iconW === "Showers"){
                img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/12-s.png'); 
              }
              if(iconW === "Mostly cloudy w/ showers"){
                img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/13-s.png'); 
              }
              if(iconW === "Partly sunny w/ showers"){
                img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/14-s.png'); 
              }
              if(iconW === "T-Storms"){
                img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/15-s.png'); 
              }
              if(iconW === "Mostly cloudy w/ t-Storms"){
                img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/16-s.png'); 
              }
              if(iconW === "Partly sunny w/ t-Storms"){
                img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/17-s.png'); 
              }
              if(iconW === "Rain"){
                img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/18-s.png'); 
              }
              if(iconW === "Flurries"){
                img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/19-s.png'); 
              }
              if(iconW === "Mostly cloudy w/ flurries"){
                img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/20-s.png'); 
              }
              if(iconW === "Partly sunny w/ flurries"){
                img.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/21-s.png'); 
              }

                if(iconW === "Rain shower"){
                    img.setAttribute('src', './images/Rainy.png')
                }
                if(iconWday === "Thunderstorms"){
                  imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/15-s.png')
                }
                if(iconW === "Partly cloudy"){
                  img.setAttribute('src', './images/clouds2.png')
              }


                const tempC = data.Temperature.Metric.Value;
                //const celciusMin = ((minTemp - 32) * 5 / 9);
                currentTemp.textContent = Math.round(tempC);

               status.textContent = data.WeatherText;  
 
            }          
}

const dailyForcast = async (data) => {
    for (let datas of data){

         
        const locationKey = datas.Key;
        const checkday = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?`, config2);
    //    console.log(checkday.data.DailyForecasts);
          const dayCheck = checkday.data.DailyForecasts;

          for (let days of dayCheck){

   //         console.log(days.Temperature);

            const dayTemp = document.getElementById('dayTemp');
            const nightTemp = document.getElementById('nightTemp');
          
            const imgDay = document.getElementById('wIconday');
          
            const imgNight = document.getElementById('wIconnight');

            const statusDay = document.getElementById('statusDay');
  
            const statusNight = document.getElementById('statusNight');

            // const dayDetails = document.getElementById('dayDetails');

            // const pTag = document.createElement('div');

            // const iconWnight = days.Night.IconPhrase;
            //console.log(days.Day.PrecipitationType);
                      const HasPrecipitation = days.Day.HasPrecipitation;
                      if(HasPrecipitation == true){
                        document.getElementById('HasPrecipitation').innerHTML = days.Day.HasPrecipitation;
                        document.getElementById('PrecipitationType').innerHTML = days.Day.PrecipitationType;
                        document.getElementById('PrecipitationIntensity').innerHTML = days.Day.PrecipitationIntensity;
                       }else {
                        document.getElementById('HasPrecipitation').innerHTML = days.Day.HasPrecipitation;
                        document.getElementById('PrecipitationType').innerHTML = "none";
                        document.getElementById('PrecipitationIntensity').innerHTML = "none";
                      }
           
    
            const minTemp = days.Temperature.Minimum.Value;
        
            const maxTemp = days.Temperature.Maximum.Value;
  
            const celciusMin = ((minTemp - 32) * 5 / 9);
  
            const celciusMax = ((maxTemp - 32) * 5 / 9);
  
            const iconWday = days.Day.IconPhrase;
  
            if(iconWday === "Sunny") {
              imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/01-s.png');
            }
            if(iconWday === "Mostly Sunny") {
              imgDay.setAttribute('src', ' https://developer.accuweather.com/sites/default/files/02-s.png');
            }
            if(iconWday === "Partly Sunny") {
              imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/03-s.png');
            }
            if(iconWday === "Intermittent clouds") {
              imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/04-s.png');
            }
            if(iconWday === "Hazy sunshine") {
              imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/05-s.png');
            }
            if(iconWday === "Mostly cloudy") {
              imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/06-s.png');
            }
            if(iconWday === "Cloudy"){
                imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/07-s.png'); 
            }
            if(iconWday === "Dreary (Overcast)"){
              imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/08-s.png'); 
          }

          if(iconWday === "Fog"){
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/11-s.png'); 
          }
          if(iconWday === "Showers"){
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/12-s.png'); 
          }
          if(iconWday === "Mostly cloudy w/ showers"){
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/13-s.png'); 
          }
          if(iconWday === "Partly sunny w/ showers"){
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/14-s.png'); 
          }
          if(iconWday === "T-Storms"){
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/15-s.png'); 
          }
          if(iconWday === "Mostly cloudy w/ t-Storms"){
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/16-s.png'); 
          }
          if(iconWday === "Partly sunny w/ t-Storms"){
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/17-s.png'); 
          }
          if(iconWday === "Rain"){
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/18-s.png'); 
          }
          if(iconWday === "Flurries"){
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/19-s.png'); 
          }
          if(iconWday === "Mostly cloudy w/ flurries"){
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/20-s.png'); 
          }
          if(iconWday === "Partly sunny w/ flurries"){
            imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/21-s.png'); 
          }
            if(iconWday === "Rain shower"){
              imgDay.setAttribute('src', './images/Rainy.png')
            }
            if(iconWday === "Thunderstorms"){
              imgDay.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/15-s.png')
            }
            if(iconWday === "Showers"){
                imgDay.setAttribute('src', './images/rain.png')
              }
              
              if(iconWday === "Partly cloudy"){
                imgDay.setAttribute('src', './images/clouds2.png')
            }



            
  
            dayTemp.textContent = Math.round(celciusMin) 
            document.getElementById('real').textContent = Math.round(celciusMax) + "°C" ;
            nightTemp.textContent = Math.round(celciusMax) 
  
  
            const iconWnight = days.Night.IconPhrase;
  
            if(iconWnight === "Cloudy"){
              imgNight.setAttribute('src', './images/clouds2.png'); 
            }
            if(iconWnight === "Rain shower"){
              imgNight.setAttribute('src', './images/Rainy.png')
            }
            if(iconWnight === "Thunderstorms"){
              imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/15-s.png')
            }
            if(iconWnight === "Showers"){
                imgNight.setAttribute('src', './images/Rainy.png')
              }
 
            if(iconWnight === "Clear"){
              imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/33-s.png')
            }
            if(iconWnight === "Mostly clear"){
              imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/34-s.png')
            }
            if(iconWnight === "Partly cloudy"){
              imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/35-s.png')
            }
            if(iconWnight === "Intermittent clouds"){
              imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/36-s.png')
            }
            if(iconWnight === "Hazy moonlight"){
              imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/37-s.png')
            }
            if(iconWnight === "Mostly cloudy"){
              imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/38-s.png')
            }
            if(iconWnight === "Partly cloudy w/ showers"){
              imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/39-s.png')
            }
            if(iconWnight === "Mostly cloudy w/ showers"){
              imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/40-s.png')
            }
            if(iconWnight === "Partly cloudy w/ t-Storms"){
              imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/41-s.png')
            }
            if(iconWnight === "Mostly cloudy w/ t-Storms"){
              imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/42-s.png')
            }
            if(iconWnight === "Mostly cloudy w/ flurries"){
              imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/43-s.png')
            }
            if(iconWnight === "	Mostly cloudy w/ snow"){
              imgNight.setAttribute('src', 'https://developer.accuweather.com/sites/default/files/44-s.png')
            }

            statusDay.textContent = days.Day.IconPhrase;
            statusNight.textContent = days.Night.IconPhrase;
          }
    }   
}
// ----------END OF Functions for City Search