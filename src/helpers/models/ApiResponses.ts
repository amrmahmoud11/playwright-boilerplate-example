export interface CreateUserResponse {
    userID: string
    username: string
    books: Array<unknown>
}

export interface GenerateTokenResponse {
    token: string
    expires: string
    status: number
    result: string
}
