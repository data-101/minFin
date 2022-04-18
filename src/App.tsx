import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ProductPage from './pages/ProductPage';
import Test from './pages/Test';
import ItemList from './pages/ItemList';
import Login from './pages/Login';
import News from './pages/News';
import create from 'zustand'
import { Article } from './model/Article';

export const useStore = create((set:any) => ({
  name: localStorage.getItem('name'),
  portfolio: localStorage.getItem('portfolio'),
  subscribed: localStorage.getItem('subscribed'),
  signedInVal: localStorage.getItem('signedIn'),
  companyName: localStorage.getItem('companyName'),
  products: [] as Article[],
  setSignedIn:(val:string)=> set(() => {
      localStorage.setItem('signedIn', val)
      return val;
    }),
  setName:(val:string)=> set(() => {
      localStorage.setItem('name', val)
      return val;
    }),
  setPortfolio:(val:string)=> set(() => {
      val = val.toLowerCase()
      localStorage.setItem('portfolio', val)
      return val;
    }),
  deletePortfolio:(val:string)=> set(() => {
      val = val.toLowerCase()
      var x = ""
      x = String(useStore.getState().portfolio)
      var y = x.split(',')
      if(y.includes(val)){
        const index = y.indexOf(val, 0);
        y.splice(index, 1);
        var ret = ""
        for (var i of y){
          ret += i + ','
        }
        localStorage.setItem('portfolio', ret)
      }
      return val;
    }),
  addToPortfolio:(val='')=> set(() => {
      val = val.toLowerCase()
      var x = ""
      x = String(useStore.getState().portfolio)
      if(x.split(',').includes(val)){
        return val
      }
      x = x + "," + val
      localStorage.setItem('portfolio', x)
      return x;
    }),
  setSubscribed:(val:string)=> set(() => {
      localStorage.setItem('subscribed', val)
      return val;
    }),
  setcompanyName:(val:string)=> set(() => {
      localStorage.setItem('companyName', val)
      return val;
    }),
}))

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/product/:id" component={ProductPage} exact={true} />
        <Route exact path="/test">
          <Test />
        </Route>
        <Route exact path="/list">
          <ItemList />
        </Route>
        <Route exact path="/news">
          <News />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Redirect to="/home?q=Software companies" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
