//importamos node.js para utilizarlo en el proyecto
const express = require("express")

const cors = require("cors")

//creamos una aplicacion con express.js
const app = express()

app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador {
    constructor(id) {
    this.id = id
    }

    asignarRobot(battleRobots){
        this.battleRobots = battleRobots
    }

    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }
}

class BattleRobots {
    constructor(nombre) {
        this.nombre = nombre
    }
}

//decimos express.js que cuando la url reciba una peticion responda hola
app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")
    
    res.send(id)

})

app.post("/battleRobots/:jugadorId" , (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.battleRobots || ""
    const battleRobots = new BattleRobots(nombre)
    

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarRobot(battleRobots)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
    
})

app.post("/battleRobots/:jugadorId/posicion" , (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

//que escuche continuamente en el puerto 8080 peticiones de los cliente para que siempre responda
app.listen(8080, ()=> {
    console.log("servidor funcionando")
})