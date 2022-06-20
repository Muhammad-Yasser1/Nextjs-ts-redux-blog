import { notify } from 'reapop';
import { Dispatch } from '@reduxjs/toolkit';
import { ISignInUserRes, ISignUpUserRes } from '@u/interfaces/User.interface';
import { articleActions } from '../articles/articlesSlice';
import { IUserCred } from '@u/interfaces/UserCred.interface';
import userApiClient from './userApiClient';

export const signUpUserReq = (credentials: IUserCred, dispatch: Dispatch) => {
	dispatch(articleActions.setLoading(true));
	return userApiClient
		.post<ISignUpUserRes>(
			process.env.NEXT_PUBLIC_FIREBASE_SIGNUP_USER_URL!,
			{
				...credentials,
				returnSecureToken: true,
			}
		)
		.then((res) => {
			dispatch(
				notify(
					'Your account has been registered successfully',
					'success'
				)
			);
			return res;
		})
		.catch((err) => {
			switch (err.response.data.error.message) {
				case 'EMAIL_EXISTS':
					dispatch(
						notify(
							'The email address is already in use by another account.',
							'error'
						)
					);
					break;
				case 'OPERATION_NOT_ALLOWED':
					dispatch(
						notify(
							'Password sign-in is disabled for this project',
							'error'
						)
					);
					break;
				case 'WEAK_PASSWORD':
					dispatch(
						notify(
							'Password should be at least 6 characters',
							'error'
						)
					);
					break;
				case 'TOO_MANY_ATTEMPTS_TRY_LATER':
					dispatch(
						notify(
							'We have blocked all requests from this device due to unusual activity. Try again later',
							'error'
						)
					);
					break;
				default:
					dispatch(notify('Unknown error occurred!!', 'error'));
					break;
			}
			return err.response;
		})
		.finally(() => {
			dispatch(articleActions.setLoading(false));
		});
};

export const signInUserReq = (credentials: IUserCred, dispatch: Dispatch) => {
	return userApiClient
		.post<ISignInUserRes>(
			process.env.NEXT_PUBLIC_FIREBASE_SIGNIN_USER_URL!,
			{
				...credentials,
				returnSecureToken: true,
			}
		)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			switch (err?.response?.data.error.message) {
				case 'EMAIL_NOT_FOUND':
					dispatch(
						notify(
							'There is no user record corresponding to this identifier. The user may have been deleted.',
							'error'
						)
					);
					break;
				case 'INVALID_PASSWORD':
					dispatch(
						notify(
							'The password is invalid or the user does not have a password.',
							'error'
						)
					);
					break;
				case 'USER_DISABLED':
					dispatch(
						notify(
							'The user account has been disabled by an administrator.',
							'error'
						)
					);
					break;
				default:
					dispatch(notify('Unknown error occurred!!', 'error'));
					break;
			}
			return err.response;
		})
		.finally(() => {
			dispatch(articleActions.setLoading(false));
		});
};
