const { bookAppointment } = require('../services/appointmentService');

const handleAppointmentBooking = async (bot, chatId, patientName, doctorName, appointmentTime) => {
  try {
    const appointment = await bookAppointment(patientName, doctorName, appointmentTime);
    bot.sendMessage(chatId, `Appointment confirmed with Dr. ${doctorName} at ${appointmentTime}.`);
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
};

module.exports = {
  handleAppointmentBooking,
};
