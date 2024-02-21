import { test } from '../lib/Decorator';

export class Authenticator{

    public async _authenticateUser({login, password}: { login: string, password: string }){
        return { login, password };
    }
}

export class SimpleTest extends Authenticator{

    @test
    public async _authenticateUser({ login, password }: { login: string; password: string; } = { login: "user", password: "pass"}): Promise<any> {
        throw new Error("user not found");
    }
}
