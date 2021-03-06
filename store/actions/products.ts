import Product from '../../models/Product'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const { userId } = getState().auth

        try {
            const response = await fetch(
                'https://rnshapp.firebaseio.com/products.json',
            )

            if (!response.ok) {
                throw new Error('response not ok')
            }

            const resData = await response.json()

            const loadedProducts = []

            Object.keys({ ...resData }).forEach(key => {
                const product = resData[key]
                loadedProducts.push(
                    new Product(
                        key,
                        product.ownerId,
                        product.title,
                        product.imageUrl,
                        product.description,
                        product.price,
                    ),
                )
            })

            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(
                    product => product.ownerId === userId,
                ),
            })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)

            throw error
        }
    }
}

export const deleteProduct = productId => {
    return async (dispatch, getToken) => {
        const { token } = getToken().auth

        const response = await fetch(
            `https://rnshapp.firebaseio.com/products/${productId}.json?auth=${token}`,
            { method: 'DELETE' },
        )

        if (!response.ok) {
            throw new Error('Delete error')
        }

        dispatch({ type: DELETE_PRODUCT, productId })
    }
}

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getToken) => {
        const { token, userId } = getToken().auth

        const response = await fetch(
            `https://rnshapp.firebaseio.com/products.json?auth=${token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                    price,
                    ownerId: userId,
                }),
            },
        )

        if (!response.ok) {
            throw new Error('Error creating product')
        }

        const resData = await response.json()

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price,
                ownerId: userId,
            },
        })
    }
}

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        const { token } = getState().auth

        const response = await fetch(
            `https://rnshapp.firebaseio.com/products/${id}.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                }),
            },
        )

        if (!response.ok) {
            throw new Error('Something went wrong')
        }

        dispatch({
            type: UPDATE_PRODUCT,
            productId: id,
            productData: {
                title,
                description,
                imageUrl,
            },
        })
    }
}
