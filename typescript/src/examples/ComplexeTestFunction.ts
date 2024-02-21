import { test } from '../lib/Decorator';

export class Authenticator{

    public async _authenticateUser({login, password}: { login: string, password: string }){
        return { login, password };
    }

    public arrowFunc(){
        return {
            message: "arrow"
        }
    }
}

export class SimpleTest extends Authenticator{

    @test
    public async _authenticateUser({ login, password }: { login: string; password: string; } = { login: "user", password: "pass"}) {
        return {
            login: "user",
            password: "pass"
        }
    }

    // @test
    public arrowFunc(): any{
        return {
            message: "arrow"
        }
    }
}
