// ng build --output-path="release" --configuration=production-local

export const environment = {
    apiUrl: 'https://localhost:1701/api',
    url: 'https://localhost:1701',
    appName: 'Corfu Cruises',
    clientUrl: 'https://localhost:1701',
    defaultLanguage: 'en-GB',
    emailFooter: {
        lineA: 'Problems or questions? Call us at +30 26620 61400',
        lineB: 'or email at info@corfucruises.com',
        lineC: '© Corfu Cruises 2023, Corfu - Greece'
    },
    dialogShieldsDirectory: 'assets/images/dialog-shields',
    featuresIconDirectory: 'assets/images/features/',
    production: true
}
