import { useEffect, useState } from 'react';
import { IArticleToStore } from '@u/interfaces/Article.interface';
import { useAppDispatch } from '@s/index';
import { articleActions, sortTypes } from '@s/features/articles/articlesSlice';

interface Props {
	articles: IArticleToStore[];
}

const SortArticles = ({ articles }: Props) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [currentSortType, setCurrentSortType] = useState<sortTypes>('oldest');

	const dispatch = useAppDispatch();

	const toggleDropdown = () => {
		setShowDropdown((prev) => !prev);
	};

	const handleSort = (sortType: sortTypes) => {
		setCurrentSortType(sortType);
		setShowDropdown(false);
	};

	useEffect(() => {
		if (articles.length) {
			dispatch(articleActions.sortArticles(currentSortType));
		}
	}, [articles, currentSortType, dispatch]);

	useEffect(() => {
		localStorage.setItem('currentSortType', currentSortType);
	}, [currentSortType]);

	useEffect(() => {
		setCurrentSortType(
			localStorage.getItem('currentSortType') as sortTypes
		);
	}, []);

	return (
		<div className='SortArticles'>
			<div className={`dropdown ${showDropdown ? 'show' : ''}`}>
				<button
					onClick={toggleDropdown}
					className='btn btn-outline-primary dropdown-toggle'
					type='button'
					aria-haspopup='true'
					aria-expanded={showDropdown}
				>
					Sort articles
				</button>
				<div
					className={`dropdown-menu dropdown-menu-right ${
						showDropdown ? 'show' : ''
					}`}
				>
					<button
						className={`dropdown-item ${
							currentSortType === 'a-z' ? 'active' : ''
						}`}
						type='button'
						onClick={() => handleSort('a-z')}
					>
						From A to Z
					</button>
					<button
						className={`dropdown-item ${
							currentSortType === 'z-a' ? 'active' : ''
						}`}
						type='button'
						onClick={() => handleSort('z-a')}
					>
						From Z to A
					</button>
					<button
						className={`dropdown-item ${
							currentSortType === 'recent' ? 'active' : ''
						}`}
						type='button'
						onClick={() => handleSort('recent')}
					>
						Recent first
					</button>
					<button
						className={`dropdown-item ${
							currentSortType === 'oldest' ? 'active' : ''
						}`}
						type='button'
						onClick={() => handleSort('oldest')}
					>
						Old first
					</button>
				</div>
			</div>
		</div>
	);
};

export default SortArticles;
