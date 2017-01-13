'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4


var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },

  'price': 0,
    
    
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];


//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);




function generatePrice(){
    
    rentals.forEach(calculate);

    function calculate(entry) {
        
        console.log(("--- ID : ").concat(entry.id));
        
        //// GET THE CAR
        var carId = entry.carId;
        var carPricePerDay = 100000000000;
        var carPricePerKm = 100000000000;
        
        cars.forEach(function(value){
            if(value.id == carId){
                carPricePerDay = value.pricePerDay;
                carPricePerKm = value.pricePerKm;
            }
        })
        
        
        //// TIME 
        var time = stringToDate(entry.returnDate, "yyyy-mm-dd","-") - stringToDate(entry.pickupDate, "yyyy-mm-dd","-");
        // convert ms to days
        time = time / 1000 / 60 / 60 / 24;
        time++;
        console.log(("  time : ").concat(time));
        
        // PRICE DECREASING (exercice 2)
        if(time > 10) carPricePerDay *= 0.50;
        else if(time > 4) carPricePerDay *= 0.70;
        else if(time > 1) carPricePerDay *= 0.90;
        console.log(("  carPricePerDay : ").concat(carPricePerDay));
        console.log(("  carPricePerKm : ").concat(carPricePerKm));
        
        //// TIME COMPONENT
        var timeComponent = time * carPricePerDay;
        console.log(("  time component : ").concat(timeComponent));


        //// DISTANCE COMPONENT
        
        var distance = entry.distance;
        var distanceComponent = distance * carPricePerKm;
        console.log(("  distance : ").concat(distance));
        console.log(("  distance component : ").concat(distanceComponent));
            
        var price = distanceComponent + timeComponent;
        console.log(("  price without deductible reduction : ").concat(price));
        
        
        //// DEDUCTIBLE (exercice 4)
        var deductible = entry.options.deductibleReduction;
        var deductiblePrice = 0;
        if (deductible) deductiblePrice = 4 * time;
        
        entry.price = price + deductiblePrice;
        console.log(("  price with deductible reduction : ").concat(price + deductiblePrice));
        
        //// COMMISSION (exercice 3)
        entry.commission.insurance = price * 0.15;
        entry.commission.assistance = time;
        entry.commission.drivy = price * 0.3 - entry.commission.insurance - entry.commission.assistance;
        var totalComission = entry.commission.drivy + entry.commission.assistance + entry.commission.insurance;
        
        console.log(("  Commissions : "));
        console.log(("      insurance : ").concat(entry.commission.insurance));
        console.log(("      assistance : ").concat(entry.commission.assistance));
        console.log(("      drivy : ").concat(entry.commission.drivy));
        console.log(("      TOTAL : ").concat(entry.commission.insurance + entry.commission.assistance + entry.commission.drivy));
        
        //// PAYMENT
        actors.forEach(function(value){
            if(value.rentalId === entry.id){
                var rentalPrice = entry.price - deductiblePrice;
                value.payment["0"].amount = rentalPrice + deductiblePrice; // driver
                value.payment["1"].amount = rentalPrice - totalComission; // owner
                value.payment["2"].amount = entry.commission.insurance; // insurance
                value.payment["3"].amount = entry.commission.assistance; // assistance
                value.payment["4"].amount = entry.commission.drivy + deductiblePrice; // drivy
                 
                console.log(("  Payments : "));
                console.log(("      driver : ").concat(value.payment["0"].type).concat(" of ").concat(value.payment["0"].amount));
                console.log(("      owner : ").concat(value.payment["1"].type).concat(" of ").concat(value.payment["1"].amount));
                console.log(("      insurance : ").concat(value.payment["2"].type).concat(" of ").concat(value.payment["2"].amount));
                console.log(("      assistance : ").concat(value.payment["3"].type).concat(" of ").concat(value.payment["3"].amount));
                console.log(("      drivy : ").concat(value.payment["4"].type).concat(" of ").concat(value.payment["4"].amount));               
            }
        })
        
        
        
    }
    
    

    
}

	

function stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
}

console.log("Rentals :");
generatePrice();
console.log(rentals);
