var test = {
    name: 'Bill',
    from: function() {
        return 'Test';
    }
};

var serialize = require('node-serialize');
console.log("Serialized: \n" + serialize.serialize(test));

// {"name":"Bill","from":"_$$ND_FUNC$$_function () {\n        return 'Test';\n    }"}
