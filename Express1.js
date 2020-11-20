var express=require('express');

var app = express();

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})

app.get('/contact',function(req,res){
    res.sendFile(__dirname+'/Details.html');
})
app.listen(3001,()=>{
    console.log('Page connected')
})