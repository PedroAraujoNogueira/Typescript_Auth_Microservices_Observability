import rabbit, { Connection , Channel} from "amqplib";

let connection1: Connection = null;
let channel1: Channel = null;
let tentativasConnection = 1;
let tentativasCanal = 1;

const connection = async () => {
  try {

    if(tentativasConnection > 5){
      console.log({ msg: "O limite de tentativas de conexão com o Rabbit foi excedido" })
      return;
    }

    connection1 = await rabbit.connect('amqp://localhost')

    
    connection1.on('close', () => {
      console.log({ msg: "Fechamento de conexão com o Rabbit " + tentativasConnection})
      tentativasConnection += 1
      return setTimeout(connection, tentativasConnection * 1000);
    })
    
    connection1.on('error', (error) => {
      console.log({ msg: "Error de conexão com o Rabbit " + tentativasConnection, mensagemError: error.message })
      tentativasConnection += 1
      return setTimeout(connection, (tentativasConnection * 1000));
    })
    
    console.log({ msg: "connection" });
    tentativasConnection = 1;
    
    await channel()

    return connection1
  } catch (error) {
    console.log("Erro para abrir conexão no Rabbit")
    tentativasConnection += 1
    setTimeout(connection, (tentativasConnection * 1000));
  }
}


const channel = async () => {
  try {

    if(tentativasCanal > 5){
      console.log({ msg: "O limite de tentativas de conexão com o Rabbit foi excedido" })
      return
    }

    if(!connection1){
      console.log({ msg: "Entrou no channel" });
      connection1 = await connection()
    }

    channel1 = await connection1.createChannel()
    
    channel1.on('close', () => {
      console.log({ msg: "Fechamento de canal com o Rabbit " + tentativasCanal })
      tentativasCanal += 1
      return setTimeout(channel, tentativasCanal * 1000);
    })

    channel1.on('error', (error) => {
      console.log({ msg: "Error de canal com o Rabbit " + tentativasCanal, mensagemError: error.message })
      tentativasCanal += 1
      return setTimeout(channel, (tentativasCanal * 1000));
    })
    
    console.log({ msg: "channel" });
    tentativasCanal = 1;
  
    return channel1
  } catch (error) {
    console.log("Erro para abrir canal no Rabbit ")
  }
}


async function sendToQueue(queue: string, message: any) {
  try {

    if(!channel1 || !connection1){ 
      await connection()
      console.log({ msg: "Não tinha channel no send" });
    }
    
    console.log({ msg: "Agora tem channel no send" });

    await channel1.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
  
  } catch (error) {
    console.log("Erro para gravar na fila Rabbit")
  }
}

export default sendToQueue