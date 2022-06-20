import { formatDate } from '../helpers/formatDate';
import { IArticleToSend } from '../interfaces/Article.interface';

interface PassedArticle {
    title: string;
    content: string;
    author: string;
    image: string;
    created_at?: string;
}

const defaultPassedProps: PassedArticle = {
    title: '',
    content: '',
    author: '',
    image: '',
};

export class Article implements IArticleToSend {
    created_at: string;

    updated_at: string = formatDate();

    image: string;

    title: string;

    content: string;

    author: string;

    constructor(article = defaultPassedProps) {
        this.title = article.title;
        this.content = article.content;
        this.author = article.author;
        this.image = article.image || 'default-image.jpeg';
        this.created_at = article.created_at || formatDate(); // will be passed only in case of editing an article
    }
}
