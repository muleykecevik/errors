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
