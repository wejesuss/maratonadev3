const { Router } = require('express')
const db = require('./config/db')


const routes = Router()

routes.get("/", function (req, res) {
    const query = `SELECT * FROM donors`

    db.query(query, function (err, results) {
        if (err) throw `Database error! ${err}`

        const donors = results.rows
        return res.render('index.html', { donors })
    })

})

routes.post("/", function (req, res) {
    const { name, blood, email } = req.body

    if(name == "" || blood == "" || email == "") return res.send("Please, fill in all fields!")

    const query = `INSERT INTO donors ("name", "blood", "email")
    VALUES($1, $2, $3)`

    const values = [
        name,
        blood,
        email
    ]

    db.query(query, values, function (err) {
        if (err) throw `Database error! ${err}`

        return res.redirect("/")
    })
})

module.exports = routes