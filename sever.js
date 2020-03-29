//Déclaration des constantes
const dir = __dirname;
const path = require('path');
const express = require('express');
const route = require(dir + '/src/routes');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://adminTchat:root@cluster0-hravq.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

// io.listen();

app.engine('ejs',require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.set('views', path.join(dir, 'views'));

//imbrication de middleware
app.use(express.static('public'))
app.use('/',route)//délégation du système de route au router "/src/routes"
users = [];

client.connect(err => {

    const db = client.db('tchat_space');
    let collection = db.collection('salon_1');
    let cursor = collection.find({});

    //
    //cursor.forEach(iterateFunc, errorFunc);  
    //client.close();
    // collection.insertOne({
        
    // })
    //connection en temps réel au client
    io.on("connection", (socket)=>{
    
        socket.emit("login",users)
        //var test = new Date(socket.handshake.time)
        socket.on("newMessage",(data)=>{
            time = Date(socket.handshake.time)
            date = Date();
            timeToPrint = socket.handshake.time.slice(4,24)
            console.log(date)
            i = 1;
            for( personne of users){
                console.log(users)
                if(data.pseudo == personne.pseudo){
                    personne.messages.push({time:time,value:data.message,timeToPrint: timeToPrint});
                    break;
                }else{
                    let user = {pseudo:"",messages:[]};
                    user.pseudo = data.pseudo;
                    user.messages.push({time:time,value:data.message,timeToPrint: timeToPrint});
                    users.push(user);
                    break;    
                }
                console.log(personne)
                console.log(i++)
            }
            
            if (users.length == 0) {
                let user = {pseudo:"",messages:[]};
                user.pseudo = data.pseudo;
                user.messages.push({time:time,value:data.message,timeToPrint: timeToPrint});
                users.push(user);
            };
                
            io.sockets.emit("addMessage",users);
                
            
            //console.log(users)
           
            
        })
    })
});

function iterateFunc(doc) {
    console.log(JSON.stringify(doc, null, 4));
 }
 
 function errorFunc(error) {
    console.log(error);
 }
 
server.listen(8000);