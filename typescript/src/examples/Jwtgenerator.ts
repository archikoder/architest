import { test } from "../lib/Decorator"

export class JWTgenerator{

    _generateToken(user: any): string{
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IiIsImlhdCI6MTcwODUzNDAxOSwiZXhwIjoxNzA4NTM3NjE5fQ.MBuewQIn7P1Q8vB5Tz7z568jD7rPBmPvidldQ6KctKc";
    }
}

export class JWTgeneratorTest extends JWTgenerator{

    @test(75)
    _generateToken(user = {userId: "", name: "", email: "", login: ""}): string {
        return "invalid_token"
    }
}