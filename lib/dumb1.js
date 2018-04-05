let dumb1 = {
    "occupation": "developer",
    "articlesUrl" : 'https://www.sitepoint.com/a-beginners-guide-to-handlebars/',
    "website": {
        "name": "sitepoint"
    },
    "names": [
        {"firstName": "Ritesh", "lastName": "Kumar"},
        {"firstName": "John", "lastName": "Doe"}
    ],
    "countries":["Russia","India","USA"],
    "students":[
        {"name" : "John", "averageScore" : 8},
        {"name" : "Doe" , "averageScore" : 4}
      ]
}

exports.getDumb1 = () => {
    return dumb1
}