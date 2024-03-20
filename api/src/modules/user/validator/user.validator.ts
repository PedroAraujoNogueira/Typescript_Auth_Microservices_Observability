import User from "../entity/user";
import * as yup from "yup";
import YupPassword from 'yup-password'
YupPassword(yup)

export default class UserValidator  {
    validate(entity: User): void {
        console.log('user11', entity)

        try {
            yup
            .object()
            .shape({
                name: yup.string().required("O Nome é obrigatório"),
                email: yup.string().email("Email inválido."),
                password: yup.string().password()
                    .minUppercase(1, 'A senha deve conter pelo menos 1 letra maiúscula.')
                    .minNumbers(1, 'A senha deve conter pelo menos 1 número.')
                    .minSymbols(1, 'A senha deve conter pelo menos 1 símbolo.')
                    .required("A Senha é Obrigatoria."),
            })
            .validateSync({
                name: entity.name,
                email: entity.email,
                password: entity.password
            }, {
                abortEarly: false,
            })
        } catch (errors) {
            const errorType = errors as yup.ValidationError
            errorType.errors.forEach((error) => {
                entity.notification.addError({
                    context: "user",
                    message: error,
                });
            });
            
        }
    }

}