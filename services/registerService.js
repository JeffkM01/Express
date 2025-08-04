const UserAccountsRepository = require('../repositories/userAccountsRepository');
const logger = require('../logger/logger');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerLoginCredentials = async (request, response) => {
    // Pull username and password from request
    // Connect to DB and check for existing account
    // If no existing account, persist data to create new account, return 201
    // If existing account, response status code 409
    //const { userName, password } = request.body;
    const { username: userName, password } = request.body;
    const userAccountsRepository = new UserAccountsRepository();
    const existingUserAccount = await userAccountsRepository.select(userName);
    if (!existingUserAccount) {
        logger.info('Creating new record in user_account table');
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        const newUserAccount = await userAccountsRepository.insert(userName, passwordHash);
        const id = newUserAccount.id;
        logger.info(`Record created with id ${id}`);
        //return response.status(201).json({ id, message: "Congrats on creating an account:)" });
        return response.status(201).json({ userId: id, message: "Account created successfully." });

    } else {
        const error = `${userName} already has an account`;
        logger.error(error);
        return response.status(409).json({ error });
    }
};

module.exports = registerLoginCredentials;