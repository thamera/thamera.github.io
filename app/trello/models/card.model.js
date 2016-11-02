"use strict";
var Board = (function () {
    function Board(closed, desc, id, idOrganization, labelNames, name, shortUrl, url) {
        this.closed = closed;
        this.desc = desc;
        this.id = id;
        this.idOrganization = idOrganization;
        this.labelNames = labelNames;
        this.name = name;
        this.shortUrl = shortUrl;
        this.url = url;
    }
    return Board;
}());
exports.Board = Board;
//# sourceMappingURL=card.model.js.map