import Product from '../models/productModel.js';

export const addProducts = async (req,res) => {
    //console.log(req.body);
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product,
    });
};


export const deleteProduct = async (req,res) =>{
    const id = req.params.id;
    let product = await Product.findByIdAndDelete(id)
    if(!product){
        return res.status(500).json({success:false,message:"Product not found"});
    }

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"});
}

export const updateProduct = async (req,res) =>{
    const id = req.params.id;
    let product = await Product.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
    })
    if(!product){
        return res.status(500).json({success:false,message:"Product not found"});
    }

    res.status(200).json({
        success:true,
        product});
}

export const getAllProducts = async (req,res) =>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products});
};

export const getSingleProduct = async (req,res) =>{
    const id = req.params.id;
    let product = await Product.findById(id);
    if(!product){
        return res.status(500).json({success:false,message:"Product not found"});
    }
    res.status(200).json({
        success:true,
        product
    });
};