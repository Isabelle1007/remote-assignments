const validator = require('validator');

// Validate name format
function name_validation(n) {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(n)
}

// Validate email format
function em_validation(e) {
    if (!validator.isEmail(e))
        return false
    else
        return true
}

// Validate password requirements
function pw_validation(pw){

    let check = 0;
    const upper = /^(?=.*[A-Z]).{1,}$/;
    const lower = /^(?=.*[a-z]).{1,}$/;
    const number = /^(?=.*[0-9]).{1,}$/;
    const symbols = /^(?=.*[~`!@#$%^&*()_+={[}\]|\\:;"'<,>.?\/-])(?!.*\s).{1,}$/;

    if(upper.test(pw)) check += 1;
    if(lower.test(pw)) check += 1;
    if(number.test(pw)) check += 1;
    if(symbols.test(pw)) check += 1;
    
    if(check >= 3) 
        return true
    else 
        return false
}

module.exports = { name_validation, pw_validation, em_validation }