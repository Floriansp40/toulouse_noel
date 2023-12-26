const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'https://sonarqube.arocode.com/',
        token: "f588644d8104529d90c6fbb03cf2d7ff3e1da960",
        options: {
            'sonar.projectName': 'noel_front',
            'sonar.projectDescription': 'front la bien',
            'sonar.projectKey': 'noel_front',
            'sonar.projectVersion': '1.0.0',
            'sonar.exclusions': 'node_modules/*',
            'sonar.sourceEncoding': 'UTF-8',
            'sonar.login': 'f588644d8104529d90c6fbb03cf2d7ff3e1da9601'
        }
    },
    () => process.exit()
)