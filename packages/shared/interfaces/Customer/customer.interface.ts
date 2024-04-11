export interface Customer {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    address_id: string,
    created_at: string,
}

export type PublicCustomer = Omit<Customer, 'password'>