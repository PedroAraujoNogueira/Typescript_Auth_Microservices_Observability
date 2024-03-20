export interface IBody {
    name: string;
    email: string;
    password: string;
}
  
export interface IHeaders {
    'Authorization': string;
}
  
export interface IReply {
    200: { success: boolean };
    '4xx': { error: string };
    '5xx': { error: string };
}