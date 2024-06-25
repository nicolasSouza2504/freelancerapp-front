export interface Session {
    authToken:string;
    userName:string;
}

export function isSession(obj: any): obj is Session {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.authToken === 'string' &&
    typeof obj.userName === 'string'
  );
}