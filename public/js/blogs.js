import { loading, url } from "./config.js";


export const processBlog = (blog) => {
    const blogContainer = document.createElement("div");
    blogContainer.classList.add("blog-item");
    blogContainer.style.border = "1px solid #ccc";
    blogContainer.style.backgroundColor = "#bb0727";
  
    const titleElement = document.createElement("h2");
    titleElement.textContent = blog.title;
    blogContainer.appendChild(titleElement);
  
    const authorElement = document.createElement("p");
    authorElement.textContent = `Author: ${blog.author}`;
    blogContainer.appendChild(authorElement);
  
    const contentElement = document.createElement("p");
    contentElement.textContent = blog.content;
    blogContainer.appendChild(contentElement);
  
    const dateElement = document.createElement("p");
    dateElement.textContent = `Date: ${blog.date}`;
    blogContainer.appendChild(dateElement);
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteBlog(blog.id); // Replace 'id' with the actual property name of the blog's ID
      blogContainer.remove();
    });
    blogContainer.appendChild(deleteButton);
  
    document.getElementById("blogContainer").appendChild(blogContainer);
  };
  

export const loadBlogs = () => {
  loading.classList.remove("hidden");
  fetch(url + "/blogs")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("blogContainer").textContent=''
      console.log(data)
      data.blogs.forEach(processBlog);
    })
    .catch((err) => {
      alert("Error: " + err);
      console.log(err);
    })
    .finally(() => {
      loading.classList.add("hidden");
    });
};

export const addBlog = (title, author, content, date) => {
  const dataToSend = {
    title: title,
    author: author,
    content: content,
    date: date,
  };

  fetch(url + "/blogs", {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error: " + res.status);
      }
    })
    .then((data) => {
      console.log("New blog added:", data);
      loadBlogs();
    })
    .catch((err) => {
      alert("Error: " + err);
      console.log(err);
    });
};

export const deleteBlog = (idBlog) => {
  fetch(url + "/blogs/" + idBlog, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        console.log("Blog deleted with ID:", idBlog);
      } else {
        throw new Error("Error: " + res.status);
      }
    })
    .catch((err) => {
      alert("Error: " + err);
      console.log(err);
    });
};
