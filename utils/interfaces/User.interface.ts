export interface ISignUpUserRes {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

export interface ISignInUserRes extends ISignUpUserRes {
    registered: boolean;
}
