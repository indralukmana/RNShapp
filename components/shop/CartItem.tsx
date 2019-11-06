import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        color: '#888',
        fontSize: 16,
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    deleteButton: {
        marginLeft: 20,
    },
})

const CartItem = ({ onRemove, quantity, title, amount, deletable = false }) => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{quantity} </Text>
                <Text style={styles.mainText}>{title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${amount.toFixed(2)}</Text>
                {deletable && (
                    <TouchableOpacity
                        onPress={onRemove}
                        style={styles.deleteButton}
                    >
                        <Ionicons
                            name={
                                Platform.OS === 'android'
                                    ? 'md-trash'
                                    : 'ios-trash'
                            }
                            size={23}
                            color="red"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default CartItem
