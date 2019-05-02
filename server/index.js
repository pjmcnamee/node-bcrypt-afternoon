require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')

const app = express()

app.use(express.json())

app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 365
	}
}))

massive(CONNECTION_STRING).then(db => {
	app.set('db', db)
	console.log('DB is connected')
})

//auth
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

//api and treasure
app.get('/api/treasure/dragon', treasureCtrl.dragontreasure)
app.get('/api/treasure/user', auth.usersOnly ,treasureCtrl.getUserTreasure)





app.listen(SERVER_PORT, () => console.log(`🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠🛠 `, SERVER_PORT))