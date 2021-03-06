import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import './ProductPage.scss'

import { ActionSheetButton } from '@ionic/core';
import { IonActionSheet, IonChip, IonIcon, IonHeader, IonLabel, IonToolbar, IonButtons, IonContent, IonButton, IonBackButton, IonPage } from '@ionic/react'
import { callOutline, callSharp, logoTwitter, logoGithub, logoInstagram, shareOutline, shareSharp, wifi } from 'ionicons/icons';


import { Product } from '../model/Product';
import { getProductById } from '../store/ProductStore';
import { Article } from '../model/Article';
import { useStore } from "../App"


interface OwnProps extends RouteComponentProps {
    id?: string;
};

interface StateProps { };

interface DispatchProps { };

interface productDetailProps extends OwnProps, StateProps, DispatchProps { };

interface ProductPageProp
    extends RouteComponentProps<{
        id: string;
    }> { }

const ProductPage: React.FC<ProductPageProp> = ({ match }) => {
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [actionSheetButtons, setActionSheetButtons] = useState<ActionSheetButton[]>([]);
    const [actionSheetHeader, setActionSheetHeader] = useState('');
    const {addToPortfolio} = useStore();

    const [product, setProduct] = useState<Article>({ id: '1', title: '', summary: '',  date: 'wifi' });

    useEffect(() => {
        getProductById(match.params.id).then(pd => setProduct(pd))
    }, [])


    function openproductShare(product: Product) {
        setActionSheetButtons([
            {
                text: 'Copy Link',
                handler: () => {
                    console.log('Copy Link clicked');
                }
            },
            {
                text: 'Share via ...',
                handler: () => {
                    console.log('Share via clicked');
                }
            },
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }
        ]);
        setActionSheetHeader(`Share ${product.name}`);
        setShowActionSheet(true);
    }



    function openExternalUrl(url: string) {
        window.open(url, '_blank');
    }

    const addCompany=()=>{
        addToPortfolio(String(useStore.getState().companyName))
    }

    if (!match) {
        return <div>product not found</div>
    }

    return (
        <IonPage id="product-detail">
            <IonContent>
                <IonHeader className="ion-no-border">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/" />
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <div className="ion-text-center">
                <div className="product-background" style={{flex:1 ,width: undefined, height: undefined, backgroundImage: `url(${product.image})`}}>
                
                    <h2 style={{backgroundColor: 'rgba(0,0,0, 0.46)', color: 'white'}}>
                    {product.title}</h2>
                </div>
                </div>

                <div className="ion-padding product-detail">
                <div className="ion-text-justify">
                    <p> {product.summary}</p>
                    <p>Source: <a target="_blank" rel="noopener noreferrer" href={product.link}>{product.link}</a></p>
                    {useStore.getState().subscribed === true && (<IonButton slot='end' onClick={addCompany} >Follow</IonButton>)}
                    </div>
                </div>
            </IonContent>
            <IonActionSheet
                isOpen={showActionSheet}
                header={actionSheetHeader}
                onDidDismiss={() => setShowActionSheet(false)}
                buttons={actionSheetButtons}
            />
        </IonPage>
    );
};


export default ProductPage
