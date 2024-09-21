const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');

// Book an appointment
const bookAppointment = async (patientName, doctorName, appointmentTime) => {
  try {
    // Check if the doctor is available
    const doctor = await Doctor.findOne({ name: doctorName });
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // Ensure the time slot is available
    if (!doctor.availableSlots.includes(appointmentTime)) {
      throw new Error('Selected time slot is not available');
    }

    // Create and save the appointment
    const appointment = new Appointment({
      patientName,
      doctorName,
      appointmentTime,
    });

    await appointment.save();

    // Remove the booked time slot from the doctor's availability
    doctor.availableSlots = doctor.availableSlots.filter(slot => slot !== appointmentTime);
    await doctor.save();

    return appointment;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  bookAppointment,
};
