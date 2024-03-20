import CreateUserUseCase from "./user.usecase.create";

const MockRepository = () => {
    return {
        findByEmail: jest.fn(),
    }
}

const input = {
    name: "Pedro",
    email: "pedroskeelo@gmail.com",
    password: "PedroSkeelo@1"
}

describe("Unit Test create user use case", () => {
    // it("should create a user", async () => {
    //     const userRepository = MockRepository();
    //     const userCreateUseCase = new CreateUserUseCase(userRepository);

    //     const output = await userCreateUseCase.execute(input);

    //     expect(output).toEqual({ 
    //         id: expect.any(String),
    //         name: input.name,
    //         email: input.email,
    //     });
    // });

    it("should throw an error when name is missing", () => {
        const userRepository = MockRepository();
        const userCreateUseCase = new CreateUserUseCase(userRepository);

        input.name = "";
        
        expect(async ()=> {
            await userCreateUseCase.execute(input)
        }).rejects.toThrow("user: O Nome é obrigatório");
     
    });
    it("should throw an error when email is invalid", () => {
        const userRepository = MockRepository();
        const userCreateUseCase = new CreateUserUseCase(userRepository);
        
        input.email = "testeskeelo";

        expect(async ()=> {
            await userCreateUseCase.execute(input)
        }).rejects.toThrow("Email inválido.");  
    });
    it("should throw an error when password is invalid", () => {
        const userRepository = MockRepository();
        const userCreateUseCase = new CreateUserUseCase(userRepository);
        input.password = "Pedro";

        expect(async ()=> {
            await userCreateUseCase.execute(input)
        }).rejects.toThrow("user: password must be at least 8 characters,user: A senha deve conter pelo menos 1 número.,user: A senha deve conter pelo menos 1 símbolo.");  
    });
});