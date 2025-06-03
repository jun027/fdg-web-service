// 線上付款
export const ONLINE_PAYMENT_METHODS = {
  CreditCard: {
    id: 'radio-button-credit-card',
    label: '信用卡',
    value: 1,
  },
  LinePay: {
    id: 'radio-button-line-pay',
    label: 'Line Pay',
    value: 2,
  },
  BankTransfer: {
    id: 'radio-button-bank-transfer',
    label: '銀行轉帳',
    value: 3,
  },
  MoneyTransfer: {
    id: 'radio-button-money-transfer',
    label: '匯款專戶',
    value: 4,
  },
  PostOffice: {
    id: 'radio-button-post-office',
    label: '郵寄現金袋',
    value: 5,
  },
  OnSite: {
    id: 'radio-button-on-site',
    label: '親臨本宮',
    value: 6,
  },
  UWallet: {
    id: 'radio-button-u-wallet',
    label: 'U錢包',
    value: 7,
  },
}

// 第三方支付
export const THIRD_PARTY_PAYMENT_METHODS = {
  ApplePay: {
    label: 'Apple Pay',
    value: 4,
  },
  LinePay: {
    label: 'Line Pay',
    value: 5,
  },
  SamsungPay: {
    label: 'Samsung Pay',
    value: 6,
  },
}

// 收據類型
export const RECEIPT_TYPE = {
  PaperReceipt: {
    id: 'radio-button-paper-receipt',
    value: '1',
    enabled: true,
  },
  ElectronicReceipt: {
    id: 'radio-button-electronic-receipt',
    value: '2',
    enabled: false,
  },
  NoReceipt: {
    id: 'radio-button-no-receipt',
    value: '3',
    enabled: true,
  },
}
