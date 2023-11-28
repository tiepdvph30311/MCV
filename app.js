// cài đặt npm i mongoose 
// npm i express hbs

const express=require('express');
const mongoose=require('mongoose');
const productRoutes=require('./routes/web');
const app=express();


const url='mongodb://localhost:27017';
// nếu localhost k dùng có thể thay 127.0.0.1:   
const db_name='db_product';


// kết nốt mongoDB
mongoose.connect(`${url}/${db_name}`).then(()=>
    {
        console.log("Kết nối thành công");
        //tiếp tục khởi động express
        app.listen('9999',()=>{
            console.log("đang chạy dưới cổng 999");
        });
    }).catch((err)=>{
        console.log('lỗi kết nối mongoDB',err);
    });

app.use(express.urlencoded({extended:true}));
app.set('view engine','hbs');
app.use('/',productRoutes);


    