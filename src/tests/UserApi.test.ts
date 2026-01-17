import { test, request } from '@playwright/test'
import { ApiPage } from '../pages/examples/ApiPage'
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'
import { informLog } from '../helpers/logger'

dotenv.config()

const baseUrl: string = process.env.BASE_URL || 'https://demoqa.com'
const userName: string = `user_${faker.number.int({ min: 1000, max: 9999 })}`

test.describe('API test suite', async () => {
    let apiPage: ApiPage

    test.beforeEach(async () => {
        const requestContext = await request.newContext()
        apiPage = new ApiPage(requestContext, baseUrl)
    })

    test('User Registration and Token Generation API test', async () => {
        let userID: string

        await test.step('Create a new user account', async () => {
            const response = await apiPage.createUser(userName, apiPage.password)
            userID = response.userID
            await informLog(`User created with ID: ${userID}`)
        })

        await test.step('Generate authentication token for the created user', async () => {
            const response = await apiPage.generateToken(userName, apiPage.password)
            await informLog(`Token generated: ${response.token}`)
        })

        await test.step('Retrieve user details using the user ID', async () => {
            const response = await apiPage.getUser(userID)
            await informLog(`User retrieved: ${response.username}`)
        })
    })
})
