function makeUrl(base: URL, path: string, params: Record<string, string> = {}){
    const url = new URL(path, base);
        
    url.search = new URLSearchParams(params).toString();
    return url.toString();
}
export interface AuthorizatioInfo {
    client_id: string;
    client_secret: string;
    access_token: string;
    refresh_token: string;
}

export class Authorizor {
    constructor(private base: URL = new URL('https://api.real-debrid.com/oauth/v2/')){ }

    async code({client_id}: Pick<AuthorizatioInfo, 'client_id'>){
        const response = await fetch(makeUrl(this.base, 'device/code', {client_id, new_credentials: 'yes'}));
        const json = await response.json();
        return json as {device_code:string; direct_verification_url: string};
    }

    async credentials({client_id, device_code}: Pick<AuthorizatioInfo, 'client_id'> & {device_code: string}){
        const response = await new Promise<Response>((resolve, reject)=> {
            const timer = setInterval(async ()=>{
                const r = await fetch(makeUrl(this.base, 'device/credentials', {client_id, code: device_code}));
                
                if(r.status == 200){
                    clearInterval(timer);
                    resolve(r);
                }
            }, 5000);
        });
        const json = await response.json();
        return json as Pick<AuthorizatioInfo, 'client_id' | 'client_secret'>;
    }

    async token({client_id, client_secret, device_code}: Pick<AuthorizatioInfo, 'client_id' | 'client_secret'> & {device_code: string}):Promise<AuthorizatioInfo>{
        const response = await fetch(makeUrl(this.base, 'token'), {
            method: 'POST',
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({client_id, client_secret, code: device_code, crant_type: 'http://oauth.net/grant_type/device/1.0'})
        });
        const json: Pick<AuthorizatioInfo, 'access_token' | 'refresh_token'> = await response.json();\
        return {...json, client_id, client_secret};

    }

    static async getToken(callback: (url:string)=>void){
        const auth = new Authorizor();
        const client_id = 'X245A4XAIBGVM';
        let code = await auth.code({client_id});
        callback(code.direct_verification_url);
        let credentials = await auth.credentials({...code, client_id});
        let token = await auth.token({...credentials, ...code});
        return token.access_token;
        
    }
}

export default class RealDebrid {
    constructor(private access_token: string){
    }

    _get(path: string, params: Record<string, string> = {}){
    
        return fetch(makeUrl(path, params), {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.access_token}`
            }
        })
    }

}