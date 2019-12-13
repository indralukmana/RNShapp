import React, { useEffect, useRef } from 'react'

import { useSelector } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import ShopNavigator from './ShopNavigator'

const NavigationContainer = () => {
    const token = useSelector((state: any) => state.auth.token)

    const navigatorRef = useRef(null)

    useEffect(() => {
        if (!token && navigatorRef.current) {
            navigatorRef.current.dispatch(
                NavigationActions.navigate({ routeName: 'Auth' }),
            )
        }
    }, [token])

    return <ShopNavigator ref={navigatorRef} />
}

export default NavigationContainer
