import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider,IonIcon, IonButton, IonTabBar, IonTabButton } from '@ionic/react';
import { calendar, people, informationCircle, home, book, albums } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useStore } from "../App"
import { appAuth} from "../Firebase"

const Auth = getAuth(appAuth);

const Login: React.FC = () => {
  const {setSignedIn} = useStore();
  const [username, setUsername] = useState<string>();
  const [password, setPasword] = useState<string>();


  const login=()=>{
    signInWithEmailAndPassword(Auth, username!, password!)
  .then(userCredential => {
    console.log(userCredential);
    setSignedIn('true')
    const user = userCredential.user;
    console.log(user)
    window.location.href = "/home?q=Software companies"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        { (useStore.getState().signedInVal === 'false') &&
        <IonList>
          {/* <IonItemDivider>Default Input with Placeholder</IonItemDivider> */}
          <IonItem>
            <IonInput value={username} placeholder="Enter Username" onIonChange={e => setUsername(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput value={password} placeholder="Enter Password" type="password" onIonChange={e => setPasword(e.detail.value!)}></IonInput>
          </IonItem>
        <IonButton onClick={login}>Submit</IonButton>
        </IonList>
        }
        {(useStore.getState().signedInVal === 'true') && <p>Congrats You Have Successfully Signed In!</p>}
      </IonContent>
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


export default Login;