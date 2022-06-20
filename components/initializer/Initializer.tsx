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

interface Props {}
const Initializer: NextComponentType<NextPageContext, {}, Props> = (
	props: Props
) => {
	const dispatch = useAppDispatch();
	const notifications = useAppSelector((state) => state.notifications);
	const articlesLoading = useAppSelector(
		(state) => state.articlesReducer.loading
	);
	const userLoading = useAppSelector((state) => state.userReducer.loading);
	const loading = articlesLoading || userLoading;
	const token = useAppSelector((state) => state.userReducer.token);

	const [CompTemp, setCompTemp] = useState(<></>);

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
		setCompTemp(
			<NotificationsSystem
				notifications={notifications}
				dismissNotification={(id) => dispatch(dismissNotification(id))}
				theme={atalhoTheme}
			/>
		);
	}, [dispatch, notifications]);

	return CompTemp;
};

export default Initializer;
