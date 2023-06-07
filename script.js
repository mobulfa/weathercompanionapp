const currentTimeT = () => {
                //Time Script
                var time = new Date();
                //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                
                const currentTime1 = document.getElementById('currentTime');
                currentTime1.textContent = time.toLocaleString(('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
}
currentTimeT();

const apiKey = "r1mSiqCerHW8c04GI5X5UU85oFTHz792";
const apiUrl = "http://dataservice.accuweather.com/locations/v1/cities/search?q=";
const apiUrlgeoPosition = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=";




const form = document.querySelector('#searchCity');
const searchCity = form.elements.q.value;

const config2 = {params: {apikey: apiKey}, headers:{}};



form.addEventListener('submit', async function(e) {
	e.preventDefault();
	 const searchTerm = form.elements.q.value;
    const config = {params: {q: searchTerm, apikey: apiKey}, headers:{}};
    const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?`, config);

    checkCity(res.data);

    dailyForcast(res.data);
    

    
    form.elements.q.value = '';		
})

const checkCity = async (data) => {
    for(let current of data){
        //  console.log(current.AdministrativeArea.CountryID);
 
            const localizedName = document.getElementById('localizedName');
            const countryCode = document.getElementById('countryCode');
            const countryID = current.AdministrativeArea.CountryID;
            localizedName.textContent = current.LocalizedName + ', '+ countryID;
        //    countryCode.textContent = countryID;
            const locationKey = current.Key;

        if(current.Key){
           
                const checkCurrent = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?`, config2);
                // console.log(checkCurrent).data;
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

                // console.log(data);
                status.textContent = data.WeatherText;  
                // console.log(iconW);

           
                //  console.log(checkday.data);
                // dailyForcast(checkday.data);
            }          
}

const dailyForcast = async (data) => {
    for (let datas of data){

         
        const locationKey = datas.Key;
        const checkday = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?`, config2);
        console.log(checkday.data.DailyForecasts);
          const dayCheck = checkday.data.DailyForecasts;

          for (let days of dayCheck){

            console.log(days.Temperature);

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
            
            statusDay.textContent = days.Day.IconPhrase;
            statusNight.textContent = days.Night.IconPhrase;
          }

    }   
}