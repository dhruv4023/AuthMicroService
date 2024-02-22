const MESSAGES = {
    // User messages
    1001: 'User registered successfully',
    1002: 'User login successful',
    1003: 'User already exists!',
    1004: 'Email already in use!',
    1005: 'Invalid credentials, please check your username/email and password',
    1006: 'User data retrieved successfully',
    1007: 'User data updated successfully',
    1008: 'Verification email sent successfully!',
    1009: 'Usernames retrieved successfully',
    1010: "Password changed successfully!",
    1011: 'Other users fetched successfully',
    1027: 'User not found, please check your username/email',

    // Authorization messages
    5001: 'Unauthorized - Admin access required',
    5002: 'Access denied - Unauthorized',
    5003: 'Your session expired! Please log in again',

    // General error message
    9999: 'Internal Server Error',
};

const getMessage = messageCode => {
    if (isNaN(messageCode)) {
        return messageCode;
    }
    return messageCode ? MESSAGES[messageCode] : '';
};

export default getMessage;
