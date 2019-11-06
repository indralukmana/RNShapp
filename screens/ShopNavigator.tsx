import { createStackNavigator } from 'react-navigation-stack'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import ProductsOverviewScreen from './shop/ProductsOverviewScreen'
import Colors from '../constants/Colors'
import ProductDetailScreen from './shop/ProductDetailScreen'
import CartScreen from './shop/CartScreen'

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen,
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor:
                    Platform.OS === 'android' ? Colors.primary : '',
            },
            headerTintColor:
                Platform.OS === 'android' ? 'white' : Colors.primary,
        },
    },
)

export default createAppContainer(ProductsNavigator)
