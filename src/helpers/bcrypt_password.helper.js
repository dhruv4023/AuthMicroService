import bcrypt from 'bcrypt';
export const hashPassword = password => {
    return bcrypt.hashSync(password, 10);
};

export const comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};
