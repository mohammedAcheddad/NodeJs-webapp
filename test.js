const express = require("express");
const mongoose= require('mongoose')
const session = require('express-session')
const dotenv = require("dotenv");

fetch('http://localhost:3000/memos', {
    method: 'GET',
    credentials: 'include',
}).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            alert("fetching memos failed");
        }
    })
    .then(data=>console.log(data))
    .catch(err => console.log(err));