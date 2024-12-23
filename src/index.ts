import bodyparser from 'body-parser';
import  express from 'express';
import cors from 'cors';
import  Connectdb  from './db/db';
import userauth from './Route/UserRoute';
import productauth from './Route/Productroute'
const  app = express();
const corsorigin ={
    origin:'http://localhost:3000'
}

Connectdb()
app.use(cors(corsorigin))
app.use(bodyparser.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',userauth)
app.use('/api/product',productauth)


app.listen(5000,()=>{
    console.log("server is listen on port 5000");
})
