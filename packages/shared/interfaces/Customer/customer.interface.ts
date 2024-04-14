export interface Customer {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    cart_id?: string,
    address_id?: string,
    created_at: string,
    updated_at: string
}

export type PublicCustomer = Omit<Customer, 'password'>