import React from 'react'
import { FlatList, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import ProductItem from '../../components/shop/ProductItem'

const ProductsOverviewScreen: NavigationStackScreenComponent = () => {
    const products = useSelector(
        (state: any) => state.products.availableProducts,
    )

    return (
        <FlatList
            data={products}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => (
                <ProductItem
                    title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    onAddToCart={() => {}}
                    onViewDetail={() => {}}
                />
            )}
        />
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products',
}

export default ProductsOverviewScreen
