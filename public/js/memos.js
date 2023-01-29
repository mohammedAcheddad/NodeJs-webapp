import { loading, url } from "./config.js";
import { addMemoToTable } from "./main.js";

export const load=()=>{
    loading.classList.remove("hidden")
    fetch(url+"/memos").then(res=>res.json()).then(data=>{
        //data => array
        data.forEach(element => {
            addMemoToTable(element)
        });

    })
    .catch(err=>{
        alert("error");
        console.log(err)
    }).finally(()=>{
        loading.classList.add("hidden")
    })
}

export const addMemo=(content)=>{
    const dataToSend = {
        content:content,
        date:new Date()
    }
    fetch(url+"/memos",{
        method:"POST",
        body:JSON.stringify(dataToSend),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        if(res.ok)
        {
            res.json().then(data=>{
                addMemoToTable(data)
            })
        }
        else{
            alert("erreur")
        }
    })
    .catch(err=>{
        alert("erreur")
        console.log(err)
    })
}

export const deleteMemo=(id)=>{
    fetch(url+"/memos/"+id,{
        method:"DELETE"
    }).then(res=>{
        if(res.ok)
        {
            document.getElementById(id).remove();
        }
        else
            alert("error")
    })
    .catch(err=>{
        alert("erreur")
        console.log(err)
    })
}