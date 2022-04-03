export interface FreeNewsResponse {
    status: string;
    total_hits: number;
    page: number;
    total_pages: number;
    page_size: number;
    articles: FreeNewsArticle[];
    user_input: UserInput;
}

export interface FreeNewsArticle {
    title: string;
    author: null | string;
    published_date: string;
    published_date_precision: string;
    link: string;
    clean_url: string;
    summary: string;
    rights: string;
    rank: number;
    topic: string;
    country: string;
    language: string;
    authors: string[];
    media: string;
    is_opinion: boolean;
    twitter_account: null | string;
    _score: number;
    _id: string;
}



export interface UserInput {
    q: string;
    lang: string;
    from: Date;
    sort_by: string;
    page: number;
    size: number;
}
