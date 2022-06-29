module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@src': './src',
          '@components': './src/components',
          '@navigators': './src/navigators',
          '@services': './src/services',
          '@screens': './src/screens',
          '@state': './src/state',
          '@utils': './src/utils',
          '@@types': './src/utils/types',
          '@@hooks': './src/utils/hooks',
        },
      },
    ],
  ],
};
