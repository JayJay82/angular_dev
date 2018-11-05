import { Status } from "./status.enum";

export class GenericResponse<T> {
   constructor(public status : Status, public content : T, public error : string) {} 
}