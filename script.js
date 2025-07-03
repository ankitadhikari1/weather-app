async function getWeather(){
    const city = document.getElementById("city").value.trim();
    const resultDiv = document.getElementById("weatherResult");

    if(!city){
        resultDiv.innerHTML = "please enter the city";
        return;
    }


    const url = `http://api.weatherapi.com/v1/current.json?q=${city}`;
    const options = {
        method : 'GET',
        headers:{
            'key':'1282284c9751495c866100813250307',
            'host':'api.weatherapi.com/v1'



        }
    };


    resultDiv.innerHTML = "Fetching weather";

    try{
        const response = await fetch(url,options);
        const data = await response.json();
        if(data.error){
            resultDiv.innerHTML = `Error : {data.error.message}`;

        }else{
            const {location,current} = data;
            resultDiv.innerHTML = `
                <h2>${location.name}, ${location.country}</h2>
                <p><strong>${current.temp_c}°C</strong> - ${current.condition.text}</p>
                <img src="https:${current.condition.icon}" />
                <p>Humidity: ${current.humidity}%</p>
                <p>Wind: ${current.wind_kph} kph</p>
            `;
        }
    }catch(err){
        console.error(err);
        resultDiv.innerHTML = "An error occurred while fetching data.";
    }
}