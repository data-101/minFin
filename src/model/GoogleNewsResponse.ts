export interface GoogleNewsResponse {
    feed: string;
    articles: GoogleNewsArticle[];
}

export interface GoogleNewsArticle {
    id: string;
    title: string;
    link: string;
    published: string;
    sub_articles: string;
    source: string;
}