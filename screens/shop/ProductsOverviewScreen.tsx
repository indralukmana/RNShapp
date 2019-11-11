import React from 'react'
import { FlatList, Platform, Button } from 'react-native'
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
                    onViewDetail={() =>
                        navigation.navigate('ProductDetail', {
                            productId: item.id,
                            productTitle: item.title,
                        })
                    }
                >
                    <Button
                        title="View Details"
                        onPress={() =>
                            navigation.navigate('ProductDetail', {
                                productId: item.id,
                                productTitle: item.title,
                            })
                        }
                    />
                    <Button
                        title="To Cart"
                        onPress={() => {
                            dispatch(cartActions.addToCart(item))
                        }}
                    />
                </ProductItem>
            )}
        />
    )
}

ProductsOverviewScreen.navigationOptions = navData => ({
    headerTitle: 'All Products',
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => navData.navigation.toggleDrawer()}
            />
        </HeaderButtons>
    ),
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
