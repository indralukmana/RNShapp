import Product from '../../models/Product'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch(
                'https://rnshapp.firebaseio.com/products.json',
            )

            if (!response.ok) {
                throw new Error('response not ok')
            }

            const resData = await response.json()

            const loadedProducts = []

            Object.keys(resData).forEach(key => {
                const product = resData[key]
                loadedProducts.push(
                    new Product(
                        key,
                        'u1',
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
            })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)

            throw error
        }
    }
}

export const deleteProduct = productId => ({ type: DELETE_PRODUCT, productId })

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        const response = await fetch(
            'https://rnshapp.firebaseio.com/products.json',
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
                }),
            },
        )

        const resData = await response.json()

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price,
            },
        })
    }
}

export const updateProduct = (id, title, description, imageUrl) => ({
    type: UPDATE_PRODUCT,
    productId: id,
    productData: {
        title,
        description,
        imageUrl,
    },
})
