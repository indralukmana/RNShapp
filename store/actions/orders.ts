import Order from '../../models/Order'

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch(
                'https://rnshapp.firebaseio.com/orders/u1.json',
            )

            if (!response.ok) {
                throw new Error('response not ok')
            }

            const resData = await response.json()

            const loadedOrders = []

            Object.keys({ ...resData }).forEach(key => {
                const product = resData[key]
                loadedOrders.push(
                    new Order(
                        key,
                        product.cartItems,
                        product.totalAmount,
                        new Date(product.date),
                    ),
                )
            })

            dispatch({
                type: SET_ORDERS,
                orders: loadedOrders,
            })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)

            throw error
        }
    }
}

export const addOrder = (cartItems: any[], totalAmount: number) => {
    return async (dispatch, getState) => {
        const { token } = getState().auth

        const date = new Date().toISOString()
        const response = await fetch(
            `https://rnshapp.firebaseio.com/orders/u1.json?auth=${token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date,
                }),
            },
        )

        if (!response.ok) {
            throw new Error('Error creating product')
        }

        const resData = await response.json()

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems,
                amount: totalAmount,
                date,
            },
        })
    }
}
