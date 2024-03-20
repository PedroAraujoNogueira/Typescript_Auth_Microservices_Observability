import UserRepositoryInterface from "../../repository/user-repository.interface";
import { InputCreateUserDto, OutputCreateUserDto } from "./user.usecase.create.dto";
import { v4 as uuidV4 } from "uuid";
import User from "../../entity/user";
import sendToQueue from "../../../../infrastructure/brokers/message-broker";

export default class CreateUserUseCase {
    private userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async execute(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
        const user = new User(uuidV4(), input.name, input.email, input.password);

        console.log('email', user.email)
        const userExists = await this.userRepository.findByEmail(user.email);
        
        if(userExists){
            throw new Error("Email Already exists.");    
        }
        
        await sendToQueue("create-user", user)

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    }
}