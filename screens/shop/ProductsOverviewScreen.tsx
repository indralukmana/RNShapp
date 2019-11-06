import React from 'react'
import { FlatList, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

const ProductsOverviewScreen: NavigationStackScreenComponent = () => {
    const products = useSelector(
        (state: any) => state.products.availableProducts,
    )

    return (
        <FlatList
            data={products}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => <Text>{item.title}</Text>}
        />
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products',
}

export default ProductsOverviewScreen
