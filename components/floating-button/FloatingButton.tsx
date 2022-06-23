import Link from 'next/link';

function FloatingButton() {
	return (
		<Link href='/articles/create'>
			<a className='FloatingButton'>+</a>
		</Link>
	);
}

export default FloatingButton;
