const UserAccountDetailsRepository = require('../repositories/userAccountDetailsRepository');
const logger = require('../logger/logger');

const getAccountDetails = async (request, response) => {
    const { userId } = request.query;
    const userAccountDetailsRepository = new UserAccountDetailsRepository();
    const existingUserAccountDetails = await userAccountDetailsRepository.select(userId);
    if (existingUserAccountDetails) {
        logger.info(`existingUserAccountDetails ${existingUserAccountDetails.first_name}`);
        return response.status(200).json({
            id: existingUserAccountDetails.id,
            userId: existingUserAccountDetails.user_id,
            firstName: existingUserAccountDetails.first_name,
            lastName: existingUserAccountDetails.last_name,
            address1: existingUserAccountDetails.address_1,
            address2: existingUserAccountDetails.address_2,
            city: existingUserAccountDetails.city,
            state: existingUserAccountDetails.state,
            zipCode: existingUserAccountDetails.zip_code,
            phoneNumber: existingUserAccountDetails.phone_number,
            email: existingUserAccountDetails.email
        });
    } else {
        logger.info('No data for that account.');
        return response.status(204).json({});
    }
};

const createAccountDetails = async (request, response) => {
    const {
        userId,
        firstName,
        lastName,
        address1,
        address2,
        city,
        state,
        zipCode,
        phoneNumber,
        email
    } = request.body;

    //console.log("createAccountDetails userId:", userId);

    const repo = new UserAccountDetailsRepository();
    try {
        const existing = await repo.select(userId);
        let result;

        if (existing) {
            // Update existing record
            result = await repo.update(
                userId, firstName, lastName, address1, address2,
                city, state, zipCode, phoneNumber, email
            );
            logger.info(`Updated account details for userId: ${userId}`);
            return response.status(200).json({ message: "Updated successfully", ...result });
        } else {
            // Insert new record
            result = await repo.insert(
                userId, firstName, lastName, address1, address2,
                city, state, zipCode, phoneNumber, email
            );
            logger.info(`Created new account details for userId: ${userId}`);
            return response.status(201).json({ message: "Created successfully", ...result });
        }

    } catch (error) {
        logger.error("Error in createAccountDetails:", error);
        return response.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createAccountDetails, getAccountDetails };