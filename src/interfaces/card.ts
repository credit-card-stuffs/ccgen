export interface CardInterface {
    metadata: {
        brand: string
    }
    identifier: {
        number: string
        cvv: string
    }
    expiration: {
        month: string
        year: string
    }
}
