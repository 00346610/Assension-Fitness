
///function
///get values
///calculate
///output
///bmi formula  weight/height(square)*703


document.querySelectorAll('.slider-nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});






function calculateBMI(){
    let weight = parseFloat(document.getElementById("weight").value);
    let heightFeet = parseFloat(document.getElementById("heightFeet").value);
    let heightInches= parseFloat(document.getElementById("heightInches").value);
    
    
    let totalHeight=(heightFeet*12)+heightInches;
    
    let bmi = (weight/(totalHeight* totalHeight))*703;
    

    document.getElementById('heading').innerHTML ='Your BMI is:'
    document.getElementById('bmi-output').innerHTML= bmi.toFixed(1);

   if(bmi<=24.9){
    document.getElementById('message').innerHTML='You are underweight we have to put some work in!!!'
   }else if (bmi >= 25 && bmi<= 29.9){
    document.getElementById('message').innerHTML='You are at a Healthy weight! Keep up the good work!!'
   }else{
    document.getElementById('message').innerHTML='You are overweight we have some work to do!!!'
   }
}  


function reload(){
    window.location.reload()
}



function formatTime24to12(hour24) {
    let hours = parseInt(hour24, 10);
    let minutes = '00'; // Assuming you don't need minutes or can parse from the Date object
    let period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes.padStart(2, '0'); // Ensure minutes are two digits

    return `${hours}:${minutes} ${period}`;
}








function getWeather(){
        const apiKey=`6a219000d00eecf61768bf74530b06d7`;
        const city=document.getElementById('city').value;

    if (!city){
        alert('Please enter a city');
        return;
    }
 
    ////Ensures city names with spaces or special characters are handled correctly.
    const encodedCity = encodeURIComponent(city);
    ////////////////////////////////////////////////////

    const currentWeatherUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
            displayWeather(data);
    })
    .catch(error => {
        console.error('Error fetching current weather data: ',error);
                alert('Error fetching current weather data. Please try again.');
    });

    fetch(forecastUrl)
    .then(response=> response.json())
    .then(data=>{
            displayHourlyForecast(data.list);
    })
    .catch(error=>{
        console.error('Error fetching current weather data: ',error);
                alert('Error fetching current weather data. Please try again.');
    });

}

function displayWeather(data){
    const tempDivInfo= document.getElementById('temp-div');
    const weatherInfoDiv= document.getElementById('weather-info');
    const weatherIcon= document.getElementById('weather-icon');
    const hourlyForecastDiv= document.getElementById('hourly-forecast');

    ///clear previous content
    weatherInfoDiv.innerHTML='';
    tempDivInfo.innerHTML='';
   

    if(data.cod==='404'){
        weatherInfoDiv.innerHTML=`<p>${data.message}</p>`;
    }else{
        const cityName = data.name;
        const temperature = Math.round((data.main.temp-273.15)*9/5+32);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML= `<p>${temperature} Fahrenheit</p>`;
        const weatherHTML= `<p>${cityName}</p> <p>${description}</p>`;


        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;

        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        

         showImage();

        
         
         let optimalWeather=false;
         if(temperature > 38 && temperature < 49) {
             optimalWeather=true;
           }
     
           const opHTML = `<p>${optimalWeather ? 'Optimal running weather' : 'Suboptimal running weather'}</p>`;
           weatherInfoDiv.innerHTML += opHTML;
        }
    }

function displayHourlyForecast(hourlyData){
 

        const hourlyForecastDiv = document.getElementById('hourly-forecast');
        const next24Hours= hourlyData.slice(0,8);




        hourlyForecastDiv.innerHTML = '';


        next24Hours.forEach(item=>{
                const dataTime = new Date(item.dt*1000);
                const hour24= dataTime.getHours();
                const temperature = Math.round((item.main.temp-273.15)*9/5+32);
                const iconCode = item.weather[0].icon;
                const iconUrl= `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

                const hour12 = formatTime24to12(hour24);


                const hourlyItemHtml=`
                <div class="hourly-item">
                <span>${hour12}</span>
                <img src="${iconUrl}" alt="Hourly weather Icon">
                <span> ${temperature} F  </span></div>
                ` ;

            hourlyForecastDiv.innerHTML += hourlyItemHtml;

   
       
});

}


function showImage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display='block';
}