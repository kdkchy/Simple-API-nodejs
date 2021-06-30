const mysql = require('mysql')

const options = {
    user: 'root',
    database: 'learnvue',
    port: '3306'
}
const connection = mysql.createConnection(options)
connection.connect(err => {
    if(err){
        console.error('Error while connecting to the DB!')
        throw err
    }
})

let db = {}

db.getAllElement = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM subjects', (error, subjects) => {
            if(error){
                return reject(error)
            }
            return resolve(subjects)
        })
    })
}

db.getOneElement = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM subjects WHERE id= ?', [id] , (error, subjects) => {
            if(error){
                return reject(error)
            }
            return resolve(subjects)
        })
    })
}

db.insertElement = (name, slug) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO subjects (name, slug, created_at) VALUES (?,?, NOW())', [name, slug], (error, result) => {
            if(error) {
                return reject(error)
            }
            return resolve(result.insertId)
        })
    })
}

db.updateElement = (name, slug, id) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE subjects set name = ?, slug = ?, updated_at = NOW() WHERE id = ?', [name, slug, id], (error, result) => {
            if(error) {
                return reject(error)
            }
            return resolve()
        })
    })
}

db.deleteElement = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM subjects WHERE id = ?', [id], (error, result) => {
            if(error) {
                return reject(error)
            }
            return resolve()
        })
    })
}

module.exports = db