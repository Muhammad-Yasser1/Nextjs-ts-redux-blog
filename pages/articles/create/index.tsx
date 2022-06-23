import { NextPage } from 'next';
import ArticlesForm from '@c/articles-form/ArticlesForm';

const CreateArticle: NextPage = () => {
	return <ArticlesForm isNewArticle />;
};

export default CreateArticle;
