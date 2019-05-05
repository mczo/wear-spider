const sleep = require('sleep');
const fs = require('fs');
const Request = require('./lib/request');
const Select = require('./lib/select');

const   page = 100,
        save = 9000,
        size = null,
        fileName = 'shoes',
        uri = 'http://wear.net/men-item/?type_category_id=118&locale_id=6';

const request = new Request(uri);
const select = new Select();

const uriList = new Array(page).fill().map((currentValue, index) => {
    console.log(` 正在抓取第 ${index + 1} 页`);
    sleep.msleep(2000);
    return request.get(index + 1);
});

Promise.all(uriList)
    .then(jquerys => {
        let allItem = new Array();

        for(let $ of jquerys) {
            let item;

            if(save) item = select.getSave($, save);
            else if(size) item = select.getSize($, size);

            allItem = allItem.concat(item);
        }

        return allItem;
    })
    .then(data => { // 排序
        data.sort((a, b) => a.meta.save - b.meta.save);
        return data;
    })
    .then(data => { // 去重
        let oldValue = {
            info: {
                uri: null
            }
        };

        return data.filter(currentValue => {
            if(oldValue.info.uri === currentValue.info.uri) {
                return null;
            }
            oldValue = currentValue;
            return currentValue;
        })
    })
    .then(data => {
        fs.writeFile(`data/${fileName}.json`, JSON.stringify(data), err => {
            if(err) throw err;
            console.log(data);
        });
    })
    .catch(e => {
        console.log(e);
    });