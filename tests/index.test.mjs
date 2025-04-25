import test from 'tape';
import tiny from 'tiny-json-http';
import sandbox from '@architect/sandbox';

// Set up directory paths
const base = 'http://localhost:3333';

/**
 * Start the local http server
 */
test('sandbox.start', async t => {
    t.plan(1);

    const params = { quiet: true }
    if (process.env.ARC_USE_ENV) {
        params.env = process.env;
    }
    await sandbox.start(params);
    t.ok(true, `sandbox started on ${base}`);
});

test('env variable key', async t => {
    let result = await tiny.get({ url: base });
    console.log(result);
    t.equal(result.body.message, 'testValue', 'env variable is available');
});

/**
 * Close the server
 */
test('sandbox.end', async t => {
    t.plan(1);
    await sandbox.end();
    t.ok(true, 'sandbox ended');
});
