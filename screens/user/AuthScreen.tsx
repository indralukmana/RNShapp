import React, { useReducer, useCallback, useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Button,
    ActivityIndicator,
    Alert,
} from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/auth'

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        height: '50%',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

    input: {
        marginVertical: 5,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },

    button: {
        marginVertical: 5,
    },
})

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_INPUT_UPDATE:
            const updatedInputValues = {
                ...state.inputValues,
                [action.input]: action.inputValue,
            }
            const updatedInputValidities = {
                ...state.inputValidities,
                [action.input]: action.inputValue.length > 0,
            }

            let formIsValid = true
            // eslint-disable-next-line no-restricted-syntax
            for (const key in updatedInputValidities) {
                // eslint-disable-next-line no-prototype-builtins
                if (updatedInputValidities.hasOwnProperty(key)) {
                    formIsValid = formIsValid && updatedInputValidities[key]
                }
            }

            return {
                inputValues: updatedInputValues,
                inputValidities: updatedInputValidities,
                formIsValid,
            }

        default:
            return state
    }
}

const AuthScreen: NavigationStackScreenComponent = () => {
    const [loadingStatus, setLoadingStatus] = useState({
        login: false,
        signup: false,
    })

    const [error, setError] = useState('')

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error, [{ text: 'OK' }])
        }
    }, [error])

    const dispatch = useDispatch()

    const [formState, dispatchForm] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false,
    })

    const inputChangeHandler = useCallback(
        (inputIdentifier: string, inputValue: string) => {
            dispatchForm({
                type: FORM_INPUT_UPDATE,
                input: inputIdentifier,
                inputValue,
            })
        },
        [dispatchForm],
    )

    const signupHandler = async () => {
        setLoadingStatus({ ...loadingStatus, signup: true })
        await dispatch(
            authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password,
            ),
        )
        setLoadingStatus({ ...loadingStatus, signup: false })
    }

    const loginHandler = async () => {
        setLoadingStatus({ ...loadingStatus, login: true })
        setError(null)

        try {
            await dispatch(
                authActions.login(
                    formState.inputValues.email,
                    formState.inputValues.password,
                ),
            )
        } catch (err) {
            console.log({ err })
            setError(err.message)
        }

        setLoadingStatus({ ...loadingStatus, login: false })
    }

    return (
        <View style={styles.screen}>
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={50}
                style={styles.container}
            >
                <TextInput
                    style={styles.input}
                    onChangeText={text => inputChangeHandler('email', text)}
                    placeholder="Email Address"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => inputChangeHandler('password', text)}
                    placeholder="Password"
                />
                <View style={styles.button}>
                    {loadingStatus.login && <ActivityIndicator size="small" />}
                    {!loadingStatus.login && (
                        <Button
                            title="Login"
                            color="blue"
                            onPress={loginHandler}
                        />
                    )}
                </View>
                <View style={styles.button}>
                    {loadingStatus.signup && <ActivityIndicator size="small" />}
                    {!loadingStatus.signup && (
                        <Button
                            title="Sign Up"
                            color="red"
                            onPress={signupHandler}
                        />
                    )}
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'Authentication',
}

export default AuthScreen
