var boardButtonCallback = function (t, options) {
    return t.overlay({
        url: './index.html',
        args: {test: "test"}
    });
};

var cardButtonCallback = function (t, options) {
    return t.popup({
        title: 'Test',
        url: './cardbutton.html',
        width: 400,
        args: {test2: "test2"}
    })
}

var getBadges = function (t) {
    console.log("powerup > getBadges");

    return t.card('name')
        .get('name')
        .then(function (cardName) {
            var badgeColor;
            var icon = './images/pci38.png';

            var lowercaseName = cardName.toLowerCase();
            badgeColor = 'red';

            return [{
                title: 'Testing Badge', //detail badges only
                text: 'Test Text',
                icon: icon,
                color: badgeColor
            }];
        });
}

TrelloPowerUp.initialize({
    'board-buttons': function (t, board) {
        return [
            {
                icon: './images/pci38.png',
                text: 'Implementation Apps',
                callback: boardButtonCallback
            }
        ];
    },
    'card-buttons': function (t, options) {
        return [{
            icon: './images/pci38.png',
            text: 'Card Fields',
            callback: cardButtonCallback
        }]
    },
    'card-badges': function (t, options) {
        return getBadges(t);
    },
    'card-detail-badges': function (t, options) {
        return getBadges(t);
    }


    //,
    //'show-settings': function (t, options) {
    //    //return t.popup({
    //    //    title: 'Settings',
    //    //    url: './settings.html',
    //    //    width: 300
    //    //});
    //}
});