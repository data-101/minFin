import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import ProductPage from "./pages/ProductPage";
import Test from "./pages/Test";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import News from "./pages/News";
import create from "zustand";
import { Article } from "./model/Article";
import { home, albums, book } from "ionicons/icons";

interface AppState {
  name: string;
  portfolio: string[];
  subscribed: string;
  signedInVal: boolean;
  products: Article[];
  companyName: string;
  setSignedIn: (val: boolean) => void;
  setName: (val: string) => void;
  setPortfolio: (val: []) => void;
  deletePortfolio: (val: string) => void;
  addToPortfolio: (val: string) => void;
  setSubscribed: (val: string) => void;
  setcompanyName: (val: string) => void;
}

export const useStore = create<AppState>((set) => ({
  name: String(localStorage.getItem("name")),
  portfolio: JSON.parse(String(localStorage.getItem("portfolio"))),
  subscribed: String(localStorage.getItem("subscribed")),
  signedInVal: Boolean(JSON.parse(String(localStorage.getItem("signedIn")))),
  companyName: String(localStorage.getItem("companyName")),
  products: [] as Article[],
  setSignedIn: (val: boolean) =>
    set((state) => {
      localStorage.setItem("signedIn", JSON.stringify(val));
    }),
  setName: (val: string) =>
    set(() => {
      localStorage.setItem("name", val);
    }),
  setPortfolio: (val: []) =>
    set(() => {
      localStorage.setItem("portfolio", JSON.stringify(val));
    }),
  deletePortfolio: (val: string) =>
    set((state) => {
      val = val.toLowerCase();
      var x = state.portfolio?state.portfolio:[];
      x.splice(x.indexOf(val), 1);
      localStorage.setItem("portfolio", JSON.stringify(x));
    }),
  addToPortfolio: (val = "") =>
    set((state) => {
      val = val.toLowerCase();
      console.log(state.portfolio);
      var x = state.portfolio? state.portfolio:[];
      x.push(val);
      localStorage.setItem("portfolio", JSON.stringify(x));
    }),
  setSubscribed: (val: string) =>
    set(() => {
      localStorage.setItem("subscribed", val);
    }),
  setcompanyName: (val: string) =>
    set(() => {
      localStorage.setItem("companyName", val);
    }),
}));

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/product/:id" component={ProductPage} exact={true} />
          <Route exact path="/test">
            <Test />
          </Route>
          <Route exact path="/list">
            <Portfolio />
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
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          {useStore.getState().signedInVal === true && (
            <IonTabButton tab="portfolio" href="/list">
              <IonIcon icon={albums} />
              <IonLabel>Portfolio</IonLabel>
            </IonTabButton>
          )}
          <IonTabButton tab="news" href="/news">
            <IonIcon icon={book} />
            <IonLabel>News</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
