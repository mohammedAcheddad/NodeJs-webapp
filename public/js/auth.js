import { url } from "./config.js"
import { emailLogin } from "./config.js"
import { passwordLogin } from "./config.js"
import { tbody } from "./config.js"


export const logOut = ()=>{
    fetch(url+"/users/logout",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        if(res.ok)
        {
            window.location = "#login"
            emailLogin.value = ""
            passwordLogin.value = ""
            clearTBody(tbody);

        }
    }).catch(err=>console.log(err))
}

export const authentifier=(login,pwd)=>{
    const dataToSend = {login:login,pwd:pwd}
    fetch(url+"/users/login",{
        method:"POST",
        body:JSON.stringify(dataToSend),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        if(res.ok)
        {
            window.location="#application"
            importMemos();
        }
        else{
            alert("echec d'authentification")
        }
    })
    .catch(err=>console.log(err));
}

export const importMemos = () => {
    fetch(url+"/memos",{
        method:"GET",
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        if(res.ok){
            console.log(res.body)
            res.json().then(data=>{
                const {dataB} = data;
                jsonToTable(dataB, tbody);
            })
        }
    })

}

function jsonToTable(json, tbody) {
    var keys = Object.keys(json[0]);
    for (var i = 0; i < json.length; i++) {
        var row = tbody.insertRow();
        for (var j = 0; j < 2; j++) {
            var cell = row.insertCell();
            cell.innerHTML = json[i][keys[j]];
        }
        
    }
}

function clearTBody(tbody) {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}