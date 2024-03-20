import { FastifyReply } from "fastify";
import { verify } from "jsonwebtoken";

import authConfig from "../../../infrastructure/config/authentication";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

type IResponseAuthenticated = FastifyReply | void;

export default function ensureAuthenticated(
  req: any,
  response: FastifyReply,
  next: any
): IResponseAuthenticated {
  const authHeader = req.headers.Authorization;

  console.log('authHeader', authHeader)
  if (!authHeader)
    return response
      .status(401)
      .send("JWT token is missing");

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    console.log('decoded', decoded)
    const { sub } = decoded as ITokenPayload;

    req.id = sub;

    return next();
  } catch {
    return response
        .status(401)
        .send("Invalid JWT token");
  }
}