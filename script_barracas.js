/////////////////////////////////////////////////////////////////////////////////////////
//                                          TEMPO

// Tempo Agora
tempo()
setInterval(tempo, 1000)

function tempo(){
    const dataAtual     = new Date()
    const horaAtual     = dataAtual.getHours()
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