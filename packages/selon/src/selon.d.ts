/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-11 10:57:05
 * @Description: Coding something
 */
type ISelonJson<T> = T extends (infer R)[] ? R : T

type ISelonReturn<
  T,
  Run,
  JSON = ISelonJson<T>
> = Run extends true ?
  (T extends Array<JSON> ? JSON[]: JSON) :
  Selon<T>;

type IOrderType = 'date' | 'length' | 'headLetter' | 'number';

type IAscType = 'asc' | 'desc';

type IJson<T=any> = {
  [prop in string]: T
}

declare class Selon<T> {

    constructor(data: T);
    add<Run extends boolean>(attr: IJson, run: Run): ISelonReturn<T, Run>;
    add<Run extends boolean>(attr: string[]|string, value: any[]|any, run: Run): ISelonReturn<T, Run>;
    add<Run extends false>(attr: IJson): ISelonReturn<T, Run>;
    add<Run extends false>(attr: string[]|string, value: any[]|any): ISelonReturn<T, Run>;

    remove<Run extends boolean>(attr: string[]|string, run: Run|undefined): ISelonReturn<T, Run>;
    remove<Run extends boolean>(run: Run): ISelonReturn<T, Run>;
    remove<Run extends false>(attr: string[]|string): ISelonReturn<T, Run>;
    remove<Run extends false>(): ISelonReturn<T, Run>;

    select<Run extends boolean>(attr: string[]|string, run: Run): ISelonReturn<T, Run>;
    select<Run extends boolean>(run: Run): ISelonReturn<T, Run>;
    select<Run extends false>(attr: string[]|string): ISelonReturn<T, Run>;
    select<Run extends false>(): ISelonReturn<T, Run>;

    update<Run extends boolean>(attr: ISelonJson<T> & IJson, run: Run): ISelonReturn<T, Run>;
    update<Run extends boolean>(attr: string[]|string, value: any[]|any, run: Run): ISelonReturn<T, Run>;
    update<Run extends false>(attr: ISelonJson<T> & IJson): ISelonReturn<T, Run>;
    update<Run extends false>(attr: string[]|string, value: any[]|any): ISelonReturn<T, Run>;

    insert<Run extends boolean>(attr: ISelonJson<T>|ISelonJson<T>[], index: number, run: Run): ISelonReturn<T, Run>;
    insert<Run extends boolean>(attr: ISelonJson<T>|ISelonJson<T>[], run: Run): ISelonReturn<T, Run>;
    insert<Run extends false>(attr: ISelonJson<T>|ISelonJson<T>[], index: number): ISelonReturn<T, Run>;
    insert<Run extends false>(attr: ISelonJson<T>|ISelonJson<T>[]): ISelonReturn<T, Run>;

    insert<Run extends boolean>(attr: string[]|string, value: any[]|any, index: number, run: Run): ISelonReturn<T, Run>;
    insert<Run extends boolean>(attr: string[]|string, value: any[]|any, run: Run): ISelonReturn<T, Run>;
    insert<Run extends false>(attr: string[]|string, value: any[]|any, index: number): ISelonReturn<T, Run>;
    insert<Run extends false>(attr: string[]|string, value: any[]|any): ISelonReturn<T, Run>;

    delete<Run extends boolean>(index: number, run: Run): ISelonReturn<T, Run>;
    delete<Run extends boolean>(run: Run): ISelonReturn<T, Run>;
    delete<Run extends false>(index: number): ISelonReturn<T, Run>;
    delete<Run extends false>(): ISelonReturn<T, Run>;

    where<Run extends boolean>(attr: ISelonJson<T>, run: Run): ISelonReturn<T, Run>;
    where<Run extends boolean>(attr: string[]|string, value: any[]|any, run: Run): ISelonReturn<T, Run>;
    where<Run extends boolean>(attr: string, run: Run): ISelonReturn<T, Run>;
    where<Run extends boolean>(attr: (item: ISelonJson<T>, index: number)=>boolean, run: Run): ISelonReturn<T, Run>;
    where<Run extends false>(attr: ISelonJson<T>): ISelonReturn<T, Run>;
    where<Run extends false>(attr: string[]|string, value: any[]|any): ISelonReturn<T, Run>;
    where<Run extends false>(attr: string): ISelonReturn<T, Run>;
    where<Run extends false>(attr: (item: ISelonJson<T>, index: number)=>boolean): ISelonReturn<T, Run>;

    orderBy<Run extends boolean>(attr: string, run: Run): ISelonReturn<T, Run>;
    orderBy<Run extends boolean>(attr: string, order: IAscType, run: Run): ISelonReturn<T, Run>;
    orderBy<Run extends boolean>(attr: string, type: IOrderType, run: Run): ISelonReturn<T, Run>;
    orderBy<Run extends boolean>(attr: string, order: IAscType, type: IOrderType, run: Run): ISelonReturn<T, Run>;
    orderBy<Run extends false>(attr: string): ISelonReturn<T, Run>;
    orderBy<Run extends false>(attr: string, order: IAscType): ISelonReturn<T, Run>;
    orderBy<Run extends false>(attr: string, type: IOrderType): ISelonReturn<T, Run>;
    orderBy<Run extends false>(attr: string, order: IAscType, type: IOrderType): ISelonReturn<T, Run>;

    groupBy<Run extends boolean>(attr: string, run: Run): ISelonReturn<T, Run>;
    groupBy<Run extends false>(attr: string): ISelonReturn<T, Run>;

    run(): ISelonReturn<T, true>;
    set(data: any): any;
    get(): any;
    data(): any;
    clear(): void;
}

declare function selon<T>(data: T): Selon<T>

declare const _default: {
    selon: typeof selon;
    Selon: typeof Selon;
};

export { Selon, _default as default, selon };
