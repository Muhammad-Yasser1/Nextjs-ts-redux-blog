import { notify } from 'reapop';
import { Dispatch } from '@reduxjs/toolkit';
import { Article } from '@u/models/Article.model';
import { IArticleToStore } from '@u/interfaces/Article.interface';
import apiClient from './articlesApiClient';
import { articleActions } from './articlesSlice';

type RawArticles = { [key: string]: Article };
type IdOfCreated = { name: string };

export const fetchAll = (dispatch: Dispatch) => {
	dispatch(articleActions.setLoading(true));
	return apiClient
		.get<RawArticles>('articles.json')
		.then((res) => {
			if (res.statusText === 'OK') {
				const articles: IArticleToStore[] = [];
				for (const key in res.data) {
					if (Object.prototype.hasOwnProperty.call(res.data, key)) {
						const article = res.data[key];
						articles.push({ id: key, ...article });
					}
				}
				return articles;
			}
			dispatch(
				notify("articles wasn't fetched due to network error", 'error')
			);
			throw new Error('Network error');
		})
		.catch((err) => {
			console.log(err);
			dispatch(notify(err.message, 'error'));
			return [];
		})
		.finally(() => {
			dispatch(articleActions.setLoading(false));
		});
};
export const fetchOne = (id: string, dispatch: Dispatch) => {
	dispatch(articleActions.setLoading(true));
	return apiClient
		.get<Article>(`articles/${id}.json`)
		.then((res) => {
			if (res.statusText === 'OK') {
				if (res.data === null) {
					dispatch(articleActions.wasArticleFound(false));
					dispatch(
						notify('no article with this id was found', 'error')
					);
					return null;
				}
				dispatch(articleActions.wasArticleFound(true));
				return { ...res.data, id };
			}
			dispatch(articleActions.wasArticleFound(false));
			dispatch(
				notify("article wasn't fetched due to network error", 'error')
			);
			throw new Error('Network error');
		})
		.catch((err) => {
			dispatch(articleActions.wasArticleFound(false));
			dispatch(notify(err.message, 'error'));
			console.log(err);
			return null;
		})
		.finally(() => {
			dispatch(articleActions.setLoading(false));
		});
};
export const postArticle = (newArticle: Article, dispatch: Dispatch) => {
	dispatch(articleActions.setLoading(true));
	return apiClient
		.post<IdOfCreated>('articles.json', { ...newArticle })
		.then((res) => {
			if (res.statusText === 'OK') {
				dispatch(
					notify(
						`The "${newArticle.title}" article was created successfully`,
						'success'
					)
				);
				return { id: res.data.name, ...newArticle };
			}
			dispatch(
				notify(
					`The "${newArticle.title}" article wasn't created due to network error`,
					'error'
				)
			);
			throw new Error('Network Error');
		})
		.catch((err) => {
			dispatch(notify(err.message, 'error'));
			console.log(err);
			return null;
		})
		.finally(() => {
			dispatch(articleActions.setLoading(false));
		});
};

export const putArticle = (
	id: string,
	newArticle: Article,
	dispatch: Dispatch
) => {
	dispatch(articleActions.setLoading(true));
	return apiClient
		.put<Article>(`articles/${id}.json`, { ...newArticle })
		.then((res) => {
			if (res.statusText === 'OK') {
				if (res.data === null) {
					dispatch(articleActions.wasArticleFound(false));
					dispatch(
						notify('no article with this id was found', 'error')
					);
					return null;
				}
				dispatch(articleActions.wasArticleFound(true));
				dispatch(
					notify(
						`The "${res.data.title}" article was edited successfully`,
						'success'
					)
				);
				return { ...res.data, id };
			}
			dispatch(articleActions.wasArticleFound(false));
			dispatch(
				notify(
					`The "${res.data.title}" article wasn't edited due to network error`,
					'error'
				)
			);
			throw new Error('Network error');
		})
		.catch((err) => {
			dispatch(articleActions.wasArticleFound(false));
			dispatch(notify(err.message, 'error'));
			console.log(err);
			return null;
		})
		.finally(() => {
			dispatch(articleActions.setLoading(false));
		});
};
export const deleteOne = (article: IArticleToStore, dispatch: Dispatch) => {
	dispatch(articleActions.setLoading(true));
	return apiClient
		.delete<null>(`articles/${article.id}.json`)
		.then((res) => {
			if (res.statusText === 'OK') {
				dispatch(
					notify(
						`The "${article.title}" article was deleted successfully`,
						'success'
					)
				);
				return article;
			}
			dispatch(
				notify(
					`The "${article.title}" article wasn't deleted due to network error`,
					'error'
				)
			);
			throw new Error('Network error');
		})
		.catch((err) => {
			dispatch(notify(err.message, 'error'));
			console.log(err);
			return null;
		})
		.finally(() => {
			dispatch(articleActions.setLoading(false));
		});
};
