const config = {
    mail : {
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: `${process.env.GMAIL_USERNAME}`,
            pass: `${process.env.GMAIL_PASSWORD}`,
        },
    },


    database: {
        url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qj6xv.mongodb.net/saveflix-db?retryWrites=true&w=majority`
    },
    jwt: {
        secret: '01001000100001'
    },
    
    imageFolder: './src/public',
};

module.exports = config