const bcrypt = require('bcrypt');

const encrypt = async (password) =>{
    return await bcrypt.hash(password, 10);
};

const compare = async(plainPassword, password) => {
    return await bcrypt.compare(plainPassword, password);
}

module.exports = {
    encrypt,
    compare
}