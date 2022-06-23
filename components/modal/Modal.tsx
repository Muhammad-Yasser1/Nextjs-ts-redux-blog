import { useEffect, useState } from 'react';
import { mode } from '@s/features/user/userSlice';
import { NextComponentType, NextPageContext } from 'next';

interface Props {
	mode: mode;
}
const Modal: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
	const [showModal, setShowModal] = useState(false);
	const [highModal, setHighModal] = useState(false);
	useEffect(() => {
		if (props.mode === 'Admin') {
			setShowModal(true);
			setHighModal(true);
		}
	}, [props.mode]);
	const handleClose = () => {
		setShowModal(false);
		setTimeout(() => {
			setHighModal(false);
		}, 400);
	};

	const handleEscapePress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Escape') {
			handleClose();
		}
	};

	return (
		<div
			onKeyPress={handleEscapePress}
			onClick={handleClose}
			className={`modal fade ${showModal ? 'show' : ''} ${
				highModal ? 'high' : ''
			}`}
			tabIndex={-1}
			role='banner'
		>
			<div
				className='modal-dialog'
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title text-danger'>
							Important !!
						</h5>
						<button
							type='button'
							className='close'
							onClick={handleClose}
						>
							<span>&times;</span>
						</button>
					</div>
					<div className='modal-body'>
						your changes won&#39;t be committed to the database,
						they will be handled on frontend, the difference is that
						no permanent changes can be done (only get requests get
						sent), you can find all requests in the articlesAPI.ts
						file if you want to check them.
						<br />
						<br />I did so to prevent messing around by deleting all
						of the articles or writing some funny language.
						<br />
						<br />
						in other words: you are the one refresh admin now, peace
						:)
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
