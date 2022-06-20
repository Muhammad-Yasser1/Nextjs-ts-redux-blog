interface Error {
    id: string;
    message: string;
}
export interface Errors {
    [key: string]: Error[];
}
export const initFormErrorsFromState = (state: object) => {
    const errors: Errors = {};
    for (const key in state) {
        if (Object.prototype.hasOwnProperty.call(state, key)) {
            errors[key] = [];
        }
    }
    return errors;
};
