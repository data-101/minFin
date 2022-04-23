import React, { MouseEventHandler, useState } from "react";
import {
  IonList,
  IonInput,
  IonToggle,
  IonRadio,
  IonCheckbox,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
} from "@ionic/react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { pin, wifi, wine, warning, walk, trash } from "ionicons/icons";
import { Product } from "../model/Product";
import { Article } from "../model/Article";
import { useStore } from "../App";

interface ProductProps {
  products: string[];
}

export const PortfolioList: React.FC<ProductProps> = ({ products }) => {
  const { deletePortfolio } = useStore();


  const deleteCompany = (val: string) => {
    deletePortfolio(val);
    setTimeout(()=>window.location.reload(),300);
  };
  return (
    <IonContent>
      <IonGrid fixed>
        <IonRow>
          {products
            .filter((a) => a != "" && a != "null")
            .map((product) => (
              <IonCol size="12" size-md="6" key={product}>
                <IonCard className="speaker-card">
                  <IonItem
                    // button
                    detail={false}
                    lines="none"
                    className="speaker-item"
                    // routerLink={`/home?q=${product}`}
                  >
                    <IonButton onClick={()=>window.location.href=`/home?q=${product}`} fill="clear">
                      <IonLabel color="dark">
                        <h1>{product}</h1>
                      </IonLabel>
                    </IonButton>
                    <IonButton
                      slot="end"
                      onClick={() => deleteCompany(product)}
                      color="red"
                    >
                      <IonIcon icon={trash} />
                    </IonButton>
                  </IonItem>
                </IonCard>
              </IonCol>
            ))}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
