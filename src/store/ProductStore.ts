import { ProductList } from "../components/ProductList";
import { Article } from "../model/Article";
import { EdamanObject } from "../model/FoodAPI";
import { Product } from "../model/Product";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { FreeNewsResponse } from "../model/FreeNewsResponse";
import { GoogleNewsResponse } from "../model/GoogleNewsResponse";
import { UserPortfolio } from "../model/UserPortfolio";
import { alertCircle } from "ionicons/icons";


import create from 'zustand'

const useStore = create(() => ({
    products: [] as Article[]
}))


const products: Article[] = [
    {
        "id": "1",
        "title": "Apple",
        "date": "Fri, March 4, 2022",
        "summary": "Tech giants like Apple and Microsoft are pulling out of sales in Russia. They're doing it for humanitarian reasons, but also because it's the right thing to do. It gives them a boost when it comes to their moral standing in the business community and for potential customers.",
        "image": "https://i.insider.com/5fe4d819edf8920018093b41?width=1200&format=jpeg"
    },
    {
        "title": "Microsoft",
        "date": "Fri, March 4, 2022",
        "summary": "Grammarly has suspended its services in Russia and Belarus. It will donate all revenue earned from those countries through 2022 to Ukrainian causes. The company's founders say they are \"devastated by the war against our home country,\" but fear for the people of Ukraine. Grammarly is one of a handful of high-profile software firms founded in Ukraine. It has created an in-product feature activated whenever a customer writes about Ukraine. The company has offered its premium product free of charge to trusted media outlets reporting on the war in English.",
        "id": "2"
    },
    {
        "title": "Facebook",
        "date": "Thu, March 10, 2022",
        "summary": "Russia on Thursday shifted its stance over the bombing of a Ukrainian hospital in the city of Mariupol, with a mix of statements that veered between aggressive denials and a call by the Kremlin to establish clear facts.\nAnd the military are very likely to provide some information.\n \"This is information terrorism,\" foreign ministry spokeswoman Maria Zakharova said.\nForeign Minister Sergei Lavrov attacked what he called \"pathetic shouting about so-called atrocities by the Russian armed forces\"\nKyiv and the West reject these as false pretexts for an invasion of a democratic country of 44 million people.",
        "id": "3"
    },
    {
        "title": "Netflix",
        "date": "Wed, March 9, 2022",
        "summary": "One of the most stubborn (by his own admission) Netflix bears, Wedbush Securities analyst Michael Pachter, has issued a landmark upgrade on the streaming giant’s stock.I thought they were close to saturated in the U.S. … They just keep adding people.\"\nPrior to its success with original content, Netflix subscribers were offered full seasons of television series that had already appeared on broadcast networks.\n \"Theoretically, a subscriber who watches only a handful of Netflix originals can join for six months and quit for six months,\" he wrote, \"and if this becomes the norm, churn will increase and net subscriber additions will slow to a crawl.\"",
        "id": "4"
    },
    {
        "title": "Alphabet",
        "date": "Tue, March 8, 2022",
        "summary": "Another analyst slashed his price target for shares of Facebook parent Meta Platforms, but it's still trading significantly below consensus expectations.\nThomas Champion of Piper Sandler cut his target to $240 from $301 but maintained a Neutral rating.\nMeta shares (ticker: FB) have shed 43 percent of their value in 2022 alone. The stock closed up 1.5%, to $190.29, in Tuesday trading.",
        "id": "5"
    }
]
export const getProducts = async (searchText: string = ''): Promise<Article[]> => {
    console.log(searchText)
    if (searchText === '') {
        return products
    }

    const options: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://free-news.p.rapidapi.com/v1/search',
        params: { q: `${searchText} stock`, lang: 'en' },
        headers: {
            'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
            'X-RapidAPI-Key': 'e3cd6237d0msh226bc6d68b84f2cp1af7e3jsn6b83c2fb2e63'
        }
    };

    const hello = await axios.request<FreeNewsResponse>(options).then(function (response: AxiosResponse<FreeNewsResponse>) {
        // console.log(response.data);
        const art: Article[] = response.data.articles.map<Article>(value => ({
            "title": value.title,
            "date": value.published_date,
            "summary": value.summary,
            "id": value._id,
            "image": value.media,
            "link":value.link,
        }));
        return art;
    }).catch(function (error: any) {
        return [] as Article[];
    });

    useStore.setState({ products: hello })
    return hello;
    // return products.filter((product) => {
    //     return product.name.toLowerCase().startsWith(searchText.toLowerCase());
    // });
}

export const getProductById = async (id: string): Promise<Article> => {
    // console.log(products);
    // return products.filter(p => p.id === id)[0]
    return useStore.getState().products.filter(p => p.id === id)[0];
}

// export const getPortfolio = async (searchText: string = ''): Promise<Article> => {
//     // export const getProducts = async (searchText: string = ''): Promise<Article[]> => {
//     // console.log(searchText)
//     if (searchText === '') {
//         return products;
//     }
//     // var request = require('request');
//     // var request = require('request');
//     var headers = {
//         'Cookie': 'session=eyJ1c2VyIjoidXNlciJ9.YkeZcQ.naM5IDGcq8jDai5-H2M1hP5maPs'
//     };

//     var options = {
//         url: 'passwords-ssh.id0.one:8080/portfolio',
//         headers: headers
//     };

//     // function callback(response) {
//     //     if (!error && response.statusCode == 200) {
//     //         return response
//     //     }
//     // }
//     // axios.request(options);

//     const hello = await axios.request<FreeNewsResponse>(options).then(function (response: AxiosResponse<FreeNewsResponse>) {
//             // console.log(response.data);
//             const art: Article[] = response.data.articles.map<Article>(value => ({
//                 "title": value.title,
//                 "date": value.published_date,
//                 "summary": value.summary,
//                 "id": value._id,
//                 "image": value.media
//             }));
//             return art;
//         }).catch(function (error: any) {
//             return [] as Article[];
//         });

//     // const hello = await axios.request<UserPortfolio>(options).then(function (response: AxiosResponse<UserPortfolio>) {
//     //     const art: UserPortfolio = response;
//     //     // console.log(response.data);
//     //     return art;
//     // });
//     // const hei: Article[] = hello.map<Article>
//     // useStore.setState({ products: hello })
//     return hello;
//     // return products.filter((product) => {
//     //     return product.name.toLowerCase().startsWith(searchText.toLowerCase());
//     // });
// }