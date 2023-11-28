const Item = require("../Model/productModel");

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

exports.getFormAdd = (req, res) => {

  // render đến thư mục products và mở trang add.hbs gắn vào body trong thư mục layouts trong file main 
  res.render("products/add", { layout: "layouts/main" });
};

exports.postFormAdd = (req, res) => {
  const newItem = new Item(req.body);
  newItem.save().then(() => {
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
  Item.findByIdAndUpdate(itemID, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log("Erorr Saving item:", error);
      res.status(500).send("Internal Sever 4");
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
