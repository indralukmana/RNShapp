import React from 'react'
import { FlatList, Platform, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import ProductItem from '../../components/shop/ProductItem'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../store/actions/products'

const UserProductScreen: NavigationStackScreenComponent = () => {
    const userProducts = useSelector(
        (state: any) => state.products.userProducts,
    )

    const dispatch = useDispatch()

    return (
        <FlatList
            data={userProducts}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => (
                <ProductItem
                    imageUrl={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    onViewDetail={() => {}}
                >
                    <Button title="Edit" onPress={() => {}} />
                    <Button
                        title="Delete"
                        onPress={() => {
                            dispatch(productsActions.deleteProduct(item.id))
                        }}
                    />
                </ProductItem>
            )}
        />
    )
}

UserProductScreen.navigationOptions = navData => ({
    headerTitle: 'Your Product',
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => navData.navigation.toggleDrawer()}
            />
        </HeaderButtons>
    ),
})

export default UserProductScreen
