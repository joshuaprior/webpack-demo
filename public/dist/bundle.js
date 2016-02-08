debugger;

[1,2,3,4,5]
    .map(n => n * 100)
    .forEach(n => console.log(n));

var foo = {
    func: () => {}
};

var bar = foo.func({
    baz: () => {
        var qux = Math.round(0);
    }
});

[1,2,3,4,5]
    .map(n => n * 100)
    .forEach(n => console.log(n));