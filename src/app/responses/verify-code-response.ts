import { User } from "../components/users/user";


export interface VerifyCodeResponse {
    error: string;
    data: User;
}
