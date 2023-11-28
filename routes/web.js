const express = require('express');
const productController = require("../Controller/productController");

// tao route
const router = express.Router();
// định nghĩa các route

// hiển thị danh sách
router.get('/', productController.getList);

// hiển thị trang tạo sản phẩm
router.get('/add', productController.getFormAdd);

// xử lý tạo mới sản phẩm
router.post('/add', productController.postFormAdd);

// hiển thị trang sửa sản phẩm
router.get('/sua/:id', productController.getFormEdit);

// xử lý sửa sản phẩm
router.post('/sua/:id', productController.postEdit);

//xóa sản phẩm
router.get('/delete/:id', productController.deleteProducts);

//xuất router để sủ dụng

module.exports = router;
// const express=require('express');
// const productController=require('../Controller/productController');

// const router=express.Router();

// router.get('/',productController.getList);
// router.getFormAdd('/',productController.getFormAdd);
// module.exports=router;