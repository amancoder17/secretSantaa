const express= require('express');
const cors = require('cors')
const mongoose= require('mongoose');
const User = require('./models/user');
const Emp= require('./models/emp');
const app= express();
const sendMail= require('./mail');
const bcrypt= require('bcrypt');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
 


//connecting Database
mongoose.connect('mongodb://127.0.0.1:27017/secrets')
.then(()=>{
    console.log('DB connected');
})
.catch((err)=>{
    console.log(err);
})




app.post('/login',async(req,res)=>{
    try {
   const {email,passwordi}= req.body
   const conf= User.findOne({email:email})
   .then((docs)=>{
             checkUser(passwordi,docs.password)
             async function checkUser(password,phash) {
                const match = await bcrypt.compare(password,phash);
            
                if(match) {
                    res.json({
                        isLoggedIn: match,
                        // Other relevant data for the React component
                    });
                }
                else{
                    res.json({
                        isLoggedIn:"false",
                    })
                }
            }
   })
   
    } 
    catch (error) {
        console.log(error);
    }    
})


app.post('/santasubmit',async(req,res)=>{
    const {santaname,santaemail,ids}=req.body
    const santassign= await Emp.findByIdAndUpdate(ids,{santaname:santaname,santaemail:santaemail})
    .then(santassign=>{
        if(santassign)
        {
            const {email,firstname,lastname}=santassign
            // console.log(santassign);
            sendMail({santaname,email,firstname,lastname});
            res.send({message:"santa assigned",santassign})
        }
        else
        {
            res.send({message: "Wrong subbmission"})
        }
    })
})
app.get('/empname/:id',async(req,res)=>{
        try {
            const name= await Emp.findById(req.params.id)
            res.json(name);
        } catch (e) {
            console.error(e);
        }
    })

app.get('/empl',async(req,res)=>{
    try {
        const empdata= await Emp.find()
        res.json(empdata)
    } catch (e) {
        console.error(e)
    }
})

app.delete('/empl/:id',async(req,res)=>{
    try {
        const id= req.params.id;
        await Emp.findByIdAndDelete(id)
    }
     catch (e) {
        console.error(e);
    }
})

app.patch('/emplist/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        await Emp.findByIdAndUpdate(id);

    } catch (e) {
        console.log(e);
    }   
})

app.post('/register',async(req,res)=>{
    try {
    const {name,email,password}= req.body
    const saltRound=10;
    const hashpass= await bcrypt.hash(password,saltRound);
    const user = await User.create({
                        name,
                        email,
                        password:hashpass,
                    })
                    res.send({message:"admin created"})
        
    } catch (error) {
        console.log(error);
    }    
});

 
app.post('/emplist',(req,res)=>{
    const {firstname,lastname,email}=req.body
    const emp= new Emp({
        firstname,
        lastname,
        email
    })
    emp.save()
    .then(
        res.send({message:"Added"})
    )
})



app.listen(9002,()=>{
    console.log("server is up at port 9002");
})
