const fs = require('fs');
const Handlebars = require('handlebars');
require('handlebars-helpers')();

const languages = ['ko', 'en', 'ja', 'zh'];
const docs = [
    'analysis',
    'api-guide-v2.0',
    'api-guide-v3.0',
    'backup-and-restore',
    'db-engine',
    'db-instance',
    'db-security-group',
    'notification',
    'overview',
    'parameter-group',
    'server-dashboard'
];
const configs = [
    {
        engine: 'mysql',
        env: 'public',
        exclusionDocs: []
    },
    {
        engine: 'mysql',
        env: 'gov',
        exclusionDocs: []
    },
    {
        engine: 'mysql',
        env: 'ncgn',
        exclusionDocs: []
    },
    {
        engine: 'mysql',
        env: 'ninc',
        exclusionDocs: ['api-guide-v2.0', 'api-guide-v3.0']
    },
    {
        engine: 'mysql',
        env: 'ngsc',
        exclusionDocs: ['api-guide-v2.0', 'api-guide-v3.0']
    },
    {
        engine: 'mariadb',
        env: 'public',
        exclusionDocs: ['db-engine']
    },
    {
        engine: 'mariadb',
        env: 'gov',
        exclusionDocs: ['db-engine']
    }
];

for (let config of configs) {
    let context = JSON.parse(fs.readFileSync(`config/${config.engine}-${config.env}.json`, 'utf-8'));

    for (let language of languages) {
        for (let doc of docs) {
            if (config.exclusionDocs.indexOf(doc) >= 0) {
                continue;
            }

            let template;

            if (language === 'zh') {
                template = fs.readFileSync(`template/en/${doc}.md`, 'utf-8');
            } else {
                template = fs.readFileSync(`template/${language}/${doc}.md`, 'utf-8');
            }

            let compiled = Handlebars.compile(template);
            const result = compiled(context);

            let fileName = config.env === 'public' ? `${doc}.md` : `${doc}-${config.env}.md`;

            if (config.engine === 'mysql') {
                fs.writeFileSync(`${language}/${fileName}`, result);
            } else {
                fs.writeFileSync(`${config.engine}/${language}/${fileName}`, result);
            }

            console.log(`${config.engine}/${language}/${fileName} created`);
        }
    }
}
