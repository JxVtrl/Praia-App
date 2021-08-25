/////////////////////////////////////////////////////////////////////////////////////////
//                                          TEMPO

// Tempo Agora
tempo()
setInterval(tempo, 1000)
var horaAtual
function tempo(){
    const dataAtual     = new Date()
    horaAtual           = dataAtual.getHours()
    const minutoAtual   = dataAtual.getMinutes()
    
    const hora_inner    = document.getElementById('horas')
    const minuto_inner  = document.getElementById('minutos')
    hora_inner.innerHTML    = formatHora(horaAtual)
    minuto_inner.innerHTML  = formatHora(minutoAtual)
}

function formatHora(hora){
    if(hora < 10){
        hora = '0' + hora
    }
    return hora
}

/////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////
//                                          API


getLocation()
// Achar localizacao
function getLocation(){
    navigator.geolocation.getCurrentPosition(findLocation, showError, {enableHighAccuracy:true,maximumAge:600000})
}


function showError(error) {
    alert(error.code + ' ' + error.message);
}

function findLocation(position){
    const latitude  = position.coords.latitude
    const longitude = position.coords.longitude
    
    getCity(latitude, longitude)
}

// Achar cidade API Google 
async function getCity(latitude, longitude){
    const cidade_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCosb0MEIu5QMg8UhvUt0atgr5P90PSae8`
    let response = await fetch(cidade_URL)
    let json = await response.json()
    console.log(json)
   
    const cidade = json.results[0].address_components[3].long_name
    const cidade_inner = document.getElementById('cidade')
    cidade_inner.innerHTML = formatText(cidade)
    getTempo(cidade)
}
// teste polypane
//getTempo(cidade)

// Achar tempo
async function getTempo(cidade){
    //let tempo_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt&appid=1124b498fe4c4e132eb3c4c95318b70a`

    let tempo_URL = `https://api.openweathermap.org/data/2.5/weather?q=Rio%20de%20Janeiro&lang=pt&appid=1124b498fe4c4e132eb3c4c95318b70a`

    let response = await fetch(tempo_URL)
    let json = await response.json()

    console.log(json)

    imprimeTempoAtual(json)
    imprimeTemp(json)
    imprimePressao(json)
    imprimeVento(json)
    imprimeSensacao(json)
    imprimeSol(json)
    imprimeUmidade(json)
}

// GOOGLE MAPS

/////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////
//                                          EVENTOS

// Temperatura
function imprimeTemp(data){
    const temp_atual = document.getElementById('temp-atual')
    const temp_minima = document.getElementById('temp-minima')
    const temp_maxima = document.getElementById('temp-maxima')

    temp_atual.innerHTML = formatTemperatura(data.main.temp)
    temp_minima.innerHTML = formatTemperatura(data.main.temp_min)
    temp_maxima.innerHTML = formatTemperatura(data.main.temp_max)
}
//
function formatTemperatura(temp){
    return Math.round(Number(temp) - 273.15)
}


// Pressão
function imprimePressao(data){
    const pressao_inner = document.getElementById('pressao')

    const pressao = data.main.pressure
    pressao_inner.innerHTML = pressao
}


// Vento
function imprimeVento(data){
    const vento_velo_inner = document.getElementById('vento-velo')
    
    vento_velo_inner.innerHTML = formatVelocidade(data.wind.speed)
}
//
function formatVelocidade(velo){
    return Math.round(Number(velo) * 3.6)
}


// Sensação
function imprimeSensacao(data){
    const sensacao_inner = document.getElementById('sensacao')

    sensacao_inner.innerHTML = formatTemperatura(data.main.feels_like)
}


// Sol
function imprimeSol(data){
    const nascer_hora_inner = document.getElementById('nascer-sol-hora')
    const nascer_minuto_inner = document.getElementById('nascer-sol-minuto')

    const por_hora_inner = document.getElementById('por-sol-hora')
    const por_minuto_inner = document.getElementById('por-sol-minuto')

    const nascer = data.sys.sunrise
    const por = data.sys.sunset

    let nascer_minutes = Math.floor((nascer /  60) % 60)
    let nascer_hours = (Math.floor((nascer / 3600) % 24)) -3
    if(nascer_hours < 10) nascer_hours = '0' + nascer_hours
    if(nascer_minutes < 10) nascer_minutes = '0' + nascer_minutes

    nascer_minuto_inner.innerHTML = nascer_minutes
    nascer_hora_inner.innerHTML = nascer_hours


    let por_minutes = Math.floor((por /  60) % 60)
    let por_hours = (Math.floor((por / 3600) % 24)) - 3
    if (por_minutes < 10) por_minutes = '0' + por_minutes
    if (por_hours < 10) por_hours = '0' + por_hours

    por_minuto_inner.innerHTML = por_minutes
    por_hora_inner.innerHTML = por_hours
}


// Umidade
function imprimeUmidade(data){
    const umidade_inner = document.getElementById('umidade')

    const umidade = data.main.humidity
    umidade_inner.innerHTML = umidade
}


var tempoAgora
// Tempo Atual
function imprimeTempoAtual(data){
    const tempo_inner = document.getElementById('descricao-tempo')
    const bomdia = document.getElementById('bomdia')
    
    let tempo = data.weather[0].description
    tempo_inner.innerHTML = formatText(tempo) 
    
    tempoAgora = new Date()

    if(horaAtual > 6 && horaAtual < 12) bomdia.innerHTML = 'Bom dia,'
    if(horaAtual > 12 && horaAtual < 18) bomdia.innerHTML = 'Boa tarde,'
    if(horaAtual > 18 && horaAtual < 24) bomdia.innerHTML = 'Boa noite,'
    
    imprimeIconeTempo(tempo, horas)
}
//
function formatText(texto){
    return texto[0].toUpperCase() + texto.slice(1)
}


// Icone do tempo EM PROGRESSO
function imprimeIconeTempo(tempo, horas){
    const icone = document.getElementById('icone-tempo-container')
    switch(tempo){
        case 'céu limpo':
            if(horas > 6 && horas < 18) icone.innerHTML = `<ion-icon class="icone-tempo" name="sunny-sharp"></ion-icon>`
            else icone.innerHTML = `<ion-icon class="icone-tempo" name="moon-sharp"></ion-icon>`
            break
        case 'nublado':
            icone.innerHTML = `<ion-icon class="icone-tempo" name="cloud-sharp"></ion-icon>`
            break
        
    }
}


