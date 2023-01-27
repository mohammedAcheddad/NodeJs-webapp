import { logoutElement,loginElement, url } from "./config.js"
import { emailLogin } from "./config.js"
import { passwordLogin } from "./config.js"
import { tbody } from "./config.js"


function jsonToTable(json, tbody,k) {
    var keys = Object.keys(json[0]);
    for (var i = 0; i < json.length; i++) {
        var row = tbody.insertRow();
        for (var j = 0; j < k; j++) {
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
                jsonToTable(dataB, tbody,2);
            })
        }
    })

}



export const addMemo = (content,date) => {
    const dataToSend = {content:content,date:date}
    fetch(url+"/memos",{
        method:"POST",
        body:JSON.stringify(dataToSend),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        if(res.ok)
        {
            importMemos()
        }
        else{
            alert("")
        }
    })
    .catch(err=>console.log(err));
}


