import { expect, APIRequestContext } from '@playwright/test'
import { CreateUserResponse, GenerateTokenResponse } from '../../helpers/models/ApiResponses'

export class ApiPage {
    private request: APIRequestContext
    private baseUrl: string
    password: string

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request
        this.baseUrl = baseUrl
        this.password = this.generateStrongPassword()
    }

    async createUser(userName: string, password: string): Promise<CreateUserResponse> {
        const response = await this.request.post(`${this.baseUrl}/Account/v1/User`, {
            data: {
                userName,
                password,
            },
        })

        expect(response.status()).toBe(201)
        const data: CreateUserResponse = await response.json()
        return data
    }

    async generateToken(userName: string, password: string): Promise<GenerateTokenResponse> {
        const response = await this.request.post(`${this.baseUrl}/Account/v1/GenerateToken`, {
            data: {
                userName,
                password,
            },
        })

        expect(response.status()).toBe(200)
        const data: GenerateTokenResponse = await response.json()
        return data
    }

    async getUser(userID: string): Promise<CreateUserResponse> {
        const response = await this.request.get(`${this.baseUrl}/Account/v1/User/${userID}`)

        expect(response.status()).toBe(200)
        const data: CreateUserResponse = await response.json()
        return data
    }

    private generateStrongPassword(length: number = 12): string {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const lowercase = 'abcdefghijklmnopqrstuvwxyz'
        const numbers = '0123456789'
        const specialChars = '!@#$%^&*'

        const getRandomChar = (str: string) => str.charAt(Math.floor(Math.random() * str.length))

        let password = ''
        password += getRandomChar(uppercase)
        password += getRandomChar(lowercase)
        password += getRandomChar(numbers)
        password += getRandomChar(specialChars)

        const allChars = uppercase + lowercase + numbers + specialChars
        for (let i = password.length; i < length; i++) {
            password += getRandomChar(allChars)
        }

        return password
            .split('')
            .sort(() => Math.random() - 0.5)
            .join('')
    }
}
