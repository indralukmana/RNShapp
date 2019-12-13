import React from 'react'

import { createStore, combineReducers, applyMiddleware } from 'redux'

import { Provider } from 'react-redux'

import ReduxThunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import authReducer from './store/reducers/auth'

import ShopNavigator from './screens/ShopNavigator'

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer,
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk)),
)

const App = () => {
    return (
        <Provider store={store}>
            <ShopNavigator />
        </Provider>
    )
}

export default App
