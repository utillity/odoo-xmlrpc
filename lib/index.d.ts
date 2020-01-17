// Type definitions for [odoo-xmlrpc]
// Project: [odoo-xmlrpc]
// Definitions by: [Tilfried uTILLIty Weissenberger]

declare module 'odoo-xmlrpc';

declare interface OdooConfig {
  url: string
  port: number
  db: string
  username: string
  password: string
  rejectUnauthorized?: boolean
  ca?: object
}

declare interface OdooCallback<T> { (err: Error | undefined, value: T): void }
declare interface OdooParam {}

/*~ Write your module's methods and properties in this class */
declare class Odoo {
  constructor(cfg: OdooConfig);

  someProperty: string[];

  connect(cb: OdooCallback<any>): void;
  execute_kw<T>(model: string, method: ('search' | 'read' | 'create' | 'write' | 'fields_get'), params: OdooParam[], callback: OdooCallback<T[]>): void;
  exec_workflow<T>(model: string, method: string, params: OdooParam[], callback: OdooCallback<T[]>): void;
  render_report<T>(report: string, params: OdooParam[], callback: OdooCallback<T>): void;
}
