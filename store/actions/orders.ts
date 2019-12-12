export const ADD_ORDER = 'ADD_ORDER'

export const addOrder = (cartItems: any[], totalAmount: number) => {
    return async dispatch => {
        const date = new Date().toISOString()
        const response = await fetch(
            'https://rnshapp.firebaseio.com/orders/u1.json',
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
