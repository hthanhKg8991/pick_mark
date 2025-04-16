module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.json', '.ts'],
        alias: {
          Navigation: './src/Navigation',
          Screens: './src/Screens',
          Stores: './src/Stores',
          Hooks: './src/Hooks',
          Reducers: './src/Reducers',
          Components: './src/Components',
          Services: './src/Services',
          Modals: './src/Modals',
          Utils: './src/Utils',
          Base: './src/Base',
          Styles: './src/Styles',
          Themes: './src/Themes',
          Configs: './src/Configs',
          Constants: './src/Constants',
          DummyData: './src/DummyData',
          Languages: './src/Languages',
          Assets: './src/Assets',
        },
      },
    ],
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],
  ],
};
