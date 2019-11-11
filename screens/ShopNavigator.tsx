import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import ProductsOverviewScreen from './shop/ProductsOverviewScreen'
import Colors from '../constants/Colors'
import ProductDetailScreen from './shop/ProductDetailScreen'
import CartScreen from './shop/CartScreen'
import OrdersScreen from './shop/OrdersScreen'
import UserProductScreen from './user/UserProductScreen'
import EditProductScreen from './user/EditProductScreen'

const defaultStackNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
}

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavigationOptions,
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            ),
        },
    },
)

const OrdersNavigator = createStackNavigator(
    {
        Orders: OrdersScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavigationOptions,
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            ),
        },
    },
)

const AdminNavigator = createStackNavigator(
    {
        UserProducts: UserProductScreen,
        EditProduct: EditProductScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavigationOptions,
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={
                        Platform.OS === 'android' ? 'md-create' : 'ios-create'
                    }
                    size={23}
                    color={drawerConfig.tintColor}
                />
            ),
        },
    },
)

const ShopNavigator = createDrawerNavigator(
    {
        Products: ProductsNavigator,
        Orders: OrdersNavigator,
        Admin: AdminNavigator,
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary,
        },
    },
)

export default createAppContainer(ShopNavigator)
