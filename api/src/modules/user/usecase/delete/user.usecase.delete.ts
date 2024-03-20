import UserRepositoryInterface from "../../repository/user-repository.interface";
import { InputDeleteUserDto } from "./user.usecase.delete.dto";
import {encryptImplementation } from "../../../@shared/security/password" 
import sendToQueue from "../../../../infrastructure/brokers/message-broker";

export default class DeleteUserUseCase {
    private userRepository: UserRepositoryInterface;
    private encryptImplementation: encryptImplementation;

    constructor(userRepository: UserRepositoryInterface, encryptImplementation: encryptImplementation) {
        this.userRepository = userRepository;
        this.encryptImplementation = encryptImplementation;
    }

    async execute(input: InputDeleteUserDto): Promise<void> {
        //const user = new User(uuidV4(), input.name, input.email, input.password);
        const user = await this.userRepository.findById(input.id);
        const match = this.encryptImplementation.compare(user.password, input.password)
        if(!match){ 
            throw new Error(`Senha inválida`);    
        }
        
        await sendToQueue("cancellation-user", user)
    }
}