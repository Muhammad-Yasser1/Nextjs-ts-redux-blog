import { NextPage } from 'next';
import Link from 'next/link';
import styles from '@/styles/pages/404.module.scss';

const PageNotFound: NextPage = () => {
	return (
		<div className={styles.PageNotFound}>
			<h2>The Page you are looking for wasn&#39;t found</h2>
			<Link href='/articles' className='btn btn-outline-primary'>
				Return to Home
			</Link>
		</div>
	);
};

export default PageNotFound;
