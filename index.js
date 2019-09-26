const express = require('express')
const mysql = require('mysql')


const app = express()
const port = 1997

 // buat koneksi ke db
const db = mysql.createConnection({
    host :'localhost',
    user:'harry',
    password:'password',
    database:'tokoberkah',
    port: 3306,
    timezone: 'UTC'

})

app.get('/',(req,res) =>{
    res.status(200).send('<h1>Welcome to our API</h1>')
})




app.get('/getkota',(req,res)=>{
    var nama = req.query.nama ? req.query.nama:'' //condition ? if true : if false
    
    var sql = `SELECT * FROM kota where nama LIKE '%${nama}%';`;
    db.query(sql,(err,results)=>{
        if(err){
            // console.log(err)
            return res.status(500).send(err) //kata return di function agar keluar dr function
        }
        console.log(results)
        res.status(200).send(results)//callback function akan di execute apabila sudah berhasil
    })
})

app.get('/getkota/:id',(req,res)=>{
    var sql = `SELECT * FROM kota where id=${req.params.id};`;
    db.query(sql,(err,results)=>{
        if(err){
            // console.log(err)
            return res.status(500).send(err) //kata return di function agar keluar dr function
        }
        console.log(results)
        res.status(200).send(results)//callback function akan di execute apabila sudah berhasil
    })
})

// //http://localhost:1997/getkota/abc/test/halo/123/321 
// app.get('/getkota/:idu/test/halo/:hello/:coba',(req,res)=>{
//     console.log(req.params)
//     res.status(200).send(`<h1>Halo Bro</h1>`)
// })


app.get('/gettoko',(req,res)=>{
    var nama = req.query.nama ? req.query.nama:''
    var alamat = req.query.alamat ? req.query.alamat:''

    var sql=`SELECT * FROM toko WHERE nama LIKE '%${nama}%'
                                AND alamat LIKE'%${alamat}'`
    if(req.query.incmin){
        sql +=`AND totalIncome >=${req.query.incmin}`
    }
    if(req.query.incmax){
        sql +=`AND totalIncome <=${req.query.incmax}`
    }
    if(req.query.dateform){
        sql += `AND tanggalBerdiri >='${req.query.dateform}'`
    }

    if(req.query.dateto){
        sql += `AND tanggalBerdiri <='${req.query.dateto}'`
    }
    
    if(req.query.kotaid){
        sql += `AND kotaid =${req.query.kotaid}`
    }


    db.query(sql,(err,results)=>{
        if(err){
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    })
})




app.get('/gettoko/:id',(req,res)=>{
    var sql = `SELECT * FROM toko where id=${req.params.id};`;
    db.query(sql,(err,results)=>{
        if(err){
            // console.log(err)
            return res.status(500).send(err) //kata return di function agar keluar dr function
        }
        console.log(results)
        res.status(200).send(results)//callback function akan di execute apabila sudah berhasil
    })
})


app.listen(port,()=>console.log(`API aktif di port ${port}`)) //listen untuk menyalakan server,listen selalu paling bawah