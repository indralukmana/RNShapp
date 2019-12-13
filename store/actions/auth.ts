export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

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
                throw new Error('Something went wrong!')
            }

            // const resData = await response.json()

            dispatch({
                type: SIGNUP,
            })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
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
                throw new Error('Something went wrong!')
            }

            const resData = await response.json()

            console.log({ resData })

            dispatch({
                type: SIGNUP,
            })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
    }
}
