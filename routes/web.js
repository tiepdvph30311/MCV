const express = require("express");
const productController = require("../Controller/productController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // khai báo ảnh sẽ lưu vào thu mục uploads

// tao route
const router = express.Router();
// định nghĩa các route

// xử lý tạo mới sản phẩm
// router.post("/add", upload.single('anh_sp'),productController.getFormAdd);
// hiển thị danh sách
router.get("/", productController.getList);

// hiển thị trang tạo sản phẩm
router.get("/add", productController.getFormAdd);
router.get("/api/list",productController.getlistApi);

// xử lý tạo mới sản phẩm
router.post("/add",upload.single('anh_sp'),productController.postFormAdd);

// hiển thị trang sửa sản phẩm
router.get("/sua/:id", productController.getFormEdit);

// xử lý sửa sản phẩm
router.post("/sua/:id",upload.single('anh_sp'),productController.postEdit);

//xóa sản phẩm
router.get("/delete/:id", productController.deleteProducts);

//router tim kiếm
router.post("/search1", productController.search);

//xuất router để sủ dụng
module.exports = router;
// const express=require('express');
// const productController=require('../Controller/productController');

// const router=express.Router();

// router.get('/',productController.getList);
// router.getFormAdd('/',productController.getFormAdd);
// module.exports=router;
