export * from './bank.statics';

export const Status = {
  Active: 'ACTIVE',
  InActive: 'INACTIVE',
};

export const EventSocket = {
  JoinRoom: 'join-room',
  LeaveRoom: 'leave-room',
  Disconnect: 'disconnect',
  Connection: 'connection',
  Data: 'data',
};

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

export const TypeEmitMessage = {
  join: 0,
  updateStatusDice: 1,
  updatePoint: 2,
};

export const StatusDiceDetail = {
  prepare: 0,
  shake: 1,
  bet: 2,
  waitOpen: 3,
  check: 4,
  end: 5,
};

export const TypeUpdatePointUser = {
  up: 0,
  down: 1,
};

export const TypePaymentTranSaction = {
  deposit: 0,
  withdrawMoney: 1,
};

export const StatusPaymentTranSaction = {
  processing: 0,
  success: 1,
  cancel: 2,
};
