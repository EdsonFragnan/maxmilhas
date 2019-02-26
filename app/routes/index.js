module.exports = app => {
  const { buildCheckFunction, validationResult } = require('express-validator/check');
  const checkBodyQueryParam = buildCheckFunction(['param', 'body', 'query']);
  const controller = app.controllers;
  const registerRequisition = require('./registerRequisition');
  const message = 'Route not found!';
  let errors = {};

  const validateCPF = (cpf) => {
    let  numbers, digits, sum, i, result, same_digits;
    same_digits = 1;
    if (cpf.length < 11)
      return false;
      for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            same_digits = 0;
      break;
        }

    if (!same_digits) {
      numbers = cpf.substring(0,9);
      digits = cpf.substring(9);
      sum = 0;
      for (i = 10; i > 1; i--)
        sum += numbers.charAt(10 - i) * i;
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result != digits.charAt(0))
          return false;
        numbers = cpf.substring(0,10);
        sum = 0;
        for (i = 11; i > 1; i--)
          sum += numbers.charAt(11 - i) * i;
          result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result != digits.charAt(1))
          return false;
      return true;
    }
    else
      return false;
  };
  
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
      let valCPF = validateCPF(req.query.cpf);
      if (!valCPF) {
        res.status(422).json({ message: 'Invalid CPF'});
      }
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
      let valCPF = validateCPF(req.params.cpf);
      if (!valCPF) {
        res.status(422).json({ message: 'Invalid CPF'});
      }
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
      let valCPF = validateCPF(req.params.cpf);
      if (!valCPF) {
        res.status(422).json({ message: 'Invalid CPF'});
      }
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
      let valCPF = validateCPF(req.params.cpf);
      if (!valCPF) {
        res.status(422).json({ message: 'Invalid CPF'});
      }
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