// import thư viện mongoose để làm việc vơi DB
const mongoose=require('mongoose');

// định nghĩa Schema cho  collection 

const itemSchema=new mongoose.Schema({
    ten_sp:String,
    gia_tien:String,
    so_luong:String,
    mo_ta:String,   // thuộc tính mô tả sản phẩm 
    anh_sp:String  //thuộc tính ảnh sản phẩm
});

//tạo một model cho (Item) từ Schema (itemSchema) và kết nối nó với collection  'tb_products

const Item=mongoose.model('tb_product',itemSchema);

// xuất model có thể sử dụng trong các model 
module.exports=Item;