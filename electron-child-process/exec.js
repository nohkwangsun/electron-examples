var exec = require("child_process").exec;

exec("sleeps.sh", (err, stdout) => {
    if (err) {
        throw err;
    }

    console.log(stdout);
});