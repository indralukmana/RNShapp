export const SIGNUP = 'SIGNUP'

export const signup = (email, password) => {
    return async dispatch => {
        try {
            console.log({ email, password })

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

            const resData = await response.json()

            console.log({ resData })

            dispatch({
                type: SIGNUP,
            })
        } catch (error) {
            console.log(error)
        }
    }
}
