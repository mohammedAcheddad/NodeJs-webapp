import {addBtn, emailLogin, emailRegister, loginBtn, logoutElement, memoInput, nameRegister, passwordLogin, passwordRegister, passwordRegister2, registerBtn, resetBtn, tbody} from "./config.js"
import {authentify, logout, register} from "./auth.js"
import { addBlog, loadBlogs } from "./blogs.js";


window.addEventListener('popstate', function (event) {
	singlePageManger(getPath())
});

loginBtn.addEventListener('click',()=>{
   const login = emailLogin.value
   const pwd = passwordLogin.value
   if(!login  || !pwd)
    return alert("please complete all fileds")

   authentify(login,pwd)
})

logoutElement.addEventListener('click',()=>{
    logout();
})


document.getElementById("addBlogBtn").addEventListener("click", async function() {
    // Get the input values
    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;
    const content = document.getElementById("contentInput").value;



    const date = document.getElementById("dateInput").value;
  
    // Create a blog object
    const blog = {
      title: title,
      author: author,
      content: content,
      date: date
    };
  
    // Process the blog or perform any necessary actions
    let x= await addBlog(title, author, content, date)

    // Clear the input fields
    document.getElementById("titleInput").value = "";
    document.getElementById("authorInput").value = "";
    document.getElementById("contentInput").value = "";
    document.getElementById("dateInput").value = "";
  });



registerBtn.addEventListener('click',()=>{
    // Recuperation des valeurs
    const email = emailRegister.value
    const name = nameRegister.value
    const pwd = passwordRegister.value
    const pwd2 = passwordRegister2.value

    // verification des valeurs
    if(!email || !name || !pwd || !pwd2)
        return alert("please fill all inputs")

    if(pwd!=pwd2)
        return alert("passwords didn't match")
    
   
    // appel de la methode register
    register(email,name,pwd,pwd2)

})
export const viderRegister = ()=>{
    emailRegister.value=""
    nameRegister.value=""
    passwordRegister.value=""
    passwordRegister2.value=""
}
export const viderLogin = ()=>{
    passwordLogin.value=""
    emailLogin.value=""
}
const getPath=()=>window.location.hash || '#welcome'
const singlePageManger =(path)=>{
    console.log(path)
    if(path=="#application")
    {
        loadBlogs();
        document.getElementById("blogContainer").textContent=''
        
    }
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


// new change