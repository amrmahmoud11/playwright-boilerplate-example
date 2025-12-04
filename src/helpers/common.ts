import { expect, Locator, Page } from '@playwright/test'
import { FrameLocator } from 'playwright'
import { Config } from './config'
import { informLog, alertLog } from './logger'

export class Common {
    page: Page
    config: Config

    constructor(page: Page) {
        this.page = page
        this.config = new Config
    }


    private resolveLocator(
        locatorElement: string | Locator,
        pageInstance: Page | FrameLocator,
    ): Locator {
        return typeof locatorElement === 'string'
            ? pageInstance.locator(locatorElement)
            : locatorElement
    }

    async locateElement(
        locatorElement: string | Locator,
        pageInstance: Page | FrameLocator = this.page,
    ): Promise<Locator> {
        try {
            const element = this.resolveLocator(locatorElement, pageInstance)

            await expect(element).toHaveCount(1, { timeout: this.config.timeout })

            if (!(await this.isElementFocused(element))) {
                await element.focus({ timeout: this.config.timeout })
            }

            await expect(element).toBeVisible({ timeout: this.config.timeout })
            await expect(element).not.toBeHidden({ timeout: this.config.timeout })
            await expect(element).toBeEnabled({ timeout: this.config.timeout })
            await expect(element).not.toBeDisabled({ timeout: this.config.timeout })
            informLog('Successfully located element')
            return element
        } catch (error) {
            alertLog(this.locateElement.name + __filename.split(__dirname + '/').pop())
            throw new Error('Element not found. Received error: ' + error)
        }
    }

    async isElementFocused(element: Locator): Promise<boolean> {
        return await element.evaluate((element) => document.activeElement === element)
    }

    async sendKeys(
        locatorElement: string | Locator,
        text: string,
        isSensitive: boolean = false,
        pageInstance: Page | FrameLocator = this.page,
    ) {
        try {
            const locator = await this.locateElement(locatorElement, pageInstance)
            if ('keyboard' in pageInstance) {
                await pageInstance.keyboard.press('Control+A')
                await pageInstance.keyboard.press('Meta+A')
            } else {
                await locator.fill('', { timeout: this.config.timeout })
            }
            await locator.fill(text, { timeout: this.config.timeout })
            try {
                expect(await locator.inputValue()).toEqual(text)
            } catch {
                try {
                    await this.getElementText(locator, text, pageInstance)
                } catch {
                    throw new Error(
                        `Failed to enter the text: "${text}". Neither inputValue() nor getElementText() confirmed the input.`,
                    )
                }
            }
            if (isSensitive) {
                informLog('Successfully sent keys to a sensitive field')
            } else {
                informLog('Successfully sent keys: ' + text)
            }
        } catch (error) {
            alertLog(this.sendKeys.name + __filename.split(__dirname + '/').pop())
            throw new Error('Keys were not sent. Received error: ' + error)
        }
    }

    async sendKeyboardKeys(
        keys: string,
        locatorElement: string | Locator,
        pageInstance: Page | FrameLocator = this.page,
    ) {
        try {
            const locator = await this.locateElement(locatorElement, pageInstance)
            await locator.press(keys)
        } catch (error) {
            alertLog(this.sendKeyboardKeys.name + __filename.split(__dirname + '/').pop())
            throw new Error(
                `The keys '${keys}' wasnt send correct to the element. Received error: ${error}`,
            )
        }
    }

    async clickElement(
        locatorElement: string | Locator,
        pageInstance: Page | FrameLocator = this.page,
    ) {
        try {
            const locator = await this.locateElement(locatorElement, pageInstance)
            await locator.click({ timeout: this.config.timeout, force: true })
            informLog('Successfully clicked element')
        } catch (error) {
            alertLog(this.clickElement.name + __filename.split(__dirname + '/').pop())
            throw new Error('Element could not be clicked. Received error: ' + error)
        }
    }

    async getElementText(
        locatorElement: string | Locator,
        expectedText?: string,
        pageInstance: Page | FrameLocator = this.page,
    ): Promise<string> {
        try {
            const locator = await this.locateElement(locatorElement, pageInstance)
            const text = await locator.textContent()
            if (!text) {
                throw new Error('Text does not exist')
            }
            if (expectedText) {
                expect(text).toBe(expectedText)
            }
            informLog(`Text retrieved from element: ${text} `)
            return text
        } catch (error) {
            alertLog(this.getElementText.name + __filename.split(__dirname + '/').pop())
            throw new Error('Could not retrieve text from element. Received error: ' + error)
        }
    }

    async navigateTo(url: string, pageInstance: Page = this.page) {
        try {
            if (!this.isValidUrl(url)) {
                throw new Error(
                    `Please provide a URL address.It seems right now you give a string that is NOT a URL address: ${url} `,
                )
            }
            await pageInstance.goto(url)
            await expect(pageInstance).toHaveURL(url)
            informLog('Succesfully navigated to ' + url)
        } catch (error) {
            alertLog(this.navigateTo.name + __filename.split(__dirname + '/').pop())
            throw new Error('Error navigating to ' + url + ' Received error: ' + error)
        }
    }

    async scrollToElement(
        locatorElement: string | Locator,
        pageInstance: Page | FrameLocator = this.page,
    ) {
        try {
            const locator = await this.locateElement(locatorElement, pageInstance)
            await locator.scrollIntoViewIfNeeded()
            informLog('Successfully scrolled to element')
        } catch (error) {
            alertLog(this.scrollToElement.name + __filename.split(__dirname + '/').pop())
            throw new Error('Could not scroll to element. Recieved error: ' + error)
        }
    }

    async delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    isValidUrl(url: string): boolean {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' +
                '((([a-zA-Z0-9-]+)\\.)+[a-zA-Z]{2,})' +
                '(\\:[0-9]{1,5})?' +
                '(\\/[^\\s]*)?$',
        )
        return urlPattern.test(url)
    }
}
