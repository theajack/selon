/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-13 08:04:33
 * @Description: Coding something
 */
window.jsboxCode = {
    lib: 'https://cdn.jsdelivr.net/npm/selon',
    lang: 'javascript',
    code: /* javascript */`var users = selon([
    {name: 'user1', age: 15}, 
    {name: 'user2', age: 20}
]);
var result = users.select('name')
    .where('age<18')
    .run();
console.log(result);`
};