import { Modelo } from "../../modelo";
import { User } from "../users/user";

export interface Log {
    _id: string,
    user: User,
    endpoint: string,
    method: string,
    data: object,
    status: number,
    response: Modelo<Object>,
    time: string,
}
