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


const lista_marcadores = document.getElementById('lista-barracas')
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

    if(!lista_marcadores.innerHTML == ''){
        lista_marcadores.innerHTML = ''
    }
    initMap()
})



// Iniciando o Maps
function initMap(coord) {
    let initialCoord = {lat:-22.983105686081743, lng:-43.211015324246624}
    let zoom = 13

    if(coord){
        initialCoord.lat = coord[0]
        initialCoord.lng = coord[1]
        zoom = 14
    }

    // Opcoes do Mapa
    let options = {
        zoom: zoom,
        center: initialCoord,
        mapTypeControl: false,
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true,
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
            nome: 'Posto 12',
            numero: 'P12',
            content: '<h2>Posto 12</h2>',
            coords:{lat:-22.98783021016635, lng:-43.225977817476455},
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        },
        {
            nome: 'Casa',
            content: '<h2>Casa</h2>',
            coords:{lat:-22.97416497753591, lng:-43.22750406210507},
            icon: 'assets/icon/location.png' // ICONE DE 32PX
        },
        {
            nome: 'Barraca do Carlin',
            numero: '24',
            content: '<h2>Carlins</h2>',
            coords:{lat:-22.98838140762506, lng:-43.22638630323435},
        },

    ]

    // Adicionar todos os marcadores ao mapa
    for(let i = 0; i < marcadores.length; i++){
        addMarker(marcadores[i])
    }

    function addMarker(props){
        let marker = new google.maps.Marker({
            position: props.coords,
            map: map,
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

        //Verifica se numero é undefined
        if(!props.numero){
            props.numero = '-'
        }

        // Adiciona o marcador na lista
        lista_marcadores.innerHTML += `
            <li class="item_lista" id="${props.nome}">
                <span class="numero_marcador">${props.numero}</span>
                <span class="nome_marcador">${props.nome}</span>
                <div class="info-go ${props.nome}" class="">
                    <ion-icon id="${props.numero}" name="ellipse-sharp" class="online"></ion-icon>
                    <ion-icon name="chevron-forward-sharp"></ion-icon>
                </div>
            </li>`
    }

    // Centralizar o mapa na posição do marcador ao ser clicado
    document.querySelectorAll('.item_lista').forEach(item => {
        item.addEventListener('click', function(event){
            let lat, lng
            event.preventDefault()
            console.log(event.target)
            for(let i = 0; i < marcadores.length; i++){
                // Centralizar ao clicar no nome do marcador
                if(marcadores[i].nome == event.target.innerHTML){
                    let numeroObjeto = i
                    lat = marcadores[numeroObjeto].coords.lat
                    lng = marcadores[numeroObjeto].coords.lng
                }
                // Centralizar ao clicar no numero do marcador
                else if(marcadores[i].numero == event.target.innerHTML){
                    let numeroObjeto = i
                    lat = marcadores[numeroObjeto].coords.lat
                    lng = marcadores[numeroObjeto].coords.lng
                }
                // Centralizar ao clicar no item da lista
                else if(marcadores[i].nome == event.target.class){
                    let numeroObjeto = i
                    lat = marcadores[numeroObjeto].coords.lat
                    lng = marcadores[numeroObjeto].coords.lng
                }
                // Centralizar ao clicar no item da lista
                else if(marcadores[i].nome == event.target.id){
                    let numeroObjeto = i
                    lat = marcadores[numeroObjeto].coords.lat
                    lng = marcadores[numeroObjeto].coords.lng
                }
                // Centralizar ao clicar no item da lista
                else if(marcadores[i].numero == event.target.id){
                    let numeroObjeto = i
                    lat = marcadores[numeroObjeto].coords.lat
                    lng = marcadores[numeroObjeto].coords.lng
                }

            }
            let coord = [lat, lng, 15]
            
            if(document.getElementById('map-container').classList.contains('hide')){
                document.getElementById('map-container').classList.remove('hide')
                document.getElementById('abrir-mapa').style.color = '#4d4d4d'
            }
            
            if(!lista_marcadores.innerHTML == ''){
                lista_marcadores.innerHTML = ''
            }
            initMap(coord)
        })
    })
}

