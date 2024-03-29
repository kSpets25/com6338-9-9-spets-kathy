
const URL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q="
const weatherDiv = document.getElementById('weather')
const form = document.querySelector('form')

console.log("start")

    form.onsubmit = async function(e) {
    e.preventDefault()
    const userQuery = this.search.value.trim();
    console.log("this", this)
    
    const APIKey = "8907802964041b9d0da4e362e4a9789c";
    console.log (URL,userQuery,APIKey)
    try{
    const res = await fetch(URL + userQuery + "&appid=" + APIKey)  
        if (res.status !== 200) {
        form.search.value = ""
        throw new Error('Location not found')
        } 
        const weatherData = await res.json()
        renderData(weatherData)
    } catch(err) {
        weatherDiv.innerHTML = err.message  
}       
}
    
const renderData = data => {
    const {name} = data
    const {country} = data.sys
    const {lat} = data.coord
    const {lon} = data.coord
    const {icon} = data.weather[0]
    const {description} = data.weather[0]
    const {temp} = data.main
    const {feels_like} = data.main
    const {dt} = data.dt
    const date = new Date(data.dt * 1000)
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })
    
    form.search.value = ""
    weatherDiv.innerHTML = `<h2>${name}, ${country}</h2>
    <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}">click to view map</a>
    <img src=https://openweathermap.org/img/wn/${icon}@2x.png>
    <p>${description.toUpperCase()}</p><br>
    <p>Current: ${temp} °F</p>
    <p>Feels like: ${feels_like} °F</p><br>
    <p>Last Updated: ${timeString}</p>`

}
   