import React from 'react'
import { FlatList, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import CustomHeaderButton from '../../components/UI/HeaderButton'

const ProductsOverviewScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const products = useSelector(
        (state: any) => state.products.availableProducts,
    )

    const dispatch = useDispatch()

    return (
        <FlatList
            data={products}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => (
                <ProductItem
                    title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    onAddToCart={() => {
                        dispatch(cartActions.addToCart(item))
                    }}
                    onViewDetail={() =>
                        navigation.navigate('ProductDetail', {
                            productId: item.id,
                            productTitle: item.title,
                        })
                    }
                />
            )}
        />
    )
}

ProductsOverviewScreen.navigationOptions = navData => ({
    headerTitle: 'All Products',
    headerRight: (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="cart"
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => navData.navigation.navigate('Cart')}
            />
        </HeaderButtons>
    ),
})

export default ProductsOverviewScreen
