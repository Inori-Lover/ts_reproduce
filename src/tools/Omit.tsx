/**
 * 取补集
 *
 * @desc
 * Pick<Target, Key>为选取A B交集，Exclude<T, U>为选取A B差集
 * 以上 Key 为 keyof Target 的子集
 * 以上 U   为 T            的子集
 */
export type Omit<T extends Record<any, any>, K extends string | number | symbol> = Pick<T, Exclude<keyof T, K>>
