import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISignUpUserRes, ISignInUserRes } from '@u/interfaces/User.interface';
import { loadToken } from './localStorageApi';

export type mode = 'Admin' | 'Reader';

interface UserState {
	mode: mode;
	loading: boolean;
	isAuth: boolean;
	token: string;
}

const initialState: UserState = {
	mode: 'Reader',
	loading: false,
	isAuth: !!loadToken() || false,
	token: loadToken() || '',
};

const userSlice = createSlice({
	name: 'User',
	initialState,
	reducers: {
		signUp: (state: UserState, action: PayloadAction<ISignUpUserRes>) => {
			state.token = action.payload.idToken;
			state.isAuth = true;
		},
		signIn: (state: UserState, action: PayloadAction<ISignInUserRes>) => {
			state.token = action.payload.idToken;
			state.isAuth = true;
		},
		signOut: (state: UserState) => {
			state.token = '';
			state.isAuth = false;
		},
		setMode: (state: UserState, action: PayloadAction<mode>) => {
			state.mode = action.payload;
		},
		setLoading: (state: UserState, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
});

export const { setMode, ...userActions } = userSlice.actions;

export default userSlice.reducer;
