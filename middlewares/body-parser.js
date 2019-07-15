const bodyParser = () => (req, res, next) => {
    let body = []

    req.on('data', chunk => {
        body.push(chunk);
    })

    req.on('end', () => {
        body = Buffer.concat(body).toString();

        if (body.startsWith('{')) {
            body = JSON.parse(body);
        } else {
            body = body.split('&').reduce((body, pair) => {
                if (!pair) return body;
                const frg = pair.split('=');
                body[frg[0]] = frg[1];
                return body;
            }, {});
        }

        req.body = body;
        next();
    })
}

module.exports = bodyParser;