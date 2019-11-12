import PRODUCTS from '../../data/dummy-data'
import {
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
} from '../actions/products'
import Product from '../../models/Product'

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(
                    availableProduct =>
                        availableProduct.id !== action.productId,
                ),
                userProducts: state.userProducts.filter(
                    userProduct => userProduct.id !== action.productId,
                ),
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
                new Date().toISOString(),
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price,
            )
            return {
                ...state,
                availableProducts: [...state.availableProducts, newProduct],
                userProducts: [...state.userProducts, newProduct],
            }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(
                product => product.id === action.productId,
            )
            const updatedProduct = new Product(
                action.productId,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price,
            )
            const updatedUserProducts = [...state.userProducts]
            updatedUserProducts[productIndex] = updatedProduct

            const availableProductIndex = state.availableProducts.findIndex(
                product => product.id === action.productId,
            )

            const updatedAvailableProducts = [...state.availableProducts]
            updatedAvailableProducts[availableProductIndex] = updatedProduct

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts,
            }

        default:
            return state
    }
}
