'use strict';

module.exports = app => {
    const BodyParser = require('body-parser');
    let run_port = process.env.PORT || 3000;

    app.use(BodyParser.json());
    app.listen(run_port, (port) => {
        console.log(`MaxMilhas working on port ${run_port}`)
    });
}