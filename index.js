//importar npm's
const express = require('express')
const app = express()
const agentes = require('./data/agentes')
const jwt = require('jsonwebtoken')
//disponibilizar carpeta data
app.use(express.static('data'))
//password del signature.
const secretKey = 'Mi llave secreta'
//ruta para asignar un token con JWT con los usuarios del array. Se guardará el token en el session storage con un tiempo de expiración de dos minutos
app.get('/SignIn', (req, res) => {
    const { email, password } = req.query
    const agente = agentes.find((a) => a.email == email && a.password == password);
    if (agente) {
        const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 120, data: agente, }, secretKey);
        res.send(`<h1>Bienvenid@ agente ${email}</h1>
        <a href="/agenda?token=${token}"><p>Revisar su agenda del día</p></a>
        <script>sessionStorage.setItem('token', JSON.stringify('${token}'))</script>`)
    } else {
        res.send('se ha detectado un intento de infiltración en nuestra base de datos...sus datos están siendo rastreados...(🥲)')
    }
})
//disponibilizar ruta restringida para los usuarios autorizados. En caso contrario devolver mensaje de error y su descripcion (estado HTTP)
app.get('/agenda', (req, res) => {
    const { token }= req.query
    jwt.verify(token, secretKey, (err, decoded) => {
        err
            ? res.status(401).send({
                error: '401 Unauthorized',
                message: 'no está autorizado a acceder a esta página'
            })
            : res.send(`Bienvenid@ agente ${decoded.data.email} a su agenda del día...`)
    })
})
app.listen(3000,()=>console.log('server ON and working OK'))