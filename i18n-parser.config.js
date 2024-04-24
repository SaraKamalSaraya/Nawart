// i18n-parser.config.js

module.exports = {
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.ts', 'src/**/*.tsx'],
  lexers: {
    ts: ['JavascriptLexer'],
    tsx: ['JsxLexer'],
  },
  locales: ['en', 'ar'],
  defaultLocale: 'en',  
};
