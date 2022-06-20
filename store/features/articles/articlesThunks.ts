// createAsyncThunk version of the articlesActions file

import { createAsyncThunk } from '@reduxjs/toolkit';
import { articleActions } from './articlesSlice';
import { IArticleToStore } from '@u/interfaces/Article.interface';
import { Article } from '@u/models/Article.model';
import * as articlesAPI from './articlesAPI';

export const fetchAllArticles = createAsyncThunk(
	'articles/fetchArticles',
	async (_, { dispatch }) => {
		const articles: IArticleToStore[] = await articlesAPI.fetchAll(
			dispatch
		);
		dispatch(articleActions.initArticles(articles));
		dispatch(articleActions.setLoading(true));
		return articles;
	}
);

export const fetchArticle = createAsyncThunk(
	'articles/fetchArticle',
	async (id: string, { dispatch }) => {
		const article: IArticleToStore | null = await articlesAPI.fetchOne(
			id,
			dispatch
		);
		if (article) {
			dispatch(articleActions.getArticle(article));
			dispatch(articleActions.setLoading(true));
			return article;
		}
	}
);

export const createArticle = createAsyncThunk(
	'articles/createArticle',
	async (newArticle: Article, { dispatch }) => {
		const article: IArticleToStore | null = await articlesAPI.postArticle(
			newArticle,
			dispatch
		);
		dispatch(articleActions.addArticle(article));
		dispatch(articleActions.setLoading(true));
		return article;
	}
);

export const editArticle = createAsyncThunk(
	'articles/editArticle',
	async (
		{ id, newArticle }: { id: string; newArticle: Article },
		{ dispatch }
	) => {
		const article: IArticleToStore | null = await articlesAPI.putArticle(
			id,
			newArticle,
			dispatch
		);
		if (article) {
			dispatch(articleActions.editArticle(article));
			dispatch(articleActions.setLoading(true));
			return article;
		}
	}
);

export const deleteArticle = createAsyncThunk(
	'articles/deleteArticle',
	async (article: IArticleToStore, { dispatch }) => {
		const deletedArticle: IArticleToStore | null =
			await articlesAPI.deleteOne(article, dispatch);
		dispatch(articleActions.removeArticle(deletedArticle));
		dispatch(articleActions.setLoading(true));
		return deletedArticle;
	}
);
