export enum TaskStatuses {
  New,
  InProgress = 1,
  Completed,
  Draft,
}

export enum TaskPriorities {
  Low,
  Middle,
  Hi,
  Urgently,
  later,
}


export const ResultCode = {
  Success: 0,
  Error: 1,
  Captcha: 10,
} as const;
