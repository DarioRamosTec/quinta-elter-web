

export interface User {
    id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno?: string;
    email: string;
    password: string;
  }
export interface UserRegister{
    nombre: string;
    apellido_paterno: string;
    apellido_materno?: string;
    email: string;
    password: string;
    confirmar_password: String;
  }

  export interface LoginResponse {
    msg: string;
    data: User;
    jwt: string;
    token_type: string;
  }
  export interface UserLogin{
    email: string;
    password: string;
  }
  export interface codigoVerificacion{
    // msg: string;
    // data: User;
    // jwt: string;
    // token_type: string;
    verificationCode: string;
  }