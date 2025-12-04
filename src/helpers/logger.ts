
export async function informLog(informMessage: string): Promise<void> {
    // Prints the informational message in bold green
    console.log('\x1b[32m\x1b[1m', informMessage, '\x1b[0m')
}

export async function alertLog(alertMessage: string): Promise<void> {
    // Prints the alert message in bold text on a yellow background
    console.log('\x1b[43m\x1b[1m', alertMessage, '\x1b[0m')
}
