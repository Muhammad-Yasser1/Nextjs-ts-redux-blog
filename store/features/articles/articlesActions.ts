import { Dispatch } from '@reduxjs/toolkit';
import { articleActions } from './articlesSlice';
import { IArticleToStore } from '@u/interfaces/Article.interface';
import { Article } from '@u/models/Article.model';
// import * as articlesAPI from './articlesAPI';
import * as articlesAPI from './fakingOps/fakeArticlesAPI';

type ArticleOrCaught = IArticleToStore | null;

export const fetchAllArticles = () => async (dispatch: Dispatch) => {
	const articles: IArticleToStore[] = await articlesAPI.fetchAll(dispatch);
	dispatch(articleActions.initArticles(articles));
	return articles;
};

export const fetchArticle = (id: string) => async (dispatch: Dispatch) => {
	const article: ArticleOrCaught = await articlesAPI.fetchOne(id, dispatch);
	if (article) {
		dispatch(articleActions.getArticle(article));
		return article;
	}
};

export const createArticle =
	(newArticle: Article) => async (dispatch: Dispatch) => {
		const article: ArticleOrCaught = await articlesAPI.postArticle(
			newArticle,
			dispatch
		);
		dispatch(articleActions.addArticle(article));
		return article;
	};

export const editArticle =
	({ id, newArticle }: { id: string; newArticle: Article }) =>
	async (dispatch: Dispatch) => {
		const article: ArticleOrCaught = await articlesAPI.putArticle(
			id,
			newArticle,
			dispatch
		);
		if (article) {
			dispatch(articleActions.editArticle(article));
			return article;
		}
	};

export const deleteArticle =
	(article: IArticleToStore) => async (dispatch: Dispatch) => {
		const deletedArticle: ArticleOrCaught = await articlesAPI.deleteOne(
			article,
			dispatch
		);
		dispatch(articleActions.removeArticle(deletedArticle));
		return deletedArticle;
	};
