import User from "../entity/user";

export default interface UserRepositoryInterface {
    // create(entity: User): Promise<void>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
}