/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-13 07:59:59
 * @Description: Coding something
 */
const { name } = require('./build.config');
const https = require('https');
const { traverseDir } = require('./helper/utils');

traverseDir('@packages', (dir) => {
    if (dir !== name) {
        dir = `${name}-${dir}`;
    }
    https.get(`https://purge.jsdelivr.net/npm/${dir}`, () => {});
});

