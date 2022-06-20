export interface IArticleToSend {
    author: string;
    content: string;
    title: string;
    image: string;
    created_at: string;
    updated_at: string;
}
export interface IArticleToStore extends IArticleToSend {
    id: string;
}
