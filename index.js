const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./product"); // Pastikan file "product.js" mengandung definisi skema produk
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb+srv://david:apaantuh11@pam.spi9mzl.mongodb.net/flutter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

    app.post("/product", async (req, res) => {
      console.log("Result", req.body);

      let data = Product(req.body);

      try {
        let dataToStore = await data.save();
        res.status(200).json(dataToStore);
      } catch (error) {
        res.status(400).json({
          status: error.message,
        });
      }
    });

    app.get("/", (req, res) => {
      res.send("Express on Vercel");
    });

    app.get('/api', (req, res) => {
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
      res.end(`Hello! Go to item: <p>hello</p>`);
    });

    app.get("/product", async (req, res) => {
      try {
        let data = await Product.find();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json(error.message);
      }
    });

    app.patch("/product/:id", async (req, res) => {
      let id = req.params.id;
      let updatedData = req.body;
      let options = { new: true };

      try {
        const data = await Product.findByIdAndUpdate(id, updatedData, options);
        res.send(data);
      } catch (error) {
        res.send(error.message);
      }
    });

    app.delete("/product/:id", async (req, res) => {
      let id = req.params.id;
      try {
        const data = await Product.findByIdAndDelete(id);
        res.json({
          status: `Deleted the product ${data.pname} from database`,
        });
      } catch (error) {
        res.json(error.message);
      }
    });
  

app.listen(3000, () => {
  console.log("Connected to server at 3000");
});

module.exports = app;
