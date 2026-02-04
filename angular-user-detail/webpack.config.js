const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  output: {
    uniqueName: 'angularUserDetail',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'angularUserDetail',
      filename: 'remoteEntry.js',
      exposes: {
        './UserDetailComponent': './src/app/user-detail/user-detail.component.ts',
        './UserDetailModule': './src/app/user-detail/user-detail.module.ts',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: false, requiredVersion: false },
        '@angular/common': { singleton: true, strictVersion: false, requiredVersion: false },
        '@angular/common/http': { singleton: true, strictVersion: false, requiredVersion: false },
        '@angular/router': { singleton: true, strictVersion: false, requiredVersion: false },
        rxjs: { singleton: true, strictVersion: false, requiredVersion: false },
      },
    }),
  ],
};
