import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Colors from '../../constants/Colors'
import CartItem from './CartItem'

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center',
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    totalAmount: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    date: {
        fontSize: 16,
        color: '#888',
    },
})

const OrderItem = ({ amount, date, items }) => {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>{amount.toFixed(2)}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Button
                color={Colors.primary}
                title={showDetails ? 'Hide Details' : 'Show Details'}
                onPress={() => {
                    setShowDetails(prevState => !prevState)
                }}
            />
            {showDetails && (
                <View>
                    {items.map(item => (
                        <CartItem
                            title={item.productTitle}
                            quantity={item.quantity}
                            amount={item.sum}
                            onRemove={() => {}}
                            key={item.productId}
                        />
                    ))}
                </View>
            )}
        </View>
    )
}

export default OrderItem
