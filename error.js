"use strict";
/* -------------------------------------------------------
    EXPRESSJS - ERROR MANAGEMENT
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
app.get('/', (req, res) => {
    //res.send('Hello')
    //jhatayi sistem de verebilir ben kendim de verdirebilirim
    throw new Error('Error Message')
})

app.get('/user/:id', (req, res) => {
    const id = req.params.id || 0

    try {
        if (isNaN(id)) {
            throw new Error('Id is not a number') //{ cause: 'params.id = ' + id }
        } else {
            res.send({
                message: 'Ok',
                id
            })
        }
    } catch (err) {
        res.send({

            error: true,
            message: err.message
        })

    }
    //hatayi yonettik. artik hata verdifginde json bir cevap donecek

})

//Error handler
app.get('/*', (req, res) => {
    throw new Error('Error Message')
})
const errorHandler = (err, req, res, next) => { //ozel amaca sahip bir middleware dir o yuzden enxt eklemem lazim 
    const errorStatusCode =
        res.status(500).send({

            error: true,
            message: err.message
        })

} //error handler da bir middleware dur. onu ayiran sey 4.parametre olarak error vardir
// erorr heandler her zaman en sonda olur.



app.use(errorHandler)//fonksiyonu app a bildirmem lazim
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

//npm i-express-async-errors