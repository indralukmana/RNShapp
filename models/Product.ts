class Product {
    id: any

    ownerId: any

    title: any

    imageUrl: any

    description: any

    price: any

    constructor(id, ownerId, title, imageUrl, description, price) {
        this.id = id
        this.ownerId = ownerId
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }
}

export default Product
