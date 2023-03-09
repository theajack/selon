/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-09 22:32:51
 * @Description: Coding something
 */
export interface IJson<T=any> {
    [prop: string]: T;
}