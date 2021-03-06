import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback,
} from 'react-native'

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20,
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10,
    },
})

let TouchableComponent: any = TouchableOpacity

if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback
}

const ProductItem = ({ imageUrl, title, price, onViewDetail, children }) => {
    return (
        <View style={styles.product}>
            <TouchableComponent onPress={onViewDetail} useForeground>
                <View>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: imageUrl }}
                        />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.price}>
                            ${price ? price.toFixed(2) : ''}
                        </Text>
                    </View>
                    <View style={styles.actions}>{children}</View>
                </View>
            </TouchableComponent>
        </View>
    )
}

export default ProductItem
