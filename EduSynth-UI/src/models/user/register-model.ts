export enum Role {
    TEACHER = "TEACHER",
    STUDENT = "STUDENT",
}

export class RegisterModel {

    public name: string | null = null;
    public email: string | null = null;
    public password: string | null = null;
    public role: Role | null = null;

}
