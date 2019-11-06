import React from 'react'

import { createStore, combineReducers } from 'redux'

import { Provider } from 'react-redux'

import { composeWithDevTools } from 'redux-devtools-extension'

import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ShopNavigator from './screens/ShopNavigator'

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
})

const store = createStore(rootReducer, composeWithDevTools())

const App = () => {
    return (
        <Provider store={store}>
            <ShopNavigator />
        </Provider>
    )
}

export default App
