import React from 'react'
import { FlatList, Platform, Button, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import ProductItem from '../../components/shop/ProductItem'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../store/actions/products'

const UserProductScreen: NavigationStackScreenComponent = ({ navigation }) => {
    const userProducts = useSelector(
        (state: any) => state.products.userProducts,
    )

    const dispatch = useDispatch()

    const deleteHandler = id => {
        Alert.alert('Are you sure?', 'Do you want to delete the product?', [
            {
                text: 'No',
                style: 'default',
            },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => dispatch(productsActions.deleteProduct(id)),
            },
        ])
    }

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
                    <Button
                        title="Edit"
                        onPress={() => {
                            navigation.navigate('EditProduct', {
                                productId: item.id,
                            })
                        }}
                    />
                    <Button
                        title="Delete"
                        onPress={() => {
                            deleteHandler(item.id)
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
    headerRight: (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Menu"
                iconName={
                    Platform.OS === 'android' ? 'md-create' : 'ios-create'
                }
                onPress={() => navData.navigation.navigate('EditProduct')}
            />
        </HeaderButtons>
    ),
})

export default UserProductScreen
