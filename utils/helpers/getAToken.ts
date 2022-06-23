const getAToken = async () => {
	const authRes = await fetch(
		process.env.NEXT_PUBLIC_FIREBASE_SIGNIN_USER_URL!,
		{
			method: 'POST',
			body: JSON.stringify({
				email: process.env.NEXT_PUBLIC_FIREBASE_SIGNIN_EMAIL,
				password: process.env.NEXT_PUBLIC_FIREBASE_SIGNIN_PASSWORD,
				returnSecureToken: true,
			}),
		}
	);
	const authData = await authRes.json();
	return authData.idToken;
};
export default getAToken;
