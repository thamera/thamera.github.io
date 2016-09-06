var boardButtonCallback = function (t, options) {
    return t.overlay({
        url: './index.html',
        args: {test: "test"}
    });
};

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
    'show-settings': function (t, options) {
        return t.popup({
            title: 'Settings',
            url: './settings.html',
            height: 184
        });
    }
});