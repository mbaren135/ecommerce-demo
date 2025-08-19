export type User = {
    address: {
        city: string,
        geolocation: {
            lat: string,
            long: string,
        },
        number: number,
        street: string,
        zipcode: string
    },
    email: string,
    id: number,
    name: {
        firstname: string,
        lastname: string,
    }
    password: string,
    phone: string,
    username: string
}