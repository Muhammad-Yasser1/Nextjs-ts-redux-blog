import { NextPage } from 'next';
import Link from 'next/link';

const PageNotFound: NextPage = () => {
	return (
		<div className='PageNotFound'>
			<h2>The Page you are looking for wasn&#39;t found</h2>
			<Link href='/home' className='btn btn-outline-primary'>
				Return to Home
			</Link>
		</div>
	);
};

export default PageNotFound;
