const currentTimeT = () => {
                //Time Script
                var time = new Date();
                //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                
                const currentTime1 = document.getElementById('currentTime');
                currentTime1.textContent = time.toLocaleString(('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
}
currentTimeT();

const apiKey = "r1mSiqCerHW8c04GI5X5UU85oFTHz792";
const apiUrl = "https://dataservice.accuweather.com/locations/v1/cities/search?q=";
const apiUrlgeoPosition = "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=";

document.body.onload = function (){
  userLocation();
};


// ----------START of Functions for GeoPosition Search
const btnLocation = document.getElementById('btnlocation');


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

          if(iconWday === "Cloudy"){
            imgDay.setAttribute('src', './images/clouds2.png'); 
          }
          if(iconWday === "Rain shower"){
            imgDay.setAttribute('src', './images/Rainy.png')
          }
          if(iconWday === "Thunderstorms"){
            imgDay.setAttribute('src', './images/thunder.png')
          }
          if(iconWday === "Showers"){
              imgDay.setAttribute('src', './images/rain.png')
            }
            if(iconWday === "Partly Cloudy"){
              imgDay.setAttribute('src', './images/clouds2.png')
          }
  
          

          dayTemp.textContent = Math.round(celciusMin) 

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
          if(iconWnight === "Thunderstorms"){
            imgNight.setAttribute('src', './images/thunder.png')
          }
          if(iconWnight === "Showers"){
              imgNight.setAttribute('src', './images/Rainy.png')
            }
            if(iconWnight === "Partly Cloudy"){
              imgNight.setAttribute('src', './images/clouds2.png')
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
}

const currentWeather = async (datacurrent) => {
            const img = document.getElementById('wIcon');
            const currentTemp = document.getElementById('currentTemp');
            const status = document.getElementById('status');

            for(data of datacurrent){
                
                const iconW = data.WeatherText;

                if(iconW === "Cloudy"){
                    img.setAttribute('src', './images/clouds2.png'); 
                }
                if(iconW === "Rain shower"){
                    img.setAttribute('src', './images/Rainy.png')
                }
                if(iconW === "Thunderstorm"){
                    img.setAttribute('src', './images/thunder.png')
                }
                if(iconW === "Partly Cloudy"){
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

            const dayDetails = document.getElementById('dayDetails');

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
  
            if(iconWday === "Cloudy"){
              imgDay.setAttribute('src', './images/clouds2.png'); 
            }
            if(iconWday === "Rain shower"){
              imgDay.setAttribute('src', './images/Rainy.png')
            }
            if(iconWday === "Thunderstorms"){
              imgDay.setAttribute('src', './images/thunder.png')
            }
            if(iconWday === "Showers"){
                imgDay.setAttribute('src', './images/rain.png')
              }
              
              if(iconWday === "Partly Cloudy"){
                imgDay.setAttribute('src', './images/clouds2.png')
            }

            
  
            dayTemp.textContent = Math.round(celciusMin) 
  
            nightTemp.textContent = Math.round(celciusMax) 
  
  
            const iconWnight = days.Night.IconPhrase;
  
            if(iconWnight === "Cloudy"){
              imgNight.setAttribute('src', './images/clouds2.png'); 
            }
            if(iconWnight === "Rain shower"){
              imgNight.setAttribute('src', './images/Rainy.png')
            }
            if(iconWnight === "Thunderstorms"){
              imgNight.setAttribute('src', './images/thunder.png')
            }
            if(iconWnight === "Showers"){
                imgNight.setAttribute('src', './images/Rainy.png')
              }
              if(iconWnight === "Partly Cloudy"){
                imgNight.setAttribute('src', './images/clouds2.png')
            }
            
            statusDay.textContent = days.Day.IconPhrase;
            statusNight.textContent = days.Night.IconPhrase;
          }
    }   
}
// ----------END OF Functions for City Search