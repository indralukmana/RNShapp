import React, { useState } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import Colors from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders'

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: Colors.primary,
    },
})

const CartScreen: NavigationStackScreenComponent = () => {
    const [isLoading, setIsLoading] = useState(false)
    const cartTotalAmount = useSelector((state: any) => state.cart.totalAmount)

    const dispatch = useDispatch()

    const cartItems = useSelector((state: any) => {
        const transformedCartItems = []
        // eslint-disable-next-line no-restricted-syntax
        for (const key in state.cart.items) {
            // eslint-disable-next-line no-prototype-builtins
            if (state.cart.items.hasOwnProperty(key)) {
                transformedCartItems.push({
                    productId: key,
                    productTitle: state.cart.items[key].productTitle,
                    productPrice: state.cart.items[key].productPrice,
                    quantity: state.cart.items[key].quantity,
                    sum: state.cart.items[key].sum,
                })
            }
        }

        return transformedCartItems
    })

    const handleOrder = async () => {
        setIsLoading(true)
        await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
        setIsLoading(false)
    }

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{' '}
                    <Text style={styles.amount}>
                        ${cartTotalAmount.toFixed(2)}
                    </Text>
                </Text>
                {isLoading && (
                    <ActivityIndicator size="small" color={Colors.primary} />
                )}
                {!isLoading && (
                    <Button
                        title="Order Now"
                        disabled={cartItems.length === 0}
                        onPress={handleOrder}
                    />
                )}
            </View>

            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={({ item }) => (
                    <CartItem
                        quantity={item.quantity}
                        title={item.productTitle}
                        amount={item.sum}
                        onRemove={() =>
                            dispatch(cartActions.removeFromCart(item.productId))
                        }
                        deletable
                    />
                )}
            />
        </View>
    )
}

CartScreen.navigationOptions = {
    headerTitle: 'Cart',
}

export default CartScreen
