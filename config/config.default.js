/* eslint valid-jsdoc: "off" */

'use strict';

const fs = require('fs');
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.keys = appInfo.name + '_1588763657594_4897';

  config.development = {
    watchDirs: ['lib'],
  };

  config.static = {
    gzip: true,
  };

  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(__dirname, '../app/public/favicon.ico')),
  };

  config.view = {
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.security = {
    csrf: {
      ignore: [
        '/xapi/upload_from_xtransit',
      ],
    },
  };

  config.multipart = {
    fileSize: '4096mb',
    fileExtensions: [
      '.cpuprofile',
      '.heapprofile',
      '.gcprofile',
      '.heapsnapshot',
      '.diag',
      '.core',
      '.node',
      '.trend',
    ],
    mode: 'file',
  };

  config.secure = {
    secret: 'easy-monitor::xprofiler',
  };

  config.httpTimeout = 15000;

  config.profilingTime = {
    start_cpu_profiling: 5 * 60 * 1000,
    start_heap_profiling: 5 * 60 * 1000,
    start_gc_profiling: 5 * 60 * 1000,
  };

  config.profilingTimeExtra = 15 * 1000;

  config.profilingTimeExpired = 60 * 1000;

  config.actionTime = {
    cpuprofile: {
      profilingTime: config.profilingTime.start_cpu_profiling + config.profilingTimeExtra,
      expired: config.profilingTime.start_cpu_profiling + config.profilingTimeExpired,
    },
    heapprofile: {
      profilingTime: config.profilingTime.start_heap_profiling + config.profilingTimeExtra,
      expired: config.profilingTime.start_heap_profiling + config.profilingTimeExpired,
    },
    gcprofile: {
      profilingTime: config.profilingTime.start_gc_profiling + config.profilingTimeExtra,
      expired: config.profilingTime.start_gc_profiling + config.profilingTimeExpired,
    },
    heapsnapshot: {
      profilingTime: config.profilingTimeExtra,
      expired: config.profilingTimeExpired,
    },
    diag: {
      profilingTime: config.profilingTimeExtra,
      expired: config.profilingTimeExpired,
    },
  };

  config.uploadFileExpiredTime = 20 * 60 * 1000;

  config.auditExpiredTime = 15 * 1000;

  config.uploadNoncePrefix = 'XTRANSIT_UPLOAD_NONCE::';

  const userConfig = {};

  // mysql
  userConfig.mysql = {
    app: true,
    agent: false,
    clients: {
      xprofiler_console: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_CONSOLE_DATABASE,
      },
      xprofiler_logs: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_LOGS_DATABASE,
      },
    },
  };

  // redis
  userConfig.redis = {
    client: {
      sentinels: null,
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
      db: 0,
    },
  };

  // xtransit upload file
  userConfig.xprofilerConsole = process.env.XPROFILER_CONSOLE_URL;

  // xtransit manager
  userConfig.xtransitManager = process.env.XTRANSIT_MANAGER_URL;

  return {
    ...config,
    ...userConfig,
  };
};
