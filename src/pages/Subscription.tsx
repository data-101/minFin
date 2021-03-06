import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonCardTitle,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  useIonAlert,
} from "@ionic/react";
import { useStore } from "../App";

const Subscription: React.FC = () => {
  const { setSubscribed, signedInVal } = useStore();
  const [present] = useIonAlert();
  const subscribeToPlan = () => {
    if (!signedInVal) {
      present({
        cssClass: "my-css",
        header: "Alert",
        message: "Login Required To purchase subscription plan.",
        buttons: [
          { text: "Ok", handler: (d) => console.log("ok pressed") },
        ],
        onDidDismiss: (e) => console.log("did dismiss"),
      });
    } else {
      setSubscribed(true);
      window.location.href = "/home";
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Subscription</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-text-center">
        <h2>Get started with a MinFin subscription that works for you</h2>

        <IonCard>
          <IonGrid>
            <IonCardHeader>
              <IonRow>
                <IonCol class="ion-text-left">
                  <IonCardTitle>Monthly</IonCardTitle>
                  <IonCardSubtitle>Subscription</IonCardSubtitle>
                </IonCol>
                <IonCol class="ion-text-right">
                  <p>$8/mo</p>
                </IonCol>
              </IonRow>
            </IonCardHeader>
            <IonCardContent class="ion-text-left">
              <IonRow>
                <p>Down from $10/month.</p>
              </IonRow>
              <IonRow>
                <p>
                  <p>
                    Our monthly plan grants access to all premium features, the
                    best plan for short-term subscribers.
                  </p>
                </p>
              </IonRow>
              <IonRow>
                <p>(prices are marked in USD)</p>
              </IonRow>
              <IonRow>
                <IonButton onClick={subscribeToPlan}>Subscribe</IonButton>
              </IonRow>
            </IonCardContent>
          </IonGrid>
        </IonCard>

        <IonCard>
          <IonGrid>
            <IonCardHeader>
              <IonRow>
                <IonCol class="ion-text-left">
                  <IonCardTitle>Yearly</IonCardTitle>
                  <IonCardSubtitle>Subscription</IonCardSubtitle>
                </IonCol>
                <IonCol class="ion-text-right">
                  <p>$60/mo</p>
                </IonCol>
              </IonRow>
            </IonCardHeader>
            <IonCardContent class="ion-text-left">
              <IonRow>
                <p text-wrap>
                  Our most popular plan previously sold for $80 and is now only
                  $5/month. This plan saves you over 40% in comparison to the
                  monthly plan.
                </p>
              </IonRow>
              <IonRow>
                <p>(prices are marked in USD)</p>
              </IonRow>
              <IonRow>
                <IonButton onClick={subscribeToPlan}>Subscribe</IonButton>
              </IonRow>
            </IonCardContent>
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Subscription;
