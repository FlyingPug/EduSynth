export class UserCredentials {
    oldPassword: string;
    newPassword: string;
    imageSrc : string;

    constructor(oldPassword: string, newPassword: string, imageSrc: string) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.imageSrc = imageSrc;
    }
}
