/*
*
* Author: Faisal Sami
* mail: faisalsami78@gmail.com
* https://github.com/faisalsami/odoo-xmlrpc
*
*/
var xmlrpc = require('xmlrpc');
var url = require('url');

var Odoo = function (config) {
  config = config || {};

  var urlparts = url.parse(config.url);
  this.host = urlparts.hostname;
  this.port = config.port || urlparts.port;
  this.db = config.db;
  this.rejectUnauthorized = config.rejectUnauthorized ? true : false,
    this.ca = config.ca,
    this.username = config.username;
  this.password = config.password;
  this.secure = true;
  if (urlparts.protocol !== 'https:') {
    this.secure = false
  }
  var uid = 0;

  this.createClientOptions = function (dest) {
    var clientOptions = {
      host: this.host,
      port: this.port,
      rejectUnauthorized: this.rejectUnauthorized,
      path: '/xmlrpc/2/' + dest
    }
    if (this.ca) clientOptions.ca = this.ca;
    return clientOptions;
  }

  this.connect = function (callback) {
    var clientOptions = createClientOptions('common');
    var client;
    if (this.secure == false) {
      client = xmlrpc.createClient(clientOptions);
    }
    else {
      client = xmlrpc.createSecureClient(clientOptions);
    }
    var params = [];
    params.push(this.db);
    params.push(this.username);
    params.push(this.password);
    params.push({});
    client.methodCall('authenticate', params, function (error, value) {
      if (error) {
        return callback(error, null)
      }
      if (!value) {
        return callback({ message: "No UID returned from authentication." }, null)
      }
      uid = value;
      return callback(null, value)
    });
  };
  this.execute_kw = function (model, method, params, callback) {
    var clientOptions = createClientOptions('object');
    var client;
    if (this.secure == false) {
      client = xmlrpc.createClient(clientOptions);
    }
    else {
      client = xmlrpc.createSecureClient(clientOptions);
    }
    var fparams = [];
    fparams.push(this.db);
    fparams.push(uid);
    fparams.push(this.password);
    fparams.push(model);
    fparams.push(method);
    for (var i = 0; i < params.length; i++) {
      fparams.push(params[i]);
    }
    client.methodCall('execute_kw', fparams, function (error, value) {
      if (error) {
        return callback(error, null);
      }
      return callback(null, value);
    });
  };
  this.exec_workflow = function (model, method, params, callback) {
    var clientOptions = createClientOptions('object');
    var client;
    if (this.secure == false) {
      client = xmlrpc.createClient(clientOptions);
    }
    else {
      client = xmlrpc.createSecureClient(clientOptions);
    }
    var fparams = [];
    fparams.push(this.db);
    fparams.push(uid);
    fparams.push(this.password);
    fparams.push(model);
    fparams.push(method);
    for (var i = 0; i < params.length; i++) {
      fparams.push(params[i]);
    }
    client.methodCall('exec_workflow', fparams, function (error, value) {
      if (error) {
        return callback(error, null);
      }
      return callback(null, value);
    });
  };
  this.render_report = function (report, params, callback) {
    var clientOptions = createClientOptions('report');
    var client;
    if (this.secure == false) {
      client = xmlrpc.createClient(clientOptions);
    }
    else {
      client = xmlrpc.createSecureClient(clientOptions);
    }
    var fparams = [];
    fparams.push(this.db);
    fparams.push(uid);
    fparams.push(this.password);
    fparams.push(report);
    for (var i = 0; i < params.length; i++) {
      fparams.push(params[i]);
    }
    client.methodCall('render_report', fparams, function (error, value) {
      if (error) {
        return callback(error, null);
      }
      return callback(null, value);
    });
  };
};

module.exports = Odoo;
