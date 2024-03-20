
import { consume, sendToQueue } from '../connector/rabbitConnect';

async function consumerCreateUser(){
    try {
        await consume("pagamento-linha-digitavel", async message => {
        })
    } catch (error) {
        throw new Error(error)
    }
}

async function consumerCancellationUser(){
    try {
        await consume("reguasDrZap", async message => {
            
            
        })
    } catch (error) {
        throw new Error(error)
    }
}

async function ativarConsumidores(){
    try {
        await consumerCancellationUser()
        consumerCreateUser()
        
    } catch (error) {
        throw new Error(error)
    }
}

export {
    consumerCreateUser,
    consumerCancellationUser,
    ativarConsumidores
}