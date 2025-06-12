enum PaymentSSEEventType {
  CONNECTED = 'CONNECTED',
  PAYMENT_UPDATED = 'PAYMENT_UPDATED',
  INITIAL_LIST = 'INITIAL_LIST',
  KEEP_ALIVE = 'KEEP_ALIVE',
  ERROR = 'ERROR',
  CHAT_MESSAGE = 'CHAT_MESSAGE',
  HEARTBEAT = 'HEARTBEAT',
}

enum PaymentType {
  SALE = 'SALE',
}

export { PaymentSSEEventType, PaymentType };
