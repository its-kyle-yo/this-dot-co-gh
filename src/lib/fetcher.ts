// @ts-nocheck
export const fetcher = (...args: any): Promise<any> => fetch(...args).then(res => res.json())
