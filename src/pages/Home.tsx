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
  const {setSignedIn} = useStore();
  const {setcompanyName} = useStore();
  const location = useLocation();

  useEffect(()=>{
    const q=new URLSearchParams(location.search).get('q');
    getProducts(q?q:'').then(products => setProductList(products));
  },[location]);

  const logout=()=>{
    setSignedIn('false')
    window.location.href = "/home?q=Software companies"
  }

  const filter = (e: React.KeyboardEvent<HTMLIonSearchbarElement>) => {
    if (e.key != 'Enter') {
      return;
    }
    window.location.href = "/home?q="+searchText
    setcompanyName(searchText)
  };
  console.log(useStore.getState().portfolio)

  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MinFin</IonTitle>
          {(useStore.getState().signedInVal === 'false' || useStore.getState().signedInVal === null)  && <IonButton slot='end' href='/login'>Sign-in</IonButton>}
          {(useStore.getState().signedInVal === 'true') && <IonButton slot='end' onClick={logout} >Log-out</IonButton>}
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
        {(useStore.getState().signedInVal === 'true') &&
        <IonTabButton tab="portfolio" href="/list">
          <IonIcon icon={albums} />
          <IonLabel>Portfolio</IonLabel>
        </IonTabButton>}
        <IonTabButton tab="news" href="/news">
          <IonIcon icon={book} />
          <IonLabel>News</IonLabel>
        </IonTabButton>
      </IonTabBar> }
    </IonPage >
  );
};

export default Home;
