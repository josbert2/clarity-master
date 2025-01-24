module.exports = {
  stories: ["../src/**/*.stories.[tj]s"],
  addons: [
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    "@storybook/addon-viewport/register",
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-design-assets/register",
    "@storybook/addon-notes/register",
  ],
};
