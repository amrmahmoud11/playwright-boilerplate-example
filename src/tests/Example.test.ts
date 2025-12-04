import { ExamplePage } from '../pages/examples/ExamplePage'
import { test } from '@playwright/test'
import { faker } from '@faker-js/faker'
import config from '../../test-data/dataFromJson.json'
import dotenv from 'dotenv'

dotenv.config()
//Grabbing data from .env file
const url: string = `${process.env.BASE_URL}/text-box`
//Generating fake data using faker
const fullName: string = faker.person.fullName()
const email: string = faker.internet.email()
const currentAddress: string = faker.location.streetAddress()
//Grabbing data from JSON file
const permanentAddress: string = config.permanentAddress

test.describe('Register test suite', async () => {
    let examplePage: ExamplePage

    test.beforeEach(async ({ page }) => {
        examplePage = new ExamplePage(page)
    })

    test.afterEach(async ({ page }) => {
        await page.close()
    })

    test('Example test', async () => {
        await test.step('Visit the text box page and submit data in the form. Then, validate that the information was saved correctly.', async () => {
            await examplePage.fillInTextBox(url, fullName, email, currentAddress, permanentAddress)
            await examplePage.validateFillInTextBox(
                fullName,
                email,
                currentAddress,
                permanentAddress,
            )
        })
    })
})
