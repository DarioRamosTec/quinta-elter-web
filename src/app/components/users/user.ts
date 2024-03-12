export interface User {
    id: number
    nombre: string
    apellido_paterno: string
    apellido_materno: string
    email: string
    password: string
    verificado: Boolean
    activado: Boolean
    token_verificacion?: undefined
    role : Number
}
