import Validator from 'validatorjs';

Validator.register(
    'isEmailOrUsername',
    (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[a-zA-Z0-9_]{3,20}$/.test(value);
    },
    'The :attribute must be a valid email address or a username with 3-20 characters.'
);

Validator.register(
    'password',
    (value) => {
        return value.length >= 5;
    },
    'The :attribute must be at least 5 characters long.'
);

Validator.register(
    'nameWithoutNumbers',
    (value) => {
        return value.match(
            /^[a-zA-Z]+$/
        );
    },
    'The :attribute field cannot contain numbers.'
);

Validator.register(
    'sixDigitNumber',
    (value) => {
        return /^\d{6}$/.test(value.toString());
    },
    'The :attribute field must be a 6-digit number.'
);

const isValidData = async (dataToBeValidate, constraints) => {
    let validation = new Validator(dataToBeValidate, constraints);
    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return validation.errors.first(firstMessage);
    }
    return false;
};
export default isValidData;