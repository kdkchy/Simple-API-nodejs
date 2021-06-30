const express = require('express')
const db = require('./model/db')
const app = express()
const port = 3000

//package
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/get', async (req, res, next) => {
    try {
        let subjects = await db.getAllElement()
        res.status(200).json({element : subjects})
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


app.get('/get/:id', async (req, res, next) => {
    try {
        let subjects = await db.getOneElement(req.params.id)
        res.status(200).json({subjects : subjects})
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

app.post('/post', async (req, res) => {
    try{ 
        const name = req.body.name
        const slug = req.body.slug

            if(!name || !slug){
                return res.status(400).json({
                    message : "Something went wrong"
                })
            }

        const subjects = await db.insertElement(name,slug).then( insertId => {
            return db.getOneElement(insertId)
        })
        res.status(200).json({
            message : "Insert Success",
            subjects : subjects
        })

    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})

app.put('/put', async (req, res) => {
    try{ 
        const name = req.body.name
        const slug = req.body.slug
        const id = req.body.id

            if(!name || !slug || !id){
                return res.status(400).json({
                    message : "Something went wrong"
                })
            }

        const subjects = await db.updateElement(name,slug,id).then(()=> {
            return db.getOneElement(id)
        })
        res.status(200).json({
            message : "Update Success",
            subjects : subjects
        })

    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})

app.delete('/delete/:id', async (req, res) => {
    try{
        let subject = await db.deleteElement(req.params.id)
        res.status(200).json({message : "Data deleted"})
    } catch (e) {
        console.log(e)
        res.status(500).json({message : "Failed to delete"})
    }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})