const rp = require('request-promise');
const cheerio = require('cheerio');

class request {
    constructor(uri) {
        this.uri = uri;
    }

    get(page) {
        const config = {
            uri: page === 1 ? this.uri : this.uri + '&pageno=' + page,
            transform: body => cheerio.load(body)
        }
        
        // console.log(config.uri)

        return rp(config);
    }
}

module.exports = request;