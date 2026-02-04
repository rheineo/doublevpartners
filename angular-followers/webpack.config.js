const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  output: {
    uniqueName: 'angularFollowers',
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
      name: 'angularFollowers',
      filename: 'remoteEntry.js',
      exposes: {
        './FollowersComponent': './src/app/followers/followers.component.ts',
        './FollowersModule': './src/app/followers/followers.module.ts',
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
