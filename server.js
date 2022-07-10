const express = require('express');
const path = require('path')
const app = express();

app.use(express.static('./dist/user-frontend'));

app.get('/*', function(req, res){
    res.sendFile('index.html',{root: 'dist/user-frontend'});
});

app.listen(process.env.PORT || 8080);