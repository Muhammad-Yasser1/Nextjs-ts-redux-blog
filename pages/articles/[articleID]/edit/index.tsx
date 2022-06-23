import { NextPage } from 'next';
import ArticlesForm from '@c/articles-form/ArticlesForm';

const EditArticle: NextPage = () => {
	return <ArticlesForm isNewArticle={false} />;
};

export default EditArticle;
