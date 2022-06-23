import { NextPage } from 'next';
import ArticlesForm from '@c/articles-form/ArticlesForm';
import Head from 'next/head';

const CreateArticle: NextPage = () => {
	return (
		<Head>
			<title>Create a new article</title>
			<ArticlesForm isNewArticle />
		</Head>
	);
};

export default CreateArticle;
