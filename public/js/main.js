import {emailLogin, loginBtn, logoutBtn, passwordLogin} from "./config.js"
import {authentifier, logOut,importMemos} from "./auth.js"

window.addEventListener('popstate', function (event) {
	singlePageManger(getPath())
});

loginBtn.addEventListener('click',async ()=>{
   const login = emailLogin.value
   const pwd = passwordLogin.value
   if(!login  || !pwd)
    return alert("please complete all fileds")

    await authentifier(login,pwd)


})
logoutBtn.addEventListener('click',()=>{
    logOut();
})

const getPath=()=>window.location.hash || '#welcome'
const singlePageManger =(path)=>{
    console.log(path)
    const components=document.getElementsByClassName("component")
    Array.from(components).forEach(element=>{
        element.classList.add('hidden');
    })
    const links=document.querySelectorAll('header nav li')
    Array.from(links).forEach(element=>{
        element.classList.remove('selected');
    })
    document.querySelector(path).classList.remove('hidden')
    document.querySelector('header nav li:has(a[href="'+path+'"])').classList.add('selected')
}
singlePageManger(getPath())
const checkConnection=()=>{
      const idUser = localStorage.getItem("idUser")
      //if(idUser)
}