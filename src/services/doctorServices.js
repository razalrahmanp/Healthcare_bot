const Doctor = require('../models/doctor');

// Get all doctors and their available slots
const getDoctors = async () => {
  try {
    return await Doctor.find({});
  } catch (error) {
    throw new Error('Error fetching doctors');
  }
};

module.exports = {
  getDoctors,
};
