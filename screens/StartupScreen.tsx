import React, { useEffect } from 'react'
import { View, ActivityIndicator, AsyncStorage } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useDispatch } from 'react-redux'
import Colors from '../constants/Colors'

import * as authActions from '../store/actions/auth'

const StartupScreen: NavigationStackScreenComponent = ({ navigation }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if (!userData) {
                navigation.navigate('Auth')
                return
            }
            const { token, userId, expiryDate } = JSON.parse(userData)

            const expirationDate = new Date(expiryDate)

            if (expirationDate <= new Date() || !token || !userId) {
                navigation.navigate('Auth')
                return
            }

            const expirationTime =
                expirationDate.getTime() - new Date().getTime()

            dispatch(authActions.authenticate(userId, token, expirationTime))
            navigation.navigate('Shop')
        }

        tryLogin()
    }, [dispatch, navigation])

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    )
}

export default StartupScreen
