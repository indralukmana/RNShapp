import { AsyncStorage } from 'react-native'

export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

const saveDataToStorage = (token, userId, expiryDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({ token, userId, expiryDate }),
    )
}

export const signup = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyDqJ1bl_2mwrSaPTFO84CZ94F1z_Ta6XgM ',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        returnSecureToken: true,
                    }),
                },
            )

            if (!response.ok) {
                const errorResData = await response.json()
                const errorId = errorResData.error.message

                let message = 'Something went wrong!'

                if (errorId === 'EMAIL_EXISTS') {
                    message =
                        'Email exist please try register with other email or login'
                } else if (errorId === 'INVALID_PASSWORD') {
                    message = 'Password is invalid'
                } else if (errorId === 'MISSING_PASSWORD') {
                    message = 'Missing Password'
                } else if (errorId === 'OPERATION_NOT_ALLOWED') {
                    message = 'Sign in is disabled'
                } else if (errorId === 'INVALID_EMAIL') {
                    message = 'Invalid Email'
                }
                throw new Error(message)
            }

            const resData = await response.json()

            dispatch({
                type: SIGNUP,
                token: resData.idToken,
                userId: resData.localId,
            })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
            throw error
        }
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyDqJ1bl_2mwrSaPTFO84CZ94F1z_Ta6XgM ',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        returnSecureToken: true,
                    }),
                },
            )

            if (!response.ok) {
                const errorResData = await response.json()
                const errorId = errorResData.error.message
                let message = 'Something went wrong!'
                if (errorId === 'EMAIL_NOT_FOUND') {
                    message = 'Email Not Found'
                } else if (errorId === 'INVALID_PASSWORD') {
                    message = 'Password is invalid'
                } else if (errorId === 'MISSING_PASSWORD') {
                    message = 'Missing Password'
                } else if (errorId === 'USER_DISABLED') {
                    message = 'User is disabled by admin'
                } else if (errorId === 'INVALID_EMAIL') {
                    message = 'Invalid Email'
                }
                throw new Error(message)
            }

            const resData = await response.json()

            dispatch({
                type: LOGIN,
                token: resData.idToken,
                userId: resData.localId,
            })

            const expirationDate = new Date(
                new Date().getTime() + Number(resData.expiresIn) * 1000,
            )

            saveDataToStorage(
                resData.idToken,
                resData.localId,
                expirationDate.toISOString(),
            )
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)

            throw error
        }
    }
}
