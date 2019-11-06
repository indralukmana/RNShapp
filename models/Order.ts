class Order {
    id: any

    items: any

    totalAmount: any

    date: any

    constructor(id, items, totalAmount, date) {
        this.id = id
        this.items = items
        this.totalAmount = totalAmount
        this.date = date
    }
}

export default Order
