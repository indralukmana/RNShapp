/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'

import { createStore, combineReducers } from 'redux'

import { Provider } from 'react-redux'

import { View } from 'react-native'
import productsReducer from './store/reducer'

const rootReducer = combineReducers({ products: productsReducer })

const store = createStore(rootReducer)

const App = () => {
    return (
        <Provider store={store}>
            <View />
        </Provider>
    )
}

export default App
