'use strict';

module.exports = app => {
    let run_port = process.env.PORT || 3000;
    const body_parser = require('body-parser');

    app.use(body_parser.json());
    app.listen(run_port, (port) => {
        console.log(`MaxMilhas working on port ${run_port}`);
    });
}