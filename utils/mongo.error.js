const getErrorMessage = (dbError)=>{
    const errors = dbError.errors;
    const extractedMessages = {};

    for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
            extractedMessages[key] = {
                message: errors[key].message,
            };
        }
    }
    return extractedMessages;
}

module.exports = getErrorMessage;