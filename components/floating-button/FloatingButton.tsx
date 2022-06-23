import { NextComponentType } from 'next';
import Link from 'next/link';

const FloatingButton: NextComponentType = () => {
	return (
		<Link href='/articles/create'>
			<a className='FloatingButton'>+</a>
		</Link>
	);
};

export default FloatingButton;
