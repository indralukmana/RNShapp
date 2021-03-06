import React, { useEffect, useCallback, useState } from 'react'
import {
    FlatList,
    Platform,
    Button,
    ActivityIndicator,
    StyleSheet,
    View,
    Text,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const ProductsOverviewScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState()

    const products = useSelector(
        (state: any) => state.products.availableProducts,
    )

    const dispatch = useDispatch()

    const loadProducts = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(productsActions.fetchProducts())
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }, [dispatch])

    const refreshProducts = useCallback(async () => {
        setError(null)
        setIsRefreshing(true)
        try {
            await dispatch(productsActions.fetchProducts())
        } catch (err) {
            setError(err.message)
        }
        setIsRefreshing(false)
    }, [dispatch])

    useEffect(() => {
        const willFocusSub = navigation.addListener('willFocus', loadProducts)

        return () => {
            willFocusSub.remove()
        }
    }, [loadProducts, navigation])

    useEffect(() => {
        loadProducts()
    }, [loadProducts])

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>There is some errors</Text>
                <Text>{error}</Text>
                <Button title="Try Again" onPress={loadProducts} />
            </View>
        )
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>There is no product, add some!</Text>
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    return (
        <FlatList
            onRefresh={refreshProducts}
            refreshing={isRefreshing}
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
