import type { NextComponentType, NextPageContext } from 'next';
import { useEffect, useState } from 'react';
import nprogress from 'nprogress';
import NotificationsSystem, {
	atalhoTheme,
	dismissNotification,
	setUpNotifications,
} from 'reapop';
import { useAppDispatch, useAppSelector } from '@s/index';
import { fetchAllArticles } from '@s/features/articles/articlesActions';
import Head from 'next/head';

const Initializer: NextComponentType = () => {
	const dispatch = useAppDispatch();
	const notifications = useAppSelector((state) => state.notifications);
	const articlesLoading = useAppSelector(
		(state) => state.articlesReducer.loading
	);
	const userLoading = useAppSelector((state) => state.userReducer.loading);
	const loading = articlesLoading || userLoading;
	const token = useAppSelector((state) => state.userReducer.token);

	const [afterHydration, setAfterHydration] = useState(<></>);

	useEffect(() => {
		setUpNotifications({
			defaultProps: {
				position: 'top-right',
				dismissible: true,
			},
		});
		if (token) {
			dispatch(fetchAllArticles());
		}
	}, [dispatch, token]);

	useEffect(() => {
		if (loading) {
			nprogress.start();
		} else {
			nprogress.done();
		}
	}, [loading]);

	useEffect(() => {
		setAfterHydration(
			<NotificationsSystem
				notifications={notifications}
				dismissNotification={(id) => dispatch(dismissNotification(id))}
				theme={atalhoTheme}
			/>
		);
	}, [dispatch, notifications]);

	return (
		<>
			<Head>
				<link rel='shortcut icon' href='/images/blog.png' />
			</Head>
			{afterHydration}
		</>
	);
};

export default Initializer;
