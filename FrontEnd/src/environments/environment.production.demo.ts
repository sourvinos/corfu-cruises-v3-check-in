// ng build --output-path="release" --configuration=production-demo

export const environment = {
    apiUrl: 'http://checkindemo-001-site1.htempurl.com/api',
    url: 'http://checkindemo-001-site1.htempurl.com',
    appName: 'Corfu Cruises',
    clientUrl: 'http://checkindemo-001-site1.htempurl.com',
    defaultLanguage: 'en-GB',
    emailFooter: {
        lineA: 'Problems or questions? Call us at +30 26620 61400',
        lineB: 'or email at info@corfucruises.com',
        lineC: '© Corfu Cruises 2023, Corfu - Greece'
    },
    menuIconDirectory: 'assets/images/menu/',
    featuresIconDirectory: 'assets/images/features/',
    criteriaIconDirectory: 'assets/images/criteria/',
    stopOrdersIconDirectory: 'assets/images/stopOrders/',
    nationalitiesIconDirectory: 'assets/images/nationalities/',
    cssUserSelect: 'auto',
    production: true
}
