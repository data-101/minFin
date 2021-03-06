import React from "react";
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
import { pin, wifi, wine, warning, walk } from "ionicons/icons";
import { Product } from "../model/Product";
import { Article } from "../model/Article";

interface ProductProps {
  products: Article[];
}

export const ProductList: React.FC<ProductProps> = ({ products }) => {
  const itemList = () => {
    return products.map((product) => (
      <IonItem>
        <IonIcon icon={product.image} slot="start" />
        <IonLabel>{product.title}</IonLabel>
      </IonItem>
    ));
  };

  return (
    <IonContent>
      {/*-- List of Text Items --*/}
      {/* <IonList>
                <IonCard>
                    {itemList()}
                </IonCard>
            </IonList> */}
      <IonGrid fixed>
        <IonRow>
          {products.map((product) => (
            <IonCol size="12" size-md="6" key={product.id}>
              {/* //{" "}
              <IonCard>
                //{" "}
                <IonCardHeader>
                  //{" "}
                  <IonItem
                    button
                    detail={false}
                    lines="none"
                    routerLink={`/product/${product.id}`}
                  >
                    //{" "}
                    <IonAvatar slot="start">
                      // <img src={product.image} alt="Speaker profile pic" />
                      //{" "}
                    </IonAvatar>
                    //{" "}
                    <IonLabel>
                      // <h2>{product.title}</h2>
                      //{" "}
                    </IonLabel>
                    //{" "}
                  </IonItem>
                  //{" "}
                </IonCardHeader>
                //{" "}
              </IonCard> */}
              <IonCard routerLink={`/product/${product.id}`}>
                <img src={product.image} />
                <IonCardHeader>
                  <IonCardTitle>{product.title}</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};
