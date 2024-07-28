let usercity = document.getElementById('usercity')
let City = document.getElementById('cityname')
let Temp = document.getElementById('temp')
let date = document.getElementById('Date')
let Condition = document.getElementById('Condition')
let wimage = document.getElementById('wimage')
let Humidity = document.getElementById('humidity')
let preciption = document.getElementById('preciption')
let windSpeed = document.getElementById('windSpeed')
let period = document.getElementById('period')


 async function Cityname(){
        if(usercity.value.trim() === ''){
            City.innerText="Please Enter City Name"
        }
        else{
            City.innerText=''
            try{
                let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${usercity.value}&appid=97e54dfec7739d50c666b338665b87d5&units=metric`)
                let data = await res.json()
                console.log(data)

                if(data.cod === '404'){
                     City.innerText="City Not Found"
                }
                else{
                    City.innerText=''
                    Dispaly(data)
                }
                
                
            }
            catch (error){
                console.log(error)
            }
        }
        
    }   
    

function GetLocation(){

    navigator.geolocation.getCurrentPosition((position)=>{
        let lat = position.coords.latitude
        let long = position.coords.longitude

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=97e54dfec7739d50c666b338665b87d5`)

        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            Dispaly(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },(error)=>{
        const {message} = error
        City.innerText = message
    })

 }

function Dispaly(api){
     
    const {name} = api
    const {humidity , temp , pressure}= api.main
    const {speed}  = api.wind
    const [{main}] = api.weather
    const{dt , timezone} = api
    City.innerText = name
    Temp.innerHTML = `${temp}°C`
    Condition.innerText = main
    Humidity.innerHTML = `Humidity: ${humidity}%`
    preciption.innerHTML = `Pressure: ${pressure}atm`
    windSpeed.innerHTML = `WindSpeed: ${speed}Km/h`

    if(main == "Haze"){
        wimage.src = 'images/haze.png'
    }
    if(main == "Clear"){
        wimage.src = 'images/sun.png'
    }
    if(main == "Snow"){
        wimage.src = 'images/snowy.png'
    }
    if(main == "Rain"){
        wimage.src = 'images/rain.png'
    }

    if(main == "Clouds"){
        wimage.src = 'images/clouds.png'
    }
    if(main == "Smoke"){
        wimage.src = 'images/carbon-dioxide.png'
    }
    if(main == "Mist"){
        wimage.src = 'images/Mist.png'
    }

    const daysOfWeek = ["Sunday" ,"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = new Date().getDay((dt + timezone) * 1000)
    date.innerText = daysOfWeek[day]
    usercity.value = ''
}



