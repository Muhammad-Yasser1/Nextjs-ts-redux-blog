import { notify } from 'reapop';
import { Dispatch } from '@reduxjs/toolkit';
import { Article } from '@u/models/Article.model';
import { IArticleToStore } from '@u/interfaces/Article.interface';
import apiClient from '../articlesApiClient';
import { articleActions } from '../articlesSlice';
import store from '@s/index';

export const fetchAll = (dispatch: Dispatch) => {
	return apiClient
		.get<{ [key: string]: Article }>('articles.json')
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
		});
};
export const fetchOne = (id: string, dispatch: Dispatch) => {
	return new Promise<{ statusText: string; data: Article }>((resolve) => {
		setTimeout(
			() =>
				resolve({
					statusText: 'OK',
					data: {
						...store
							.getState()
							.articlesReducer.articles.find(
								(article) => article.id === id
							)!,
					},
				}),
			100
		);
	})
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
		});
};
export const postArticle = (newArticle: Article, dispatch: Dispatch) => {
	return new Promise<{ statusText: string; data: { name: string } }>(
		(resolve) => {
			setTimeout(
				() =>
					resolve({
						statusText: 'OK',
						data: { name: Math.random().toString() },
					}),
				100
			);
		}
	)
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
		});
};

export const putArticle = (
	id: string,
	newArticle: Article,
	dispatch: Dispatch
) => {
	return new Promise<{ statusText: string; data: Article }>((resolve) => {
		setTimeout(() => resolve({ statusText: 'OK', data: newArticle }), 100);
	})
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
		});
};
export const deleteOne = (article: IArticleToStore, dispatch: Dispatch) => {
	return new Promise<{ statusText: string; data: null }>((resolve) => {
		setTimeout(() => resolve({ statusText: 'OK', data: null }), 100);
	})
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
		});
};
