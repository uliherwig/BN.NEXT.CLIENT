import { AccountStatusEnum } from "./enums"

export interface AlpacaAccountModel  {

    accountStatus: AccountStatusEnum
    userId: string
    accountId: string
    accountNumber: string
    accruedFees: number
    buyingPower: number
    createdAtUtc: Date
}