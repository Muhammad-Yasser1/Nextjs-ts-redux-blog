import Link from 'next/link';

function FloatingButton() {
	return (
		<Link href='/articles/create' className='FloatingButton'>
			<a>+</a>
		</Link>
	);
}

export default FloatingButton;
