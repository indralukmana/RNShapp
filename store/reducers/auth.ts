import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT } from '../actions/auth'

interface auth {
    token: string
    userId: string
}

const initialState: auth = {
    token: null,
    userId: null,
}

export default (state: auth = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                token: action.token,
                userId: action.userId,
            }
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId,
            }

        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId,
            }

        case LOGOUT:
            return initialState

        default:
            return state
    }
}
