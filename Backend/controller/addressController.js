import Address from "../models/addressModel.js";

export const addAddress = async (req, res) => {
  try {
    console.log("BODY:", req.body);

 const address = await Address.create({
  user: req.user.id,
  fullName: req.body.fullName,
  phone: req.body.phone,
  addressLine1: req.body.addressLine1,
  addressLine2: req.body.addressLine2,
  city: req.body.city,
  state: req.body.state,
  pincode: req.body.pincode,
  country: req.body.country,
});

    res.status(201).json({
      success: true,
      address,
    });
  } catch (error) {
    console.log("ADD ADDRESS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
  user: req.user._id,
});

    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.log("GET ADDRESS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndUpdate(
  {
    _id: req.params.id,
    user: req.user._id,
  },
  req.body,
  {
    new: true,
    runValidators: true,
  }
);

if (!address) {
  return res.status(404).json({
    success: false,
    message: "Address not found",
  });
}

    res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    console.log("UPDATE ADDRESS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
  _id: req.params.id,
  user: req.user._id,
});

if (!address) {
  return res.status(404).json({
    success: false,
    message: "Address not found",
  });
}

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ADDRESS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};