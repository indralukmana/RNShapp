import React from 'react'
import { Text, StyleSheet, ScrollView, Image, Button, View } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        textAlign: 'center',
        color: '#888',
        marginVertical: 20,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
    },
})

const ProductDetailScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const productId = navigation.getParam('productId')

    const selectedProduct = useSelector((state: any) =>
        state.products.availableProducts.find(
            product => product.id === productId,
        ),
    )

    const dispatch = useDispatch()

    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{ uri: selectedProduct.imageUrl }}
            />
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title="Add to Cart"
                    onPress={() =>
                        dispatch(cartActions.addToCart(selectedProduct))
                    }
                />
            </View>
            <Text style={styles.price}>${selectedProduct.price}</Text>
            <Text style={styles.description}>
                {selectedProduct.description}
            </Text>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    const productTitle = navData.navigation.getParam('productTitle')

    return {
        headerTitle: productTitle,
    }
}

export default ProductDetailScreen
