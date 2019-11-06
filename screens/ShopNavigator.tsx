import { createStackNavigator } from 'react-navigation-stack'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import ProductsOverviewScreen from './shop/ProductsOverviewScreen'
import Colors from '../constants/Colors'

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
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
