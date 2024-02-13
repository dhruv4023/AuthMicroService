import RESPONSE from "../helpers/response.helper.js";
import { verifyLink } from "../services/verification_link.service.js";

export const verifyVerificationLink = async (req, res) => {
    try {
        const { params: { username } } = req;
        await verifyLink(username);
        RESPONSE.success(res, 1001);
    } catch (error) {
        // Handle errors and return a 500 (Internal Server Error) status with an error message
        RESPONSE.error(res, 9999, 500, error)
    }
};



