
/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-11 10:15:42
 * @Description: Coding something
 */
export class SelonView {
    constructor(obj: HTMLElement, loop?: boolean);
    static init (element?: any, data?: any): any;

    set(data: any, ref: any): any;
    get(): any;
    data(): any;
    clear(): void

    init(data: any): any;
    refresh(): void;
    run(): any;
}