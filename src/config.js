const config = {
    mail : {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'dorthy.hammes77@ethereal.email',
            pass: 'QVts1qP9rFynZ2USUW'
        },
    },


    database: {
        url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qj6xv.mongodb.net/saveflix-db?retryWrites=true&w=majority`
    },
    jwt: {
        secret: '01001000100001'
    },
    hostname: "http://localhost:4500/",
    imageFolder: './src/public',
};

module.exports = config