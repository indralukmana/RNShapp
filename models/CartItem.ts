class CartItem {
    quantity: any

    productPrice: any

    productTitle: any

    sum: any

    constructor(quantity, productPrice, productTitle, sum) {
        this.quantity = quantity
        this.productPrice = productPrice
        this.productTitle = productTitle
        this.sum = sum
    }
}

export default CartItem
