import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '@/store';
import SearchArticles from '@c/search-articles/SearchArticles';
import SortArticles from '@c/sort-articles/SortArticles';

function ArticlesList() {
	const articles = useAppSelector((state) => state.articlesReducer.articles);
	const searchedArticles = useAppSelector(
		(state) => state.articlesReducer.searchedArticles
	);
	const mode = useAppSelector((state) => state.userReducer.mode);

	return (
		<div className='ArticlesList row justify-content-around'>
			<div className='col-12 ArticlesList__ops-row'>
				<SearchArticles debounceTime={500} />
				<SortArticles articles={articles} />
			</div>
			{searchedArticles.map((article) => {
				return (
					<div
						className='card col-10 col-sm-8 col-md-6 col-lg-4'
						key={article.id}
					>
						<Link
							href={{
								pathname:
									mode === 'Reader'
										? `/articles/${article.id}`
										: `/articles/${article.id}/edit`,
							}}
						>
							<Image
								width={200}
								height={650}
								className='card-img-top'
								src={`/images/${article.image}`}
								alt='Article Picture'
							/>
							<div className='title'>{article.title}</div>
							<div className='overlay' />
							<div className='author'>
								{article.updated_at || article.created_at}{' '}
								{article.author && `by ${article.author}`}
							</div>
						</Link>
					</div>
				);
			})}
		</div>
	);
}

export default ArticlesList;
