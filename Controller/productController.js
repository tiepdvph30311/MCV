const Item = require("../Model/productModel");
const isEmpty = require("lodash/isEmpty"); // để sử dụng hàm kiểm tra rỗng

exports.getList = (req, res) => {
  Item.find()
    .then((items) => {
      res.render("products/index", { items, layout: "layouts/main" });
    })
    .catch((err) => {
      console.log("Erorr retrieving items:", err);
      res.status(500).send("Internal Sever 1");
    });
};
exports.getlistApi = (req, res) => {
  Item.find()
    .then((items) => {
      res.json( { items});
    })
    .catch((err) => {
      console.log("Erorr retrieving items:", err);
      res.status(500).send("Internal Sever 1");
    });
};
exports.getFormAdd = (req, res) => {
  // render đến thư mục products và mở trang add.hbs gắn vào body trong thư mục layouts trong file main
  res.render("products/add", { layout: "layouts/main" });
};

exports.postFormAdd = (req, res) => {
  // const newItem = new Item(req.body);
  const newItem = new Item(
    {
    //chuỗi String thì dùng req.body
    ten_sp: req.body.ten_sp,
    gia_tien: req.body.gia_tien,
    so_luong: req.body.so_luong,
    mo_ta: req.body.mo_ta,

    // Đối với ảnh phải dùng req.file chứ không dùng req.body nữa
    anh_sp: req.file.path
  });

  newItem
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log("Erorr Saving item:", error);
      res.status(500).send("Internal Sever 2");
    });
};

exports.getFormEdit = (req, res) => {
  const itemID = req.params.id;
  Item.findById(itemID)
    .then((item) => {
      res.render("products/sua", { item, layout: "layouts/main" });
      console.log(itemID);
    })
    .catch((error) => {
      console.log("Erorr retriveing item:", error);
      res.status(500).send("Internal Sever 3");
    });
};
exports.postEdit = (req, res) => {
  const itemID = req.params.id;
  const updatedItem = {
    ten_sp: req.body.ten_sp,
    gia_tien: req.body.gia_tien,
    so_luong: req.body.so_luong,
    mo_ta: req.body.mo_ta,
  };

  if (req.file) {
    updatedItem.anh_sp = req.file.path;
  }

  Item.findByIdAndUpdate(itemID, updatedItem, { new: true }) // Thêm { new: true } để nhận được tài liệu sau khi cập nhật
    .then((updatedDocument) => {
      if (!updatedDocument) {
        // Nếu không tìm thấy tài liệu cần cập nhật
        return res.status(404).send("Không tìm thấy sản phẩm");
      }

      res.redirect("/");
    })
    .catch((error) => {
      console.log("Lỗi khi cập nhật sản phẩm:", error);
      res.status(500).send("Internal Server Error");
    });
};

exports.deleteProducts = (req, res) => {
  const itemID = req.params.id;

  Item.findByIdAndDelete(itemID)
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log("Erorr Saving item:", error);
      res.status(500).send("Internal Sever 5");
    });
};

exports.search = (req, res) => {
  if (!isEmpty(req.body.search1)) {
    const query = req.body.search1;
    console.log("Query:", query);
    const regex = new RegExp(query, "i");
    console.log("Regex:", regex);
    const searchQuery = {
      $or: [{ ten_sp: { $regex: regex } }],
    };
    console.log("Search Query:", searchQuery);

    Item.find(searchQuery)
      .then((items) => {
        res.render("products/index", { items, layout: "layouts/main" });
      })
      .catch((error) => {
        console.log("Error retrieving items:", error);
        res.status(500).send("Internal Server Error");
      });
  } else {
    Item.find()
      .then((items) => {
        res.render("products/index", { items, layout: "layouts/main" });
      })
      .catch((error) => {
        console.log("Erorr retriveing item:", error);
        res.status(500).send("Internal Sever 6");
      });
  }
};
// exports.search = (req, res) => {
//   if (!isEmpty(req.body.search1)) {
//     const query = req.body.search1;
//     console.log("Query:", query);

//     const regex = new RegExp(query, 'i');
//     console.log("Regex:", regex);

//     const searchQuery = {
//       $or: [
//         { "ten_sp": { $regex: regex } }
//       ]
//     };

//     console.log("Search Query:", searchQuery);

//     Item.find(searchQuery)
//       .then((items) => {
//         res.render("products/index", { items, layout: "layouts/main" });
//       })
//       .catch((error) => {
//         console.log("Error retrieving items:", error);
//         res.status(500).send("Internal Server Error");
//       });
//   } else {
//     Item.find()
//       .then((items) => {
//         res.render("products/index", { items, layout: "layouts/main" });
//       })
//       .catch((error) => {
//         console.log("Error retrieving items:", error);
//         res.status(500).send("Internal Server Error");
//       });
//   }
// };
