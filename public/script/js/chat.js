// déclaration des constantes

const btn = $("#newMessage");
const input = $("#inputMessage");
const container = $("#tchatSpace");
const socket = io.connect();

let pseudo;
let div1= document.getElementById("tchatSpace")
let heightSet = div1.scrollHeight + 500;//variable contenant le scroll max de la div


// ajout d'évènement DOM
input.on("keyup",(e)=>{ if(e.key == "Enter"){ sendServer() } });
btn.click(sendServer);


//liason d'évènement socket.io
socket.on("login",(data)=>{
    login = prompt("pseudo");
    sessionStorage.setItem("pseudo",login)
    pseudo = sessionStorage.getItem("pseudo");
    if( data.length != 0){
        addMessage(data)
    }
    
});
socket.on("addMessage",(data)=>{
    addMessage(data)
    div1.scrollTo(div1.scrollTop, heightSet)//fonction permettant le scroll auto vers le bas
		
})
// déclaration de fonctions
function sendServer(){
    socket.emit("newMessage",{pseudo:pseudo,message:input.val()});
    input.val('');
}

function addMessage(datas){
    
    // container.html('');
    
    data = messageToPrint(datas)
    console.log(data)
    //for(message of data.messages){
        userClass = sessionStorage.getItem("pseudo") == data.pseudo ? "text-right myMsg" : "msg";
        container.append(
            `<li class="${userClass} p-1 m-1">
                <span class="d-block">${data.pseudo} | ${data.time}</span>
                <span>${data.message}</span>
            </li>`
            );

   // }
}
function messageToPrint(data){
    let index = data[0].messages[0].time;
    let timeToPrint = data[0].messages[0].timeToPrint;
    let toPrint = {pseudo: data[0].pseudo,message: data[0].messages[0].value, time: timeToPrint}
    for(element in data){
        for(let i = 0; i < data[element].messages.length; i++){
            if (data[element].messages[data[element].messages.length-1].time > index ) {
                
                index = data[element].messages[data[element].messages.length-1].time;
                timeToPrint = data[element].messages[data[element].messages.length-1].timeToPrint
                msg = data[element].messages[data[element].messages.length-1].value;
                toPrint = {pseudo: data[element].pseudo,message: msg, time: timeToPrint}
                
            }
        }
    }
    return toPrint;
}
