export default [
  {
    files: ['**/*.js'],  //only check .js files in server directory
    rules:{
      semi:"error", //force semicolns
      "no-unused-vars": "warn", //warn if variables are unused
    },

  },
];