import { IonContent, IonFooter, IonHeader, IonIcon, IonLabel, IonPage, IonSearchbar, IonTabBar, IonTabButton, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
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

const Portfolio: React.FC = () => {
    const [producList, setProductList] = useState<string[]>([]);

      useIonViewWillEnter(()=>{
        setProductList(JSON.parse(String(localStorage.getItem('portfolio'))));
      })

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
        < PortfolioList products={producList} />
      </IonContent >
    </IonPage >

    );
    
};

export default Portfolio;
