var Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('./src/Resources/public/')
    .setPublicPath('/bundles/adminlte/')
    .setManifestKeyPrefix('bundles/admin-lte')

    .addEntry('admin-lte', './assets/admin-lte.js')

    .disableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableSassLoader()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    .autoProvidejQuery()

    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

module.exports = Encore.getWebpackConfig();