import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useSelector } from 'react-redux'

const styles = StyleSheet.create({})

const ProductDetailScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const productId = navigation.getParam('productId')

    const selectedProduct = useSelector((state: any) =>
        state.products.availableProducts.find(
            product => product.id === productId,
        ),
    )

    return (
        <View>
            <Text>Product Detail Screen {JSON.stringify(selectedProduct)}</Text>
        </View>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    const productTitle = navData.navigation.getParam('productTitle')

    return {
        headerTitle: productTitle,
    }
}

export default ProductDetailScreen
