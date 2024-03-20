import User from "../entity/user";
import UserRepositoryInterface from "../repository/user-repository.interface";
import UserModel from "../model/user.model";
import { QueryTypes } from 'sequelize';


export default class UserRepository implements UserRepositoryInterface {
    // async create(entity: User): Promise<void> {
    //     await UserModel.create({
    //         id: entity.id,
    //         name: entity.name,
    //         email: entity.email,
    //         password: entity.password,
    //         active: entity.active
    //     })
    // }

    async findById(id: string): Promise<User> {
        let user = null;
        try {
            console.log('user.id', id) 
            const userExists: UserModel[] = await UserModel.sequelize.query(`
                SELECT * FROM users WHERE id = ? LIMIT 1`, 
                {
                    type: QueryTypes.SELECT,
                    replacements: [id], 
                })
            console.log('userExists', userExists);
            
            if(userExists[0]){
                user = new User(userExists[0].id, userExists[0].name, userExists[0].email, userExists[0].password); 
                return user;
            }
            throw new Error(`Error to find user by id: ${id}`);    
        } catch (error) {
            console.log('error', error)
            throw new Error(`Error to find user by id: ${id}`);    

        }
    }

    async findByEmail(email: string): Promise<User> | null {
        let user = null;
        try {
            console.log('user.email', email) 
            const userExists: UserModel[] = await UserModel.sequelize.query(`
                SELECT * FROM users WHERE email = ? LIMIT 1`, 
                {
                    type: QueryTypes.SELECT,
                    replacements: [email], 
                })
            console.log('userExists', userExists);
            
            if(userExists[0]){
                user = new User(userExists[0].id, userExists[0].name, userExists[0].email, userExists[0].password); 
                return user;
            }
            return user; 
        } catch (error) {
            console.log('error', error)
            throw new Error(`Error to find user by email: ${email}`);    

        }
    }
}