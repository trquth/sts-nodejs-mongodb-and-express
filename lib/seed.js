
var tours = [
    {id: 0, name: 'Hood River', price: 99.99},
    {id: 1, name: 'Oregon Coast', price: 149.95}
];

var seed = {

    currency: {name: 'United States dollars', abbrev: 'USD', },
    tours: [
        {name: 'Hood River', price: '$99.95'},
        {name: 'Oregon Coast', price: '$159.95'}
    ]
    , specialsUrl: '/january-specials',
    currencies: ['USD', 'GBP', 'BTC'],

}

exports.getSeedData = () => {
    return seed
}

exports.getTours = () =>{
    return tours
}