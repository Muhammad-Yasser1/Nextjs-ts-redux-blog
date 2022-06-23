import { NextPage } from 'next';
import ArticlesList from '@c/articles-list/ArticlesList';
import Head from 'next/head';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Home</title>
				<meta
					name='description'
					content='Keep yourself updated with technology by studying top-quality tuts and articles'
				/>
			</Head>
			<ArticlesList />
		</>
	);
};

export default Home;
