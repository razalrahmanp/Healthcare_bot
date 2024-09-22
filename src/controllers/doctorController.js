const { getDoctors } = require('../services/doctorService');

const checkAvailability = async(bot, chatId) => {
    try {
        const doctors = await getDoctors();
        let response = 'Available Doctors:\n';

        doctors.forEach((doctor, index) => {
            response += `${index + 1}. Dr. ${doctor.name} (${doctor.specialization}) - Available slots: ${doctor.availableSlots.join(', ')}\n`;
        });

        bot.sendMessage(chatId, response);
    } catch (error) {
        bot.sendMessage(chatId, 'Error fetching doctor availability. Please try again later.');
    }
};

module.exports = {
    checkAvailability,
};