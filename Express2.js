const express=require('express');
var  app= express();
var morgan=require('morgan')
const mongoose =require('mongoose');
var uuid=require('uuid');
//Body parser 
app.use(express.json());

const myPerson=[
    {
    id:uuid.v4(),
    name:"sakthi",
    age: 23
    },

    {
        id:uuid.v4(),
        name:"sangeetha",
        age: 22
        },
        {
            id:uuid.v4(),
            name:"sathiya",
            age: 22
       }
        
]
mongoose.set('useNewUrlParser', true );
mongoose.set('useUnifiedTopology', true );
mongoose.connect('mongodb://mongodb0.example.com:27017/persons', (err)=>{
if (err){ console.log('db is not connected ')}
console.log('DB connected succesfully');
})


app.get('/',(req,res) =>{
    res.json(myPerson);
}); 

app.get('/:id',async(req,res) =>{
    var New=await myPerson.filter(e => e.id=== req.params.id)
    res.json(New);
});
app.post('/',(req,res) =>{
    myPerson.push(req.body);
    res.json(req.body);
}); 

//listen
app.listen(2000, ()=>{
  
    console.log('Server Started')

})



