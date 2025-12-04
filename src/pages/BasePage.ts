/**
 * @fileoverview The BasePage class serves as the foundational class for all page objects in the Playwright testing framework,
 * providing shared functionalities and access to the Playwright Page object. This class centralizes common page interactions
 * through an instance of the Common class, facilitating reusable methods that enhance test maintainability and reduce redundancy.
 * It is utilized as a superclass from which specific page objects inherit, ensuring that common behaviors like navigation,
 * element interaction, and utility functions are consistently implemented across different test scenarios.
 */

import { Page } from '@playwright/test'
import { Common } from '../helpers/common'

export class BasePage {
    public page: Page
    common: Common

    constructor(page: Page) {
        this.page = page
        this.common = new Common(page)
    }
}
