require("dotenv").config()
const server = require('./server');

require('./database')

server.listen(server.get('PORT'), () =>{
    console.log('Server is running on port ', server.get('PORT'))
});

