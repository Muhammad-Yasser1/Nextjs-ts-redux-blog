import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import store from '@s/index';

import '@/styles/globals.scss';

import MainLayout from '@/layouts/main-layout/MainLayout';
import Initializer from '@c/initializer/Initializer';

type Props = AppProps & { Component: { noLayout: boolean } };

const MyApp = ({ Component, pageProps }: Props) => {
	return (
		<Provider store={store}>
			<Initializer />
			{Component.noLayout ? (
				<Component {...pageProps} />
			) : (
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			)}
		</Provider>
	);
};

export default MyApp;
