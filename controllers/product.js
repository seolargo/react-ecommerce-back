const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        console.log(req.body)
        req.body.slug = slugify(req.body.title)
        const newProduct = await new Product(req.body).save()
        res.json(newProduct)
    } catch (err) {
        console.log(err)
        //res.status(400).send("Create product failed.")
        res.status(400).json({
            err: err.message
        })
    }
}

exports.listAll = async (req, res) => {
    let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec()
    res.json(products)
}

exports.read = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category")
      .populate("subs")
      .exec();
    res.json(product);
};

const handleCategory = async (req, res, category) => {
    try {
        let products = await Product.find({category})
            .populate("category", "_id name")
            .populate("subs", "_id name")
            .populate("postedBy", "_id name")
            .exec()

        res.json(products);
    } catch (err) {
        console.log(err);
    }
}

const handleSub = async (req, res, sub) => {
    const products = await Product.find({subs: sub})
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec();

        res.json(products);
}

exports.searchFilters = async (req, res) => {
    const { category, sub } = req.body;

    if (category) {
        await handleCategory(req, res, category);
    }

    if (sub) {
        await handleSub(req, res, sub);
    }
}