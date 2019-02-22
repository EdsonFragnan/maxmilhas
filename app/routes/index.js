module.exports = app => {
  const { buildCheckFunction, validationResult } = require('express-validator/check');
  const checkBodyQueryParam = buildCheckFunction(['param', 'body', 'query']);
  const controller = app.controllers;
  const registerRequisition = require('./registerRequisition');
  const message = 'Route not found!';
  let errors = {};
  
  app.post('/createMass', (req, res) => {
    registerRequisition.requisition();
    controller.createClients.createClients(req, res);
  });

  app.get('/consult', [
    checkBodyQueryParam('cpf').isLength({min: 11, max: 11})
  ], (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ message: errors.array() });
    } else {
      registerRequisition.requisition();
      controller.queryCpfClient.consulta(req, res);
    }
  });
  
  app.get('/blacklist', (req, res) => {
    registerRequisition.requisition();
    controller.blacklistClients.blacklist(req, res);
  });

  app.get('/clients', (req, res) => {
    registerRequisition.requisition();
    controller.queryAllClients.allClients(req, res);
  });

  app.get('/status', (req, res) => {
    registerRequisition.requisition();
    controller.statusAccess.status(req, res);
  });

  app.post('/register', [
    checkBodyQueryParam('cpf').isLength({min: 11, max: 11}),
    checkBodyQueryParam('blacklist').isBoolean()
  ], (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ message: errors.array() });
    } else {
      registerRequisition.requisition();
      controller.registerClient.register(req, res);
    }
  });

  app.patch('/update/:cpf', [
    checkBodyQueryParam('cpf').isLength({min: 11, max: 11}),
    checkBodyQueryParam('blacklist').isBoolean()
  ], (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ message: errors.array() });
    } else {
      registerRequisition.requisition();
      controller.updateClient.update(req, res);
    }
  });

  app.delete('/delete/:cpf', [
    checkBodyQueryParam('cpf').isLength({min: 11, max: 11}),
  ],(req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ message: errors.array() });
    } else {
      registerRequisition.requisition();
      controller.deleteClient.delete(req, res);
    }
  });

  // Validation to route not found.
  app.get('*', function(req, res){
    res.status(404).json({message: message});
  });

  app.post('*', function(req, res){
    res.status(404).json({message: message});
  });

  app.delete('*', function(req, res){
    res.status(404).json({message: message});
  });

  app.put('*', function(req, res){
    res.status(404).json({message: message});
  });

  app.patch('*', function(req, res){
    res.status(404).json({message: message});
  });

};