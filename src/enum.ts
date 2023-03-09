/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-09 22:50:50
 * @Description: Coding something
 */

export enum TYPE {
  update = 'update',
  select = 'select',
  delete = 'delete',
  insert = 'insert',
  add = 'add',
  remove = 'remove',
  clear = 'clear',
  groupBy = 'groupBy',
  desc = 'desc',
  asc = 'asc',
  all = '*',
}

export enum FUN {
  sum = 'sum',
  count = 'count',
  avg = 'avg',
  distinct = 'distinct',
  first = 'first',
  last = 'last',
  max = 'max',
  min = 'min',
}
