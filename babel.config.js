module.exports = (api) => {
  api.cache(api.env('production'));

  return {
    presets: [
      [
        '@babel/env',
        {
          useBuiltIns: false, // use @babel/runtime-corejs3
        },
      ],
      [
        '@babel/preset-typescript',
        {
          allowDeclareFields: true,
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3,
        },
      ],
    ],
    env: {
      test: {
        plugins: ['istanbul'],
      },
    },
  };
};
