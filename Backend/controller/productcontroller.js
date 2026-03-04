export const getAllProducts = (req,res) =>{
    res.status(200).json({"message":"Get all products"});
};

export const getSingleProduct = (req,res) =>{
    res.status(200).json({"message":"Get single product"});
};