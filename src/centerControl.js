const express = require('express')
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express()
app.use(cors())
const port = 3003

app.listen(port, () => console.log('server is start,port is', port))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//user login check
//Receive data:username,password
//Send data:status(pass,userNotExist,passwdError)
app.post('/login', (req, res) => {
    //get data from vue axios post
    let username = req.body.username;
    let password = req.body.password;
    const connection = mysqlDbConnector();
    connection.query('SELECT * FROM userdata WHERE username = ?', [username], function (error, results) {
        if (error) {
            res.send('404')
            throw error
        }
        let result = JSON.parse(JSON.stringify(results));
        console.log(result);
        if (result.length === 0) {
            console.log("用户不存在");
            res.send('userNotExist');
        } else {
            if (result[0].passwd === password) {
                console.log("密码正确");
                res.send('pass');
            } else {
                console.log("密码错误");
                res.send('passwdError');
            }
        }
    });
    // 关闭连接
    connection.end();
})

//register new user
app.post('/register', (req, res) => {
    //get data from vue axios post
    let username = req.body.username;
    let password = req.body.password;
    const connection = mysqlDbConnector();
    //first check if username exist
    connection.query('SELECT * FROM userdata WHERE username = ?', [username], function (error, results) {
        if (error) {
            res.send('404')
            throw error
        }
        let result = JSON.parse(JSON.stringify(results));
        console.log(result);
        if (result.length === 0) {
            //can't find same username,can insert this username and password
            console.log("用户名不存在，可以插入");
            connection.query('INSERT INTO userdata (username,passwd) VALUES (?,?)', [username, password], function (error, results) {
                if (error) {
                    res.send('404')
                    throw error
                }
                let result = JSON.parse(JSON.stringify(results));
                console.log(result);
                res.send("pass");
            });
        } else {
            console.log("用户名已存在");
            res.send('userExist');
        }
    });

})

//get student info from mysql
//Receive data:null
//Send data:stuID,stuName,stuSex,stuBirth,stuMajor
app.post('/getStudentInfo', (req, res) => {
    const connection = mysqlDbConnector();
    connection.query('SELECT * FROM studentInfo', function (error, results) {
        if (error) {
            res.send('404')
            throw error
        }
        let result = JSON.parse(JSON.stringify(results));
        console.log(result);
        res.send(result);
    });
    // 关闭连接
    connection.end();
})

//delete student info from mysql
//Receive data:stuID
app.post('/deleteStudentInfo', (req, res) => {
    const connection = mysqlDbConnector();
    //delete by stuID
    let stuID = req.body.stuID;
    connection.query('DELETE FROM studentInfo WHERE stuID = ?', [stuID], function (error, results) {
        if (error) {
            res.send('404')
            throw error
        }
        let result = JSON.parse(JSON.stringify(results));
        console.log(result);
        res.send(result);

    });
})

//add new student info to mysql
//Receive data:stuID,stuName,stuSex,stuBirth,stuMajor
//Send data:status(pass,stuIDExist)
app.post('/addNewStudent', (req, res) => {
    const connection = mysqlDbConnector();
    //get data from vue axios post
    let stuID = req.body.stuID;
    let stuName = req.body.stuName;
    let stuSex = req.body.stuSex;
    let stuBirth = req.body.stuBirth;
    let stuMajor = req.body.stuMajor;
//first check if stuID exist
    connection.query('SELECT * FROM studentInfo WHERE stuID = ?', [stuID], function (error, results) {
        if (error) {
            res.send('404')
            throw error
        }
        let result = JSON.parse(JSON.stringify(results));
        console.log(result);
        if (result.length === 0) {
            console.log("学号不存在，可以插入");
            connection.query('INSERT INTO studentInfo (stuID,stuName,stuSex,stuBirth,stuMajor) VALUES (?,?,?,?,?)', [stuID, stuName, stuSex, stuBirth, stuMajor], function (error, results) {
                if (error) {
                    res.send('404')
                    throw error
                }
                let result = JSON.parse(JSON.stringify(results));
                console.log(result);
                res.send("pass");
            });
        } else {
            console.log("学号已存在");
            res.send('stuIDExist');
        }
    });
})

function mysqlDbConnector() {
    // 创建数据库连接
    const connection = mysql.createConnection({
        host: 'localhost', user: 'root', password: 'hakiysu@MYSQL', database: 'webtest',
    });
    // 连接数据库
    connection.connect((err) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });
    return connection;
}