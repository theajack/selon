
/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-11 10:15:42
 * @Description: Coding something
 */

type ISelonViewReturn<
  Run,
> = Run extends true ?
  any :
  SelonView;

type IJson<T=any> = {
    [prop in string]: T
  }

type IOrderType = 'date' | 'length' | 'headLetter' | 'number';

type IAscType = 'asc' | 'desc';

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

    add<Run extends boolean>(attr: IJson, run: Run): ISelonViewReturn<Run>;
    add<Run extends boolean>(attr: string[]|string, value: any[]|any, run: Run): ISelonViewReturn<Run>;
    add<Run extends false>(attr: IJson): ISelonViewReturn<Run>;
    add<Run extends false>(attr: string[]|string, value: any[]|any): ISelonViewReturn<Run>;

    remove<Run extends boolean>(attr: string[]|string, run: Run|undefined): ISelonViewReturn<Run>;
    remove<Run extends boolean>(run: Run): ISelonViewReturn<Run>;
    remove<Run extends false>(attr: string[]|string): ISelonViewReturn<Run>;
    remove<Run extends false>(): ISelonViewReturn<Run>;

    select<Run extends boolean>(attr: string[]|string, run: Run): ISelonViewReturn<Run>;
    select<Run extends boolean>(run: Run): ISelonViewReturn<Run>;
    select<Run extends false>(attr: string[]|string): ISelonViewReturn<Run>;
    select<Run extends false>(): ISelonViewReturn<Run>;

    update<Run extends boolean>(attr: IJson, run: Run): ISelonViewReturn<Run>;
    update<Run extends boolean>(attr: string[]|string, value: any[]|any, run: Run): ISelonViewReturn<Run>;
    update<Run extends false>(attr: IJson): ISelonViewReturn<Run>;
    update<Run extends false>(attr: string[]|string, value: any[]|any): ISelonViewReturn<Run>;

    insert<Run extends boolean>(attr: any|any[], index: number, run: Run): ISelonViewReturn<Run>;
    insert<Run extends boolean>(attr: any|any[], run: Run): ISelonViewReturn<Run>;
    insert<Run extends false>(attr: any|any[], index: number): ISelonViewReturn<Run>;
    insert<Run extends false>(attr: any|any[]): ISelonViewReturn<Run>;

    insert<Run extends boolean>(attr: string[]|string, value: any[]|any, index: number, run: Run): ISelonViewReturn<Run>;
    insert<Run extends boolean>(attr: string[]|string, value: any[]|any, run: Run): ISelonViewReturn<Run>;
    insert<Run extends false>(attr: string[]|string, value: any[]|any, index: number): ISelonViewReturn<Run>;
    insert<Run extends false>(attr: string[]|string, value: any[]|any): ISelonViewReturn<Run>;

    delete<Run extends boolean>(index: number, run: Run): ISelonViewReturn<Run>;
    delete<Run extends boolean>(run: Run): ISelonViewReturn<Run>;
    delete<Run extends false>(index: number): ISelonViewReturn<Run>;
    delete<Run extends false>(): ISelonViewReturn<Run>;

    where<Run extends boolean>(attr: IJson, run: Run): ISelonViewReturn<Run>;
    where<Run extends boolean>(attr: string[]|string, value: any[]|any, run: Run): ISelonViewReturn<Run>;
    where<Run extends boolean>(attr: string, run: Run): ISelonViewReturn<Run>;
    where<Run extends boolean>(attr: (item: IJson, index: number)=>boolean, run: Run): ISelonViewReturn<Run>;
    where<Run extends false>(attr: IJson): ISelonViewReturn<Run>;
    where<Run extends false>(attr: string[]|string, value: any[]|any): ISelonViewReturn<Run>;
    where<Run extends false>(attr: string): ISelonViewReturn<Run>;
    where<Run extends false>(attr: (item: IJson, index: number)=>boolean): ISelonViewReturn<Run>;

    orderBy<Run extends boolean>(attr: string, run: Run): ISelonViewReturn<Run>;
    orderBy<Run extends boolean>(attr: string, order: IAscType, run: Run): ISelonViewReturn<Run>;
    orderBy<Run extends boolean>(attr: string, type: IOrderType, run: Run): ISelonViewReturn<Run>;
    orderBy<Run extends boolean>(attr: string, order: IAscType, type: IOrderType, run: Run): ISelonViewReturn<Run>;
    orderBy<Run extends false>(attr: string): ISelonViewReturn<Run>;
    orderBy<Run extends false>(attr: string, order: IAscType): ISelonViewReturn<Run>;
    orderBy<Run extends false>(attr: string, type: IOrderType): ISelonViewReturn<Run>;
    orderBy<Run extends false>(attr: string, order: IAscType, type: IOrderType): ISelonViewReturn<Run>;

    groupBy<Run extends boolean>(attr: string, run: Run): ISelonViewReturn<Run>;
    groupBy<Run extends false>(attr: string): ISelonViewReturn<Run>;

    run(): any;
}