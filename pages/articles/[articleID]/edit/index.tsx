import { NextPage } from 'next';
import ArticlesForm from '@c/articles-form/ArticlesForm';
import Head from 'next/head';

const EditArticle: NextPage = () => {
	return (
		<>
			<Head>
				<title>Edit Article</title>
			</Head>
			<ArticlesForm isNewArticle={false} />
		</>
	);
};

export default EditArticle;
