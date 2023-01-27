import { url } from "./config.js"
import { emailLogin } from "./config.js"
import { passwordLogin } from "./config.js"
import { tbody } from "./config.js"
import { importMemos } from "./notes.js"


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


function clearTBody(tbody) {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}