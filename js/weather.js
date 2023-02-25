const APP_ID = '816d7291d846bce0ac4edb11f6945c12'
const weather = document.querySelector('.weather')

function getWeather(lat, lon){
    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=metric`;
    
    fetch(url)
        .then(res => res.json())
        .then(function(data){
            const name = data.name
            const temp = data.main.temp

            weather.innerText = `${data.main.temp}°C ${data.name}`
        })
}

function saveCoords(coords){
    localStorage.setItem('coords', JSON.stringify(coords))
}

function loadCoords(){
    const localCoords = localStorage.getItem('coords')
    
    if(localCoords === null){
        askCoords()
    }else{
        const parseCoords = JSON.parse(localCoords)
        getWeather(loadCoords.latitude, localCoords.longitude)
    }
}

function geoSucces(position){
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    
    const coords={
        latitude: lat,
        longitude: lon
    }

    saveCoords(coords)
    getWeather(lat, lon)
}

function geoError(){
    console.log('위치 정보를 허용하지 않았습니다.');
}

function askCoords(){
    navigator.geolocation.getCurrentPosition(geoSucces, geoError);
}

function init(){
    askCoords()
}

init()