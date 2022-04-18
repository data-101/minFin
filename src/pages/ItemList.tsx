import { IonContent, IonFooter, IonHeader, IonIcon, IonLabel, IonPage, IonSearchbar, IonTabBar, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { calendar, people, informationCircle, home, book, albums } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import { ProductList } from '../components/ProductList';
import { getProducts } from '../store/ProductStore';
import './Home.css';
import { Article } from '../model/Article';
import { PortfolioList } from '../components/PortfolioList';
import { useStore } from "../App"
import { stat } from 'fs';

const ItemList: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [producList, setProductList] = useState<string[]>([]);
    useEffect(() => {
      // const portfolioLs = useStore.getState().signedInVal
      // getProducts(searchText).then(products => setProductList(products));
      }, []);
    // const updateList = ()=>{
    //   setProductList(String(useStore.getState().portfolio).split(',')); 
    // }
    // useStore.s(state => state.portfolio, updateList)
    // useStore.subscribe(updateList)
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Your Portfolio</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Your Portfolio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        {/* <IonSearchbar inputmode="search" onIonChange={e => setSearchText(e.detail.value!)} onKeyPress={filter}></IonSearchbar> */}
        < PortfolioList products={String(useStore.getState().portfolio).split(',')} />
      </IonContent >

        { <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home?q=Software companies">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="portfolio" href="/list">
          <IonIcon icon={albums} />
          <IonLabel>Portfolio</IonLabel>
        </IonTabButton>
        <IonTabButton tab="news" href="/news">
          <IonIcon icon={book} />
          <IonLabel>News</IonLabel>
        </IonTabButton>
      </IonTabBar> }
    </IonPage >

    );
    
};

export default ItemList;
