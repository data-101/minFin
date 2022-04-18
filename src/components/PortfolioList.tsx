import React, { MouseEventHandler } from 'react';
import { IonList, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonGrid, IonRow, IonCol, IonAvatar } from '@ionic/react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { pin, wifi, wine, warning, walk, trash } from 'ionicons/icons';
import { Product } from '../model/Product';
import { Article } from '../model/Article';
import { useStore } from '../App';


interface ProductProps {
    products: string[];
}

export const PortfolioList: React.FC<ProductProps> = ({ products }) => {

    // const itemList = () => {
    //     return products.map((product) => (
    //         <IonItem>
    //             <IonIcon icon={product.image} slot="start" />
    //             <IonLabel>{product.title}</IonLabel>
    //         </IonItem>
    //     )
        // )
    // }
    const {deletePortfolio} = useStore();
    
    const deleteCompany=(val:string)=>{
        deletePortfolio(val)
    }
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
                    {products.filter(a=> a!='' && a!='null').map(product => (
                        <IonCol size="12" size-md="6" key={product}>
                            <IonCard className="speaker-card">
                                <IonCardHeader>
                                    <IonItem button detail={false} lines="none" className="speaker-item" routerLink={`/home?q=${product}`}>
                                        {/* <IonAvatar slot="start">
                                            <img src={product.image} alt="Speaker profile pic" />
                                        </IonAvatar> */}
                                        <IonLabel>
                                            <h2>{product}</h2>
                                        </IonLabel>
                                        <IonIcon onClick={()=>deleteCompany(product)} icon={trash} />
                                    </IonItem>
                                </IonCardHeader>
                            </IonCard>
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>
        </IonContent >
    )
};