import mongoose from "mongoose";

function Connectdb(){
    mongoose.connect('mongodb://127.0.0.1:27017/typescript')
    .then(()=>{
        console.log("mongodb is connected");  
    }).catch(err=>{
        console.log(err);    
    })
    

}

export default Connectdb;