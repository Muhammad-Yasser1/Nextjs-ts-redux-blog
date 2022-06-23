import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { IArticleToStore } from '@u/interfaces/Article.interface';
import getAToken from '@u/helpers/getAToken';
import styles from '@/styles/pages/ArticleDetails.module.scss';
interface Props {
	article: IArticleToStore;
}

const ArticleDetails: NextPage<Props> = ({ article }) => {
	return (
		<div className={`${styles.Article} row`}>
			<div className={`col-lg-4 col-md-6 col-9 ${styles.Article__image}`}>
				{article.image && (
					<Image
						width={750}
						height={1050}
						className='img-fluid'
						src={`/images/${article.image}`}
						alt='Article picture'
					/>
				)}
			</div>
			<div
				className={`col-11 col-md-6 col-lg-8 ${styles['Article__text-container']}`}
			>
				<h1 className={`${styles.Article__title}`}>{article.title}</h1>
				<div className={`${styles.Article__meta}`}>
					{article.author && (
						<h6>
							by {article.author} -- {article.updated_at}
						</h6>
					)}
				</div>
				<hr />
				<div className={`${styles.Article__content} card`}>
					<div className='card-body'>
						<blockquote className='blockquote'>
							<p>
								{article.content} {article.content}{' '}
								{article.content} {article.content}
								{article.content} {article.content}{' '}
								{article.content} {article.content}
								{article.content} {article.content}
							</p>
						</blockquote>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const token = await getAToken();
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_FIREBASE_DB_API_URL}articles.json?auth=${token}`
	);
	const articles = await res.json();

	return {
		paths: Object.keys(articles).map((articleID: string) => ({
			params: { articleID },
		})),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const token = await getAToken();
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_FIREBASE_DB_API_URL}articles/${context?.params?.articleID}.json?auth=${token}`
	);
	const article = await res.json();

	return {
		props: { article },
		revalidate: 10,
	};
};

export default ArticleDetails;
