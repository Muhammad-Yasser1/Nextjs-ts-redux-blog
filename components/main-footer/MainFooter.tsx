import Image from 'next/image';

function MainFooter() {
	return (
		<footer className='MainFooter text-center'>
			<div className='MainFooter__content'>
				Made with&nbsp;
				<Image
					src={'/images/heart.png'}
					className='img-fluid'
					alt='heart'
					width={50}
					height={50}
				/>
				&nbsp;by
				<span> React</span> &amp;
				<span> Firebase</span>
			</div>
		</footer>
	);
}

export default MainFooter;
