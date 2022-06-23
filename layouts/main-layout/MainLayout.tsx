import FloatingButton from '@c/floating-button/FloatingButton';
import MainFooter from '@c/main-footer/MainFooter';
import MainNavbar from '@c/main-navbar/MainNavbar';
import Modal from '@/components/modal/Modal';
import { useAppSelector } from '@/store';
import { NextComponentType, NextPageContext } from 'next';
import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Props extends PropsWithChildren {}

const MainLayout: NextComponentType<NextPageContext, {}, Props> = (
	props: Props
) => {
	const isAuth = useAppSelector((state) => state.userReducer.isAuth);
	const mode = useAppSelector((state) => state.userReducer.mode);
	const router = useRouter();

	useEffect(() => {
		if (!isAuth) {
			router.push('/auth-user');
		}
	}, [isAuth, router]);

	return isAuth ? (
		<>
			<MainNavbar mode={mode} />

			{mode !== 'Reader' && <FloatingButton />}

			<Modal mode={mode} />

			<main className='container-fluid'>{props.children}</main>

			<MainFooter />
		</>
	) : (
		<></>
	);
};

export default MainLayout;
