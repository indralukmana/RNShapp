import React from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import ProductItem from '../../components/shop/ProductItem'

const ProductsOverviewScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
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
                    onViewDetail={() =>
                        navigation.navigate('ProductDetail', {
                            productId: item.id,
                            productTitle: item.title,
                        })
                    }
                />
            )}
        />
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products',
}

export default ProductsOverviewScreen
