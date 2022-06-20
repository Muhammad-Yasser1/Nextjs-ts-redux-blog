export const isValidEmail = (value: string) => {
    const regexp = /^\S+@\S+\.\S+$/; // basic
    return regexp.test(value);
};
