import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider,IonIcon, IonButton, IonTabBar, IonTabButton } from '@ionic/react';
import { calendar, people, informationCircle, home, book, albums,logoGoogle } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { getAuth, signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { useStore } from "../App"
import { appAuth} from "../Firebase"

const Auth = getAuth(appAuth);

const Login: React.FC = () => {
  const {setSignedIn, setPortfolio} = useStore();
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
    setPortfolio("")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

  const googleLogin=()=>{
    signInWithPopup(Auth,new GoogleAuthProvider())
    .then(userCredential => {
      console.log(userCredential);
      setSignedIn('true')
      const user = userCredential.user;
      console.log(user)
      window.location.href = "/home?q=Software companies"
      setPortfolio("")
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
        { (useStore.getState().signedInVal === 'false' || useStore.getState().signedInVal === null) &&
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
        <IonIcon icon={logoGoogle} onClick={googleLogin} size="large"/>
        {(useStore.getState().signedInVal === 'true') && <p>Congrats You Have Successfully Signed In!</p>}
      </IonContent>
    </IonPage >
  );
};


export default Login;