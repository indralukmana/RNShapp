import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors'

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

const CartScreen = () => {
    const cartTotalAmount = useSelector((state: any) => state.cart.totalAmount)

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

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{' '}
                    <Text style={styles.amount}>
                        ${cartTotalAmount.toFixed(2)}
                    </Text>
                </Text>
                <Button
                    title="Order Now"
                    disabled={cartItems.length === 0}
                    onPress={() => {}}
                />
            </View>
            <View>
                <Text>Cart Items</Text>
            </View>
        </View>
    )
}

export default CartScreen
