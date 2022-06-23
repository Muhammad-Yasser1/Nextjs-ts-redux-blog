import { notify } from 'reapop';
import { useAppDispatch } from '@s/index';
import { mode, setMode, userActions } from '@s/features/user/userSlice';
import localStorageApi from '@s/features/user/localStorageApi';
import { useRouter } from 'next/router';
import { NextComponentType, NextPageContext } from 'next';

interface Props {
	mode: mode;
}

const MainNavbar: NextComponentType<NextPageContext, {}, Props> = (
	props: Props
) => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const activateAdminMode = () => {
		dispatch(setMode('Admin'));
	};
	const activateReaderMode = () => {
		dispatch(setMode('Reader'));
	};
	const logout = () => {
		dispatch(userActions.signOut());
		dispatch(notify('You signed out successfully!', 'success'));
		localStorageApi.removeToken();
		router.push('/auth-user');
	};

	const handleNavigate = () => {
		if (window.location.pathname !== '/articles') {
			router.push('/articles');
		}
	};

	return (
		<header>
			<nav className='MainNavbar navbar navbar-expand'>
				<button
					type='button'
					className='navbar-brand'
					onClick={handleNavigate}
				>
					Mo Blog
				</button>

				<ul className='navbar-nav'>
					<li className='btn-group'>
						<button
							type='button'
							className={`btn ${
								props.mode === 'Admin'
									? 'btn-primary'
									: 'btn-secondary'
							}`}
							onClick={activateAdminMode}
						>
							Admin Mode
						</button>
						<button
							type='button'
							className={`btn ${
								props.mode === 'Reader'
									? 'btn-primary'
									: 'btn-secondary'
							}`}
							onClick={activateReaderMode}
						>
							Reader Mode
						</button>
					</li>
					<li>
						<button
							type='button'
							className='btn btn-danger'
							onClick={logout}
						>
							Logout
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavbar;
