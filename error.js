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


require('express-async-errors')

app.get('/async', async (req, res, next) => {
    throw new Error('Error in async-function')
})

/* ------------------------------------------------------- *

app.get('/*', (req, res, next) => {

    res.errorStatusCode = 404
    throw new Error('There is an Error Message', { cause: 'No reason :)' })
})

/* ------------------------------------------------------- *

const asyncFunction = async () => {
    throw new Error('Error in async-function')
}
//? Control with catch(next)
app.get('/async', async (req, res, next) => {
    // await asyncFunction().then().catch((err) => { next(err) })) // Catch error by errorHandler.
    await asyncFunction().then().catch(next) // Catch error by errorHandler.
})


/* ------------------------------------------------------- *
//* ERROR HANDLER

//? errorHandler is middleware and has must be four parameters. (error, request, response, next)
const errorHandler = (err, req, res, next) => {

    // console.log(err)
    console.log('errorHandler started.')

    const errorStatusCode = res?.errorStatusCode || 500

    res.status(errorStatusCode).send({
        error: true,
        message: err.message,
        cause: err.cause,
        stack: err.stack,
    })
}
//? for run errorHandler call in use.
//? It must be at last middleware.
app.use(errorHandler)

/* ------------------------------------------------------- */

//? errorHandler:
//? It must be at last middleware.
app.use(require('./errorHandler'))
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

//npm i-express-async-errors

