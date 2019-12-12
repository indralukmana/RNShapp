import React, { useEffect, useState, useCallback } from 'react'
import {
    FlatList,
    Platform,
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as ordersActions from '../../store/actions/orders'
import Colors from '../../constants/Colors'

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const OrdersScreen: NavigationStackScreenComponent = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const orders = useSelector((state: any) => state.orders.orders)
    const dispatch = useDispatch()

    const loadOrders = useCallback(async () => {
        setIsLoading(true)
        await dispatch(ordersActions.fetchOrders())
        setIsLoading(false)
    }, [dispatch])

    useEffect(() => {
        const willFocusSub = navigation.addListener('willFocus', loadOrders)

        return () => {
            willFocusSub.remove()
        }
    }, [loadOrders, navigation])

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => (
                <OrderItem
                    amount={item.totalAmount}
                    date={item.readableDate}
                    items={item.items}
                />
            )}
        />
    )
}

OrdersScreen.navigationOptions = navData => ({
    headerTitle: 'Your Orders',
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

export default OrdersScreen
