//var Promise = TrelloPowerUp.Promise;
//var t = TrelloPowerUp.iframe();
console.dir(this);
console.dir(window);

(function (t) {
    console.log("cardbutton...");
    console.dir(t);
    t.render(function () {
        // this function we be called once on initial load
        // and then called each time something changes that
        // you might want to react to, such as new data being
        // stored with t.set()
        console.log("TrelloPowerUp:");
        console.dir(t);
        t.card('name')
            .getAll()
            .then(function (data) {
                console.dir(data);
            });
    });
})(TrelloPowerUp);