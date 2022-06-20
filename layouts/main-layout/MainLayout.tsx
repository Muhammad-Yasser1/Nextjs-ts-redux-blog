import FloatingButton from '@c/floating-button/FloatingButton';
import MainFooter from '@c/main-footer/MainFooter';
import MainNavbar from '@c/main-navbar/MainNavbar';
import Modal from '@/components/modal/Modal';
import { useAppSelector } from '@/store';

const MainLayout = (props: any) => {
	const mode = useAppSelector((state) => state.userReducer.mode);
	return (
		<>
			<MainNavbar mode={mode} />

			{mode !== 'Reader' && <FloatingButton />}

			<Modal mode={mode} />

			<main className='container-fluid'>{props.children}</main>

			<MainFooter />
		</>
	);
};

export default MainLayout;
