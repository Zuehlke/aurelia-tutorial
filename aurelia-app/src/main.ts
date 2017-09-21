import {I18N, Backend, TCustomAttribute} from 'aurelia-i18n';
import {Aurelia} from 'aurelia-framework'
import environment from './environment';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-validation')
    .plugin('aurelia-i18n', (instance) => {
        let aliases = ['t', 'i18n'];
        // add aliases for 't' attribute
        TCustomAttribute.configureAliases(aliases);
        
        // register backend plugin
        instance.i18next.use(Backend.with(aurelia.loader));

        // adapt options to your needs (see http://i18next.com/docs/options/)
        // make sure to return the promise of the setup method, in order to guarantee proper loading
        return instance.setup({
            backend: {                                  // <-- configure backend settings
                loadPath: './locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
            },
            attributes: aliases,
            lng : 'de',
            fallbackLng : 'en',
            debug : false
        });
  });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
