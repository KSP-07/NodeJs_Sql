var express =require('express');
var mysql=require('mysql');
// const bodyParser=require('body-parser');

var app=express();

// var conn=mysql.createConnection({
//     //properties
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'sampledb'
// });

//to prevent server from crashing coz of multiple queries, use createPool and limit number of connection at a time
var conn=mysql.createPool({
    //properties
    connectionLimit:70,
    host:'localhost',
    user:'root',
    password:'',
    database:'sampledb'
});

//this fun not needed when useing pool
// conn.connect(function(error){
//     if(!!error){
//         console.log('Error');
//     }else{
//         console.log('Connected');
//     }
// })

//for createConnection method
// app.get('/',function(req,res){
//     //about mysql
//     conn.query("Select * from sampleTable",function(error,rows,fields){
//     if(!!error){
//         console.log('Error in the query');
//     }else{
//         console.log('Successful query');
//         console.log(rows);
//         console.log(rows[0]);
//         console.log(rows[0].Name);
//         res.send('hello,'+rows[1].Name);
//         }
//     })
// });

app.get('/',function(req,res){
    //about mysql
    conn.getConnection(function(error,tempConn){
    if(!!error){
        tempConn.release();    // to release the connection completed or throwing error
        console.log('Error in the query');
    }else{
        console.log('Connected!');
        tempConn.query("Select * from sampleTable",function(error,rows,fields){
            tempConn.release();
            if(!!error){
                console.log('Error in the query');
            }else{
                console.log('Successful query');
                console.log(rows);
                console.log(rows[0]);
                console.log(rows[0].Name);
                res.json('hello, '+rows[1].Name);
            }
        })
    }
    })
});

app.listen(4000);
