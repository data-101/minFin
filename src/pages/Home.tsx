import { IonButton, IonContent, IonHeader, IonIcon, IonSegment,
  IonSegmentButton,IonLabel, IonPage, IonSearchbar, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { calendar, people, informationCircle, home, book, albums } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { ProductList } from '../components/ProductList';
import { Product } from '../model/Product';
import { getProducts } from '../store/ProductStore';
import './Home.css';
import { Auth } from 'aws-amplify';
import { Article } from '../model/Article';
import { useLocation } from 'react-router-dom';
import { useStore } from "../App"

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('Software companies');
  const [producList, setProductList] = useState<Article[]>([]);

  const location = useLocation();
  // const [signedIn, setSignedIn] = useState<Boolean>(false);
  useEffect(()=>{
    const q=new URLSearchParams(location.search).get('q');
    getProducts(q?q:'').then(products => setProductList(products));
    // retStatus().then(res => setSignedIn(res));
    // console.log(signedIn,"hola");
  },[location]);


  const filter = (e: React.KeyboardEvent<HTMLIonSearchbarElement>) => {

    if (e.key != 'Enter') {
      return;
    }
    window.location.href = "/home?q="+searchText
  };


  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MinFin</IonTitle>
          {!useStore.getState().signedInVal && <IonButton slot='end' href='/login'>Sign-in</IonButton>}
          {useStore.getState().signedInVal && <IonButton slot='end' href='/login'>Log-out</IonButton>}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">MinFin</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        <IonSearchbar inputmode="search" onIonChange={e => setSearchText(e.detail.value!)} onKeyPress={filter}></IonSearchbar>
        < ProductList products={producList} />
      </IonContent >

      { <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
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

export default Home;
