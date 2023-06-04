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


const form = document.querySelector('#searchCity');
const searchCity = form.elements.q.value;

const config2 = {params: {apikey: apiKey}, headers:{}};

form.addEventListener('submit', async function(e) {
	e.preventDefault();
	 const searchTerm = form.elements.q.value;
    const config = {params: {q: searchTerm, apikey: apiKey}, headers:{}};
    const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?`, config);
    
    checkCity(res.data);

    
    form.elements.q.value = '';		
})

const checkCity = async (data) => {
    for(let current of data){
        console.log(current);
 
            const localizedName = document.getElementById('localizedName');
            const countryCode = document.getElementById('countryCode');
            localizedName.textContent = current.LocalizedName;
        //   countryCode.textContent = current.EnglishName;
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

                const tempC = data.Temperature.Metric.Value;
                //const celciusMin = ((minTemp - 32) * 5 / 9);
                currentTemp.textContent = Math.round(tempC);

                console.log(data);
                status.textContent = data.WeatherText;  
                // console.log(iconW);
            }          
}

const dailyForcast = async () => {
        
}