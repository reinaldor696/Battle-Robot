const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const botonMascota = document.getElementById("boton-mascota")
const sectionReiniciar = document.getElementById("reiniciar")
const botonJuego = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensaje = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById("ataque-del-jugador")
const ataqueDelEnemigo = document.getElementById("ataque-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let robots = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionRobots
let inputHipodoge 
let inputCapipepo
let inputRatigueya
let robotsJugador
let robotsJugadorObjetos
let ataquesRobots
let ataquesRobotsEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./Futuristic-Arena-Animated-Battlemap.jpg"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 650

if(anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}
alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


//todas las "class" inician en mayuscula
//"contructor" se utiliza para colocar las propiedades en el objeto
//"this" hace referencia a esto mismo dentro de la misma clase 

class BattleRobot {
    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80 
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)   
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa  
        this.velocidadX = 0
        this.velocidadY = 0 
    }

    pintarRobots() {
    lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
    )}
}

//new hace referencia a un nuevo objeto que hace referencia a un nuevo objeto de la clase existente
let SolarWeasel = new BattleRobot("Solar-Weasel", "./descarga-removebg-preview.png", 5, "./descarga-removebg-preview.png")

let DjinnSlayer = new BattleRobot("Djinn-Slayer", "./descarga__1_-removebg-preview.png", 5, "./descarga__1_-removebg-preview.png")

let JigsawOX = new BattleRobot("Jigsaw-OX", "./Twitter-removebg-preview.png", 5, "./Twitter-removebg-preview.png")

let SolarWeaselEnemigo = new BattleRobot("Solar-Weasel", "./descarga-removebg-preview-enemigo.png", 5, "./descarga-removebg-preview-enemigo.png")

let DjinnSlayerEnemigo = new BattleRobot("Djinn-Slayer", "./descarga__1_-removebg-preview -enemigo.png", 5, "./descarga__1_-removebg-preview -enemigo.png")

let JigsawOXEnemigo = new BattleRobot("Jigsaw-OX", "./Twitter-removebg-preview-enemigo.png", 5, "./Twitter-removebg-preview-enemigo.png")



SolarWeasel.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "⚡", id: "boton-tierra"},
)

SolarWeaselEnemigo.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "⚡", id: "boton-tierra"},
)

DjinnSlayer.ataques.push(
    {nombre: "⚡", id: "boton-tierra"},
    {nombre: "⚡", id: "boton-tierra"},
    {nombre: "⚡", id: "boton-tierra"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
)

DjinnSlayerEnemigo.ataques.push(
    {nombre: "⚡", id: "boton-tierra"},
    {nombre: "⚡", id: "boton-tierra"},
    {nombre: "⚡", id: "boton-tierra"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
)

JigsawOX.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "⚡", id: "boton-tierra"},
)

JigsawOXEnemigo.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "⚡", id: "boton-tierra"},
)

robots.push(SolarWeasel, DjinnSlayer, JigsawOX)

//agregamos la funcion de iniciar juego
//creamos una variable para boton dentro de la funcion
//utilizamos"document" y ".get-element" para buscar el id del boton

function iniciarJuego () {

    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    //"foreach" es la forma que se puede iterar por cuantos array existan
    //por cada elemento que existe en el arreglo genera esa estructura de html e inyectala
    //utilizamos "`" comilla invertida para identificar lo que se imprimira en el html

    robots.forEach((robots) => {
        opcionRobots = `
        <input type="radio" name="mascota" id=${robots.nombre} />
        <label class="tarjeta-de-mokepon" for=${robots.nombre}>
            <p>${robots.nombre}</p>
            <img src=${robots.foto} alt=${robots.nombre}>
        </label>
        `
    //usamos la variable contenedor para identificar e imprimir el div de "seleccionarMascota"
    //inyectamos la "opcionRobot" dentro de la estructura     
    contenedorTarjetas.innerHTML += opcionRobots

    inputHipodoge = document.getElementById("Solar-Weasel")
    inputCapipepo = document.getElementById("Djinn-Slayer")
    inputRatigueya = document.getElementById("Jigsaw-OX")
    
    })

    sectionReiniciar.style.display = "none"

    //agregamos ".addeventlistener" para escuchar el evento de click
    //no solo agregamos click sino la funcion a realizar

    botonMascota.addEventListener("click", seleccionarMascotaJugador)

   

    botonJuego.addEventListener("click", reiniciarJuego)

    unirseAlJuego()

}

function unirseAlJuego() {
    //fetch nos permite hacer llamadas a otros servicios por medio http
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

//agregamos seleccionar mascota
function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = "none"

    
    //utilizamos condicional "if" "else", creamos variable "inputHipodoge" 
    //el input->"document.getElementById" y el get para ubicar "id=hipodoge"
    // y mandamos a chequear con checked para saber si es valido
    // si es valido se ejecuta el bloque
    //si no continua con la siguiente funcion
    //el "innerhtml" nos ayuda a dominar el dom en html y asignar dom a los "<span>"

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        robotsJugador = inputHipodoge.id    
    } else if(inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        robotsJugador = inputCapipepo.id
    } else if(inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        robotsJugador = inputRatigueya.id   
    } else {
        alert("DEBES SELECCIONAR UN ROBOT")
    }

    seleccionarRobot(robotsJugador)

    extraerAtaques(robotsJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
    
} 

function seleccionarRobot(robotsJugador){
    fetch(`http://localhost:8080/battleRobots/${jugadorId}` , {
        method: "post",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            battleRobots: robotsJugador
        })
    })
}

function extraerAtaques(robotsJugador) {
    let ataques
    for (let i = 0; i < robots.length; i++) {
        if (robotsJugador === robots[i].nombre) {
            ataques = robots[i].ataques
            
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataques) => {
        ataquesRobots = `
        <label class="ataque-fuego">
            <button id=${ataques.id} class="boton-de-ataque BAtaques">${ataques.nombre}</button>
        </label>
        `

    contenedorAtaques.innerHTML += ataquesRobots
    })

    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    //querySelectorAll es para seleccionar todos los elemento que tengan algo
    //selecciona todos los elementos que compartan una clase
    //no se utiliza el id porque el id no puede repetirse(es mala practica)
    botones = document.querySelectorAll(".BAtaques")

}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) =>{
            if(e.target.textContent === "🔥") {
                ataqueJugador.push("🔥")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("💧")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("⚡")
                console.log(ataqueJugador)
                boton.style.background = "#112f58" 
                boton.disabled = true
            }
            ataqueAleatorioEnemigo() 
        })
    })    
    
}

function seleccionarMascotaEnemigo (enemigo){  
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesRobotsEnemigo = enemigo.ataques
    secuenciaAtaque()
    
}



function ataqueAleatorioEnemigo() {
    console.log('Ataques enemigo', ataquesRobotsEnemigo);
    let ataqueAleatorio = aleatorio(0, ataquesRobotsEnemigo.length -1)

    if(ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("🔥")
    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("💧")
    } else { 
        ataqueEnemigo.push("⚡")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensajes("TIE")                   
        }else if(ataqueJugador[index] === "🔥" && ataqueEnemigo[index] === "⚡") {
            indexAmbosOponente(index, index)
            crearMensajes("WIN")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador     
        }else if(ataqueJugador[index] === "💧" && ataqueEnemigo[index] === "🔥") {
            indexAmbosOponente(index, index)
            crearMensajes("WIN")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador   
        }else if(ataqueJugador[index] === "⚡" && ataqueEnemigo[index] === "💧") {
            indexAmbosOponente(index, index)
            crearMensajes("WIN")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador   
        }else {
            indexAmbosOponente(index, index)
            crearMensajes("LOSE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        
    }
    
    
    revisarVidas() 
}

function revisarVidas(){
    if(victoriasJugador === victoriasEnemigo) {
        crearMensajesFinal("THIS IS A TIE")    
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajesFinal("YOU WIN🏆")
    }else {
        crearMensajesFinal("YOU LOSE⚰️")
    }
}

function crearMensajes(resultado) {
    
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")
    
    sectionMensaje.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajesFinal(resultadoFinal) {
    
    sectionMensaje.innerHTML = resultadoFinal

    //colocamos los botones disabled para que se desactiven al terminar la partida
        
    sectionReiniciar.style.display = "block" 
}

function reiniciarJuego(){
//location.reload es una funcion que nos permite reiniciar la pagina html
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) +min)
}

function pintarCanvas() {
    robotsJugadorObjetos.x = robotsJugadorObjetos.x + robotsJugadorObjetos.velocidadX
    robotsJugadorObjetos.y = robotsJugadorObjetos.y + robotsJugadorObjetos.velocidadY
    //la funcion clearrect() limpia el canva
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
        
    robotsJugadorObjetos.pintarRobots()

    enviarPosicion(robotsJugadorObjetos.x, robotsJugadorObjetos.y)

    SolarWeaselEnemigo.pintarRobots()
    DjinnSlayerEnemigo.pintarRobots()
    JigsawOXEnemigo.pintarRobots()

    if(robotsJugadorObjetos.velocidadX !== 0 || robotsJugadorObjetos.velocidadY !== 0) {
        revisarColision(SolarWeaselEnemigo)
        revisarColision(DjinnSlayerEnemigo)
        revisarColision(JigsawOXEnemigo)
    }
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/battleRobots/${jugadorId}/posicion` , {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
}

function moverArriba() {
    robotsJugadorObjetos.velocidadY = -5
}

function moverIzquierda() {
    robotsJugadorObjetos.velocidadX = -5
}

function moverAbajo() {
    robotsJugadorObjetos.velocidadY = 5
}

function moverDerecha() {
    robotsJugadorObjetos.velocidadX = 5   
}

function detenerMoviento() {
    robotsJugadorObjetos.velocidadX = 0
    robotsJugadorObjetos.velocidadY = 0
}

//cuando usamos eventlistener muchas veces regresa un evento
function sePresionoUnaTecla(event) {
    //switchcase es una manera de hacer varios condicionales if juntos
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            //switch compara una a una las condiciones y break es para ejecutar la accion
            break
        case "ArrowDown":
            moverAbajo()
            break    
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break 
        //el default es por si no entra en los casos anteriores       
        default:
            break
    }
}

function iniciarMapa() {
    
    robotsJugadorObjetos = obtenerObjetoRobot(robotsJugador)

    //interval es la funcion que va llamando una funcion constantemente esperando un poco de tiempo
    //ponemos 50 porque es el tiempo en milisegundos para ejecutar esa accion
    intervalo = setInterval(pintarCanvas, 50)
    
    //el evento keydown se ejecuta cuando se presiona una tecla
    window.addEventListener("keydown", sePresionoUnaTecla)
    
    //el evento keyup deja de funcionar cuando se suelta una tecla
    window.addEventListener("keyup", detenerMoviento)
}

function obtenerObjetoRobot() {
    for (let i = 0; i < robots.length; i++) {
        if (robotsJugador === robots[i].nombre) {
            return robots[i]
            
        }
        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = 
        enemigo.y
    const abajoEnemigo = 
        enemigo.y + enemigo.alto
    const derechaEnemigo = 
        enemigo.x + enemigo.ancho
    const izquierdaEnemigo = 
        enemigo.x

    const arribaRobot = 
        robotsJugadorObjetos.y
    const abajoRobot = 
        robotsJugadorObjetos.y + robotsJugadorObjetos.alto
    const derechaRobot = 
        robotsJugadorObjetos.x + robotsJugadorObjetos.ancho
    const izquierdaRobot = 
        robotsJugadorObjetos.x

    if(
        abajoRobot < arribaEnemigo ||
        arribaRobot > abajoEnemigo ||
        derechaRobot < izquierdaEnemigo ||
        izquierdaRobot > derechaEnemigo
    ) {
        return
    }
    detenerMoviento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}

//llamamos a la funcion de "addevenlistener" para que pueda funcionar el boton
//lo llamamos desde window para escuche cualquier evento que suceda en el navegador
//no solo agregamos load sino la funcion a realizar

window.addEventListener("load" , iniciarJuego)
