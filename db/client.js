const Client = require('pg');


// Start of deployment

const connectionOptions = {
    host: 'dpg-d2q6ulmr433s73dvt7t0-a',
    port: 5432,
    user: 'postgres1',
    password: 'HFbSsLYOVFBa3JaabmDdUpAjCjlC2Rud',
    database: 'postgres1_kghg'  //garage_db
};

// End of deployment


/* Before deployment
const connectionOptions = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'  //garage_db
};

*/

const dbClient = new Client.Client(connectionOptions);

dbClient.connect(() => {
    console.log('Connected to postgres db!');
});

module.exports = dbClient;