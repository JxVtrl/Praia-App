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
//                                          MAPS

// Clique do Botão
document.getElementById('abrir-mapa').addEventListener('click', function(){
    if(document.getElementById('map-container').classList.contains('hide')){
        document.getElementById('map-container').classList.remove('hide')
        document.getElementById('abrir-mapa').style.color = '#4d4d4d'
    }
    else{
        document.getElementById('map-container').classList.add('hide')
        document.getElementById('abrir-mapa').style.color = 'black'
    }
})
// Segurar Mapa


// Iniciando o Maps
function initMap(latitude, longitude) {
    var localizacao = {lat:`${latitude}`, lng:`${longitude}`}

    var options = {
        zoom:16,
        center: {lat:-22.9769216, lng:-43.2242688},
    }

    var map = new google.maps.Map(document.getElementById('map'), options);

    /*
    var marker = new google.maps.Marker({
        position: localizacao,
        map: map,
        title: 'Barracas'
    });
    */
}

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
    initMap(latitude, longitude)
}