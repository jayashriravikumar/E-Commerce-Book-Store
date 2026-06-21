import CustomerService from "../models/customerServiceModel.js";

// Create customer request
export const createCustomerRequest = async (req, res) => {
  try {
    console.log(req.body);
    const request = await CustomerService.create(req.body);

    res.status(201).json({
      success: true,
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all customer requests
export const getAllCustomerRequests = async (req, res) => {
  try {
    const requests = await CustomerService.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single customer request
export const getCustomerRequest = async (req, res) => {
  try {
    const request = await CustomerService.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
