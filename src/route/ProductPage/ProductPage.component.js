
 import { lazy, Suspense } from 'react';
 
 import ContentWrapper from 'Component/ContentWrapper';
 import Loader from 'Component/Loader/Loader.component';

 import ProductActions from 'Component/ProductActions';

 
 export const ProductGallery = lazy(() => import(
     'Component/ProductGallery'
 ));


import { ProductPage as SourceProductPage } from 'SourceRoute/ProductPage/ProductPage.component'

export class ProductPage extends  SourceProductPage {

    state={
        price: null
    }


    renderProductPageContent() {
        const {
            getLink,
            dataSource,
            areDetailsLoaded,
            activeProduct,
            setActiveProduct,
            useEmptyGallerySwitcher,
            parameters,
            isVariant
        } = this.props;

      const {
      price_range:{
        maximum_price:{
           final_price:{
                value
            }
        }
      }
          

      } = activeProduct;
        console.log(activeProduct,"<>>>>>");
        this.setState({price:value})

        return (
            <>
                <Suspense fallback={ <Loader /> }>
                    <ProductGallery
                      product={ activeProduct }
                      areDetailsLoaded={ areDetailsLoaded }
                      isWithEmptySwitcher={ useEmptyGallerySwitcher }
                      showLoader={ isVariant }
                    />
                </Suspense>

           
                <ProductActions
                  getLink={ getLink }
                  product={ dataSource }
                  parameters={ parameters }
                  areDetailsLoaded={ areDetailsLoaded }
                  setActiveProduct={ setActiveProduct }
                />
            </>
        );
    }

    render() {
        console.log(this.state.price,">>>");
       
        return (
        
                    <ContentWrapper
                      wrapperMix={ { block: 'ProductPage', elem: this.state.price > 80 ? 'Wrapper' : 'ProductWrapper' } }
                      label={ __('Main product details') }
                    >
                        { this.renderProductPageContent() }
                    </ContentWrapper>

        );
    }
}

export default ProductPage;
