function generate(max = 5){ 

    let code = ""; 

    const letters = "1234567890"

    for(let i = 0; i < max; i++){
        const index = Math.floor(Math.random() * letters.length)
        code = code + letters[index]
    }

    return code 
}
 
module.exports= {
    generate 
}