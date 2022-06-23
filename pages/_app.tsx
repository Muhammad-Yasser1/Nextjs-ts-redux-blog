import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import store from '@s/index';

import '@/styles/globals.scss';
import MainLayout from '@/layouts/main-layout/MainLayout';
import Initializer from '@/components/initializer/Initializer';

const MyApp = ({
	Component,
	pageProps,
}: AppProps & { Component: { noLayout: boolean } }) => {
	if (Component.noLayout) {
		return (
			<Provider store={store}>
				<Initializer />
				<Component {...pageProps} />
			</Provider>
		);
	}

	return (
		<Provider store={store}>
			<Initializer />
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</Provider>
	);
};

export default MyApp;
