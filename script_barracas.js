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

// Achar localizacao
getLocation()
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
    const localizacao = {lat:latitude, lng:longitude}
    
    
    let options = {
        zoom:13,
        center: {lat:-22.983105686081743, lng:-43.211015324246624},
        mapTypeControl: false,
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        styles: [
            {
                "featureType": "all",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "32"
                    },
                    {
                        "lightness": "-3"
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "weight": "1.18"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-70"
                    },
                    {
                        "lightness": "14"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "100"
                    },
                    {
                        "lightness": "-14"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "lightness": "12"
                    }
                ]
            }
        ]
    }

    // Criando o mapa
    const map = new google.maps.Map(document.getElementById('map'), options);

    // Lista de Marcadores
    const marcadores = [
        {
            content: '<h2>Posto 12</h2>',
            coords:{lat:-22.98783021016635, lng:-43.225977817476455},
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        },
        {
            content: '<h2>Casa</h2>',
            coords:{lat:-22.97416497753591, lng:-43.22750406210507},
            icon: 'assets/icon/location.png' // ICONE DE 32PX
        }

    ]

    // Adicionar todos os marcadores ao mapa
    for(let i = 0; i < marcadores.length; i++){
        addMarker(marcadores[i])
    }

    function addMarker(props, title){
        let marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            content: `<h2>${title}</h2>`
        })

        // Verifica se tiver icone diferente
        if(props.icon){
            marker.setIcon(props.icon)
        }

        // Verifica se tiver conteúdo do marcador
        if(props.content){
            let infowindow = new google.maps.InfoWindow({
                content: props.content   
            });
            
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            })
        }

    }


}

