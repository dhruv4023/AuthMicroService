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
    1012: 'Verification link sent to your email address! Please verify the user than try to login',
    1027: 'User not found, please check your username/email',

    // Authorization messages
    5001: 'Unauthorized - Admin access required',
    5002: 'Access denied - Unauthorized',
    5003: 'Your session expired! Please log in again',

    // OTP
    6001: 'Email is required',
    6002: 'OTP sent successfully',
    6003: 'Failed to send OTP',
    6004: "invalid OTP",
    6005: "Email isn't registered with any account! check your email address and try again",

    // General error message
    9000: 'Invalid or expired token',
    9999: 'Internal Server Error',
};

const getMessage = messageCode => {
    if (isNaN(messageCode)) {
        return messageCode;
    }
    return messageCode ? MESSAGES[messageCode] : '';
};

export default getMessage;
