import { verifyLink } from "../services/verificationlink.service.js";

export const verifyVerificationLink = async (req, res) => {
    try {
        const { params: { username } } = req;
        await verifyLink(username);
        res.status(200).json({ msg: "registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong", err: error });
    }
};



