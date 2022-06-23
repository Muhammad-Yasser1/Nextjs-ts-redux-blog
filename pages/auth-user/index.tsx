import React, { useEffect, useState } from 'react';
import Input from '@c/Input/Input';
import { initFormErrorsFromState } from '@u/helpers/initFormErrors';
import { isValidEmail } from '@u/helpers/isValidEmail';
import { IUserCred } from '@u/interfaces/UserCred.interface';
import { signInUser, signUpUser } from '@s/features/user/userActions';
import { useAppDispatch, useAppSelector } from '@/store';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '@/styles/pages/AuthUser.module.scss';
import Head from 'next/head';

type FormMode = 'signIn' | 'signUp';

const AuthUser: NextPage & { noLayout?: boolean } = () => {
	const [email, setEmail] = useState({ value: '', isValid: false });
	const [password, setPassword] = useState({ value: '', isValid: false });
	const [password2, setPassword2] = useState({ value: '', isValid: false });
	const [formMode, setFormMode] = useState<FormMode>('signUp');
	const isFormValid = email.isValid && password.isValid && password2.isValid;
	const [errors, setErrors] = useState(() =>
		initFormErrorsFromState({ email, password, password2 })
	);
	const dispatch = useAppDispatch();
	const router = useRouter();
	useEffect(() => {
		if (formMode === 'signIn') {
			setPassword2({ ...password });
		} else {
			setPassword2({ value: '', isValid: false });
		}
	}, [password, formMode]);

	const validateInputs = (name: string, value: string) => {
		switch (name) {
			case 'email': {
				let isEmailValid = true;
				if (!isValidEmail(value)) {
					setErrors((prev) => ({
						...prev,
						email: [
							...prev.email,
							{
								id: 'emailNotValid',
								message: 'Please enter a valid Email',
							},
						],
					}));
					isEmailValid = false;
				}
				setEmail((prev) => ({ ...prev, value, isValid: isEmailValid }));
				break;
			}
			case 'password': {
				let isPasswordValid = true;
				if (value.length < 6) {
					setErrors((prev) => ({
						...prev,
						password: [
							...prev.password,
							{
								id: 'passwordShort',
								message: `Your password ${
									formMode === 'signIn' ? 'is' : 'must be'
								} 6 letters at least`,
							},
						],
					}));
					isPasswordValid = false;
				}
				setPassword((prev) => ({
					...prev,
					value,
					isValid: isPasswordValid,
				}));
				break;
			}
			case 'password2': {
				let isPassword2Valid = true;
				if (value !== password.value) {
					setErrors((prev) => ({
						...prev,
						password2: [
							...prev.password2,
							{
								id: 'noPasswordsMatch',
								message: 'Password fields must match',
							},
						],
					}));
					isPassword2Valid = false;
				}
				setPassword2((prev) => ({
					...prev,
					value,
					isValid: isPassword2Valid,
				}));
				break;
			}
			default:
				break;
		}
	};

	const handleChange = (e: any) => {
		const { name } = e.target;
		const { value } = e.target;
		setErrors((prev) => ({ ...prev, [name]: [] }));
		validateInputs(name, value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const userCred: IUserCred = {
			email: email.value,
			password: password.value,
		};
		if (formMode === 'signIn') {
			dispatch(signInUser(userCred));
		} else {
			dispatch(signUpUser(userCred));
		}
		router.push('/articles');
	};

	const toggleFormMode = () => {
		setFormMode((prev) => (prev === 'signIn' ? 'signUp' : 'signIn'));
	};

	return (
		<>
			<Head>
				<title>Login/Register | Blog</title>
				<meta
					name='description'
					content="Login to Mo blog, don't have an account? no problem you can get one for free"
				/>
			</Head>
			<main className={`${styles.AuthUser}`}>
				<div className='container'>
					<h1>Login or Register to Continue...</h1>
					<form onSubmit={handleSubmit}>
						<Input
							errors={errors.email}
							name='email'
							onChange={handleChange}
							type='input'
							inputType='email'
							placeholder='Your email is...'
						/>
						<Input
							errors={errors.password}
							name='password'
							onChange={handleChange}
							type='input'
							inputType='password'
							placeholder='Your password is...'
						/>
						{formMode === 'signUp' && (
							<Input
								errors={errors.password2}
								name='password2'
								onChange={handleChange}
								label='Verify your password: '
								type='input'
								inputType='password'
								placeholder='Write Your password again'
							/>
						)}
						<div className={`${styles.AuthUser__buttons}`}>
							<input
								type='submit'
								value={
									formMode === 'signIn'
										? 'Sign in'
										: 'Sign up'
								}
								className='btn btn-primary'
								disabled={!isFormValid}
							/>
							<input
								type='button'
								value={
									formMode === 'signIn'
										? 'Sign up instead'
										: 'Sign in instead'
								}
								className='btn btn-secondary ml-auto'
								onClick={toggleFormMode}
							/>
						</div>
					</form>
				</div>
			</main>
		</>
	);
};

AuthUser.noLayout = true;
export default AuthUser;
