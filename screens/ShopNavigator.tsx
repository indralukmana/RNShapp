import { createStackNavigator } from 'react-navigation-stack'
import {
    createDrawerNavigator,
    DrawerNavigatorItems,
} from 'react-navigation-drawer'
import { Platform, View, Button } from 'react-native'
import {
    SafeAreaView,
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { useDispatch } from 'react-redux'
import ProductsOverviewScreen from './shop/ProductsOverviewScreen'
import Colors from '../constants/Colors'
import ProductDetailScreen from './shop/ProductDetailScreen'
import CartScreen from './shop/CartScreen'
import OrdersScreen from './shop/OrdersScreen'
import UserProductScreen from './user/UserProductScreen'
import EditProductScreen from './user/EditProductScreen'
import AuthScreen from './user/AuthScreen'
import StartupScreen from './StartupScreen'

import * as authActions from '../store/actions/auth'

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

const DrawerComponent = props => {
    const dispatch = useDispatch()

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <DrawerNavigatorItems {...props} />
                <Button
                    title="Logout"
                    color={Colors.primary}
                    onPress={() => {
                        dispatch(authActions.logout())
                        props.navigation.navigate('Auth')
                    }}
                />
            </SafeAreaView>
        </View>
    )
}

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

        contentComponent: props => <DrawerComponent {...props} />,
    },
)

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen,
})

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator,
})

export default createAppContainer(MainNavigator)
