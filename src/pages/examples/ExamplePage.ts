import { expect } from '@playwright/test'
import { BasePage } from '../BasePage'

export class ExamplePage extends BasePage {
    private readonly fullNameTextBox = `//input[@id='userName']`
    private readonly emailTextBox = `//input[@id='userEmail']`
    private readonly currentAddressTextBox = `//textarea[@id='currentAddress']`
    private readonly permanentAddressTextBox = `//textarea[@id='permanentAddress']`
    private readonly submitButton = `//button[@id='submit']`
    private readonly nameValidate = `//p[@id='name']`
    private readonly emailValidate = `//p[@id='email']`
    private readonly currentAddressValidate = `//p[@id='currentAddress']`
    private readonly permanentAddressValidate = `//p[@id='permanentAddress']`

    async fillInTextBox(
        url: string,
        fullName: string,
        email: string,
        currentAddress: string,
        permanentAddress: string,
    ) {
        await this.common.navigateTo(url)
        await this.common.sendKeys(this.fullNameTextBox, fullName)
        await this.common.sendKeys(this.emailTextBox, email)
        await this.common.sendKeys(this.currentAddressTextBox, currentAddress)
        await this.common.sendKeys(this.permanentAddressTextBox, permanentAddress)
        await this.common.clickElement(this.submitButton)
    }

    async validateFillInTextBox(
        nameExpectedValue: string,
        emailExpectedValue: string,
        currentAddressExpectedValue: string,
        permanentAddressExpectedValue: string,
    ) {
        this.verifyTheValue(await this.common.getElementText(this.nameValidate), nameExpectedValue)
        this.verifyTheValue(
            await this.common.getElementText(this.emailValidate),
            emailExpectedValue,
        )
        this.verifyTheValue(
            await this.common.getElementText(this.currentAddressValidate),
            currentAddressExpectedValue,
        )
        this.verifyTheValue(
            await this.common.getElementText(this.permanentAddressValidate),
            permanentAddressExpectedValue,
        )
    }

    verifyTheValue(actualText: string, expectedValue: string) {
        const colonIndex = actualText.indexOf(':')
        let actualValue = actualText.substring(colonIndex + 1)
        actualValue = actualValue.trimEnd()
        expect(actualValue).toEqual(expectedValue)
    }
}
