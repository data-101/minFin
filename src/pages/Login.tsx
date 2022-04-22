import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonItemDivider,
  IonIcon,
  IonButton,
  IonTabBar,
  IonTabButton,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useStore } from "../App";
import { appAuth } from "../Firebase";

const Auth = getAuth(appAuth);

const Login: React.FC = () => {
  const { setSignedIn, setPortfolio, setUid, setName } = useStore();
  const [username, setUsername] = useState<string>();
  const [password, setPasword] = useState<string>();

  const login = () => {
    signInWithEmailAndPassword(Auth, username!, password!)
      .then((userCredential) => {
        console.log(userCredential);
        setSignedIn(true);
        const user = userCredential.user;
        console.log(user.uid);
        setName(String(user.displayName));
        setUid(user.uid);
        setPortfolio(user.uid);
        setTimeout(() => {
          window.location.href = "/home?q=Software companies";
        }, 400);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const googleLogin = () => {
    signInWithPopup(Auth, new GoogleAuthProvider())
      .then((userCredential) => {
        console.log(userCredential);
        setSignedIn(true);
        const user = userCredential.user;
        console.log(user.uid);
        setName(String(user.displayName));
        setUid(user.uid);
        setPortfolio(user.uid);
        setTimeout(() => {
          window.location.href = "/home?q=Software companies";
        }, 400);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {(useStore.getState().signedInVal === false ||
          useStore.getState().signedInVal === null) && (
          <IonList>
            {/* <IonItemDivider>Default Input with Placeholder</IonItemDivider> */}
            <IonItem>
              <IonInput
                value={username}
                placeholder="Enter Username"
                onIonChange={(e) => setUsername(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                value={password}
                placeholder="Enter Password"
                type="password"
                onIonChange={(e) => setPasword(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonButton onClick={login}>Submit</IonButton>
          </IonList>
        )}
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            -----------------------------------------------
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonButton onClick={googleLogin} fill="outline">
              <IonIcon icon={logoGoogle} size="large" />
            </IonButton>
          </IonRow>
        </IonGrid>
        {useStore.getState().signedInVal === true && (
          <p>Congrats You Have Successfully Signed In!</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Login;