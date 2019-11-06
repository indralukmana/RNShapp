import React from 'react'

import { createStore, combineReducers } from 'redux'

import { Provider } from 'react-redux'

import productsReducer from './store/reducer'
import ShopNavigator from './screens/ShopNavigator'

const rootReducer = combineReducers({ products: productsReducer })

const store = createStore(rootReducer)

const App = () => {
    return (
        <Provider store={store}>
            <ShopNavigator />
        </Provider>
    )
}

export default App
