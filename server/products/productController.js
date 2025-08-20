const { allProductService, auctionProductService, normalProductService, allProductCategoryService, auctionProductCategoryService, normalProductCategoryService } = require('./productService');

const allProductController = async(req, res) => {
    try {
        const filters = {
            category: req.query.category || null
        }
        const result = await allProductService(filters);
        console.log(result);
        if(result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.error('상품 조회 실패 : ', error);
        res.status(400).json({ message: error.message});
    }
}

const auctionProductController = async(req,res) => {
    try {
        const filters = {
            category: req.query.category || null
        }
        const result = await auctionProductService(filters);
        console.log(result);
        if(result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.error('상품 조회 실패 : ', error);
        res.status(400).json({ message : error.message});
    }
}

const normalProductController = async(req, res) => {
    try {
        const filters = {
            category : req.query.category || null
        }
        const result = await normalProductService(filters);
        console.log(result);
        if(result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.error('상품 조회 실패 : ', error);
        res.status(400).json({ message : error.message});
    }
}

const allProductsCategory =async (req, res) => {
    try {
        const result = await allProductCategoryService();
        console.log(result);
        if(result) {
            return res.status(200).json(result);
        }
    } catch(err) {
        console.error('카테고리 조회 실패', err);
        res.status(400).json({message: err.message});
    }
}

const auctionProductsCategory = async(req, res) => {
    try{
        const result = await auctionProductCategoryService();
        console.log(result);
        if(result) {
            return res.status(200).json(result);
        }
    } catch(err) {
        console.error('카테고리 조회 실패', err);
        res.status(400).json({message: err.message});
    }
}

const normalProductsCategory = async(req, res) => {
    try{
        const result = await normalProductCategoryService();
        console.log(result);
        if(result) {
            return res.status(200).json(result);
        }
    } catch(err) {
        console.error('카테고리 조회 실패', err);
        res.status(400).json({message: err.message});
    }
}
module.exports = { allProductController, auctionProductController, normalProductController, allProductsCategory, auctionProductsCategory,normalProductsCategory};