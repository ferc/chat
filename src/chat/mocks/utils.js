export const latency = 1000
export const wait = (delay = 0) => new Promise(resolve => setTimeout(resolve, delay))
