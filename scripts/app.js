const cityForm = document.querySelector('form')
const cards = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')
const forecast = new Forecast()

const updateUI = (data) => {

    // const cityDetails = data.cityDetails
    // const weather = data.weather

    // Destructure properties
    const { cityDetails, weather } = data

    // Update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `

    // Update the night/day & icon images
    const iconsSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconsSrc)

    let timeSrc= weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'

    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg'
    // } else{
    //     timeSrc = 'img/night.svg'
    // }
    time.setAttribute('src', timeSrc)

    // Remove d-none class if present
    if(cards.classList.contains('d-none')){
        cards.classList.remove('d-none')
    }

}

cityForm.addEventListener('submit', e => {
    // Prevent default action
    e.preventDefault()

    // Get city value
    const city = cityForm.city.value.trim()
    cityForm.reset()

    // Update Ui with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err))

    // Set local storage
    localStorage.setItem('city', city)
})

// Update UI if any city consist on local storage 
if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err))
}