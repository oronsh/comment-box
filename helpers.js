
const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const formatErrors = (e) => {

    const errors = {};
    
    if (e.name === 'ValidationError') {
        for (error in e.errors) {
            errors[error] = e.errors[error].message;
        }

        return { success: false, errors, message: 'Validation Error' };
    }

    return { success: false, message: 'Something went wrong' };
};

module.exports = {
    validateEmail,
    formatErrors
};
