const currentTimeT = () => {
                //Time Script
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const currentTime1 = document.getElementById('currentTime');
                currentTime1.textContent = time;
}
currentTimeT();

const apiKey = "r1mSiqCerHW8c04GI5X5UU85oFTHz792";
const apiUrl = "http://dataservice.accuweather.com/locations/v1/cities/search?q=Bansalan";

const form = document.querySelector('#searchCity');
const searchCity = form.elements.q.value;

// async function checkWeather() {
//     const response = await fetch(apiUrl  + `&apikey=${apiKey}`);
//     var data = response.json();

//     document.getElementById('localizedName').innerHTML = data.LocalizedName;
 

 
//     // document.getElementById('countryID').innerHTML = data.Country.ID;

//    console.log(data.LocalizedName);
// }

// checkWeather();























































// form.addEventListener('submit', async function(e) {
// 	e.preventDefault();
// 	const searchTerm = form.elements.q.value;
//     const response = await fetch(apiUrl + searchTerm + `&apikey=${apiKey}`);
//     var data = response.json();

//     //currentWeather(data);
//     console.log(data);
//     form.elements.q.value = '';		
// })

// const currentWeather = async (data) => {
//     for(let current of data){
//         console.log(current);
//         // if (current.EnglishName) {
            


//         //     //current Weather script
//         //     // const cure = document.getElementById('currentWeather');
//         //     const localizedName = document.getElementById('localizedName');
//         //     const countryCode = document.getElementById('countryCode');
//         //     localizedName.textContent = current.LocalizedName;

//         // }
//     }
// }
