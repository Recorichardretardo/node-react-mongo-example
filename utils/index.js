const getArgs1 = (processArgs) => {
    const args = {};
    console.log("processArgs", processArgs)
    processArgs.argv.slice(2, processArgs.argv.length).forEach(arg => {
        // long arg
        if (arg.slice(0, 2) === '--') {
            const longArg = arg.split('=');
            const longArgFlag = longArg[0].slice(2, longArg[0].length);
            const longArgValue = longArg.length > 1 ? longArg[1] : true;
            args[longArgFlag] = longArgValue;
        }
        // flags
        else if (arg[0] === '-') {
            const flags = arg.slice(1, arg.length).split('');
            flags.forEach(flag => {
                args[flag] = true;
            });
        }
    });
    return args;
};

const getArgs = (processArgs) => {
    /* npm run server count=2 print debug=false msg=hi -- -D -p  --PORT=8082 num=88 --bool
     output :  
            {
                count: '2',
                print: true,
                debug: 'false',
                msg: 'hi',
                D: true,
                p: true,
                PORT: '8082',
                num: '88',
                bool: true
            }
    */
    let args = processArgs.slice(2).reduce((acc, arg) => {
        if (arg.slice(0, 2) === '--') {
            let [k, v = true] = arg.split('=');
            let key = k.slice(2, k.length);
            acc[key] = v
        } else if (arg[0] === '-') {
            const flags = arg.slice(1, arg.length).split('');
            flags.forEach(flag => {
                acc[flag] = true;
            });
        } else {
            let [k, v = true] = arg.split('=')
            acc[k] = v
        }
        return acc
    }, {});
    return args;
};

module.exports.getArgs1 = getArgs1;
module.exports.getArgs = getArgs;
