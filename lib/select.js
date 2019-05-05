const url = require('url');

class select {
    constructor () {
        this.originUri = 'http://wear.net';
    }

    getSave($, save) {
        console.log('use save');

        let items = new Array(),
            _this = this;
        $('#main_list > ul > li.like_mark').each(function () {
            if(parseInt($(this).find('div.meta span').first().text()) < save) return true; //  结束本次循环

            items.push({
                info: {
                    brand: $(this).find('div.item_info .brand').text(),
                    classification: $(this).find('div.item_info .txt').text(),
                    uri: _this.originUri + $(this).find('div.image a').attr('href')
                },
                meta: {
                    save: parseInt($(this).find('div.meta span').first().text()),
                    like: parseInt($(this).find('div.meta span').last().text())
                }
            });
        });
        
        return items;
    }

    getSize($, size) {
        console.log('use size');

        let items = new Array(),
            _this = this,
            pathFirstList = new Set();

        console.log($('#main_list > ul > li.like_mark').html())

        $('#main_list > ul > li.like_mark').each(function () {
            let uri = _this.originUri + $(this).find('div.image a').attr('href');
            let in_size = $(this).find('span.price').text();

            let pathFirst = url.parse(uri).pathname.split('/')[1];
            // console.log(size, in_size)
            if(pathFirstList.has(pathFirst) && size !== in_size) return true;
            else pathFirstList.add(pathFirst);

            items.push(uri);
        });

        return items;
    }
}

module.exports = select;