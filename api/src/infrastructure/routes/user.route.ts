import fastify, { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

import UserRepository from '../../modules/user/repository/user.repository';
import CreateUserUseCase from '../../modules/user/usecase/create/user.usecase.create';
import { IBody, IHeaders } from './user.route.dto';
import ensureAuthenticated from '../../modules/@shared/security/authentication'
import DeleteUserUseCase from '../../modules/user/usecase/delete/user.usecase.delete';
import { encryptImplementation } from '../../modules/@shared/security/password';

const userRoutesPublic: FastifyPluginAsync = async (fastify) => {
  
    fastify.post('/user/register', async (req: FastifyRequest<{ Body: IBody }>, resp: FastifyReply) => {
      const usecase = new CreateUserUseCase(new UserRepository);

      console.log('req', req.body)
      try {

        const userDto = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
    
        await usecase.execute(userDto);
        // retornar para o resp.send o retorno dessa função
        resp.send('Solicitação recebida, estamos enviando um email de confirmação para seu email!');

      }catch(err){
        resp.status(400).send(err);
      }
    });

  
};
  
const userRoutesPrivate: FastifyPluginAsync = async (fastify) => {
    
  fastify.delete('/user/cancellation', async (req: FastifyRequest<{ Body: IBody, Headers: IHeaders }>, resp: FastifyReply) => {
    const usecase = new DeleteUserUseCase(new UserRepository, new encryptImplementation);

    const userDto = {
      id: req.id,
      password: req.body.password,
      // token: req.headers.authorization
    };

    await usecase.execute(userDto);
    
    resp.status(200).send('Usuário cancelado com sucesso.');
  });
};

export { userRoutesPublic, userRoutesPrivate };

         
