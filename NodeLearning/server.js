const express = require("express")

const bodyParser = require("body-parser")

const adminData = require('./routes/admin')
const routeShop = require('./routes/shop')
const { join } = require("path")


const app = express()

app.set('view engine', 'pug');
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(join(__dirname, 'public')))

app.use('/admin', adminData.routes)
app.use(routeShop)

app.use((req, res, next) =>{
    res.status(404).sendFile(join(__dirname, 'views', '404.html'))
})

app.listen(3000)