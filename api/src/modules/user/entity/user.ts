import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import UserValidator from "../validator/user.validator";

export default class User extends Entity {
    private _name: string;
    private _email: string;
    private _password: string;
    private _active: string = "Active";
    private _token: string;

    constructor(id: string, name: string, email: string, password: string) {
        super();
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this.validate();
    }   

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get active(): string {
        return this._active;
    }

    get password(): string {
        return this._password;
    }

    cryptPassword(): void {
        this._password = "senha_fake"
        this.validate();
    }

    generateToken(): void {
        this._token = "token_fake"
        this.validate();
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    changePassword(password: string): void {
        this._password = password;
        this.validate();
    }

    validate(): boolean {
        new UserValidator().validate(this);

        if(this.notification.hasError()){
            console.log('has error')
            throw new NotificationError(this.notification.getErrors()); 
        } 

        return true
    }
}