import React from 'react'
import { FlatList, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'

const OrdersScreen: NavigationStackScreenComponent = () => {
    const orders = useSelector((state: any) => state.orders.orders)

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
