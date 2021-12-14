const config = {
    database: {
        url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qj6xv.mongodb.net/saveflix-db?retryWrites=true&w=majority`
    },
    jwt: {
        secret: '01001000100001'
    },
    hostname: "https://saveflix-server.herokuapp.com/",
    imageFolder: './src/public',
};

module.exports = config