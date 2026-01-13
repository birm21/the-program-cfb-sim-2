import React, { useState, useEffect } from 'react';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

// Sample school data with primary colors
// Full FBS School Database (133 teams) - Fictional Names & Nicknames
// Conference Names: Fictional but geographically logical
// School Names: Descriptive but legally distinct
// Nicknames: Generic/public domain mascots

const SCHOOLS = {
  blueBloods: [
    // Elite programs with massive budgets and national recruiting reach (Top ~12 programs)
    // Alabama-based → Crimson Tide colors
    { id: 'crimson-al', name: 'Crimson State University', nickname: 'Tide', state: 'AL', conference: 'Summit League', budget: 45000000, tier: 'Blue Blood', colors: { primary: '#9D2235', secondary: '#FFFFFF', accent: '#828A8F' } },
    
    // Ohio-based → Red/Gray colors
    { id: 'scarlet-oh', name: 'Scarlet Valley Tech', nickname: 'Bucks', state: 'OH', conference: 'Great Lakes Conference', budget: 48000000, tier: 'Blue Blood', colors: { primary: '#BB0000', secondary: '#666666', accent: '#FFFFFF' } },
    
    // California-based (USC) → Cardinal/Gold
    { id: 'pacific-ca', name: 'Pacific Coast University', nickname: 'Warriors', state: 'CA', conference: 'Great Lakes Conference', budget: 42000000, tier: 'Blue Blood', colors: { primary: '#990000', secondary: '#FFCC00', accent: '#FFFFFF' } },
    
    // Texas-based → Burnt Orange
    { id: 'longhorn-tx', name: 'Longhorn State University', nickname: 'Steers', state: 'TX', conference: 'Summit League', budget: 44000000, tier: 'Blue Blood', colors: { primary: '#BF5700', secondary: '#FFFFFF', accent: '#333F48' } },
    
    // Georgia-based → Red/Black
    { id: 'peach-ga', name: 'Peach State University', nickname: 'Bulldogs', state: 'GA', conference: 'Summit League', budget: 43000000, tier: 'Blue Blood', colors: { primary: '#BA0C2F', secondary: '#000000', accent: '#FFFFFF' } },
    
    // Louisiana-based → Purple/Gold
    { id: 'bayou-la', name: 'Bayou State University', nickname: 'Tigers', state: 'LA', conference: 'Summit League', budget: 41000000, tier: 'Blue Blood', colors: { primary: '#461D7C', secondary: '#FDD023', accent: '#FFFFFF' } },
    
    // Oklahoma-based → Crimson/Cream
    { id: 'sooner-ok', name: 'Sooner State University', nickname: 'Thunder', state: 'OK', conference: 'Summit League', budget: 40000000, tier: 'Blue Blood', colors: { primary: '#841617', secondary: '#FFF', accent: '#000' } },
    
    // Florida-based → Blue/Orange
    { id: 'sunshine-fl', name: 'Sunshine State University', nickname: 'Gators', state: 'FL', conference: 'Summit League', budget: 42000000, tier: 'Blue Blood', colors: { primary: '#0021A5', secondary: '#FA4616', accent: '#FFFFFF' } },
    
    // Michigan-based → Blue/Maize
    { id: 'greatlakes-mi', name: 'Great Lakes University', nickname: 'Claws', state: 'MI', conference: 'Great Lakes Conference', budget: 43000000, tier: 'Blue Blood', colors: { primary: '#00274C', secondary: '#FFCB05', accent: '#FFFFFF' } },
    
    // Penn State-based → Blue/White
    { id: 'keystone-pa', name: 'Keystone State University', nickname: 'Lions', state: 'PA', conference: 'Great Lakes Conference', budget: 40000000, tier: 'Blue Blood', colors: { primary: '#041E42', secondary: '#FFFFFF', accent: '#000' } },
    
    // Notre Dame-based → Navy/Gold
    { id: 'goldendome-in', name: 'Golden Dome University', nickname: 'Knights', state: 'IN', conference: 'Independent', budget: 46000000, tier: 'Blue Blood', colors: { primary: '#0C2340', secondary: '#C99700', accent: '#FFFFFF' } }
  ],
  power4: [
    // SUMMIT LEAGUE (SEC-style, Southern states) - Power 4
    
    // Auburn-based → Navy/Orange
    { id: 'plains-al', name: 'Plains University', nickname: 'Eagles', state: 'AL', conference: 'Summit League', budget: 32000000, tier: 'Power 4', colors: { primary: '#0C2340', secondary: '#E87722', accent: '#FFFFFF' } },
    
    // Tennessee-based → Orange/White
    { id: 'volunteer-tn', name: 'Volunteer State University', nickname: 'Vols', state: 'TN', conference: 'Summit League', budget: 33000000, tier: 'Power 4', colors: { primary: '#FF8200', secondary: '#FFFFFF', accent: '#58595B' } },
    
    // Ole Miss-based → Navy/Red
    { id: 'magnolia-ms', name: 'Magnolia State University', nickname: 'Rebels', state: 'MS', conference: 'Summit League', budget: 28000000, tier: 'Power 4', colors: { primary: '#CE1126', secondary: '#14213D', accent: '#FFFFFF' } },
    
    // Arkansas-based → Cardinal/White
    { id: 'naturalstate-ar', name: 'Natural State University', nickname: 'Razors', state: 'AR', conference: 'Summit League', budget: 27000000, tier: 'Power 4', colors: { primary: '#9D2235', secondary: '#FFFFFF', accent: '#000' } },
    
    // Missouri-based → Gold/Black
    { id: 'showme-mo', name: 'Show Me State University', nickname: 'Tigers', state: 'MO', conference: 'Summit League', budget: 26000000, tier: 'Power 4', colors: { primary: '#F1B82D', secondary: '#000000', accent: '#FFFFFF' } },
    
    // Texas A&M-based → Maroon/White
    { id: 'aggieland-tx', name: 'Aggieland State University', nickname: 'Aggies', state: 'TX', conference: 'Summit League', budget: 35000000, tier: 'Power 4', colors: { primary: '#500000', secondary: '#FFFFFF', accent: '#000' } },
    
    // Kentucky-based → Blue/White
    { id: 'bluegrass-ky', name: 'Bluegrass State University', nickname: 'Wildcats', state: 'KY', conference: 'Summit League', budget: 25000000, tier: 'Power 4', colors: { primary: '#0033A0', secondary: '#FFFFFF', accent: '#000' } },
    
    // South Carolina-based → Garnet/Black
    { id: 'palmetto-sc', name: 'Palmetto State University', nickname: 'Roosters', state: 'SC', conference: 'Summit League', budget: 27000000, tier: 'Power 4', colors: { primary: '#73000A', secondary: '#000000', accent: '#FFFFFF' } },
    
    // Vanderbilt-based → Gold/Black
    { id: 'musiccity-tn', name: 'Music City University', nickname: 'Admirals', state: 'TN', conference: 'Summit League', budget: 24000000, tier: 'Power 4', colors: { primary: '#866D4B', secondary: '#000000', accent: '#FFFFFF' } },
    
    // Mississippi State-based → Maroon/White
    { id: 'bulldogstate-ms', name: 'Bulldog State University', nickname: 'Bulldogs', state: 'MS', conference: 'Summit League', budget: 26000000, tier: 'Power 4', colors: { primary: '#660000', secondary: '#FFFFFF', accent: '#000' } },
    
    // GREAT LAKES CONFERENCE (Big Ten-style) - Power 4
    
    // Oregon-based → Green/Yellow
    { id: 'cascade-or', name: 'Cascade University', nickname: 'Ducks', state: 'OR', conference: 'Great Lakes Conference', budget: 35000000, tier: 'Power 4', colors: { primary: '#154733', secondary: '#FEE123', accent: '#FFFFFF' } },
    
    // Washington-based → Purple/Gold
    { id: 'emerald-wa', name: 'Emerald City University', nickname: 'Huskies', state: 'WA', conference: 'Great Lakes Conference', budget: 32000000, tier: 'Power 4', colors: { primary: '#4B2E83', secondary: '#B7A57A', accent: '#FFFFFF' } },
    
    // Nebraska-based → Red/Cream
    { id: 'cornhusk-ne', name: 'Cornhusker State University', nickname: 'Huskers', state: 'NE', conference: 'Great Lakes Conference', budget: 28000000, tier: 'Power 4', colors: { primary: '#E41C38', secondary: '#FFFFFF', accent: '#000' } },
    
    // Wisconsin-based → Red/White
    { id: 'badger-wi', name: 'Badger State University', nickname: 'Badgers', state: 'WI', conference: 'Great Lakes Conference', budget: 30000000, tier: 'Power 4', colors: { primary: '#C5050C', secondary: '#FFFFFF', accent: '#000' } },
    
    // Iowa-based → Black/Gold
    { id: 'hawkeye-ia', name: 'Hawkeye State University', nickname: 'Hawks', state: 'IA', conference: 'Great Lakes Conference', budget: 27000000, tier: 'Power 4', colors: { primary: '#000000', secondary: '#FFCD00', accent: '#FFFFFF' } },
    
    // Michigan State-based → Green/White
    { id: 'spartanland-mi', name: 'Spartan Land University', nickname: 'Spartans', state: 'MI', conference: 'Great Lakes Conference', budget: 28000000, tier: 'Power 4', colors: { primary: '#18453B', secondary: '#FFFFFF', accent: '#000' } },
    
    // Minnesota-based → Maroon/Gold
    { id: 'northstar-mn', name: 'North Star University', nickname: 'Gophers', state: 'MN', conference: 'Great Lakes Conference', budget: 25000000, tier: 'Power 4', colors: { primary: '#7A0019', secondary: '#FFCC33', accent: '#FFFFFF' } },
    
    // Illinois-based → Navy/Orange
    { id: 'prairie-il', name: 'Prairie State University', nickname: 'Illini', state: 'IL', conference: 'Great Lakes Conference', budget: 26000000, tier: 'Power 4', colors: { primary: '#13294B', secondary: '#E84A27', accent: '#FFFFFF' } },
    
    // Indiana-based → Crimson/Cream
    { id: 'hoosier-in', name: 'Hoosier State University', nickname: 'Hoosiers', state: 'IN', conference: 'Great Lakes Conference', budget: 24000000, tier: 'Power 4', colors: { primary: '#990000', secondary: '#FFFFFF', accent: '#000' } },
    
    // Purdue-based → Gold/Black
    { id: 'boiler-in', name: 'Boilermaker Tech', nickname: 'Boilers', state: 'IN', conference: 'Great Lakes Conference', budget: 25000000, tier: 'Power 4', colors: { primary: '#000000', secondary: '#CFB991', accent: '#FFFFFF' } },
    
    // Maryland-based → Red/Gold
    { id: 'chesapeake-md', name: 'Chesapeake State University', nickname: 'Terps', state: 'MD', conference: 'Great Lakes Conference', budget: 27000000, tier: 'Power 4', colors: { primary: '#E03A3E', secondary: '#FFD520', accent: '#000' } },
    
    // Rutgers-based → Red/Black
    { id: 'garden-nj', name: 'Garden State University', nickname: 'Knights', state: 'NJ', conference: 'Great Lakes Conference', budget: 26000000, tier: 'Power 4', colors: { primary: '#CC0033', secondary: '#000000', accent: '#FFFFFF' } },
    
    // Northwestern-based → Purple/White
    { id: 'lakeside-il', name: 'Lakeside University', nickname: 'Wildcats', state: 'IL', conference: 'Great Lakes Conference', budget: 28000000, tier: 'Power 4', colors: { primary: '#4E2A84', secondary: '#FFFFFF', accent: '#000' } },
    
    // California-based (Berkeley) → Blue/Gold
    { id: 'goldenstate-ca', name: 'Golden State Tech', nickname: 'Bears', state: 'CA', conference: 'Atlantic Alliance', budget: 33000000, tier: 'Power 4', colors: { primary: '#003262', secondary: '#FDB515', accent: '#FFFFFF' } },
    
    // UCLA-based → Blue/Gold (Power 4, not Blue Blood)
    { id: 'westcoast-ca', name: 'West Coast University', nickname: 'Bears', state: 'CA', conference: 'Great Lakes Conference', budget: 33000000, tier: 'Power 4', colors: { primary: '#2D68C4', secondary: '#FFD100', accent: '#FFFFFF' } },
    
    // ATLANTIC ALLIANCE (ACC-style) - Power 4
    
    // Clemson-based → Orange/Purple
    { id: 'tigervalley-sc', name: 'Tiger Valley University', nickname: 'Tigers', state: 'SC', conference: 'Atlantic Alliance', budget: 36000000, tier: 'Power 4', colors: { primary: '#F56600', secondary: '#522D80', accent: '#FFFFFF' } },
    
    // FSU-based → Garnet/Gold
    { id: 'capitalcity-fl', name: 'Capital City State', nickname: 'Tribe', state: 'FL', conference: 'Atlantic Alliance', budget: 34000000, tier: 'Power 4', colors: { primary: '#782F40', secondary: '#CEB888', accent: '#000' } },
    
    // Miami-based → Orange/Green
    { id: 'coastal-fl', name: 'Coastal Tech University', nickname: 'Storms', state: 'FL', conference: 'Atlantic Alliance', budget: 33000000, tier: 'Power 4', colors: { primary: '#F47321', secondary: '#005030', accent: '#FFFFFF' } },
    
    // UNC-based → Carolina Blue/White
    { id: 'tarheel-nc', name: 'Tar Heel State University', nickname: 'Heels', state: 'NC', conference: 'Atlantic Alliance', budget: 29000000, tier: 'Power 4', colors: { primary: '#7BAFD4', secondary: '#FFFFFF', accent: '#000' } },
    
    // NC State-based → Red/White
    { id: 'wolfpack-nc', name: 'Wolfpack University', nickname: 'Pack', state: 'NC', conference: 'Atlantic Alliance', budget: 27000000, tier: 'Power 4', colors: { primary: '#CC0000', secondary: '#FFFFFF', accent: '#000' } },
    
    // Duke-based → Royal Blue/White
    { id: 'gothic-nc', name: 'Gothic University', nickname: 'Devils', state: 'NC', conference: 'Atlantic Alliance', budget: 26000000, tier: 'Power 4', colors: { primary: '#003087', secondary: '#FFFFFF', accent: '#000' } },
    
    // Wake Forest-based → Gold/Black
    { id: 'demon-nc', name: 'Demon Valley University', nickname: 'Deacons', state: 'NC', conference: 'Atlantic Alliance', budget: 24000000, tier: 'Power 4', colors: { primary: '#000000', secondary: '#9E7E38', accent: '#FFFFFF' } },
    
    // Louisville-based → Red/Black
    { id: 'derby-ky', name: 'Derby City University', nickname: 'Cardinals', state: 'KY', conference: 'Atlantic Alliance', budget: 28000000, tier: 'Power 4', colors: { primary: '#AD0000', secondary: '#000000', accent: '#FFFFFF' } },
    
    // Virginia-based → Navy/Orange
    { id: 'cavalier-va', name: 'Cavalier State University', nickname: 'Cavs', state: 'VA', conference: 'Atlantic Alliance', budget: 27000000, tier: 'Power 4', colors: { primary: '#232D4B', secondary: '#E57200', accent: '#FFFFFF' } },
    
    // Virginia Tech-based → Maroon/Orange
    { id: 'hokie-va', name: 'Hokieland Tech', nickname: 'Hokies', state: 'VA', conference: 'Atlantic Alliance', budget: 29000000, tier: 'Power 4', colors: { primary: '#630031', secondary: '#CF4420', accent: '#FFFFFF' } },
    
    // Pitt-based → Blue/Gold
    { id: 'steel-pa', name: 'Steel City University', nickname: 'Panthers', state: 'PA', conference: 'Atlantic Alliance', budget: 26000000, tier: 'Power 4', colors: { primary: '#003594', secondary: '#FFB81C', accent: '#FFFFFF' } },
    
    // Syracuse-based → Orange/Blue
    { id: 'orange-ny', name: 'Orange University', nickname: 'Orange', state: 'NY', conference: 'Atlantic Alliance', budget: 25000000, tier: 'Power 4', colors: { primary: '#F76900', secondary: '#000E54', accent: '#FFFFFF' } },
    
    // Boston College-based → Maroon/Gold
    { id: 'newengland-ma', name: 'New England University', nickname: 'Eagles', state: 'MA', conference: 'Atlantic Alliance', budget: 24000000, tier: 'Power 4', colors: { primary: '#98002E', secondary: '#B4975A', accent: '#000' } },
    
    // Georgia Tech-based → Gold/Navy
    { id: 'yellowjacket-ga', name: 'Yellow Jacket Tech', nickname: 'Jackets', state: 'GA', conference: 'Atlantic Alliance', budget: 27000000, tier: 'Power 4', colors: { primary: '#B3A369', secondary: '#003057', accent: '#FFFFFF' } },
    
    // California-based (Stanford) → Cardinal/White
    { id: 'cardinal-ca', name: 'Cardinal University', nickname: 'Cardinal', state: 'CA', conference: 'Atlantic Alliance', budget: 32000000, tier: 'Power 4', colors: { primary: '#8C1515', secondary: '#FFFFFF', accent: '#000' } },
    
    // SMU-based → Blue/Red
    { id: 'dallastech-tx', name: 'Dallas Tech University', nickname: 'Mustangs', state: 'TX', conference: 'Atlantic Alliance', budget: 28000000, tier: 'Power 4', colors: { primary: '#0033A0', secondary: '#CC0000', accent: '#FFFFFF' } },
    
    // Berkeley-based (duplicate fix)
    { id: 'berkeley-ca', name: 'Berkeley Tech', nickname: 'Bears', state: 'CA', conference: 'Atlantic Alliance', budget: 30000000, tier: 'Power 4', colors: { primary: '#003262', secondary: '#FDB515', accent: '#FFFFFF' } },
    
    // FRONTIER LEAGUE (Big 12-style) - Power 4
    
    // BYU-based → Navy/White
    { id: 'mountainwest-ut', name: 'Mountain West University', nickname: 'Cougars', state: 'UT', conference: 'Frontier League', budget: 27000000, tier: 'Power 4', colors: { primary: '#002E5D', secondary: '#FFFFFF', accent: '#000' } },
    
    // Utah-based → Red/White
    { id: 'beehive-ut', name: 'Beehive State University', nickname: 'Utes', state: 'UT', conference: 'Frontier League', budget: 29000000, tier: 'Power 4', colors: { primary: '#CC0000', secondary: '#FFFFFF', accent: '#000' } },
    
    // Colorado-based → Black/Gold
    { id: 'rockies-co', name: 'Rocky Mountain State', nickname: 'Buffs', state: 'CO', conference: 'Frontier League', budget: 28000000, tier: 'Power 4', colors: { primary: '#000000', secondary: '#CFB87C', accent: '#FFFFFF' } },
    
    // Arizona-based → Navy/Red
    { id: 'desert-az', name: 'Desert State University', nickname: 'Wildcats', state: 'AZ', conference: 'Frontier League', budget: 26000000, tier: 'Power 4', colors: { primary: '#003366', secondary: '#CC0033', accent: '#FFFFFF' } },
    
    // Arizona State-based → Maroon/Gold
    { id: 'sundevil-az', name: 'Sun Devil University', nickname: 'Devils', state: 'AZ', conference: 'Frontier League', budget: 27000000, tier: 'Power 4', colors: { primary: '#8C1D40', secondary: '#FFC627', accent: '#000' } },
    
    // Kansas-based → Blue/Red
    { id: 'jayhawk-ks', name: 'Jayhawk State University', nickname: 'Hawks', state: 'KS', conference: 'Frontier League', budget: 23000000, tier: 'Power 4', colors: { primary: '#0051BA', secondary: '#E8000D', accent: '#FFFFFF' } },
    
    // Kansas State-based → Purple/White
    { id: 'wildcat-ks', name: 'Wildcat State University', nickname: 'Cats', state: 'KS', conference: 'Frontier League', budget: 24000000, tier: 'Power 4', colors: { primary: '#512888', secondary: '#FFFFFF', accent: '#000' } },
    
    // TCU-based → Purple/White
    { id: 'hornedfrog-tx', name: 'Horned Frog University', nickname: 'Frogs', state: 'TX', conference: 'Frontier League', budget: 28000000, tier: 'Power 4', colors: { primary: '#4D1979', secondary: '#FFFFFF', accent: '#000' } },
    
    // Baylor-based → Green/Gold
    { id: 'bearland-tx', name: 'Bear Land University', nickname: 'Bears', state: 'TX', conference: 'Frontier League', budget: 27000000, tier: 'Power 4', colors: { primary: '#003015', secondary: '#FFB81C', accent: '#FFFFFF' } },
    
    // Texas Tech-based → Red/Black
    { id: 'redraider-tx', name: 'Red Raider Tech', nickname: 'Raiders', state: 'TX', conference: 'Frontier League', budget: 26000000, tier: 'Power 4', colors: { primary: '#CC0000', secondary: '#000000', accent: '#FFFFFF' } },
    
    // Oklahoma State-based → Orange/Black
    { id: 'cowboy-ok', name: 'Cowboy State University', nickname: 'Cowboys', state: 'OK', conference: 'Frontier League', budget: 28000000, tier: 'Power 4', colors: { primary: '#FF6600', secondary: '#000000', accent: '#FFFFFF' } },
    
    // Houston-based → Red/White
    { id: 'bayoucity-tx', name: 'Bayou City University', nickname: 'Cougars', state: 'TX', conference: 'Frontier League', budget: 25000000, tier: 'Power 4', colors: { primary: '#C8102E', secondary: '#FFFFFF', accent: '#000' } },
    
    // UCF-based → Black/Gold
    { id: 'centralflorida-fl', name: 'Central Florida Tech', nickname: 'Knights', state: 'FL', conference: 'Frontier League', budget: 24000000, tier: 'Power 4', colors: { primary: '#000000', secondary: '#FFC904', accent: '#FFFFFF' } },
    
    // Cincinnati-based → Red/Black
    { id: 'rivercity-oh', name: 'River City University', nickname: 'Bearcats', state: 'OH', conference: 'Frontier League', budget: 25000000, tier: 'Power 4', colors: { primary: '#E00122', secondary: '#000000', accent: '#FFFFFF' } },
    
    // West Virginia-based → Blue/Gold
    { id: 'mountaineer-wv', name: 'Mountaineer State University', nickname: 'Mountaineers', state: 'WV', conference: 'Frontier League', budget: 26000000, tier: 'Power 4', colors: { primary: '#002855', secondary: '#EAAA00', accent: '#FFFFFF' } },
    
    // Iowa State-based → Cardinal/Gold
    { id: 'cyclone-ia', name: 'Cyclone State University', nickname: 'Cyclones', state: 'IA', conference: 'Frontier League', budget: 25000000, tier: 'Power 4', colors: { primary: '#C8102E', secondary: '#F1BE48', accent: '#000' } }
  ],
  group5: [
    // AMERICAN ATHLETIC CONFERENCE (13 teams)
    { id: 'memphis', name: 'Memphis City University', nickname: 'Tigers', state: 'TN', conference: 'American Athletic', budget: 14000000, tier: 'Group of 5', colors: { primary: '#003087', secondary: '#8D9093', accent: '#FFFFFF' } },
    { id: 'tulane', name: 'Green Wave University', nickname: 'Wave', state: 'LA', conference: 'American Athletic', budget: 13000000, tier: 'Group of 5', colors: { primary: '#05401C', secondary: '#7BAFD4', accent: '#FFFFFF' } },
    { id: 'usf', name: 'South Florida Tech', nickname: 'Bulls', state: 'FL', conference: 'American Athletic', budget: 13500000, tier: 'Group of 5', colors: { primary: '#006747', secondary: '#CFC493', accent: '#FFFFFF' } },
    { id: 'navy', name: 'Naval Academy', nickname: 'Sailors', state: 'MD', conference: 'American Athletic', budget: 12000000, tier: 'Group of 5', colors: { primary: '#00205B', secondary: '#C8A872', accent: '#FFFFFF' } },
    { id: 'army', name: 'Military Academy', nickname: 'Cadets', state: 'NY', conference: 'American Athletic', budget: 11500000, tier: 'Group of 5', colors: { primary: '#000000', secondary: '#D4AF37', accent: '#FFFFFF' } },
    { id: 'temple', name: 'Temple City University', nickname: 'Owls', state: 'PA', conference: 'American Athletic', budget: 12500000, tier: 'Group of 5', colors: { primary: '#9B1023', secondary: '#FFFFFF', accent: '#000' } },
    { id: 'ecu', name: 'Pirate University', nickname: 'Pirates', state: 'NC', conference: 'American Athletic', budget: 11000000, tier: 'Group of 5', colors: { primary: '#592A8A', secondary: '#FFC600', accent: '#FFFFFF' } },
    { id: 'charlotte', name: 'Queen City University', nickname: 'Miners', state: 'NC', conference: 'American Athletic', budget: 10500000, tier: 'Group of 5', colors: { primary: '#046A38', secondary: '#B3A369', accent: '#FFFFFF' } },
    { id: 'utsa', name: 'San Antonio Tech', nickname: 'Runners', state: 'TX', conference: 'American Athletic', budget: 11500000, tier: 'Group of 5', colors: { primary: '#0C2340', secondary: '#F15A22', accent: '#FFFFFF' } },
    { id: 'fau', name: 'Atlantic University', nickname: 'Owls', state: 'FL', conference: 'American Athletic', budget: 11000000, tier: 'Group of 5', colors: { primary: '#003366', secondary: '#CC0000', accent: '#FFFFFF' } },
    { id: 'rice', name: 'Owl University', nickname: 'Owls', state: 'TX', conference: 'American Athletic', budget: 10000000, tier: 'Group of 5', colors: { primary: '#00205B', secondary: '#C1C6C8', accent: '#FFFFFF' } },
    { id: 'tulsa', name: 'Golden Storm University', nickname: 'Storm', state: 'OK', conference: 'American Athletic', budget: 10500000, tier: 'Group of 5', colors: { primary: '#002D72', secondary: '#C8102E', accent: '#FFFFFF' } },
    { id: 'uab', name: 'Dragon University', nickname: 'Dragons', state: 'AL', conference: 'American Athletic', budget: 11000000, tier: 'Group of 5', colors: { primary: '#006F3B', secondary: '#B9975B', accent: '#FFFFFF' } },
    
    // MOUNTAIN DIVISION (12 teams)
    { id: 'boise', name: 'Blue Mountain State', nickname: 'Broncos', state: 'ID', conference: 'Mountain Division', budget: 13000000, tier: 'Group of 5', colors: { primary: '#0033A0', secondary: '#D64309', accent: '#FFFFFF' } },
    { id: 'fresno', name: 'Fresno Valley State', nickname: 'Bulldogs', state: 'CA', conference: 'Mountain Division', budget: 12000000, tier: 'Group of 5', colors: { primary: '#C41230', secondary: '#003A70', accent: '#FFFFFF' } },
    { id: 'sdsu', name: 'San Diego Tech', nickname: 'Aztecs', state: 'CA', conference: 'Mountain Division', budget: 12500000, tier: 'Group of 5', colors: { primary: '#000000', secondary: '#A6192E', accent: '#FFFFFF' } },
    { id: 'unlv', name: 'Las Vegas University', nickname: 'Rebels', state: 'NV', conference: 'Mountain Division', budget: 11500000, tier: 'Group of 5', colors: { primary: '#CF0A2C', secondary: '#000000', accent: '#FFFFFF' } },
    { id: 'nevada', name: 'Silver State University', nickname: 'Pack', state: 'NV', conference: 'Mountain Division', budget: 10000000, tier: 'Group of 5', colors: { primary: '#003366', secondary: '#A2AAAD', accent: '#FFFFFF' } },
    { id: 'newmexico', name: 'Land of Enchantment University', nickname: 'Lobos', state: 'NM', conference: 'Mountain Division', budget: 10000000, tier: 'Group of 5', colors: { primary: '#BA0C2F', secondary: '#63666A', accent: '#FFFFFF' } },
    { id: 'wyoming', name: 'Cowboy State College', nickname: 'Cowboys', state: 'WY', conference: 'Mountain Division', budget: 9500000, tier: 'Group of 5', colors: { primary: '#492F24', secondary: '#FFC425', accent: '#FFFFFF' } },
    { id: 'airforce', name: 'Air Force Academy', nickname: 'Falcons', state: 'CO', conference: 'Mountain Division', budget: 11000000, tier: 'Group of 5', colors: { primary: '#003087', secondary: '#8A8D8F', accent: '#FFFFFF' } },
    { id: 'csu', name: 'Ram State University', nickname: 'Rams', state: 'CO', conference: 'Mountain Division', budget: 11000000, tier: 'Group of 5', colors: { primary: '#1E4D2B', secondary: '#C8C372', accent: '#FFFFFF' } },
    { id: 'utahstate', name: 'Aggie Mountain State', nickname: 'Aggies', state: 'UT', conference: 'Mountain Division', budget: 10500000, tier: 'Group of 5', colors: { primary: '#0F2439', secondary: '#97999B', accent: '#FFFFFF' } },
    { id: 'sjsu', name: 'Spartan Tech', nickname: 'Spartans', state: 'CA', conference: 'Mountain Division', budget: 10500000, tier: 'Group of 5', colors: { primary: '#0055A2', secondary: '#E5A823', accent: '#FFFFFF' } },
    { id: 'hawaii', name: 'Island University', nickname: 'Warriors', state: 'HI', conference: 'Mountain Division', budget: 11000000, tier: 'Group of 5', colors: { primary: '#024731', secondary: '#FFFFFF', accent: '#000' } },
    
    // SUNBELT CONFERENCE (12 teams)
    { id: 'appstate', name: 'Appalachian University', nickname: 'Mountaineers', state: 'NC', conference: 'Sunbelt Conference', budget: 12000000, tier: 'Group of 5', colors: { primary: '#000000', secondary: '#F7C427', accent: '#FFFFFF' } },
    { id: 'coastalcarolina', name: 'Coastal Carolina Tech', nickname: 'Chants', state: 'SC', conference: 'Sunbelt Conference', budget: 11000000, tier: 'Group of 5', colors: { primary: '#006E6E', secondary: '#A58D5F', accent: '#000' } },
    { id: 'louisiana', name: 'Ragin Cajun University', nickname: 'Cajuns', state: 'LA', conference: 'Sunbelt Conference', budget: 11500000, tier: 'Group of 5', colors: { primary: '#CE181E', secondary: '#FFFFFF', accent: '#000' } },
    { id: 'troy', name: 'Troy State University', nickname: 'Trojans', state: 'AL', conference: 'Sunbelt Conference', budget: 10500000, tier: 'Group of 5', colors: { primary: '#890028', secondary: '#A2AAAD', accent: '#FFFFFF' } },
    { id: 'southalabama', name: 'South Alabama Tech', nickname: 'Jaguars', state: 'AL', conference: 'Sunbelt Conference', budget: 10000000, tier: 'Group of 5', colors: { primary: '#0066CC', secondary: '#CC0033', accent: '#FFFFFF' } },
    { id: 'georgiasouthern', name: 'Southern Eagle University', nickname: 'Eagles', state: 'GA', conference: 'Sunbelt Conference', budget: 11000000, tier: 'Group of 5', colors: { primary: '#003087', secondary: '#FFFFFF', accent: '#000' } },
    { id: 'marshall', name: 'Thundering Herd University', nickname: 'Herd', state: 'WV', conference: 'Sunbelt Conference', budget: 10500000, tier: 'Group of 5', colors: { primary: '#00B140', secondary: '#FFFFFF', accent: '#000' } },
    { id: 'jmu', name: 'Duke City University', nickname: 'Dukes', state: 'VA', conference: 'Sunbelt Conference', budget: 11500000, tier: 'Group of 5', colors: { primary: '#450084', secondary: '#C2A14D', accent: '#FFFFFF' } },
    { id: 'odu', name: 'Monarch University', nickname: 'Monarchs', state: 'VA', conference: 'Sunbelt Conference', budget: 10000000, tier: 'Group of 5', colors: { primary: '#003057', secondary: '#8D9093', accent: '#FFFFFF' } },
    { id: 'arkstate', name: 'Red Wolf State', nickname: 'Wolves', state: 'AR', conference: 'Sunbelt Conference', budget: 9500000, tier: 'Group of 5', colors: { primary: '#CC0033', secondary: '#000000', accent: '#FFFFFF' } },
    { id: 'ulm', name: 'Warhawk University', nickname: 'Hawks', state: 'LA', conference: 'Sunbelt Conference', budget: 9000000, tier: 'Group of 5', colors: { primary: '#6C2935', secondary: '#F2A900', accent: '#FFFFFF' } },
    { id: 'texasstate', name: 'Bobcat State University', nickname: 'Bobcats', state: 'TX', conference: 'Sunbelt Conference', budget: 10000000, tier: 'Group of 5', colors: { primary: '#501214', secondary: '#B4975A', accent: '#FFFFFF' } },
    
    // MID-AMERICAN CONFERENCE (12 teams)
    { id: 'toledo', name: 'Rocket City University', nickname: 'Rockets', state: 'OH', conference: 'Mid-American Conference', budget: 10500000, tier: 'Group of 5', colors: { primary: '#003E7E', secondary: '#F7C427', accent: '#FFFFFF' } },
    { id: 'ohio', name: 'Bobcat University', nickname: 'Bobcats', state: 'OH', conference: 'Mid-American Conference', budget: 10000000, tier: 'Group of 5', colors: { primary: '#00694E', secondary: '#FFFFFF', accent: '#000' } },
    { id: 'miamioh', name: 'RedHawk University', nickname: 'Hawks', state: 'OH', conference: 'Mid-American Conference', budget: 10000000, tier: 'Group of 5', colors: { primary: '#C41E3A', secondary: '#FFFFFF', accent: '#000' } },
    { id: 'bgsu', name: 'Falcon State University', nickname: 'Falcons', state: 'OH', conference: 'Mid-American Conference', budget: 9500000, tier: 'Group of 5', colors: { primary: '#FE5000', secondary: '#4F2C1D', accent: '#FFFFFF' } },
    { id: 'ballstate', name: 'Cardinal State University', nickname: 'Cardinals', state: 'IN', conference: 'Mid-American Conference', budget: 9500000, tier: 'Group of 5', colors: { primary: '#BA0C2F', secondary: '#FFFFFF', accent: '#000' } },
    { id: 'niu', name: 'Husky State University', nickname: 'Huskies', state: 'IL', conference: 'Mid-American Conference', budget: 10000000, tier: 'Group of 5', colors: { primary: '#BA0C2F', secondary: '#000000', accent: '#FFFFFF' } },
    { id: 'emu', name: 'Eagle University', nickname: 'Eagles', state: 'MI', conference: 'Mid-American Conference', budget: 9000000, tier: 'Group of 5', colors: { primary: '#046A38', secondary: '#FFFFFF', accent: '#000' } },
    { id: 'wmu', name: 'Bronco State University', nickname: 'Broncos', state: 'MI', conference: 'Mid-American Conference', budget: 9500000, tier: 'Group of 5', colors: { primary: '#6F4C25', secondary: '#FFE395', accent: '#000' } },
    { id: 'cmu', name: 'Chippewa University', nickname: 'Chips', state: 'MI', conference: 'Mid-American Conference', budget: 9500000, tier: 'Group of 5', colors: { primary: '#6A0032', secondary: '#FFC82E', accent: '#FFFFFF' } },
    { id: 'kent', name: 'Golden Flash University', nickname: 'Flashes', state: 'OH', conference: 'Mid-American Conference', budget: 9000000, tier: 'Group of 5', colors: { primary: '#002664', secondary: '#EAAA00', accent: '#FFFFFF' } },
    { id: 'akron', name: 'Zip University', nickname: 'Zips', state: 'OH', conference: 'Mid-American Conference', budget: 8500000, tier: 'Group of 5', colors: { primary: '#041E42', secondary: '#A89968', accent: '#FFFFFF' } },
    { id: 'buffalo', name: 'Bull University', nickname: 'Bulls', state: 'NY', conference: 'Mid-American Conference', budget: 9500000, tier: 'Group of 5', colors: { primary: '#005BBB', secondary: '#FFFFFF', accent: '#000' } },
    
    // CONFERENCE USA (10 teams)
    { id: 'liberty', name: 'Liberty Mountain University', nickname: 'Flames', state: 'VA', conference: 'Conference USA', budget: 11000000, tier: 'Group of 5', colors: { primary: '#002147', secondary: '#A41E35', accent: '#FFFFFF' } },
    { id: 'wku', name: 'Hilltop University', nickname: 'Hilltoppers', state: 'KY', conference: 'Conference USA', budget: 9500000, tier: 'Group of 5', colors: { primary: '#C4122E', secondary: '#FFFFFF', accent: '#000' } },
    { id: 'mtsu', name: 'Blue Raider University', nickname: 'Raiders', state: 'TN', conference: 'Conference USA', budget: 9000000, tier: 'Group of 5', colors: { primary: '#0066CC', secondary: '#FFFFFF', accent: '#000' } },
    { id: 'fiu', name: 'Panther International University', nickname: 'Panthers', state: 'FL', conference: 'Conference USA', budget: 9000000, tier: 'Group of 5', colors: { primary: '#081E3F', secondary: '#B6862C', accent: '#FFFFFF' } },
    { id: 'latech', name: 'Louisiana Tech University', nickname: 'Bulldogs', state: 'LA', conference: 'Conference USA', budget: 9500000, tier: 'Group of 5', colors: { primary: '#002F8B', secondary: '#E31B23', accent: '#FFFFFF' } },
    { id: 'utep', name: 'Miner University', nickname: 'Miners', state: 'TX', conference: 'Conference USA', budget: 9000000, tier: 'Group of 5', colors: { primary: '#FF8200', secondary: '#041E42', accent: '#FFFFFF' } },
    { id: 'nmsu', name: 'Aggie State University', nickname: 'Aggies', state: 'NM', conference: 'Conference USA', budget: 8500000, tier: 'Group of 5', colors: { primary: '#891314', secondary: '#FFFFFF', accent: '#000' } },
    { id: 'jaxstate', name: 'Gamecock State University', nickname: 'Cocks', state: 'AL', conference: 'Conference USA', budget: 9000000, tier: 'Group of 5', colors: { primary: '#CC0033', secondary: '#FFFFFF', accent: '#000' } },
    { id: 'kennesaw', name: 'Owl State University', nickname: 'Owls', state: 'GA', conference: 'Conference USA', budget: 8500000, tier: 'Group of 5', colors: { primary: '#000000', secondary: '#FDB913', accent: '#FFFFFF' } },
    { id: 'samhouston', name: 'Bearkat University', nickname: 'Bearkats', state: 'TX', conference: 'Conference USA', budget: 8500000, tier: 'Group of 5', colors: { primary: '#F76900', secondary: '#FFFFFF', accent: '#000' } },
    
    // Additional FBS Teams (Recent additions to reach 134)
    { id: 'delaware', name: 'Blue Hen University', nickname: 'Hens', state: 'DE', conference: 'Conference USA', budget: 8000000, tier: 'Group of 5', colors: { primary: '#00539F', secondary: '#FFD200', accent: '#FFFFFF' } },
    { id: 'mizzou-st', name: 'Missouri Valley State', nickname: 'Bears', state: 'MO', conference: 'Conference USA', budget: 8000000, tier: 'Group of 5', colors: { primary: '#5D1725', secondary: '#F1C400', accent: '#FFFFFF' } },
    { id: 'westerncarolina', name: 'Western Carolina Tech', nickname: 'Catamounts', state: 'NC', conference: 'Sunbelt Conference', budget: 8500000, tier: 'Group of 5', colors: { primary: '#592C82', secondary: '#B4975A', accent: '#FFFFFF' } },
    { id: 'uconn', name: 'Connecticut State', nickname: 'Huskies', state: 'CT', conference: 'Independent', budget: 12000000, tier: 'Group of 5', colors: { primary: '#000E2F', secondary: '#FFFFFF', accent: '#000' } },
    { id: 'umass', name: 'Massachusetts State', nickname: 'Minutemen', state: 'MA', conference: 'Independent', budget: 11000000, tier: 'Group of 5', colors: { primary: '#881C1C', secondary: '#FFFFFF', accent: '#000' } },
    { id: 'nmstate', name: 'Northern New Mexico State', nickname: 'Roadrunners', state: 'NM', conference: 'Conference USA', budget: 8000000, tier: 'Group of 5', colors: { primary: '#C41230', secondary: '#000000', accent: '#FFFFFF' } }
  ]
};

// Rivalry mappings - each school has 1-3 primary rivals
const RIVALRIES = {
  // BLUE BLOODS
  'crimson-al': ['plains-al', 'volunteer-tn', 'bayou-la'], // Alabama → Auburn (Iron Bowl), Tennessee, LSU
  'scarlet-oh': ['greatlakes-mi', 'spartanland-mi', 'keystone-pa'], // Ohio State → Michigan (The Game), Michigan State, Penn State
  'pacific-ca': ['westcoast-ca', 'goldendome-in', 'cardinal-ca'], // USC → UCLA, Notre Dame, Stanford
  'longhorn-tx': ['sooner-ok', 'aggieland-tx', 'cowboy-ok'], // Texas → Oklahoma (Red River), Texas A&M, Oklahoma State
  'peach-ga': ['sunshine-fl', 'plains-al', 'yellowjacket-ga'], // Georgia → Florida (WLOCP), Auburn (Deep South's Oldest), Georgia Tech (Clean Old Fashioned Hate)
  'bayou-la': ['crimson-al', 'plains-al', 'aggieland-tx'], // LSU → Alabama, Auburn, Texas A&M
  'sooner-ok': ['longhorn-tx', 'cowboy-ok', 'cornhusk-ne'], // Oklahoma → Texas (Red River), Oklahoma State (Bedlam), Nebraska
  'sunshine-fl': ['peach-ga', 'capitalcity-fl', 'volunteer-tn'], // Florida → Georgia, FSU, Tennessee
  'greatlakes-mi': ['scarlet-oh', 'spartanland-mi', 'goldendome-in'], // Michigan → Ohio State (The Game), Michigan State (Paul Bunyan), Notre Dame
  'keystone-pa': ['scarlet-oh', 'steel-pa', 'spartanland-mi'], // Penn State → Ohio State, Pitt, Michigan State
  'goldendome-in': ['pacific-ca', 'greatlakes-mi', 'spartanland-mi'], // Notre Dame → USC, Michigan, Michigan State

  // POWER 4 - SUMMIT LEAGUE (SEC-style)
  'plains-al': ['crimson-al', 'peach-ga', 'bayou-la'], // Auburn → Alabama (Iron Bowl), Georgia, LSU
  'volunteer-tn': ['crimson-al', 'sunshine-fl', 'bluegrass-ky'], // Tennessee → Alabama (Third Saturday in October), Florida, Kentucky
  'magnolia-ms': ['bulldogstate-ms', 'crimson-al', 'bayou-la'], // Ole Miss → Mississippi State (Egg Bowl), Alabama, LSU
  'naturalstate-ar': ['bayou-la', 'aggieland-tx', 'showme-mo'], // Arkansas → LSU, Texas A&M, Missouri
  'showme-mo': ['jayhawk-ks', 'naturalstate-ar', 'prairie-il'], // Missouri → Kansas (Border War), Arkansas, Illinois
  'aggieland-tx': ['longhorn-tx', 'bayou-la', 'crimson-al'], // Texas A&M → Texas, LSU, Alabama
  'bluegrass-ky': ['derby-ky', 'volunteer-tn', 'palmetto-sc'], // Kentucky → Louisville (Governor's Cup), Tennessee, South Carolina
  'palmetto-sc': ['tigervalley-sc', 'peach-ga', 'bluegrass-ky'], // South Carolina → Clemson (Palmetto Bowl), Georgia, Kentucky
  'musiccity-tn': ['volunteer-tn', 'peach-ga', 'magnolia-ms'], // Vanderbilt → Tennessee, Georgia, Ole Miss
  'bulldogstate-ms': ['magnolia-ms', 'crimson-al', 'bayou-la'], // Mississippi State → Ole Miss (Egg Bowl), Alabama, LSU

  // POWER 4 - GREAT LAKES CONFERENCE (Big Ten-style)
  'cascade-or': ['emerald-wa', 'westcoast-ca', 'cardinal-ca'], // Oregon → Washington (Apple Cup style), UCLA, Stanford
  'emerald-wa': ['cascade-or', 'westcoast-ca', 'beehive-ut'], // Washington → Oregon, UCLA, Utah
  'cornhusk-ne': ['hawkeye-ia', 'sooner-ok', 'rockies-co'], // Nebraska → Iowa (Heroes Trophy), Oklahoma, Colorado
  'badger-wi': ['northstar-mn', 'hawkeye-ia', 'prairie-il'], // Wisconsin → Minnesota (Paul Bunyan's Axe), Iowa (Heartland Trophy), Illinois
  'hawkeye-ia': ['badger-wi', 'cornhusk-ne', 'northstar-mn'], // Iowa → Wisconsin, Nebraska, Minnesota
  'spartanland-mi': ['greatlakes-mi', 'scarlet-oh', 'keystone-pa'], // Michigan State → Michigan (Paul Bunyan), Ohio State, Penn State
  'northstar-mn': ['badger-wi', 'hawkeye-ia', 'prairie-il'], // Minnesota → Wisconsin (Paul Bunyan's Axe), Iowa, Illinois
  'prairie-il': ['lakeside-il', 'northstar-mn', 'hoosier-in'], // Illinois → Northwestern (Land of Lincoln), Minnesota, Indiana
  'hoosier-in': ['boiler-in', 'prairie-il', 'greatlakes-mi'], // Indiana → Purdue (Old Oaken Bucket), Illinois, Michigan
  'boiler-in': ['hoosier-in', 'prairie-il', 'goldendome-in'], // Purdue → Indiana (Old Oaken Bucket), Illinois, Notre Dame
  'chesapeake-md': ['keystone-pa', 'garden-nj', 'hokie-va'], // Maryland → Penn State, Rutgers, Virginia Tech
  'garden-nj': ['chesapeake-md', 'keystone-pa', 'steel-pa'], // Rutgers → Maryland, Penn State, Pitt
  'lakeside-il': ['prairie-il', 'greatlakes-mi', 'hoosier-in'], // Northwestern → Illinois (Land of Lincoln), Michigan, Indiana
  'goldenstate-ca': ['cardinal-ca', 'pacific-ca', 'westcoast-ca'], // Cal → Stanford (Big Game), USC, UCLA
  'westcoast-ca': ['pacific-ca', 'cascade-or', 'cardinal-ca'], // UCLA → USC (Victory Bell), Oregon, Stanford

  // POWER 4 - ATLANTIC ALLIANCE (ACC-style)
  'tigervalley-sc': ['palmetto-sc', 'capitalcity-fl', 'peach-ga'], // Clemson → South Carolina (Palmetto Bowl), FSU, Georgia
  'capitalcity-fl': ['sunshine-fl', 'coastal-fl', 'tigervalley-sc'], // FSU → Florida, Miami, Clemson
  'coastal-fl': ['capitalcity-fl', 'sunshine-fl', 'hokie-va'], // Miami → FSU, Florida, Virginia Tech
  'tarheel-nc': ['wolfpack-nc', 'gothic-nc', 'hokie-va'], // UNC → NC State (Carlyle Cup), Duke (Victory Bell), Virginia Tech
  'wolfpack-nc': ['tarheel-nc', 'gothic-nc', 'demon-nc'], // NC State → UNC, Duke, Wake Forest
  'gothic-nc': ['tarheel-nc', 'wolfpack-nc', 'demon-nc'], // Duke → UNC (Victory Bell), NC State, Wake Forest
  'demon-nc': ['wolfpack-nc', 'gothic-nc', 'tarheel-nc'], // Wake Forest → NC State, Duke, UNC
  'derby-ky': ['bluegrass-ky', 'rivercity-oh', 'capitalcity-fl'], // Louisville → Kentucky (Governor's Cup), Cincinnati, FSU
  'cavalier-va': ['hokie-va', 'tarheel-nc', 'chesapeake-md'], // Virginia → Virginia Tech (Commonwealth Cup), UNC, Maryland
  'hokie-va': ['cavalier-va', 'coastal-fl', 'mountaineer-wv'], // Virginia Tech → Virginia (Commonwealth Cup), Miami, West Virginia
  'steel-pa': ['mountaineer-wv', 'keystone-pa', 'garden-nj'], // Pitt → West Virginia (Backyard Brawl), Penn State, Rutgers
  'orange-ny': ['newengland-ma', 'steel-pa', 'garden-nj'], // Syracuse → Boston College, Pitt, Rutgers
  'newengland-ma': ['orange-ny', 'goldendome-in', 'cavalier-va'], // Boston College → Syracuse, Notre Dame, Virginia
  'yellowjacket-ga': ['peach-ga', 'tigervalley-sc', 'hokie-va'], // Georgia Tech → Georgia (Clean Old Fashioned Hate), Clemson, Virginia Tech
  'cardinal-ca': ['goldenstate-ca', 'pacific-ca', 'goldendome-in'], // Stanford → Cal (Big Game), USC, Notre Dame
  'dallastech-tx': ['hornedfrog-tx', 'bayoucity-tx', 'bearland-tx'], // SMU → TCU (Iron Skillet), Houston, Baylor
  'berkeley-ca': ['cardinal-ca', 'pacific-ca', 'westcoast-ca'], // Berkeley Tech → Stanford, USC, UCLA

  // POWER 4 - FRONTIER LEAGUE (Big 12-style)
  'mountainwest-ut': ['beehive-ut', 'desert-az', 'rockies-co'], // BYU → Utah (Holy War), Arizona, Colorado
  'beehive-ut': ['mountainwest-ut', 'rockies-co', 'emerald-wa'], // Utah → BYU (Holy War), Colorado, Washington
  'rockies-co': ['cornhusk-ne', 'beehive-ut', 'cowboy-ok'], // Colorado → Nebraska, Utah, Oklahoma State
  'desert-az': ['sundevil-az', 'beehive-ut', 'mountainwest-ut'], // Arizona → Arizona State (Duel in the Desert), Utah, BYU
  'sundevil-az': ['desert-az', 'beehive-ut', 'mountainwest-ut'], // Arizona State → Arizona (Duel in the Desert), Utah, BYU
  'jayhawk-ks': ['showme-mo', 'wildcat-ks', 'cyclone-ia'], // Kansas → Missouri (Border War), Kansas State (Sunflower Showdown), Iowa State
  'wildcat-ks': ['jayhawk-ks', 'cyclone-ia', 'cowboy-ok'], // Kansas State → Kansas (Sunflower Showdown), Iowa State, Oklahoma State
  'hornedfrog-tx': ['bearland-tx', 'dallastech-tx', 'redraider-tx'], // TCU → Baylor (Revivalry), SMU (Iron Skillet), Texas Tech
  'bearland-tx': ['hornedfrog-tx', 'aggieland-tx', 'redraider-tx'], // Baylor → TCU (Revivalry), Texas A&M, Texas Tech
  'redraider-tx': ['longhorn-tx', 'bearland-tx', 'hornedfrog-tx'], // Texas Tech → Texas, Baylor, TCU
  'cowboy-ok': ['sooner-ok', 'longhorn-tx', 'wildcat-ks'], // Oklahoma State → Oklahoma (Bedlam), Texas, Kansas State
  'bayoucity-tx': ['dallastech-tx', 'utsa', 'rice'], // Houston → SMU, UTSA, Rice
  'centralflorida-fl': ['usf', 'coastal-fl', 'capitalcity-fl'], // UCF → USF (War on I-4), Miami, FSU
  'rivercity-oh': ['derby-ky', 'mountaineer-wv', 'toledo'], // Cincinnati → Louisville, West Virginia (River City Rivalry), Toledo
  'mountaineer-wv': ['steel-pa', 'hokie-va', 'rivercity-oh'], // West Virginia → Pitt (Backyard Brawl), Virginia Tech (Black Diamond Trophy), Cincinnati
  'cyclone-ia': ['hawkeye-ia', 'jayhawk-ks', 'wildcat-ks'], // Iowa State → Iowa (Cy-Hawk), Kansas, Kansas State

  // GROUP OF 5 - AMERICAN ATHLETIC
  'memphis': ['tulane', 'utsa', 'usf'], // Memphis → Tulane, UTSA, USF
  'tulane': ['memphis', 'usf', 'ecu'], // Tulane → Memphis, USF, ECU
  'usf': ['centralflorida-fl', 'fau', 'tulane'], // USF → UCF (War on I-4), FAU, Tulane
  'navy': ['army', 'temple', 'airforce'], // Navy → Army (Army-Navy), Temple, Air Force
  'army': ['navy', 'temple', 'airforce'], // Army → Navy (Army-Navy), Temple, Air Force
  'temple': ['navy', 'army', 'ecu'], // Temple → Navy, Army, ECU
  'ecu': ['charlotte', 'appstate', 'temple'], // ECU → Charlotte, App State, Temple
  'charlotte': ['ecu', 'appstate', 'coastalcarolina'], // Charlotte → ECU, App State, Coastal Carolina
  'utsa': ['bayoucity-tx', 'memphis', 'rice'], // UTSA → Houston, Memphis, Rice
  'fau': ['usf', 'fiu', 'coastalcarolina'], // FAU → USF, FIU, Coastal Carolina
  'rice': ['bayoucity-tx', 'utsa', 'tulsa'], // Rice → Houston (Bayou Bucket), UTSA, Tulsa
  'tulsa': ['rice', 'memphis', 'latech'], // Tulsa → Rice, Memphis, Louisiana Tech
  'uab': ['southalabama', 'troy', 'memphis'], // UAB → South Alabama, Troy, Memphis

  // GROUP OF 5 - MOUNTAIN DIVISION
  'boise': ['fresno', 'nevada', 'sdsu'], // Boise State → Fresno State (Milk Can), Nevada, San Diego State
  'fresno': ['boise', 'sdsu', 'sjsu'], // Fresno State → Boise State, San Diego State, San Jose State
  'sdsu': ['fresno', 'boise', 'unlv'], // San Diego State → Fresno State, Boise State, UNLV
  'unlv': ['nevada', 'sdsu', 'newmexico'], // UNLV → Nevada (Battle for Nevada), San Diego State, New Mexico
  'nevada': ['unlv', 'boise', 'fresno'], // Nevada → UNLV (Battle for Nevada), Boise State, Fresno State
  'newmexico': ['nmsu', 'unlv', 'wyoming'], // New Mexico → New Mexico State (Rio Grande Rivalry), UNLV, Wyoming
  'wyoming': ['csu', 'newmexico', 'airforce'], // Wyoming → Colorado State (Border War), New Mexico, Air Force
  'airforce': ['army', 'navy', 'csu'], // Air Force → Army, Navy, Colorado State
  'csu': ['wyoming', 'rockies-co', 'airforce'], // Colorado State → Wyoming (Border War), Colorado, Air Force
  'utahstate': ['mountainwest-ut', 'beehive-ut', 'wyoming'], // Utah State → BYU, Utah, Wyoming
  'sjsu': ['fresno', 'sdsu', 'hawaii'], // San Jose State → Fresno State, San Diego State, Hawaii
  'hawaii': ['sjsu', 'boise', 'fresno'], // Hawaii → San Jose State, Boise State, Fresno State

  // GROUP OF 5 - SUNBELT CONFERENCE
  'appstate': ['ecu', 'charlotte', 'georgiasouthern'], // App State → ECU, Charlotte, Georgia Southern
  'coastalcarolina': ['charlotte', 'appstate', 'fau'], // Coastal Carolina → Charlotte, App State, FAU
  'louisiana': ['ulm', 'troy', 'arkstate'], // Louisiana → ULM (Sun Belt's Oldest Rivalry), Troy, Arkansas State
  'troy': ['southalabama', 'uab', 'louisiana'], // Troy → South Alabama (Battle for the Belt), UAB, Louisiana
  'southalabama': ['troy', 'uab', 'georgiasouthern'], // South Alabama → Troy (Battle for the Belt), UAB, Georgia Southern
  'georgiasouthern': ['appstate', 'coastalcarolina', 'southalabama'], // Georgia Southern → App State, Coastal Carolina, South Alabama
  'marshall': ['mountaineer-wv', 'odu', 'jmu'], // Marshall → West Virginia, Old Dominion, James Madison
  'jmu': ['odu', 'marshall', 'appstate'], // James Madison → Old Dominion, Marshall, App State
  'odu': ['jmu', 'marshall', 'coastalcarolina'], // Old Dominion → James Madison, Marshall, Coastal Carolina
  'arkstate': ['louisiana', 'ulm', 'troy'], // Arkansas State → Louisiana, ULM, Troy
  'ulm': ['louisiana', 'arkstate', 'latech'], // ULM → Louisiana (Sun Belt's Oldest Rivalry), Arkansas State, Louisiana Tech
  'texasstate': ['utsa', 'bayoucity-tx', 'louisiana'], // Texas State → UTSA, Houston, Louisiana

  // GROUP OF 5 - MID-AMERICAN CONFERENCE
  'toledo': ['bgsu', 'rivercity-oh', 'emu'], // Toledo → Bowling Green (Battle of I-75), Cincinnati, Eastern Michigan
  'ohio': ['miamioh', 'bgsu', 'kent'], // Ohio → Miami (OH) (Battle of the Bricks), Bowling Green, Kent State
  'miamioh': ['ohio', 'rivercity-oh', 'bgsu'], // Miami (OH) → Ohio (Battle of the Bricks), Cincinnati, Bowling Green
  'bgsu': ['toledo', 'ohio', 'miamioh'], // Bowling Green → Toledo (Battle of I-75), Ohio, Miami (OH)
  'ballstate': ['niu', 'emu', 'wmu'], // Ball State → Northern Illinois, Eastern Michigan, Western Michigan
  'niu': ['ballstate', 'toledo', 'wmu'], // Northern Illinois → Ball State, Toledo, Western Michigan
  'emu': ['cmu', 'wmu', 'toledo'], // Eastern Michigan → Central Michigan (Michigan MAC Trophy), Western Michigan, Toledo
  'wmu': ['cmu', 'emu', 'ballstate'], // Western Michigan → Central Michigan, Eastern Michigan, Ball State
  'cmu': ['emu', 'wmu', 'niu'], // Central Michigan → Eastern Michigan (Michigan MAC Trophy), Western Michigan, Northern Illinois
  'kent': ['akron', 'ohio', 'bgsu'], // Kent State → Akron (Wagon Wheel), Ohio, Bowling Green
  'akron': ['kent', 'ohio', 'buffalo'], // Akron → Kent State (Wagon Wheel), Ohio, Buffalo
  'buffalo': ['akron', 'toledo', 'niu'], // Buffalo → Akron, Toledo, Northern Illinois

  // GROUP OF 5 - CONFERENCE USA
  'liberty': ['jmu', 'hokie-va', 'wku'], // Liberty → James Madison, Virginia Tech, Western Kentucky
  'wku': ['mtsu', 'liberty', 'emu'], // Western Kentucky → Middle Tennessee (100 Miles of Hate), Liberty, Eastern Michigan
  'mtsu': ['wku', 'volunteer-tn', 'musiccity-tn'], // Middle Tennessee → Western Kentucky (100 Miles of Hate), Tennessee, Vanderbilt
  'fiu': ['fau', 'coastal-fl', 'usf'], // FIU → FAU (Shula Bowl), Miami, USF
  'latech': ['ulm', 'tulsa', 'rice'], // Louisiana Tech → ULM, Tulsa, Rice
  'utep': ['nmsu', 'newmexico', 'redraider-tx'], // UTEP → New Mexico State (Battle of I-10), New Mexico, Texas Tech
  'nmsu': ['utep', 'newmexico', 'nmstate'], // New Mexico State → UTEP (Battle of I-10), New Mexico, Northern New Mexico State
  'jaxstate': ['troy', 'southalabama', 'uab'], // Jacksonville State → Troy, South Alabama, UAB
  'kennesaw': ['jaxstate', 'georgiasouthern', 'troy'], // Kennesaw State → Jacksonville State, Georgia Southern, Troy
  'samhouston': ['texasstate', 'utsa', 'bayoucity-tx'], // Sam Houston → Texas State, UTSA, Houston
  'delaware': ['buffalo', 'temple', 'garden-nj'], // Delaware → Buffalo, Temple, Rutgers
  'mizzou-st': ['showme-mo', 'jayhawk-ks', 'arkstate'], // Missouri Valley State → Missouri, Kansas, Arkansas State
  'westerncarolina': ['appstate', 'ecu', 'charlotte'], // Western Carolina → App State, ECU, Charlotte
  'uconn': ['orange-ny', 'newengland-ma', 'umass'], // UConn → Syracuse, Boston College, UMass
  'umass': ['uconn', 'newengland-ma', 'temple'], // UMass → UConn, Boston College, Temple
  'nmstate': ['nmsu', 'newmexico', 'utep'] // Northern New Mexico State → New Mexico State, New Mexico, UTEP
};

const POSITIONS = ['QB', 'RB', 'WR', 'TE', 'OT', 'OG', 'C', 'EDGE', 'DT', 'LB', 'CB', 'S', 'K', 'P'];
const YEARS = ['FR', 'SO', 'JR', 'SR', '5Y'];

// Ideal roster targets by position
const POSITION_TARGETS = {
  'QB': 5,
  'RB': 6,
  'WR': 11,
  'TE': 6,
  'OT': 5,
  'OG': 5,
  'C': 5,
  'EDGE': 8,
  'DT': 8,
  'LB': 7,
  'CB': 8,
  'S': 7,
  'K': 2,
  'P': 2
};

const POSITION_MULTIPLIERS = {
  'QB': 2.5, 'EDGE': 2.0, 'OT': 2.0, 'CB': 2.0,
  'WR': 1.5, 'LB': 1.5, 'DT': 1.5,
  'RB': 1.0, 'S': 1.0, 'OG': 1.0, 'C': 1.0, 'TE': 1.0,
  'K': 0.5, 'P': 0.5
};

// Position groupings for Team tab
const OFFENSIVE_POSITIONS = ['QB', 'RB', 'WR', 'TE', 'OT', 'OG', 'C'];
const DEFENSIVE_POSITIONS = ['EDGE', 'DT', 'LB', 'CB', 'S'];
const SPECIAL_TEAMS_POSITIONS = ['K', 'P'];

// Generate rating based on star rating
const generateRating = (stars) => {
  const ranges = {
    5: [93, 100],
    4: [85, 93],
    3: [74, 84],
    2: [65, 73]
  };
  const range = ranges[stars] || [60, 65];
  return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
};

// Helper function to get the first Wednesday of December for a given year
const getEarlySigningPeriod = (year) => {
  // December is month 11 in JavaScript (0-indexed)
  const dec1 = new Date(year, 11, 1);
  const dayOfWeek = dec1.getDay(); // 0 = Sunday, 3 = Wednesday
  
  // Calculate days to add to get to first Wednesday
  let daysToWednesday;
  if (dayOfWeek === 0) daysToWednesday = 3; // Sunday
  else if (dayOfWeek <= 3) daysToWednesday = 3 - dayOfWeek;
  else daysToWednesday = 10 - dayOfWeek; // Next week's Wednesday
  
  const firstWednesday = 1 + daysToWednesday;
  const firstFriday = firstWednesday + 2;
  
  return { startDay: firstWednesday, endDay: firstFriday };
};

const getNationalSigningDay = (year) => {
  // February is month 1 in JavaScript (0-indexed)
  const feb1 = new Date(year, 1, 1);
  const dayOfWeek = feb1.getDay(); // 0 = Sunday, 3 = Wednesday
  
  // Calculate days to add to get to first Wednesday
  let daysToWednesday;
  if (dayOfWeek === 0) daysToWednesday = 3; // Sunday
  else if (dayOfWeek <= 3) daysToWednesday = 3 - dayOfWeek;
  else daysToWednesday = 10 - dayOfWeek; // Next week's Wednesday
  
  const firstWednesday = 1 + daysToWednesday;
  
  return firstWednesday; // National Signing Day is just one day
};

// Calendar Constants
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Calculate Early Signing Period dates for current year (2024 example)
const earlySigningDates = getEarlySigningPeriod(2024);
const nationalSigningDay = getNationalSigningDay(2025); // Feb 2025

const CALENDAR_EVENTS = [
  { startMonth: 2, startDay: 1, endMonth: 5, endDay: 30, title: 'The Off-Season', recruitingOpen: true, requiresWeeklyProgression: true, totalWeeks: 16 },
  { startMonth: 7, startDay: 1, endMonth: 7, endDay: 31, title: 'Training Camp' },
  { startMonth: 8, startDay: 1, endMonth: 10, endDay: 30, title: 'Regular Season', recruitingOpen: true, reducedPoints: true },
  { startMonth: 11, startDay: earlySigningDates.startDay, endMonth: 11, endDay: earlySigningDates.endDay, title: 'Early Signing Period', signingPeriod: true, signingType: 'early', recruitingOpen: true },
  { startMonth: 11, startDay: earlySigningDates.endDay + 1, endMonth: 11, endDay: earlySigningDates.endDay + 1, title: 'Conference Championships' },
  { startMonth: 11, startDay: 20, endMonth: 0, endDay: 1, title: 'The Playoffs', crossesYear: true },
  { startMonth: 0, startDay: 2, endMonth: 0, endDay: 31, title: 'Transfer Portal Open', recruitingOpen: true },
  { startMonth: 1, startDay: nationalSigningDay, endMonth: 1, endDay: nationalSigningDay, title: 'National Signing Day', signingPeriod: true, signingType: 'national', recruitingOpen: true }
];

// Generate AI Coach Names
const generateAICoachNames = () => {
  const firstNames = [
    'Mike', 'John', 'Steve', 'Tom', 'Dan', 'Jim', 'Bob', 'Mark', 'Dave', 'Nick',
    'Kyle', 'Chris', 'Brian', 'Scott', 'Kevin', 'Ryan', 'Matt', 'Paul', 'Jeff', 'Joe',
    'Rich', 'Greg', 'Tony', 'Frank', 'Bill', 'Tim', 'Gary', 'Ron', 'Ken', 'Pete',
    'Dabo', 'Kirby', 'Lane', 'Lincoln', 'Urban', 'Chip', 'Mack', 'Pat', 'Les', 'Jimbo'
  ];

  const lastNames = [
    'Johnson', 'Smith', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Moore', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson',
    'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King',
    'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter',
    'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins'
  ];

  const allSchools = [...SCHOOLS.blueBloods, ...SCHOOLS.power4, ...SCHOOLS.group5];
  const coaches = {};

  // Use a seeded approach to ensure consistency
  allSchools.forEach((school, index) => {
    const firstIndex = (index * 7) % firstNames.length;
    const lastIndex = (index * 11) % lastNames.length;
    coaches[school.id] = `${firstNames[firstIndex]} ${lastNames[lastIndex]}`;
  });

  return coaches;
};

// Random Event System
const EVENT_TYPES = {
  NIL_DEMAND: 'nil_demand',
  PORTAL_THREAT: 'portal_threat',
  LEGAL_ISSUE: 'legal_issue',
  INJURY_REPORT: 'injury_report',
  ACADEMIC_ISSUE: 'academic_issue',
  RECRUITING_POACH: 'recruiting_poach',
  SIGNING_DAY_FLIP: 'signing_day_flip'
};

const generateRandomEvent = (roster, currentEvent, budget) => {
  // Different probabilities based on current calendar event
  let eventChance = 0.15; // Base 15% chance per sim
  
  if (currentEvent === 'Spring Football Game') eventChance = 0.4; // 40% after spring game
  if (currentEvent === 'Transfer Portal Open') eventChance = 0.5; // 50% during portal
  if (currentEvent === 'Regular Season') eventChance = 0.25; // 25% during season
  
  if (Math.random() > eventChance) return null;
  
  // Filter players by satisfaction for relevant events
  const unhappyPlayers = roster.filter(p => p.satisfaction === 'Low');
  const mediumPlayers = roster.filter(p => p.satisfaction === 'Medium');
  const happyPlayers = roster.filter(p => p.satisfaction === 'High');
  const starPlayers = roster.filter(p => p.stars >= 4 && p.isStarter);
  
  // Weighted event type selection
  const eventTypes = [];
  
  if (unhappyPlayers.length > 0) {
    eventTypes.push(EVENT_TYPES.PORTAL_THREAT, EVENT_TYPES.PORTAL_THREAT); // Higher weight
  }
  
  if (starPlayers.length > 0 && currentEvent === 'Spring Football Game') {
    eventTypes.push(EVENT_TYPES.NIL_DEMAND, EVENT_TYPES.NIL_DEMAND, EVENT_TYPES.NIL_DEMAND);
  } else if (starPlayers.length > 0) {
    eventTypes.push(EVENT_TYPES.NIL_DEMAND);
  }
  
  if (roster.length > 0) {
    eventTypes.push(EVENT_TYPES.INJURY_REPORT, EVENT_TYPES.ACADEMIC_ISSUE, EVENT_TYPES.LEGAL_ISSUE);
  }
  
  if (starPlayers.length > 0 && currentEvent === 'Regular Season') {
    eventTypes.push(EVENT_TYPES.RECRUITING_POACH);
  }
  
  if (eventTypes.length === 0) return null;
  
  const selectedType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  
  // Generate specific event based on type
  switch (selectedType) {
    case EVENT_TYPES.NIL_DEMAND: {
      const player = starPlayers[Math.floor(Math.random() * starPlayers.length)];
      const demandIncrease = Math.round(player.marketValue * (0.2 + Math.random() * 0.3)); // 20-50% increase
      return {
        type: EVENT_TYPES.NIL_DEMAND,
        player,
        title: 'NIL Renegotiation Request',
        description: `${player.name}, your ${player.stars}-star ${player.position}, has requested a meeting about their NIL deal. After their strong performance, they believe they deserve ${formatCurrency(player.currentNIL + demandIncrease)} (currently at ${formatCurrency(player.currentNIL)}).`,
        options: [
          {
            label: 'Agree to Full Increase',
            effect: 'Increase NIL, player becomes very happy',
            cost: demandIncrease,
            outcome: {
              nilChange: demandIncrease,
              satisfactionChange: 'High',
              message: `${player.name} is thrilled with the new deal and commits long-term!`
            }
          },
          {
            label: 'Negotiate (75% of request)',
            effect: 'Partial increase, player satisfied',
            cost: Math.round(demandIncrease * 0.75),
            outcome: {
              nilChange: Math.round(demandIncrease * 0.75),
              satisfactionChange: player.satisfaction === 'Low' ? 'Medium' : 'High',
              message: `${player.name} accepts the compromise and appreciates being heard.`
            }
          },
          {
            label: 'Decline Request',
            effect: 'No cost, but player unhappy',
            cost: 0,
            outcome: {
              nilChange: 0,
              satisfactionChange: 'Low',
              message: `${player.name} is disappointed and may explore other options...`
            }
          }
        ]
      };
    }
    
    case EVENT_TYPES.PORTAL_THREAT: {
      const player = unhappyPlayers.length > 0 
        ? unhappyPlayers[Math.floor(Math.random() * unhappyPlayers.length)]
        : mediumPlayers[Math.floor(Math.random() * mediumPlayers.length)];
      
      const retentionBonus = Math.round(player.marketValue * 0.3);
      
      return {
        type: EVENT_TYPES.PORTAL_THREAT,
        player,
        title: 'Transfer Portal Threat',
        description: `${player.name} (${player.position}, ${player.year}) has been contacted by other programs and is considering entering the transfer portal. They're unhappy with their current situation.`,
        options: [
          {
            label: 'Offer Retention Bonus',
            effect: 'Large NIL increase, player stays happy',
            cost: retentionBonus,
            outcome: {
              nilChange: retentionBonus,
              satisfactionChange: 'High',
              stays: true,
              message: `${player.name} appreciates the investment and commits to staying!`
            }
          },
          {
            label: 'Have Heart-to-Heart',
            effect: '50% chance they stay, no cost',
            cost: 0,
            outcome: {
              nilChange: 0,
              satisfactionChange: Math.random() > 0.5 ? 'Medium' : 'Low',
              stays: Math.random() > 0.5,
              message: Math.random() > 0.5 
                ? `${player.name} appreciates the conversation and decides to stay.`
                : `${player.name} has entered the transfer portal.`
            }
          },
          {
            label: 'Let Them Walk',
            effect: 'Player enters portal, free up NIL money',
            cost: 0,
            outcome: {
              nilChange: -player.currentNIL,
              satisfactionChange: null,
              stays: false,
              removePlayer: true,
              message: `${player.name} has entered the transfer portal. You'll save ${formatCurrency(player.currentNIL)} in NIL.`
            }
          }
        ]
      };
    }
    
    case EVENT_TYPES.LEGAL_ISSUE: {
      const player = roster[Math.floor(Math.random() * roster.length)];
      const fineCost = 50000 + Math.floor(Math.random() * 100000);
      
      return {
        type: EVENT_TYPES.LEGAL_ISSUE,
        player,
        title: 'Compliance Issue',
        description: `${player.name} may have violated NCAA NIL rules. The compliance office needs guidance on how to proceed. This could result in fines or penalties.`,
        options: [
          {
            label: 'Hire Legal Team',
            effect: 'Expensive but protects player and program',
            cost: fineCost,
            outcome: {
              nilChange: 0,
              satisfactionChange: 'High',
              message: `Legal team clears ${player.name}. Crisis averted, player grateful.`
            }
          },
          {
            label: 'Self-Report',
            effect: 'Suspend player, minor penalty',
            cost: Math.round(fineCost * 0.3),
            outcome: {
              nilChange: 0,
              satisfactionChange: 'Low',
              message: `${player.name} suspended 2 games. Small fine paid, but player unhappy.`
            }
          },
          {
            label: 'Ignore It',
            effect: 'Risk major penalties later',
            cost: 0,
            outcome: {
              nilChange: 0,
              satisfactionChange: 'Medium',
              message: `Issue swept under rug... for now. Could resurface later.`
            }
          }
        ]
      };
    }
    
    case EVENT_TYPES.INJURY_REPORT: {
      const player = roster.filter(p => p.isStarter)[Math.floor(Math.random() * roster.filter(p => p.isStarter).length)] 
                     || roster[Math.floor(Math.random() * roster.length)];
      
      // Define specific injury types with recovery times
      const injuryTypes = [
        { name: 'Sprained Ankle', baseWeeks: 2, severity: 'Minor' },
        { name: 'Hamstring Strain', baseWeeks: 3, severity: 'Minor' },
        { name: 'Shoulder Strain', baseWeeks: 3, severity: 'Moderate' },
        { name: 'Knee Sprain (MCL)', baseWeeks: 4, severity: 'Moderate' },
        { name: 'Broken Finger', baseWeeks: 4, severity: 'Moderate' },
        { name: 'Concussion', baseWeeks: 2, severity: 'Serious' },
        { name: 'High Ankle Sprain', baseWeeks: 6, severity: 'Serious' },
        { name: 'Torn Meniscus', baseWeeks: 8, severity: 'Serious' },
        { name: 'AC Joint Separation', baseWeeks: 6, severity: 'Serious' }
      ];
      
      const injury = injuryTypes[Math.floor(Math.random() * injuryTypes.length)];
      const baseWeeks = injury.baseWeeks;
      
      // Calculate weeks for each treatment option
      const fullRecoveryWeeks = Math.max(1, Math.round(baseWeeks * 0.5)); // 50% faster
      const standardWeeks = baseWeeks;
      const minimalWeeks = Math.round(baseWeeks * 1.5); // 50% slower
      
      return {
        type: EVENT_TYPES.INJURY_REPORT,
        player,
        injury: injury.name,
        severity: injury.severity,
        baseWeeks,
        title: 'Injury Report',
        description: `${player.name} (${player.position}) suffered a ${injury.name} during practice. Medical staff has diagnosed it as a ${injury.severity.toLowerCase()} injury with an estimated recovery time of ${baseWeeks} week${baseWeeks > 1 ? 's' : ''} under standard treatment.`,
        options: [
          {
            label: 'Full Recovery Program',
            effect: `Premium rehab with specialists - Recovery: ${fullRecoveryWeeks} week${fullRecoveryWeeks > 1 ? 's' : ''} (50% faster)`,
            cost: 25000,
            recoveryWeeks: fullRecoveryWeeks,
            outcome: {
              satisfactionChange: 'High',
              message: `${player.name} receives world-class treatment and will return in ${fullRecoveryWeeks} week${fullRecoveryWeeks > 1 ? 's' : ''} at 100%. They appreciate the investment in their health!`
            }
          },
          {
            label: 'Standard Treatment',
            effect: `Normal team medical care - Recovery: ${standardWeeks} week${standardWeeks > 1 ? 's' : ''} (expected time)`,
            cost: 10000,
            recoveryWeeks: standardWeeks,
            outcome: {
              message: `${player.name} gets solid care and will return in ${standardWeeks} week${standardWeeks > 1 ? 's' : ''}, though may not be at full strength immediately.`
            }
          },
          {
            label: 'Minimal Treatment',
            effect: `Basic care only - Recovery: ${minimalWeeks} week${minimalWeeks > 1 ? 's' : ''} (50% slower, higher re-injury risk)`,
            cost: 2000,
            recoveryWeeks: minimalWeeks,
            outcome: {
              satisfactionChange: 'Low',
              message: `${player.name} frustrated with bare-bones treatment. Will miss ${minimalWeeks} week${minimalWeeks > 1 ? 's' : ''} and may be more prone to re-injury.`
            }
          }
        ]
      };
    }
    
    case EVENT_TYPES.ACADEMIC_ISSUE: {
      const player = roster[Math.floor(Math.random() * roster.length)];
      
      return {
        type: EVENT_TYPES.ACADEMIC_ISSUE,
        player,
        title: 'Academic Eligibility Concern',
        description: `${player.name} is struggling academically and may become ineligible. Academic support staff needs your decision.`,
        options: [
          {
            label: 'Private Tutoring',
            effect: 'Expensive but effective',
            cost: 15000,
            outcome: {
              satisfactionChange: 'High',
              message: `${player.name} gets back on track with intensive tutoring support.`
            }
          },
          {
            label: 'Study Hall Program',
            effect: 'Moderate cost, decent help',
            cost: 5000,
            outcome: {
              satisfactionChange: 'Medium',
              message: `${player.name} improves with additional study hall hours.`
            }
          },
          {
            label: 'Academic Probation',
            effect: 'No cost, player warned',
            cost: 0,
            outcome: {
              satisfactionChange: 'Low',
              message: `${player.name} placed on probation. They're stressed about eligibility.`
            }
          }
        ]
      };
    }
    
    case EVENT_TYPES.RECRUITING_POACH: {
      const player = starPlayers[Math.floor(Math.random() * starPlayers.length)];
      const counterOffer = Math.round(player.marketValue * 0.5);
      
      return {
        type: EVENT_TYPES.RECRUITING_POACH,
        player,
        title: 'Recruiting Tampering',
        description: `Rival programs are actively recruiting ${player.name} to transfer. Boosters from another school have made a lucrative offer.`,
        options: [
          {
            label: 'Counter Offer',
            effect: 'Match their offer, keep player',
            cost: counterOffer,
            outcome: {
              nilChange: counterOffer,
              satisfactionChange: 'High',
              message: `${player.name} stays after you demonstrate commitment with increased NIL.`
            }
          },
          {
            label: 'Appeal to Loyalty',
            effect: 'No cost, 60% success rate',
            cost: 0,
            outcome: {
              satisfactionChange: Math.random() > 0.4 ? 'High' : 'Low',
              stays: Math.random() > 0.4,
              message: Math.random() > 0.4
                ? `${player.name} chooses to stay loyal to the program!`
                : `${player.name} transfers to a rival school.`
            }
          },
          {
            label: 'Report Tampering',
            effect: 'File complaint, player likely leaves',
            cost: 0,
            outcome: {
              satisfactionChange: 'Low',
              stays: false,
              message: `You report tampering but ${player.name} still transfers. Relationship damaged.`
            }
          }
        ]
      };
    }
    
    case EVENT_TYPES.SIGNING_DAY_FLIP: {
      // This event is only generated during signing periods
      // It requires recruits data to be passed in
      return null; // Will be handled separately with recruits data
    }
    
    default:
      return null;
  }
};

// Generate flip attempt specifically during signing periods
const generateFlipAttempt = (recruits, allSchools, playerSchool, budget) => {
  // Get your verbal commits that haven't signed yet
  // EXCLUDE in-state recruits with 100% interest - they're locked in
  const vulnerableCommits = recruits.filter(r => {
    if (!r.verbalCommit || r.signedCommit || r.committedSchool?.id !== playerSchool?.id) {
      return false;
    }

    // In-state recruit with 100% interest = CANNOT flip
    const isInState = r.state === playerSchool?.state;
    const hasMaxInterest = r.interest >= 100;
    if (isInState && hasMaxInterest) {
      return false; // Locked in - cannot flip
    }

    return true; // Can flip
  });

  if (vulnerableCommits.length === 0) return null;
  
  // 40% chance of flip attempt during signing period
  if (Math.random() > 0.4) return null;
  
  // Target commits with lower interest (more vulnerable)
  // Sort by commitment interest (lower = more vulnerable)
  const sortedCommits = vulnerableCommits.sort((a, b) => 
    (a.commitmentInterest || 50) - (b.commitmentInterest || 50)
  );
  
  // Higher chance to target vulnerable commits (low interest)
  const targetRecruit = sortedCommits[0]; // Most vulnerable
  
  // Select a rival school for the flip attempt
  const rivalSchools = allSchools.filter(s => 
    s.id !== playerSchool.id && 
    s.tier !== 'Group of 5' // Only Power 4 and Blue Bloods flip
  );
  const rivalSchool = rivalSchools[Math.floor(Math.random() * rivalSchools.length)];
  
  // Calculate rival's offer (10-30% more than current NIL)
  const increasePercent = 0.1 + (Math.random() * 0.2); // 10-30%
  const rivalOffer = Math.round(targetRecruit.nilDeal * (1 + increasePercent));
  
  // Calculate flip probability based on commitment strength
  const commitmentStrength = targetRecruit.commitmentInterest || 50;
  const baseFlipChance = 100 - commitmentStrength; // Lower commitment = higher flip chance
  const offerBonus = (rivalOffer - targetRecruit.nilDeal) / 10000; // $10k = 1% bonus
  const flipProbability = Math.min(90, Math.max(10, baseFlipChance + offerBonus));
  
  return {
    type: EVENT_TYPES.SIGNING_DAY_FLIP,
    recruit: targetRecruit,
    rivalSchool,
    rivalOffer,
    flipProbability: Math.round(flipProbability),
    title: 'FLIP ALERT: Recruit Under Attack!',
    description: `⚠️ ${rivalSchool.name} is making a last-minute push for ${targetRecruit.name}! They've offered ${formatCurrency(rivalOffer)} (you're at ${formatCurrency(targetRecruit.nilDeal)}). ${targetRecruit.name} is wavering with ${Math.round(flipProbability)}% chance of flipping!`,
    options: [
      {
        label: 'Match Their Offer',
        effect: `Increase NIL to ${formatCurrency(rivalOffer)}, secure the commit`,
        cost: rivalOffer - targetRecruit.nilDeal,
        outcome: {
          nilChange: rivalOffer - targetRecruit.nilDeal,
          flipped: false,
          newNIL: rivalOffer,
          message: `${targetRecruit.name} appreciates you matching the offer and reaffirms their commitment! They're locked in.`
        }
      },
      {
        label: 'Beat Their Offer (+20%)',
        effect: `Offer ${formatCurrency(Math.round(rivalOffer * 1.2))}, guarantee no flip`,
        cost: Math.round(rivalOffer * 1.2) - targetRecruit.nilDeal,
        outcome: {
          nilChange: Math.round(rivalOffer * 1.2) - targetRecruit.nilDeal,
          flipped: false,
          newNIL: Math.round(rivalOffer * 1.2),
          commitmentBoost: true,
          message: `${targetRecruit.name} is blown away by your commitment! Flip risk eliminated - they're all in!`
        }
      },
      {
        label: 'Slight Increase (+10%)',
        effect: `Counter with ${formatCurrency(Math.round(targetRecruit.nilDeal * 1.1))}, ${100 - Math.round(flipProbability * 0.6)}% chance to keep`,
        cost: Math.round(targetRecruit.nilDeal * 1.1) - targetRecruit.nilDeal,
        outcome: {
          nilChange: Math.round(targetRecruit.nilDeal * 1.1) - targetRecruit.nilDeal,
          flipped: Math.random() < (flipProbability * 0.6 / 100), // 40% reduction in flip chance
          newNIL: Math.round(targetRecruit.nilDeal * 1.1),
          message: null // Will be determined by flip result
        }
      },
      {
        label: 'Hold Firm',
        effect: `Don't budge - ${100 - Math.round(flipProbability)}% chance to keep them`,
        cost: 0,
        outcome: {
          nilChange: 0,
          flipped: Math.random() < (flipProbability / 100),
          newNIL: targetRecruit.nilDeal,
          message: null // Will be determined by flip result
        }
      }
    ]
  };
};

// Simulate AI schools recruiting each week
const simulateAIRecruiting = (recruits, allSchools, playerSchoolId, aiRosters = {}) => {
  return recruits.map(recruit => {
    // Skip if already committed and signed
    if (recruit.signedCommit) return recruit;

    // Determine which schools should be recruiting this player
    const eligibleSchools = allSchools.filter(s => s.id !== playerSchoolId);
    
    // Star-based recruiting pool
    let recruitingPoolSize;
    if (recruit.stars === 5) {
      recruitingPoolSize = 15; // 15-20 schools recruit 5-stars
    } else if (recruit.stars === 4) {
      recruitingPoolSize = 10; // 10-15 schools recruit 4-stars
    } else if (recruit.stars === 3) {
      recruitingPoolSize = 5; // 5-8 schools recruit 3-stars
    } else {
      recruitingPoolSize = 3; // 2-4 schools recruit 2-stars
    }
    
    // Add some variance
    recruitingPoolSize += Math.floor(Math.random() * 5);
    
    // Initialize or update recruiting schools
    let recruitingSchools = recruit.recruitingSchools || [];
    
    // If this is first week, select initial schools
    if (recruitingSchools.length === 0) {
      // Prioritize dream schools (EXCLUDE player's school from AI recruiting)
      const dreamSchoolIds = (recruit.dreamSchools || []).map(s => s.id);
      recruitingSchools = recruit.dreamSchools
        .filter(school => school.id !== playerSchoolId) // CRITICAL: Don't let AI recruit for player's school
        .map(school => ({
          schoolId: school.id,
          schoolName: school.name,
          schoolTier: school.tier,
          interest: Math.floor(Math.random() * 30) + 20, // Start at 20-50%
          lastAction: 'Offered Scholarship',
          weeksSinceAction: 0
        }));
      
      // Add additional schools to fill the pool
      const remainingSlots = recruitingPoolSize - recruitingSchools.length;
      for (let i = 0; i < remainingSlots; i++) {
        const school = eligibleSchools[Math.floor(Math.random() * eligibleSchools.length)];
        if (!recruitingSchools.find(rs => rs.schoolId === school.id)) {
          recruitingSchools.push({
            schoolId: school.id,
            schoolName: school.name,
            schoolTier: school.tier,
            interest: Math.floor(Math.random() * 20) + 10, // Start at 10-30%
            lastAction: 'Initial Contact',
            weeksSinceAction: 0
          });
        }
      }
    }
    
    // Each week, simulate recruiting actions from AI schools
    recruitingSchools = recruitingSchools.map(rs => {
      // 80% chance a school takes action each week (increased from 60% to make AI more competitive)
      if (Math.random() < 0.8) {
        const actions = [
          { name: 'Phone Call', interestGain: 5 + Math.floor(Math.random() * 8) }, // 5-12
          { name: 'Official Visit', interestGain: 10 + Math.floor(Math.random() * 12) }, // 10-22
          { name: 'Home Visit', interestGain: 8 + Math.floor(Math.random() * 10) }, // 8-18
          { name: 'Coach Visit', interestGain: 12 + Math.floor(Math.random() * 15) } // 12-27
        ];

        const action = actions[Math.floor(Math.random() * actions.length)];

        // Apply star-based difficulty (same as user)
        let starDifficulty = 1.0;
        if (recruit.stars === 5) {
          starDifficulty = 0.5; // 5-stars gain HALF interest
        } else if (recruit.stars === 4) {
          starDifficulty = 0.7; // 4-stars gain 70% interest
        } else if (recruit.stars === 2) {
          starDifficulty = 1.3; // 2-stars gain 130% interest (easier)
        }

        // Apply diminishing returns based on current interest (same as user)
        let diminishingReturns = 1.0;
        if (rs.interest < 30) {
          diminishingReturns = 1.0; // Full effect at low interest
        } else if (rs.interest < 50) {
          diminishingReturns = 0.8; // 80% effect
        } else if (rs.interest < 70) {
          diminishingReturns = 0.6; // 60% effect
        } else if (rs.interest < 85) {
          diminishingReturns = 0.4; // 40% effect - much harder to reach commit threshold
        } else {
          diminishingReturns = 0.2; // 20% effect - very hard to get to 100%
        }

        // Blue Bloods get bonus interest gain
        const tierBonus = rs.schoolTier === 'Blue Blood' ? 1.2 : rs.schoolTier === 'Power 4' ? 1.0 : 0.8;

        // Apply trait-based modifiers for AI recruiting
        let aiTraitModifier = 1.0;

        // Championship Focused: Responds better to Blue Bloods
        if (recruit.traits?.includes('Championship Focused')) {
          if (rs.schoolTier === 'Blue Blood') {
            aiTraitModifier *= 1.15; // +15% for Blue Bloods
          } else if (rs.schoolTier === 'Group of 5') {
            aiTraitModifier *= 0.85; // -15% for Group of 5
          }
        }

        // Close to Home: Geography affects AI recruiting too
        if (recruit.traits?.includes('Close to Home')) {
          const aiSchool = allSchools.find(s => s.id === rs.schoolId);
          if (aiSchool && recruit.state === aiSchool.state) {
            aiTraitModifier *= 1.2; // +20% for same state
          } else if (aiSchool && recruit.state !== aiSchool.state) {
            // Simplified: assume 20% penalty for out of state (could add neighboring logic)
            aiTraitModifier *= 0.8;
          }
        }

        // Playing Time Focused: Would need AI roster depth check (skip for now, assume neutral)
        // Development Focused: No special modifier for regular recruiting

        // Calculate final interest gain with all modifiers
        const interestGain = Math.round(action.interestGain * starDifficulty * diminishingReturns * tierBonus * aiTraitModifier);

        return {
          ...rs,
          interest: Math.min(100, rs.interest + interestGain),
          lastAction: action.name,
          weeksSinceAction: 0
        };
      } else {
        return {
          ...rs,
          weeksSinceAction: (rs.weeksSinceAction || 0) + 1
        };
      }
    });
    
    // Sort by interest level
    recruitingSchools.sort((a, b) => b.interest - a.interest);
    
    // Determine leading school (if not committed to player)
    let leadingSchool = null;
    let commitmentLeader = null;
    
    if (!recruit.verbalCommit && recruitingSchools.length > 0) {
      leadingSchool = recruitingSchools[0];
      commitmentLeader = leadingSchool;
      
      // If leading school hits 95%+ (AI threshold), check if they have room for the commit
      // AI schools commit at 95%+ because it's nearly impossible to reach exactly 100% with their action rate
      if (leadingSchool.interest >= 95 && !recruit.verbalCommit) {
        const aiSchool = allSchools.find(s => s.id === leadingSchool.schoolId);

        // CRITICAL: If aiSchool not found, skip commit to prevent corruption
        if (!aiSchool) {
          console.error(`⚠️ AI school not found for ID: ${leadingSchool.schoolId} - Skipping commit for ${recruit.name}`);
          return {
            ...recruit,
            recruitingSchools,
            leadingSchool,
            commitmentLeader
          };
        }

        // CRITICAL: Verify aiSchool is not the player's school
        if (aiSchool.id === playerSchoolId) {
          console.error(`⚠️ AI commit attempted to player school ${aiSchool.name} for ${recruit.name} - Skipping`);
          return {
            ...recruit,
            recruitingSchools,
            leadingSchool,
            commitmentLeader
          };
        }

        // Calculate available spots for AI school using same logic as player
        const aiRoster = aiRosters[leadingSchool.schoolId] || [];
        const fifthYears = aiRoster.filter(p => p.year === '5Y').length;
        const seniors = aiRoster.filter(p => p.year === 'SR').length;
        const nflEligibleJuniors = aiRoster.filter(p => p.year === 'JR' && p.rating >= 93).length;
        const expectedDepartures = fifthYears + Math.ceil(seniors * 0.75) + nflEligibleJuniors;
        const currentCommits = recruits.filter(r => r.verbalCommit && r.committedSchool?.id === leadingSchool.schoolId).length;
        const availableSpots = 85 - aiRoster.length + expectedDepartures - currentCommits;

        // Only commit if school has available spots
        if (availableSpots > 0) {
          // Trait-based commit threshold checks
          let shouldCommit = true;

          // Championship Focused: Might wait for Blue Blood if leading school isn't one
          if (recruit.traits?.includes('Championship Focused') && aiSchool.tier !== 'Blue Blood') {
            // 30% chance to wait for a Blue Blood offer instead of committing to Power 4/G5
            if (Math.random() < 0.3) {
              shouldCommit = false;
              console.log(`${recruit.name} (Championship Focused) waiting for Blue Blood offers instead of ${aiSchool.name}`);
            }
          }

          // Playing Time Focused: Check if position has depth (simplified - would need full roster check)
          // For now, assume random 20% chance they don't commit due to depth concerns
          if (recruit.traits?.includes('Playing Time Focused') && Math.random() < 0.2) {
            shouldCommit = false;
            console.log(`${recruit.name} (Playing Time Focused) concerned about depth chart at ${aiSchool.name}`);
          }

          if (shouldCommit) {
            // Calculate NIL deal based on traits
            let nilMultiplier = 1.0;

            // NIL-Driven: Get higher NIL deals (30-50% more)
            if (recruit.traits?.includes('NIL-Driven')) {
              nilMultiplier = 1.3 + Math.random() * 0.2; // 130-150% of market value
            }

            // Development Focused: Accept lower NIL (70-80% of market value)
            if (recruit.traits?.includes('Development Focused')) {
              nilMultiplier = 0.7 + Math.random() * 0.1; // 70-80% of market value
            }

            const nilDeal = Math.round(recruit.marketValue * nilMultiplier);

            // Create a clean school object to avoid reference issues
            const cleanSchoolData = {
              id: aiSchool.id,
              name: aiSchool.name,
              nickname: aiSchool.nickname,
              state: aiSchool.state,
              conference: aiSchool.conference,
              budget: aiSchool.budget,
              tier: aiSchool.tier,
              colors: aiSchool.colors
            };

            return {
              ...recruit,
              verbalCommit: true,
              committedSchool: cleanSchoolData,
              nilDeal: nilDeal,
              commitmentInterest: 100,
              recruitingSchools,
              leadingSchool,
              commitmentLeader
            };
          }
        }
      }
    } else if (recruit.verbalCommit && recruit.committedSchool?.id !== playerSchoolId) {
      // If committed to AI school, show who it is
      leadingSchool = recruitingSchools.find(rs => rs.schoolId === recruit.committedSchool.id);
    } else if (recruit.verbalCommit && recruit.committedSchool?.id === playerSchoolId && recruitingSchools.length > 0) {
      // If committed to player, show who's in second place
      leadingSchool = recruitingSchools[0];
      commitmentLeader = leadingSchool;
    }
    
    return {
      ...recruit,
      recruitingSchools,
      leadingSchool,
      commitmentLeader
    };
  });
};

// Calculate flip multiplier based on NIL deal generosity
const calculateFlipMultiplierFromNIL = (nilDeal, askingPrice, marketValue, baseFlipMultiplier) => {
  // Calculate how generous the offer is
  const percentOfAsking = nilDeal / askingPrice;
  const percentOfMarket = nilDeal / marketValue;
  
  // Base flip multiplier (from commitment interest level)
  let finalMultiplier = baseFlipMultiplier;
  
  // OVERPAY BONUSES - Reduce flip risk significantly
  if (percentOfAsking >= 1.20) {
    // 20%+ over asking: Massive loyalty bonus
    finalMultiplier *= 0.3; // Reduce flip risk by 70%
  } else if (percentOfAsking >= 1.15) {
    // 15-20% over asking: Major loyalty bonus
    finalMultiplier *= 0.4; // Reduce flip risk by 60%
  } else if (percentOfAsking >= 1.10) {
    // 10-15% over asking: Significant loyalty bonus
    finalMultiplier *= 0.5; // Reduce flip risk by 50%
  } else if (percentOfAsking >= 1.05) {
    // 5-10% over asking: Good loyalty bonus
    finalMultiplier *= 0.7; // Reduce flip risk by 30%
  } else if (percentOfAsking >= 1.0) {
    // Met asking price exactly: Small bonus
    finalMultiplier *= 0.9; // Reduce flip risk by 10%
  } else if (percentOfAsking >= 0.95) {
    // 95-100% of asking: Slight penalty
    finalMultiplier *= 1.1; // Increase flip risk by 10%
  } else if (percentOfAsking >= 0.90) {
    // 90-95% of asking: Moderate penalty
    finalMultiplier *= 1.2; // Increase flip risk by 20%
  } else {
    // Under 90% of asking: Major penalty
    finalMultiplier *= 1.4; // Increase flip risk by 40%
  }
  
  // Can't go below 0.1 (always some small flip risk) or above 3.0
  return Math.min(3.0, Math.max(0.1, finalMultiplier));
};

const formatCurrency = (value) => {
  const millions = value / 1000000;
  // For values under $100K, show more decimal places
  if (value < 100000) {
    return `$${millions.toFixed(3)}M`;
  }
  return `$${millions.toFixed(2)}M`;
};

// Calculate recruiting class rankings for all 134 schools
const calculateClassRankings = (recruits, allSchools, playerSchoolId) => {
  // Points system: 5★=100, 4★=85, 3★=70, 2★=55, 1★=40
  const starValues = { 5: 100, 4: 85, 3: 70, 2: 55, 1: 40 };
  
  // Calculate points for each school
  const schoolClasses = allSchools.map(school => {
    const signedRecruits = recruits.filter(r => 
      r.signedCommit && 
      r.committedSchool?.id === school.id
    );
    
    const totalPoints = signedRecruits.reduce((sum, r) => sum + (starValues[r.stars] || 55), 0);
    const avgStars = signedRecruits.length > 0 
      ? signedRecruits.reduce((sum, r) => sum + r.stars, 0) / signedRecruits.length 
      : 0;
    
    return {
      school,
      signedCount: signedRecruits.length,
      totalPoints,
      avgStars,
      recruits: signedRecruits
    };
  });
  
  // Sort by total points (highest first)
  schoolClasses.sort((a, b) => b.totalPoints - a.totalPoints);
  
  // Add national rank
  schoolClasses.forEach((sc, index) => {
    sc.nationalRank = index + 1;
  });
  
  // Calculate conference rankings
  const conferences = {};
  schoolClasses.forEach(sc => {
    const conf = sc.school.conference;
    if (!conferences[conf]) conferences[conf] = [];
    conferences[conf].push(sc);
  });
  
  // Add conference rank
  Object.values(conferences).forEach(confSchools => {
    confSchools.forEach((sc, index) => {
      sc.conferenceRank = index + 1;
    });
  });
  
  // Find player's school data
  const playerClass = schoolClasses.find(sc => sc.school.id === playerSchoolId);
  
  return {
    allRankings: schoolClasses,
    playerClass,
    top25: schoolClasses.slice(0, 25),
    conferences
  };
};

// US States for recruit hometowns
// Weighted state distribution for realistic recruit geography
// Blue Chip states (60% of 4-5 stars): CA, FL, GA, TX, OH, PA, MI, NC, LA
// Strong states (25% of 4-5 stars): AL, VA, SC, TN, MD, NJ, AZ, IL, MS
// Average states (12% of 4-5 stars): Most other states
// Rare states (3% of 4-5 stars): New England, Mountain West, Plains states

const STATE_WEIGHTS = {
  // TIER 1: Elite Hotbeds (60% of blue chips) - 9 states
  'CA': { blueChip: 12, other: 8 },  // California - #1 talent producer
  'FL': { blueChip: 10, other: 7 },  // Florida - #2 talent producer
  'GA': { blueChip: 9, other: 6 },   // Georgia - #3 talent producer
  'TX': { blueChip: 9, other: 8 },   // Texas - #4 talent producer
  'OH': { blueChip: 6, other: 5 },   // Ohio - top midwest
  'PA': { blueChip: 4, other: 4 },   // Pennsylvania
  'MI': { blueChip: 3, other: 4 },   // Michigan
  'NC': { blueChip: 4, other: 4 },   // North Carolina
  'LA': { blueChip: 3, other: 4 },   // Louisiana
  
  // TIER 2: Strong Programs (25% of blue chips) - 9 states
  'AL': { blueChip: 4, other: 4 },   // Alabama
  'VA': { blueChip: 3, other: 4 },   // Virginia
  'SC': { blueChip: 3, other: 3 },   // South Carolina
  'TN': { blueChip: 3, other: 3 },   // Tennessee
  'MD': { blueChip: 3, other: 3 },   // Maryland/DMV
  'NJ': { blueChip: 3, other: 4 },   // New Jersey
  'AZ': { blueChip: 2, other: 3 },   // Arizona
  'IL': { blueChip: 2, other: 4 },   // Illinois
  'MS': { blueChip: 2, other: 3 },   // Mississippi
  
  // TIER 3: Average States (12% of blue chips)
  'OK': { blueChip: 2, other: 3 },
  'AR': { blueChip: 1, other: 2 },
  'KY': { blueChip: 1, other: 2 },
  'MO': { blueChip: 1, other: 3 },
  'IN': { blueChip: 1, other: 3 },
  'CO': { blueChip: 1, other: 2 },
  'NV': { blueChip: 1, other: 2 },
  'WA': { blueChip: 1, other: 2 },
  'OR': { blueChip: 1, other: 2 },
  'NY': { blueChip: 2, other: 4 },
  'KS': { blueChip: 1, other: 2 },
  'UT': { blueChip: 1, other: 2 },
  'NM': { blueChip: 1, other: 2 },
  'WV': { blueChip: 1, other: 2 },
  'WI': { blueChip: 1, other: 2 },
  'MN': { blueChip: 1, other: 2 },
  'NE': { blueChip: 1, other: 2 },
  'IA': { blueChip: 1, other: 2 },
  'HI': { blueChip: 1, other: 1 },
  
  // TIER 4: Rare Blue Chip States (3% of blue chips)
  'CT': { blueChip: 0.3, other: 1 },
  'MA': { blueChip: 0.5, other: 2 },
  'ME': { blueChip: 0.1, other: 0.5 },
  'NH': { blueChip: 0.1, other: 0.5 },
  'VT': { blueChip: 0.1, other: 0.3 },
  'RI': { blueChip: 0.1, other: 0.5 },
  'DE': { blueChip: 0.3, other: 1 },
  'AK': { blueChip: 0.1, other: 0.3 },
  'ID': { blueChip: 0.2, other: 0.5 },
  'MT': { blueChip: 0.1, other: 0.3 },
  'WY': { blueChip: 0.1, other: 0.3 },
  'ND': { blueChip: 0.1, other: 0.5 },
  'SD': { blueChip: 0.2, other: 0.5 }
};

const US_STATES = Object.keys(STATE_WEIGHTS);

// Helper function to select state based on star level
const selectStateByStars = (stars) => {
  const isBlueChip = stars >= 4;
  const weightKey = isBlueChip ? 'blueChip' : 'other';
  
  // Create weighted array
  const weightedStates = [];
  US_STATES.forEach(state => {
    const weight = Math.round(STATE_WEIGHTS[state][weightKey] * 10); // Multiply for granularity
    for (let i = 0; i < weight; i++) {
      weightedStates.push(state);
    }
  });
  
  return weightedStates[Math.floor(Math.random() * weightedStates.length)];
};


// Cities by state for realistic hometowns
const CITIES_BY_STATE = {
  'AL': ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa'],
  'AK': ['Anchorage', 'Fairbanks', 'Juneau'],
  'AZ': ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale'],
  'AR': ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale'],
  'CA': ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento', 'Long Beach', 'Oakland'],
  'CO': ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Boulder'],
  'CT': ['Hartford', 'New Haven', 'Stamford', 'Bridgeport'],
  'DE': ['Wilmington', 'Dover', 'Newark'],
  'FL': ['Miami', 'Tampa', 'Orlando', 'Jacksonville', 'Fort Lauderdale', 'Tallahassee', 'Gainesville'],
  'GA': ['Atlanta', 'Augusta', 'Columbus', 'Savannah', 'Athens', 'Macon'],
  'HI': ['Honolulu', 'Hilo', 'Kailua'],
  'ID': ['Boise', 'Meridian', 'Nampa', 'Idaho Falls'],
  'IL': ['Chicago', 'Aurora', 'Naperville', 'Joliet', 'Rockford', 'Springfield'],
  'IN': ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Bloomington'],
  'IA': ['Des Moines', 'Cedar Rapids', 'Davenport', 'Iowa City'],
  'KS': ['Wichita', 'Overland Park', 'Kansas City', 'Topeka', 'Lawrence'],
  'KY': ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro'],
  'LA': ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles'],
  'ME': ['Portland', 'Lewiston', 'Bangor'],
  'MD': ['Baltimore', 'Silver Spring', 'Columbia', 'Germantown', 'Rockville'],
  'MA': ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell'],
  'MI': ['Detroit', 'Grand Rapids', 'Lansing', 'Ann Arbor', 'Flint'],
  'MN': ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth', 'Bloomington'],
  'MS': ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi'],
  'MO': ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence'],
  'MT': ['Billings', 'Missoula', 'Great Falls', 'Bozeman'],
  'NE': ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island'],
  'NV': ['Las Vegas', 'Henderson', 'Reno', 'Carson City'],
  'NH': ['Manchester', 'Nashua', 'Concord'],
  'NJ': ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Trenton'],
  'NM': ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe'],
  'NY': ['New York City', 'Buffalo', 'Rochester', 'Syracuse', 'Albany', 'Brooklyn', 'Queens'],
  'NC': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville'],
  'ND': ['Fargo', 'Bismarck', 'Grand Forks', 'Minot'],
  'OH': ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton'],
  'OK': ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow'],
  'OR': ['Portland', 'Eugene', 'Salem', 'Gresham', 'Bend'],
  'PA': ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Scranton'],
  'RI': ['Providence', 'Warwick', 'Cranston'],
  'SC': ['Charleston', 'Columbia', 'Greenville', 'Myrtle Beach', 'Spartanburg'],
  'SD': ['Sioux Falls', 'Rapid City', 'Aberdeen'],
  'TN': ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville'],
  'TX': ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi'],
  'UT': ['Salt Lake City', 'Provo', 'West Valley City', 'West Jordan'],
  'VT': ['Burlington', 'Rutland', 'Montpelier'],
  'VA': ['Virginia Beach', 'Norfolk', 'Richmond', 'Newport News', 'Alexandria'],
  'WA': ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue'],
  'WV': ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg'],
  'WI': ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine'],
  'WY': ['Cheyenne', 'Casper', 'Laramie', 'Gillette']
};

// Generate recruiting class of 1800 prospects
const generateRecruitingClass = (currentRoster, allSchools) => {
  const recruits = [];
  let recruitId = 0;

  // Calculate roster average ratings by star level for recruit baseline
  const rosterByStars = {
    5: currentRoster.filter(p => p.stars === 5),
    4: currentRoster.filter(p => p.stars === 4),
    3: currentRoster.filter(p => p.stars === 3),
    2: currentRoster.filter(p => p.stars === 2)
  };

  const avgRatingByStars = {
    5: rosterByStars[5].length > 0 ? rosterByStars[5].reduce((sum, p) => sum + p.rating, 0) / rosterByStars[5].length : 98,
    4: rosterByStars[4].length > 0 ? rosterByStars[4].reduce((sum, p) => sum + p.rating, 0) / rosterByStars[4].length : 85,
    3: rosterByStars[3].length > 0 ? rosterByStars[3].reduce((sum, p) => sum + p.rating, 0) / rosterByStars[3].length : 75,
    2: rosterByStars[2].length > 0 ? rosterByStars[2].reduce((sum, p) => sum + p.rating, 0) / rosterByStars[2].length : 65
  };

  // First names pool
  const firstNames = [
    'Jayden', 'Aiden', 'Marcus', 'Tyler', 'Jordan', 'Chris', 'Alex', 'Brandon',
    'Justin', 'Ryan', 'Derek', 'Isaiah', 'Caleb', 'Noah', 'Elijah', 'Mason',
    'Logan', 'Lucas', 'Jackson', 'Aiden', 'Carter', 'Jaylen', 'Dylan', 'Grayson',
    'Levi', 'Isaac', 'Josiah', 'Cooper', 'Lincoln', 'Hunter', 'Christian', 'Jaxon',
    'Julian', 'Landon', 'Adrian', 'Asher', 'Dominic', 'Austin', 'Zachary', 'Gavin'
  ];

  // Last names pool
  const lastNames = [
    'Williams', 'Johnson', 'Smith', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore',
    'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson',
    'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker',
    'Hall', 'Allen', 'Young', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green',
    'Adams', 'Baker', 'Nelson', 'Carter', 'Mitchell', 'Roberts', 'Turner'
  ];

  // Generate recruits by star distribution
  // 32 five-stars
  for (let i = 0; i < 32; i++) {
    recruits.push(generateRecruit(recruitId++, 5, avgRatingByStars[5], allSchools, firstNames, lastNames));
  }

  // 400 four-stars
  for (let i = 0; i < 400; i++) {
    recruits.push(generateRecruit(recruitId++, 4, avgRatingByStars[4], allSchools, firstNames, lastNames));
  }

  // 1000 three-stars
  for (let i = 0; i < 1000; i++) {
    recruits.push(generateRecruit(recruitId++, 3, avgRatingByStars[3], allSchools, firstNames, lastNames));
  }

  // 368 two-stars
  for (let i = 0; i < 368; i++) {
    recruits.push(generateRecruit(recruitId++, 2, avgRatingByStars[2], allSchools, firstNames, lastNames));
  }

  return recruits;
};

// Generate individual recruit
// Generate recruit traits based on star rating
const generateTraits = (stars) => {
  const traitOptions = [
    'NIL-Driven',
    'Playing Time Focused',
    'Close to Home',
    'Championship Focused',
    'Development Focused'
  ];

  // Trait distribution percentages by star rating
  let traitWeights;
  if (stars === 5) {
    traitWeights = {
      'NIL-Driven': 0.40,
      'Championship Focused': 0.30,
      'Playing Time Focused': 0.20,
      'Development Focused': 0.10
    };
  } else if (stars === 4) {
    traitWeights = {
      'NIL-Driven': 0.35,
      'Championship Focused': 0.25,
      'Playing Time Focused': 0.25,
      'Development Focused': 0.15
    };
  } else if (stars === 3) {
    traitWeights = {
      'Playing Time Focused': 0.30,
      'Close to Home': 0.30,
      'Development Focused': 0.20,
      'NIL-Driven': 0.20
    };
  } else { // 2-stars
    traitWeights = {
      'Playing Time Focused': 0.35,
      'Close to Home': 0.30,
      'Development Focused': 0.25,
      'NIL-Driven': 0.10
    };
  }

  // Select 2 unique traits
  const traits = [];
  const availableTraits = Object.keys(traitWeights);

  // First trait - weighted random selection
  const rand1 = Math.random();
  let cumulative = 0;
  for (const trait of availableTraits) {
    cumulative += traitWeights[trait];
    if (rand1 <= cumulative) {
      traits.push(trait);
      break;
    }
  }

  // Second trait - different from first
  const remainingTraits = traitOptions.filter(t => !traits.includes(t));
  traits.push(remainingTraits[Math.floor(Math.random() * remainingTraits.length)]);

  return traits;
};

const generateRecruit = (id, stars, rosterAvgForStars, allSchools, firstNames, lastNames) => {
  const position = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
  
  // Cap K and P at 3 stars maximum (no 4-star or 5-star special teams)
  if ((position === 'K' || position === 'P') && stars > 3) {
    stars = 3;
    rosterAvgForStars = allSchools.length > 0 ? 75 : rosterAvgForStars; // Use 3-star baseline
  }
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const state = selectStateByStars(stars); // Use weighted selection based on stars
  const citiesInState = CITIES_BY_STATE[state];
  const city = citiesInState[Math.floor(Math.random() * citiesInState.length)];
  
  // Calculate recruit rating (90% of roster average + variance)
  let rating;
  let isGenerational = false;
  let isDiamond = false;
  
  if (stars === 5 && Math.random() < 0.01) {
    // Generational 5-star (1% chance)
    rating = 96 + Math.floor(Math.random() * 4); // 96-99
    isGenerational = true;
  } else if ((stars === 3 || stars === 2) && Math.random() < 0.05) {
    // Diamond in the Rough (5% chance for 2-3 stars)
    const baseRating = rosterAvgForStars * 0.90;
    rating = Math.round(baseRating * 1.15 + (Math.random() * 4 - 2)); // 15% boost
    isDiamond = true;
  } else {
    // Standard recruit (90% of roster average)
    rating = Math.round(rosterAvgForStars * 0.90 + (Math.random() * 4 - 2));
  }
  
  // Ensure rating stays within reasonable bounds
  rating = Math.max(55, Math.min(99, rating));
  
  // Calculate NIL market value based on rating, stars, position
  let baseMarketValue;
  
  if (stars === 5) {
    if (isGenerational) {
      baseMarketValue = 800000 + Math.random() * 400000; // $800K-$1.2M
    } else {
      baseMarketValue = 600000 + Math.random() * 300000; // $600K-$900K
    }
  } else if (stars === 4) {
    baseMarketValue = 250000 + Math.random() * 250000; // $250K-$500K
  } else if (stars === 3) {
    if (isDiamond) {
      baseMarketValue = 200000 + Math.random() * 200000; // $200K-$400K
    } else {
      baseMarketValue = 100000 + Math.random() * 100000; // $100K-$200K
    }
  } else {
    if (isDiamond) {
      baseMarketValue = 80000 + Math.random() * 70000; // $80K-$150K
    } else {
      baseMarketValue = 30000 + Math.random() * 50000; // $30K-$80K
    }
  }
  
  // Position premium
  if (position === 'QB' || position === 'EDGE') {
    baseMarketValue *= 1.30; // 30% premium
  }
  
  const marketValue = Math.round(baseMarketValue);

  // Generate recruit traits (2 per recruit)
  const traits = generateTraits(stars);

  // Calculate asking price based on traits
  let askingPriceMultiplier = 0.95 + Math.random() * 0.15; // Base: 95-110% of market value

  // NIL-Driven trait: Ask for 30-50% MORE
  if (traits.includes('NIL-Driven')) {
    askingPriceMultiplier = 1.3 + Math.random() * 0.2; // 130-150% of market value
  }

  // Development Focused trait: Ask for 20-30% LESS
  if (traits.includes('Development Focused')) {
    askingPriceMultiplier = 0.7 + Math.random() * 0.1; // 70-80% of market value
  }

  const askingPrice = Math.round(marketValue * askingPriceMultiplier);

  // Generate dream schools based on star level
  const dreamSchools = generateDreamSchools(stars, allSchools, state);

  return {
    id: `recruit_${id}`,
    name: `${firstName} ${lastName}`,
    position,
    stars,
    rating, // Hidden until 50% interest
    state,
    hometown: city, // Real city name
    interest: 0, // 0-100%
    dreamSchools, // Revealed at 25%
    topThree: [], // Set at 75%
    isGenerational, // Hidden until 50%
    isDiamond, // Hidden until 50%
    isTargeted: false, // User has offered scholarship to this recruit
    isScouted: false, // User has scouted this recruit (reveals traits)
    traits, // 2 traits per recruit - revealed after scouting
    actionsUsedThisWeek: [], // Track which actions have been used this week: 'socialMedia', 'call', 'schoolVisit', 'campusVisit', 'officialVisit'
    monthlyActionsUsed: {}, // Track monthly limited actions: 'schoolVisit', 'campusVisit' - {actionId: {month, year}}
    officialVisitUsed: false, // PERMANENT - Can only use official visit ONCE per recruit
    marketValue, // Their true market value
    askingPrice, // What they'll ask for in negotiation
    verbalCommit: false, // Has verbally committed
    nilDeal: null, // Accepted NIL deal amount
    signedCommit: false, // Has signed (after signing day)
    committed: false,
    committedSchool: null,
    // AI School Recruiting Competition
    recruitingSchools: [], // Schools actively recruiting this player {schoolId, interest, lastAction}
    leadingSchool: null, // School with highest interest (besides player if committed)
    commitmentLeader: null // Who would they commit to if not you
  };
};

// Generate dream schools based on recruit star level
const generateDreamSchools = (stars, allSchools, state) => {
  const blueBlood = allSchools.filter(s => s.tier === 'Blue Blood');
  const power4 = allSchools.filter(s => s.tier === 'Power 4');
  const group5 = allSchools.filter(s => s.tier === 'Group of 5');

  // Find home state schools for hometown bias
  const homeStateBlueBlood = blueBlood.filter(s => s.state === state);
  const homeStatePower4 = power4.filter(s => s.state === state);
  const homeStateGroup5 = group5.filter(s => s.state === state);

  const dreamSchools = [];

  // HOMETOWN BIAS: High chance to include home state Blue Blood
  // 5-stars: 90%, 4-stars: 85%, 3-stars: 75%, 2-stars: 60%
  let homeStateBlueBloodChance = 0;
  if (stars === 5) homeStateBlueBloodChance = 0.90;
  else if (stars === 4) homeStateBlueBloodChance = 0.85;
  else if (stars === 3) homeStateBlueBloodChance = 0.75;
  else homeStateBlueBloodChance = 0.60;

  if (homeStateBlueBlood.length > 0 && Math.random() < homeStateBlueBloodChance) {
    dreamSchools.push(homeStateBlueBlood[0]); // Add home state Blue Blood
  }

  // If no home state Blue Blood, 50% chance to add home state Power 4 (if exists)
  if (dreamSchools.length === 0 && homeStatePower4.length > 0 && Math.random() < 0.5) {
    dreamSchools.push(homeStatePower4[0]);
  }

  if (stars === 5) {
    // 5-stars: 80% Blue Blood, 20% local Power 4
    for (let i = 0; i < 4; i++) {
      if (Math.random() < 0.8 && blueBlood.length > 0) {
        const school = blueBlood[Math.floor(Math.random() * blueBlood.length)];
        if (!dreamSchools.find(s => s.id === school.id)) {
          dreamSchools.push(school);
        }
      } else if (power4.length > 0) {
        const school = power4[Math.floor(Math.random() * power4.length)];
        if (!dreamSchools.find(s => s.id === school.id)) {
          dreamSchools.push(school);
        }
      }
    }
    // Add one more to make 5 total
    if (blueBlood.length > 0) {
      const school = blueBlood[Math.floor(Math.random() * blueBlood.length)];
      if (!dreamSchools.find(s => s.id === school.id)) {
        dreamSchools.push(school);
      }
    }
  } else if (stars === 4) {
    // 4-stars: 50% Blue Blood, 40% Power 4, 10% Group of 5
    for (let i = 0; i < 5; i++) {
      const rand = Math.random();
      let school;
      if (rand < 0.5 && blueBlood.length > 0) {
        school = blueBlood[Math.floor(Math.random() * blueBlood.length)];
      } else if (rand < 0.9 && power4.length > 0) {
        school = power4[Math.floor(Math.random() * power4.length)];
      } else if (group5.length > 0) {
        school = group5[Math.floor(Math.random() * group5.length)];
      }
      if (school && !dreamSchools.find(s => s.id === school.id)) {
        dreamSchools.push(school);
      }
    }
  } else if (stars === 3) {
    // 3-stars: 20% Blue Blood, 50% Power 4, 30% Group of 5
    for (let i = 0; i < 5; i++) {
      const rand = Math.random();
      let school;
      if (rand < 0.2 && blueBlood.length > 0) {
        school = blueBlood[Math.floor(Math.random() * blueBlood.length)];
      } else if (rand < 0.7 && power4.length > 0) {
        school = power4[Math.floor(Math.random() * power4.length)];
      } else if (group5.length > 0) {
        school = group5[Math.floor(Math.random() * group5.length)];
      }
      if (school && !dreamSchools.find(s => s.id === school.id)) {
        dreamSchools.push(school);
      }
    }
  } else {
    // 2-stars: 10% Power 4, 60% Group of 5, 30% any
    for (let i = 0; i < 5; i++) {
      const rand = Math.random();
      let school;
      if (rand < 0.1 && power4.length > 0) {
        school = power4[Math.floor(Math.random() * power4.length)];
      } else if (rand < 0.7 && group5.length > 0) {
        school = group5[Math.floor(Math.random() * group5.length)];
      } else {
        const allSchoolsList = [...blueBlood, ...power4, ...group5];
        school = allSchoolsList[Math.floor(Math.random() * allSchoolsList.length)];
      }
      if (school && !dreamSchools.find(s => s.id === school.id)) {
        dreamSchools.push(school);
      }
    }
  }
  
  return dreamSchools.slice(0, 5); // Ensure max 5 dream schools
};

const generatePlayer = (id) => {
  const position = 'QB';
  const year = YEARS[Math.floor(Math.random() * YEARS.length)];
  const stars = Math.random() < 0.05 ? 5 : Math.random() < 0.25 ? 4 : Math.random() < 0.6 ? 3 : 2;
  const rating = generateRating(stars);
  
  const firstName = ['Jake', 'Marcus', 'Tyler', 'Jordan', 'Chris', 'Alex', 'Brandon', 'Justin', 'Ryan', 'Derek'][Math.floor(Math.random() * 10)];
  const lastName = ['Williams', 'Johnson', 'Smith', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson'][Math.floor(Math.random() * 10)];
  
  let baseValue = stars === 5 ? 1000000 : stars === 4 ? 450000 : stars === 3 ? 175000 : 50000;
  baseValue *= POSITION_MULTIPLIERS[position];
  const yearMult = year === 'FR' ? 0.8 : year === 'SO' ? 1.0 : year === 'JR' ? 1.3 : year === 'SR' ? 1.5 : 1.2;
  baseValue *= yearMult;
  const isStarter = Math.random() < 0.4;
  if (isStarter) baseValue *= 1.5;
  
  const marketValue = Math.round(baseValue);
  const currentNIL = Math.round(marketValue * (0.7 + Math.random() * 0.3));
  const payPercent = currentNIL / marketValue;
  const satisfaction = payPercent >= 0.9 ? 'High' : payPercent >= 0.7 ? 'Medium' : 'Low';
  
  return { id, name: `${firstName} ${lastName}`, position, year, stars, rating, isStarter, marketValue, currentNIL, satisfaction };
};

const generateRealisticRoster = (selectedSchool) => {
  const roster = [];
  let playerId = 0;
  
  // Star distribution based on school tier
  const getStarRating = () => {
    const rand = Math.random();
    
    if (selectedSchool.tier === 'Blue Blood') {
      // Blue Blood: More 4-5 stars
      if (rand < 0.08) return 5;  // 8% five-star
      if (rand < 0.35) return 4;  // 27% four-star
      if (rand < 0.75) return 3;  // 40% three-star
      return 2;                    // 25% two-star
    } else if (selectedSchool.tier === 'Power 4') {
      // Power 4: Rare 5-stars, some 4-stars, mostly 3-stars
      if (rand < 0.01) return 5;  // 1% five-star
      if (rand < 0.14) return 4;  // 13% four-star
      if (rand < 0.64) return 3;  // 50% three-star
      return 2;                    // 36% two-star
    } else {
      // Group of 5: NO five-stars in initial roster (only via transfer)
      // if (rand < 0.00) return 5;  // 0% five-star
      if (rand < 0.04) return 4;  // 4% four-star
      if (rand < 0.44) return 3;  // 40% three-star
      return 2;                    // 56% two-star
    }
  };
  
  // Calculate total budget available for roster based on school tier
  // Use 60% for current roster to ensure we're never over budget at start
  const totalRosterBudget = selectedSchool.budget * 0.60;
  const avgPerPlayer = totalRosterBudget / 85;
  
  Object.entries(POSITION_TARGETS).forEach(([position, target]) => {
    const variance = Math.floor(Math.random() * 3) - 1;
    const count = Math.max(target + variance, 1);
    
    for (let i = 0; i < count; i++) {
      const year = YEARS[Math.floor(Math.random() * YEARS.length)];
      const stars = getStarRating();
      const rating = generateRating(stars);
      
      const firstName = ['Jake', 'Marcus', 'Tyler', 'Jordan', 'Chris', 'Alex', 'Brandon', 'Justin', 'Ryan', 'Derek'][Math.floor(Math.random() * 10)];
      const lastName = ['Williams', 'Johnson', 'Smith', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson'][Math.floor(Math.random() * 10)];
      
      // New NIL calculation based on average per player and multipliers
      let nilMultiplier = 1.0;
      
      // Star multiplier (most important)
      if (stars === 5) nilMultiplier = 4.0;
      else if (stars === 4) nilMultiplier = 2.5;
      else if (stars === 3) nilMultiplier = 1.2;
      else nilMultiplier = 0.6;
      
      // Position multiplier (scaled down from market multipliers)
      nilMultiplier *= (POSITION_MULTIPLIERS[position] * 0.5);
      
      // Year multiplier (less dramatic)
      const yearMult = year === 'FR' ? 0.7 : year === 'SO' ? 0.9 : year === 'JR' ? 1.1 : year === 'SR' ? 1.2 : 1.15;
      nilMultiplier *= yearMult;
      
      // Starter multiplier (smaller bump)
      const isStarter = Math.random() < 0.4;
      if (isStarter) nilMultiplier *= 1.3;
      
      // Calculate actual NIL based on average
      const currentNIL = Math.round(avgPerPlayer * nilMultiplier * (0.85 + Math.random() * 0.3));
      
      // At game start, market value should be close to current NIL so everyone is satisfied
      // Market value represents their "potential worth" if they performed well
      const marketValue = Math.round(currentNIL * (1.05 + Math.random() * 0.1)); // Only 5-15% above current
      
      const payPercent = currentNIL / marketValue;
      // Start everyone at Medium or High satisfaction (no Low at game start)
      const satisfaction = payPercent >= 0.90 ? 'High' : 'Medium';
      
      roster.push({
        id: `player_${playerId}`,
        name: `${firstName} ${lastName}`,
        position,
        year,
        stars,
        rating,
        isStarter,
        marketValue,
        currentNIL,
        satisfaction
      });
      
      playerId++;
    }
  });
  
  while (roster.length < 85) {
    const belowTarget = Object.entries(POSITION_TARGETS).find(([pos, target]) => {
      return roster.filter(p => p.position === pos).length < target;
    });
    
    if (belowTarget) {
      const year = YEARS[Math.floor(Math.random() * YEARS.length)];
      const stars = getStarRating();
      const rating = generateRating(stars);
      
      const firstName = ['Jake', 'Marcus', 'Tyler', 'Jordan', 'Chris', 'Alex', 'Brandon', 'Justin', 'Ryan', 'Derek'][Math.floor(Math.random() * 10)];
      const lastName = ['Williams', 'Johnson', 'Smith', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson'][Math.floor(Math.random() * 10)];
      
      // New NIL calculation based on average per player and multipliers
      let nilMultiplier = 1.0;
      
      // Star multiplier
      if (stars === 5) nilMultiplier = 4.0;
      else if (stars === 4) nilMultiplier = 2.5;
      else if (stars === 3) nilMultiplier = 1.2;
      else nilMultiplier = 0.6;
      
      // Position multiplier
      nilMultiplier *= (POSITION_MULTIPLIERS[belowTarget[0]] * 0.5);
      
      // Year multiplier
      const yearMult = year === 'FR' ? 0.7 : year === 'SO' ? 0.9 : year === 'JR' ? 1.1 : year === 'SR' ? 1.2 : 1.15;
      nilMultiplier *= yearMult;
      
      // Starter multiplier
      const isStarter = Math.random() < 0.4;
      if (isStarter) nilMultiplier *= 1.3;
      
      // Calculate actual NIL based on average
      const currentNIL = Math.round(avgPerPlayer * nilMultiplier * (0.85 + Math.random() * 0.3));
      
      // At game start, market value should be close to current NIL so everyone is satisfied
      const marketValue = Math.round(currentNIL * (1.05 + Math.random() * 0.1)); // Only 5-15% above current
      
      const payPercent = currentNIL / marketValue;
      // Start everyone at Medium or High satisfaction (no Low at game start)
      const satisfaction = payPercent >= 0.90 ? 'High' : 'Medium';
      
      roster.push({
        id: `player_${playerId}`,
        name: `${firstName} ${lastName}`,
        position: belowTarget[0],
        year,
        stars,
        rating,
        isStarter,
        marketValue,
        currentNIL,
        satisfaction
      });
      
      playerId++;
    } else {
      break;
    }
  }
  
  while (roster.length > 85) {
    const aboveTarget = Object.entries(POSITION_TARGETS).find(([pos, target]) => {
      return roster.filter(p => p.position === pos).length > target;
    });
    
    if (aboveTarget) {
      const indexToRemove = roster.findIndex(p => p.position === aboveTarget[0]);
      if (indexToRemove !== -1) {
        roster.splice(indexToRemove, 1);
      }
    } else {
      break;
    }
  }
  
  // CRITICAL: Ensure total NIL never exceeds budget at game start
  const totalNIL = roster.reduce((sum, p) => sum + p.currentNIL, 0);
  const maxBudget = selectedSchool.budget * 0.75; // Cap at 75% of budget to leave room
  
  if (totalNIL > maxBudget) {
    // Scale down all NIL values proportionally to fit under budget
    const scaleFactor = maxBudget / totalNIL;
    console.log(`⚠️ Roster NIL (${totalNIL}) exceeded budget cap (${maxBudget}). Scaling down by ${(scaleFactor * 100).toFixed(1)}%`);
    
    roster.forEach(player => {
      player.currentNIL = Math.round(player.currentNIL * scaleFactor);
      player.marketValue = Math.round(player.marketValue * scaleFactor);
    });
    
    const newTotal = roster.reduce((sum, p) => sum + p.currentNIL, 0);
    console.log(`✅ Roster NIL normalized to ${newTotal} (under ${maxBudget} cap)`);
  }
  
  return roster;
};

// Auto-assign starters based on ratings and position rules
const autoAssignStarters = (currentRoster) => {
  const updatedRoster = currentRoster.map(p => ({ ...p, isStarter: false }));
  
  // OFFENSE - Strict rules
  // 1 QB (always)
  const qbs = updatedRoster.filter(p => p.position === 'QB').sort((a, b) => b.rating - a.rating);
  if (qbs.length > 0) qbs[0].isStarter = true;
  
  // 5 OL (always) - OT, OG, C
  const ots = updatedRoster.filter(p => p.position === 'OT').sort((a, b) => b.rating - a.rating);
  const ogs = updatedRoster.filter(p => p.position === 'OG').sort((a, b) => b.rating - a.rating);
  const cs = updatedRoster.filter(p => p.position === 'C').sort((a, b) => b.rating - a.rating);
  
  // Take top 2 OT, top 2 OG, top 1 C = 5 OL
  if (ots.length >= 2) {
    ots[0].isStarter = true;
    ots[1].isStarter = true;
  }
  if (ogs.length >= 2) {
    ogs[0].isStarter = true;
    ogs[1].isStarter = true;
  }
  if (cs.length > 0) cs[0].isStarter = true;
  
  // Skill positions: 1-2 RB, 2-4 WR, 0-2 TE (must total 5)
  // Default: 1 RB, 3 WR, 1 TE
  const rbs = updatedRoster.filter(p => p.position === 'RB').sort((a, b) => b.rating - a.rating);
  const wrs = updatedRoster.filter(p => p.position === 'WR').sort((a, b) => b.rating - a.rating);
  const tes = updatedRoster.filter(p => p.position === 'TE').sort((a, b) => b.rating - a.rating);
  
  if (rbs.length > 0) rbs[0].isStarter = true;
  if (wrs.length >= 3) {
    wrs[0].isStarter = true;
    wrs[1].isStarter = true;
    wrs[2].isStarter = true;
  }
  if (tes.length > 0) tes[0].isStarter = true;
  
  // DEFENSE - More flexible but must total 11
  // Standard 4-3: 2 EDGE, 2 DT, 3 LB, 2 CB, 2 S
  const edges = updatedRoster.filter(p => p.position === 'EDGE').sort((a, b) => b.rating - a.rating);
  const dts = updatedRoster.filter(p => p.position === 'DT').sort((a, b) => b.rating - a.rating);
  const lbs = updatedRoster.filter(p => p.position === 'LB').sort((a, b) => b.rating - a.rating);
  const cbs = updatedRoster.filter(p => p.position === 'CB').sort((a, b) => b.rating - a.rating);
  const safeties = updatedRoster.filter(p => p.position === 'S').sort((a, b) => b.rating - a.rating);
  
  if (edges.length >= 2) {
    edges[0].isStarter = true;
    edges[1].isStarter = true;
  }
  if (dts.length >= 2) {
    dts[0].isStarter = true;
    dts[1].isStarter = true;
  }
  if (lbs.length >= 3) {
    lbs[0].isStarter = true;
    lbs[1].isStarter = true;
    lbs[2].isStarter = true;
  }
  if (cbs.length >= 2) {
    cbs[0].isStarter = true;
    cbs[1].isStarter = true;
  }
  if (safeties.length >= 2) {
    safeties[0].isStarter = true;
    safeties[1].isStarter = true;
  }
  
  // SPECIAL TEAMS - 1 starter each for K and P
  const kickers = updatedRoster.filter(p => p.position === 'K').sort((a, b) => b.rating - a.rating);
  const punters = updatedRoster.filter(p => p.position === 'P').sort((a, b) => b.rating - a.rating);
  
  if (kickers.length > 0) kickers[0].isStarter = true;
  if (punters.length > 0) punters[0].isStarter = true;
  
  return updatedRoster;
};

// Validate starter counts
const validateStarterCounts = (currentRoster) => {
  const offenseStarters = currentRoster.filter(p => 
    OFFENSIVE_POSITIONS.includes(p.position) && p.isStarter
  );
  const defenseStarters = currentRoster.filter(p => 
    DEFENSIVE_POSITIONS.includes(p.position) && p.isStarter
  );
  
  // Offense must equal 11
  if (offenseStarters.length !== 11) return false;
  
  // Must have exactly 1 QB
  const qbCount = offenseStarters.filter(p => p.position === 'QB').length;
  if (qbCount !== 1) return false;
  
  // Must have exactly 5 OL
  const olCount = offenseStarters.filter(p => 
    ['OT', 'OG', 'C'].includes(p.position)
  ).length;
  if (olCount !== 5) return false;
  
  // RB: 1-2, WR: 2-4, TE: 0-2
  const rbCount = offenseStarters.filter(p => p.position === 'RB').length;
  const wrCount = offenseStarters.filter(p => p.position === 'WR').length;
  const teCount = offenseStarters.filter(p => p.position === 'TE').length;
  
  if (rbCount < 1 || rbCount > 2) return false;
  if (wrCount < 2 || wrCount > 4) return false;
  if (teCount < 0 || teCount > 2) return false;
  
  // Defense must equal 11
  if (defenseStarters.length !== 11) return false;
  
  // Minimum 3 DL (EDGE + DT)
  const dlCount = defenseStarters.filter(p => 
    ['EDGE', 'DT'].includes(p.position)
  ).length;
  if (dlCount < 3) return false;
  
  // Minimum 3 DB (CB + S)
  const dbCount = defenseStarters.filter(p => 
    ['CB', 'S'].includes(p.position)
  ).length;
  if (dbCount < 3) return false;
  
  return true;
};

// ============================================
// AI ROSTER GENERATION SYSTEM
// ============================================

// Generate star rating based on school tier
const generateStarForAIPlayer = (tier) => {
  const rand = Math.random() * 100;
  
  if (tier === 'Blue Blood') {
    // Blue Bloods: Up to 10% five-stars, up to 60% four-stars, up to 30% three-stars
    if (rand < 10) return 5;  // 10% chance of 5-star
    if (rand < 70) return 4;  // 60% chance of 4-star
    return 3;                 // 30% chance of 3-star
  } else if (tier === 'Power 4') {
    // Power 4: Up to 5% five-stars, up to 40% four-stars, up to 55% three-stars
    if (rand < 5) return 5;   // 5% chance of 5-star
    if (rand < 45) return 4;  // 40% chance of 4-star
    return 3;                 // 55% chance of 3-star
  } else {
    // Group of 5: 0% five-stars, up to 20% four-stars, up to 80% three-stars and two-stars
    if (rand < 20) return 4;  // 20% chance of 4-star
    if (rand < 70) return 3;  // 50% chance of 3-star
    return 2;                 // 30% chance of 2-star
  }
};

// Generate a single AI player
const generateAIPlayer = (school, position, year) => {
  const stars = generateStarForAIPlayer(school.tier);
  
  // Generate name (simple random generation)
  const firstNames = ['James', 'Michael', 'Robert', 'John', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher',
    'Marcus', 'Jaylen', 'Tyrone', 'DeAndre', 'Darius', 'Xavier', 'Isaiah', 'Antonio', 'Brandon', 'Carlos',
    'Tyler', 'Jake', 'Connor', 'Ryan', 'Kyle', 'Luke', 'Mason', 'Logan', 'Jackson', 'Hunter'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Washington', 'Jackson', 'Harris', 'Thompson', 'White', 'Lewis', 'Walker', 'Hall', 'Allen', 'Young',
    'Anderson', 'Wilson', 'Moore', 'Taylor', 'Thomas', 'Lee', 'Martin', 'Clark', 'Robinson', 'King'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return {
    id: `ai-${school.id}-${position}-${year}-${Math.random().toString(36).substr(2, 9)}`,
    name: `${firstName} ${lastName}`,
    position: position,
    year: year,
    stars: stars,
    school: school.id,
    isStarter: false,
    aiGenerated: true
  };
};

// Generate full 85-player roster for AI school
const generateAIRoster = (school) => {
  const roster = [];
  
  // Position targets (85 total)
  const positionDistribution = {
    'QB': 5,
    'RB': 6,
    'WR': 11,
    'TE': 6,
    'OT': 5,
    'OG': 5,
    'C': 5,
    'EDGE': 8,
    'DT': 8,
    'LB': 7,
    'CB': 8,
    'S': 7,
    'K': 2,
    'P': 2
  };
  
  // Year distribution percentages
  const yearDistribution = {
    'FR': 0.25,  // 25% Freshmen
    'SO': 0.22,  // 22% Sophomores
    'JR': 0.22,  // 22% Juniors
    'SR': 0.22,  // 22% Seniors
    '5Y': 0.09   // 9% Fifth Year
  };
  
  // Generate players for each position
  for (const [position, count] of Object.entries(positionDistribution)) {
    for (let i = 0; i < count; i++) {
      // Randomly assign year based on distribution
      const rand = Math.random();
      let year;
      if (rand < 0.25) year = 'FR';
      else if (rand < 0.47) year = 'SO';
      else if (rand < 0.69) year = 'JR';
      else if (rand < 0.91) year = 'SR';
      else year = '5Y';
      
      roster.push(generateAIPlayer(school, position, year));
    }
  }
  
  return roster;
};

// Generate rosters for all 134 schools
const generateAllAIRosters = () => {
  const allSchools = [...SCHOOLS.blueBloods, ...SCHOOLS.power4, ...SCHOOLS.group5];
  const aiRosters = {};
  
  allSchools.forEach(school => {
    aiRosters[school.id] = generateAIRoster(school);
  });
  
  return aiRosters;
};

// Calculate team overall rating (0-100)
const calculateTeamRating = (roster) => {
  if (!roster || roster.length === 0) return 0;
  
  // Weight by stars: 5-star = 100, 4-star = 85, 3-star = 70, 2-star = 55
  const starValues = { 5: 100, 4: 85, 3: 70, 2: 55, 1: 40 };
  
  const totalValue = roster.reduce((sum, player) => {
    return sum + (starValues[player.stars] || 55);
  }, 0);
  
  return Math.round(totalValue / roster.length);
};

const App = () => {
  const [gameState, setGameState] = useState('titleScreen');
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [roster, setRoster] = useState([]);
  const [recruits, setRecruits] = useState([]);
  const [signedClass, setSignedClass] = useState([]); // Track signed recruits
  const [recruitingPoints, setRecruitingPoints] = useState(100);
  const [budget, setBudget] = useState(0);
  const [budgetAllocated, setBudgetAllocated] = useState(0);
  const [incomingFreshmanBudget, setIncomingFreshmanBudget] = useState(0);
  const [transferAdditionsBudget, setTransferAdditionsBudget] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewingSchool, setViewingSchool] = useState(null); // For Schools tab - which school to view
  const [schoolSearchFilter, setSchoolSearchFilter] = useState(''); // Search/filter schools
  const [schoolConferenceFilter, setSchoolConferenceFilter] = useState('ALL'); // Filter by conference
  const [showBudgetBreakdown, setShowBudgetBreakdown] = useState(false);
  const [showRosterBreakdown, setShowRosterBreakdown] = useState(false);
  const [showRecruitingOverview, setShowRecruitingOverview] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState([]);
  const [showMessenger, setShowMessenger] = useState(false);
  const [expandedTier, setExpandedTier] = useState(null);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [audioStarted, setAudioStarted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Calendar State
  const [currentDate, setCurrentDate] = useState({ year: 2026, month: 2, day: 1 }); // March 1, 2026
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentGameWeek, setCurrentGameWeek] = useState(0); // 0 = not in season, 1-12 = game weeks

  // Recruiting Filters
  const [recruitStarFilter, setRecruitStarFilter] = useState(null); // null = all, or 2-5
  const [recruitPositionFilter, setRecruitPositionFilter] = useState(null); // null = all, or position
  const [recruitStateFilter, setRecruitStateFilter] = useState(null); // null = all, or state code
  const [showMyRecruitsOnly, setShowMyRecruitsOnly] = useState(false);
  
  // Recruiting Tab Collapsible Sections
  const [showHighSchoolRecruiting, setShowHighSchoolRecruiting] = useState(false);
  const [showTransferPortal, setShowTransferPortal] = useState(false);
  
  // Recruiting position expansion (for offense/defense sub-groups)
  const [expandedRecruitingPositions, setExpandedRecruitingPositions] = useState({
    QB: false, RB: false, WR: false, TE: false, OL: false,
    EDGE: false, DT: false, LB: false, CB: false, S: false
  });
  
  // Schools tab - expanded conferences
  const [expandedConferences, setExpandedConferences] = useState({});
  
  // Off-Season Week Tracking
  const [offSeasonWeek, setOffSeasonWeek] = useState(null); // 1-16 during off-season, null otherwise
  const [offSeasonWeeksCompleted, setOffSeasonWeeksCompleted] = useState(0);
  
  // Transfer Portal Decisions
  const [transferDecisionsPending, setTransferDecisionsPending] = useState([]);
  const [showTransferDecisionsModal, setShowTransferDecisionsModal] = useState(false);
  
  // NFL Departure Newspaper
  const [showNFLDepartureModal, setShowNFLDepartureModal] = useState(false);
  const [nflDeparturePlayer, setNFLDeparturePlayer] = useState(null);

  // AI Rosters State - All 134 teams have rosters
  const [aiRosters, setAiRosters] = useState({});

  // Event System State
  const [currentRandomEvent, setCurrentRandomEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  
  // Negotiation Modal State
  const [showNegotiationModal, setShowNegotiationModal] = useState(false);
  const [negotiatingRecruit, setNegotiatingRecruit] = useState(null);
  const [counterOffer, setCounterOffer] = useState(0);

  // Weekly Recruiting Report State
  const [showWeeklyRecruitingReport, setShowWeeklyRecruitingReport] = useState(false);
  const [weeklyAICommits, setWeeklyAICommits] = useState([]);
  const [reportTargetsExpanded, setReportTargetsExpanded] = useState(true);
  const [reportOthersExpanded, setReportOthersExpanded] = useState(false);
  const [recruitDecisions, setRecruitDecisions] = useState({}); // Track flip/walk away decisions

  // Coach Names State
  const [coachName, setCoachName] = useState(''); // User's coach name
  const [aiCoaches, setAiCoaches] = useState({}); // AI coach names by school ID
  const [tempCoachInput, setTempCoachInput] = useState(''); // Temporary input for coach name
  const [pendingSchool, setPendingSchool] = useState(null); // School waiting for coach name

  // Custom School Names State
  const [customSchoolNames, setCustomSchoolNames] = useState({}); // Custom team names by school ID
  const [customNicknames, setCustomNicknames] = useState({}); // Custom nicknames by school ID

  // School Editing State
  const [editingSchool, setEditingSchool] = useState(null); // School currently being edited
  const [tempSchoolName, setTempSchoolName] = useState(''); // Temp input for school name
  const [tempNickname, setTempNickname] = useState(''); // Temp input for nickname
  const [tempCoachName, setTempCoachName] = useState(''); // Temp input for coach name

  // Conference Editing State
  const [customConferenceNames, setCustomConferenceNames] = useState({}); // Custom conference names
  const [editingConference, setEditingConference] = useState(null); // Conference currently being edited
  const [tempConferenceName, setTempConferenceName] = useState(''); // Temp input for conference name

  // Coach Career Stats
  const [coachRecord, setCoachRecord] = useState({ wins: 0, losses: 0 }); // Career W-L record
  const [coachRivalRecord, setCoachRivalRecord] = useState({ wins: 0, losses: 0 }); // Record vs Rivals
  const [coachChampionships, setCoachChampionships] = useState({
    national: 0,
    conference: 0,
    bowlWins: 0
  });
  const [coachSuccess, setCoachSuccess] = useState(50); // Success rating 0-100 (starts at 50)
  const [showCoachProfile, setShowCoachProfile] = useState(false); // Collapsible coach section

  // Signing Period State
  const [showESPModal, setShowESPModal] = useState(false);
  const [showNSDModal, setShowNSDModal] = useState(false);
  const [espResults, setESPResults] = useState(null); // { signed: [], unsigned: [], signingDay: [] }
  const [nsdRevealing, setNSDRevealing] = useState(false);
  const [nsdCurrentRevealIndex, setNSDCurrentRevealIndex] = useState(0);
  const [nsdResults, setNSDResults] = useState([]); // Array of signing day decisions
  const [pushForSignatureUsed, setPushForSignatureUsed] = useState({}); // Track which recruits have been pushed
  const [showPushModal, setShowPushModal] = useState(false);
  const [pushingRecruit, setPushingRecruit] = useState(null);
  const [conferenceRecruitingResults, setConferenceRecruitingResults] = useState(null); // AI school results

  // Game Simulation State
  const [seasonSchedule, setSeasonSchedule] = useState([]); // Array of 12 games: { week, opponent, isHome, isRivalry, isConference }
  const [seasonRecord, setSeasonRecord] = useState({ wins: 0, losses: 0, confWins: 0, confLosses: 0 }); // This season's record
  const [gameResults, setGameResults] = useState([]); // Array of completed games with scores/stats
  const [conferenceStandings, setConferenceStandings] = useState({}); // All conference records
  const [showGamePlanModal, setShowGamePlanModal] = useState(false); // Pre-game planning modal
  const [currentOpponent, setCurrentOpponent] = useState(null); // This week's opponent
  const [selectedGamePlans, setSelectedGamePlans] = useState({ offense: null, defense: null }); // Selected game plans
  const [showGameSimModal, setShowGameSimModal] = useState(false); // Simulation display modal
  const [currentGameSimulation, setCurrentGameSimulation] = useState(null); // Current game being simulated
  const [gameSimPhase, setGameSimPhase] = useState('quarters'); // 'quarters', 'boxscore', 'recruiting'

  // Load saved game on mount
  useEffect(() => {
    const savedGame = localStorage.getItem('cfb-dynasty-save');
    if (savedGame) {
      try {
        const gameData = JSON.parse(savedGame);
        
        // Validate that we have the minimum required data
        if (gameData.selectedSchool && gameData.roster && gameData.roster.length > 0 && gameData.budget) {
          setSelectedSchool(gameData.selectedSchool);
          setRoster(gameData.roster);
          
          // If recruits don't exist in save (old save file), generate them
          if (!gameData.recruits || gameData.recruits.length === 0) {
            console.log('Old save detected - generating recruiting class');
            const allSchools = [...SCHOOLS.blueBloods, ...SCHOOLS.power4, ...SCHOOLS.group5];
            const recruitingClass = generateRecruitingClass(gameData.roster, allSchools);
            setRecruits(recruitingClass);
          } else {
            // Clean up any corrupted commit data from old saves
            const cleanedRecruits = gameData.recruits.map(r => {
              // If recruit is marked as committed but committedSchool is missing or doesn't match, fix it
              if (r.verbalCommit && (!r.committedSchool || !r.committedSchool.id)) {
                console.warn(`Fixing corrupt commit data for ${r.name} - removing bad commit`);
                return {
                  ...r,
                  verbalCommit: false,
                  committedSchool: null,
                  nilDeal: null,
                  signedCommit: false
                };
              }
              return r;
            });

            const fixedCount = cleanedRecruits.filter((r, i) => r.verbalCommit !== gameData.recruits[i].verbalCommit).length;
            if (fixedCount > 0) {
              console.log(`Fixed ${fixedCount} recruits with corrupted commit data`);
            }

            setRecruits(cleanedRecruits);
          }
          
          // Set recruiting points based on tier (use saved value or default based on tier)
          if (gameData.recruitingPoints) {
            setRecruitingPoints(gameData.recruitingPoints);
          } else {
            // Old save without recruiting points - set based on tier
            let weeklyRecruitingPoints = 200;
            if (gameData.selectedSchool.tier === 'Blue Blood') {
              weeklyRecruitingPoints = 600;
            } else if (gameData.selectedSchool.tier === 'Power 4') {
              weeklyRecruitingPoints = 400;
            }
            setRecruitingPoints(weeklyRecruitingPoints);
          }
          setBudget(gameData.budget);
          setBudgetAllocated(gameData.budgetAllocated);
          setIncomingFreshmanBudget(gameData.incomingFreshmanBudget || 0);
          setTransferAdditionsBudget(gameData.transferAdditionsBudget || 0);
          setCurrentDate(gameData.currentDate || { year: 2026, month: 2, day: 1 });
          setCurrentGameWeek(gameData.currentGameWeek || 0);
          setDismissedAlerts(gameData.dismissedAlerts || []);
          setOffSeasonWeek(gameData.offSeasonWeek || null);
          setOffSeasonWeeksCompleted(gameData.offSeasonWeeksCompleted || 0);

          // Load coach stats
          setCoachName(gameData.coachName || '');
          setCoachRecord(gameData.coachRecord || { wins: 0, losses: 0 });
          setCoachRivalRecord(gameData.coachRivalRecord || { wins: 0, losses: 0 });
          setCoachChampionships(gameData.coachChampionships || { national: 0, conference: 0, bowlWins: 0 });
          setCoachSuccess(gameData.coachSuccess !== undefined ? gameData.coachSuccess : 50);

          // Load custom team names and coach names
          if (gameData.aiCoaches) {
            setAiCoaches(gameData.aiCoaches);
          }
          if (gameData.customSchoolNames) {
            setCustomSchoolNames(gameData.customSchoolNames);
          }

          // Load game simulation data
          setSeasonSchedule(gameData.seasonSchedule || []);
          setSeasonRecord(gameData.seasonRecord || { wins: 0, losses: 0, confWins: 0, confLosses: 0 });
          setGameResults(gameData.gameResults || []);
          setConferenceStandings(gameData.conferenceStandings || {});
          if (gameData.customNicknames) {
            setCustomNicknames(gameData.customNicknames);
          }
          if (gameData.customConferenceNames) {
            setCustomConferenceNames(gameData.customConferenceNames);
          }

          // Load AI rosters or generate if not in save
          if (gameData.aiRosters && Object.keys(gameData.aiRosters).length > 0) {
            setAiRosters(gameData.aiRosters);
            console.log('Loaded AI rosters from save');
          } else {
            console.log('No AI rosters in save, will generate on next render');
          }
          
          // Skip title screen for returning users with valid data
          setGameState('playing');
          console.log('Loaded saved game successfully');
        } else {
          // Incomplete save data - clear it and start fresh
          console.warn('Incomplete save data found, starting fresh');
          localStorage.removeItem('cfb-dynasty-save');
          setGameState('titleScreen');
        }
      } catch (e) {
        console.error('Error loading saved game:', e);
        // If there's an error, clear bad data and start fresh
        localStorage.removeItem('cfb-dynasty-save');
        setGameState('titleScreen');
      }
    }
  }, []);

  // Generate AI rosters when game starts (either new game or loading)
  useEffect(() => {
    if (selectedSchool && Object.keys(aiRosters).length === 0) {
      console.log('Generating AI rosters for all 134 teams...');
      const rosters = generateAllAIRosters();
      setAiRosters(rosters);
      console.log('AI rosters generated:', Object.keys(rosters).length, 'teams');
    }
  }, [selectedSchool]);

  // Clean up any bad commit data - run whenever viewing dashboard or recruits change
  useEffect(() => {
    if (selectedSchool && recruits.length > 0 && (activeTab === 'dashboard' || activeTab === 'recruiting')) {
      // Debug logging to track commit corruption
      const allCommits = recruits.filter(r => r.verbalCommit);
      const userCommits = allCommits.filter(r => r.committedSchool?.id === selectedSchool.id);
      const aiCommits = allCommits.filter(r => r.committedSchool?.id !== selectedSchool.id);
      console.log(`📊 Cleanup check: ${allCommits.length} total commits (${userCommits.length} to user, ${aiCommits.length} to AI)`);

      // ONLY clean up commits to the USER's school that are invalid
      // Do NOT touch AI school commits - they use different validation rules
      const needsCleanup = recruits.filter(r =>
        r.verbalCommit &&
        r.committedSchool?.id === selectedSchool.id && (
          // User commits MUST have:
          r.interest < 70 || // At least 70% interest (NIL negotiation requirement)
          !r.isTargeted || // Must be targeted (recruiting action taken)
          (!r.nilOfferAccepted && !r.signedCommit) || // Must have accepted NIL or be signed
          !r.nilDeal || // Must have NIL deal
          r.nilDeal === 0 // NIL deal must be > 0
        )
      );

      if (needsCleanup.length > 0) {
        console.log(`🧹 Found ${needsCleanup.length} invalid commits to clean up...`);
        const cleanedRecruits = recruits.map(r => {
          // ONLY remove commits to USER's school that are invalid
          if (r.verbalCommit &&
              r.committedSchool?.id === selectedSchool.id && (
                r.interest < 70 ||
                !r.isTargeted ||
                (!r.nilOfferAccepted && !r.signedCommit) ||
                !r.nilDeal ||
                r.nilDeal === 0
              )) {
            console.log(`  Removing invalid user commit: ${r.name} (interest: ${r.interest}%, targeted: ${r.isTargeted}, nilAccepted: ${r.nilOfferAccepted}, NIL: ${r.nilDeal || 0})`);
            return {
              ...r,
              verbalCommit: false,
              committedSchool: null,
              nilDeal: null,
              signedCommit: false,
              commitmentInterest: 0,
              nilOfferAccepted: false
            };
          }
          return r;
        });
        setRecruits(cleanedRecruits);
        console.log(`✅ Cleanup complete - removed ${needsCleanup.length} corrupted commits`);
      }
    }
  }, [selectedSchool, recruits.length, activeTab]);

  // Team tab collapsible sections
  const [scheduleExpanded, setScheduleExpanded] = useState(false);
  const [offenseExpanded, setOffenseExpanded] = useState(false);
  const [defenseExpanded, setDefenseExpanded] = useState(false);
  const [specialTeamsExpanded, setSpecialTeamsExpanded] = useState(false);
  
  // Position-level collapsible state (all start collapsed)
  const [offensePositionExpanded, setOffensePositionExpanded] = useState(
    Object.fromEntries(OFFENSIVE_POSITIONS.map(pos => [pos, false]))
  );
  const [defensePositionExpanded, setDefensePositionExpanded] = useState(
    Object.fromEntries(DEFENSIVE_POSITIONS.map(pos => [pos, false]))
  );
  const [specialTeamsPositionExpanded, setSpecialTeamsPositionExpanded] = useState(
    Object.fromEntries(SPECIAL_TEAMS_POSITIONS.map(pos => [pos, false]))
  );
  
  // Pending roster changes (for Team tab)
  const [pendingRoster, setPendingRoster] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const audioContextRef = React.useRef(null);

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      setAudioStarted(true);
    }
  };

  // Title Screen Audio - Attempt to start automatically, falls back to click
  useEffect(() => {
    if (gameState === 'titleScreen') {
      const tryStartAudio = async () => {
        try {
          // Initialize audio context
          if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
          }
          
          const audioCtx = audioContextRef.current;
          
          // Try to resume if suspended (will fail if autoplay blocked)
          if (audioCtx.state === 'suspended') {
            await audioCtx.resume();
          }
          
          // If we get here, audio is allowed - start it
          if (audioCtx.state === 'running') {
            setAudioStarted(true);
            
            // Create crowd ambience
            const bufferSize = audioCtx.sampleRate * 3;
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
              const noise = (Math.random() * 2 - 1) * 0.15;
              const rumble = Math.sin(i * 0.001) * 0.1;
              data[i] = noise + rumble;
            }
            
            const source = audioCtx.createBufferSource();
            source.buffer = buffer;
            source.loop = true;
            
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 800;
            
            const gainNode = audioCtx.createGain();
            gainNode.gain.value = 0.2; // Start quiet
            
            source.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            source.start(0);
            
            // Store for later volume boost
            window.titleScreenAudio = { source, gainNode };
            
            console.log('Title screen audio started automatically');
          }
        } catch (e) {
          // Autoplay blocked - that's okay, we'll start on click
          console.log('Autoplay blocked, audio will start on user interaction');
        }
      };
      
      // Try to start audio immediately
      tryStartAudio();
      
      // Also store function for manual start on click
      window.startTitleAudio = async () => {
        if (window.titleScreenAudio) return; // Already playing
        
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const audioCtx = audioContextRef.current;
        
        if (audioCtx.state === 'suspended') {
          await audioCtx.resume();
        }
        
        setAudioStarted(true);
        
        // Create crowd ambience
        const bufferSize = audioCtx.sampleRate * 3;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
          const noise = (Math.random() * 2 - 1) * 0.15;
          const rumble = Math.sin(i * 0.001) * 0.1;
          data[i] = noise + rumble;
        }
        
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.2;
        
        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        source.start(0);
        
        window.titleScreenAudio = { source, gainNode };
        
        console.log('Title screen audio started on click');
      };
      
      return () => {
        window.startTitleAudio = null;
        if (window.titleScreenAudio) {
          try {
            window.titleScreenAudio.source.stop();
          } catch (e) {
            // Already stopped
          }
          window.titleScreenAudio = null;
        }
      };
    }
  }, [gameState]);

  useEffect(() => {
    if (sfxEnabled && audioStarted) {
      const playAmbience = () => {
        const audioCtx = audioContextRef.current;
        if (!audioCtx) return;
        const bufferSize = audioCtx.sampleRate * 2;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.05;
        }
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1000;
        source.connect(filter);
        filter.connect(audioCtx.destination);
        source.start(0);
        return source;
      };
      const ambience = playAmbience();
      return () => { if (ambience) ambience.stop(); };
    }
  }, [sfxEnabled, audioStarted]);

  const playRandomSound = () => {
    if (!sfxEnabled || !audioContextRef.current) return;
    const audioCtx = audioContextRef.current;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const soundType = Math.random();
    if (soundType < 0.5) {
      oscillator.frequency.value = 2000 + Math.random() * 1000;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    } else {
      oscillator.frequency.value = 200 + Math.random() * 200;
      oscillator.type = 'sawtooth';
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    }
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.5);
  };

  useEffect(() => {
    if (sfxEnabled && audioStarted) {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) playRandomSound();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [sfxEnabled, audioStarted]);
  
  // Initialize off-season week when entering The Off-Season
  useEffect(() => {
    const currentEvent = getCurrentEvent();
    
    // Only initialize off-season if we're in the event, week is null, AND we haven't completed it yet THIS CYCLE
    if (currentEvent === 'The Off-Season' && offSeasonWeek === null && offSeasonWeeksCompleted < 16) {
      setOffSeasonWeek(1);
      console.log('Entered The Off-Season - Starting Week 1 of 16');

      // Generate next season's schedule at the start of The Off-Season
      const schedule = generateSeasonSchedule();
      setSeasonSchedule(schedule);
      setSeasonRecord({ wins: 0, losses: 0, confWins: 0, confLosses: 0 });
      setGameResults([]);
      console.log('Next season schedule generated:', schedule.length, 'games');
    } else if (currentEvent !== 'The Off-Season') {
      // When we leave The Off-Season, reset completion tracker for next year
      if (offSeasonWeeksCompleted === 16) {
        // Only reset if we actually completed all 16 weeks
        setOffSeasonWeeksCompleted(0);
        console.log('Exited The Off-Season - Reset completion tracker for next year');
      }
      // Clear the week counter when leaving the off-season period
      if (offSeasonWeek !== null) {
        setOffSeasonWeek(null);
        console.log('Exited The Off-Season');
      }
    }
  }, [currentDate, offSeasonWeek, offSeasonWeeksCompleted]);
  
  // Annual budget inflation - increase budget by 5-7% when new year starts
  useEffect(() => {
    if (currentDate.month === 0 && currentDate.day === 1 && currentDate.year > 2026) {
      // Calculate inflation rate between 5-7%
      const inflationRate = 0.05 + (Math.random() * 0.02); // 5-7%
      const newBudget = Math.round(selectedSchool.budget * (1 + inflationRate));
      
      // Update school budget permanently
      setSelectedSchool(prev => ({
        ...prev,
        budget: newBudget
      }));
      setBudget(newBudget);
      
      console.log(`🎊 New Year! Budget increased by ${(inflationRate * 100).toFixed(1)}% to ${formatCurrency(newBudget)}`);
    }
  }, [currentDate.year, currentDate.month, currentDate.day]);

  useEffect(() => {
    if (selectedSchool && roster.length === 0) {
      const newRoster = generateRealisticRoster(selectedSchool);
      const rostersWithStarters = autoAssignStarters(newRoster);
      setRoster(rostersWithStarters);
      const allocated = rostersWithStarters.reduce((sum, p) => sum + p.currentNIL, 0);
      setBudgetAllocated(allocated);
      
      // Generate recruiting class - flatten SCHOOLS object into array
      const allSchools = [...SCHOOLS.blueBloods, ...SCHOOLS.power4, ...SCHOOLS.group5];
      const recruitingClass = generateRecruitingClass(rostersWithStarters, allSchools);
      setRecruits(recruitingClass);
      console.log(`Generated ${recruitingClass.length} recruits for 2026 class`);
      
      // Set recruiting points based on school tier
      let weeklyRecruitingPoints = 200; // Group of 5 default
      if (selectedSchool.tier === 'Blue Blood') {
        weeklyRecruitingPoints = 600;
      } else if (selectedSchool.tier === 'Power 4') {
        weeklyRecruitingPoints = 400;
      }
      setRecruitingPoints(weeklyRecruitingPoints);
      console.log(`${selectedSchool.tier} gets ${weeklyRecruitingPoints} recruiting points per week`);
      
      let freshmanPercent = 0.08;
      let transferPercent = 0.04;
      
      if (selectedSchool.tier === 'Blue Blood') {
        freshmanPercent = 0.10;
        transferPercent = 0.05;
      } else if (selectedSchool.tier === 'Group of 5') {
        freshmanPercent = 0.06;
        transferPercent = 0.03;
      }
      
      setIncomingFreshmanBudget(Math.round(selectedSchool.budget * freshmanPercent));
      setTransferAdditionsBudget(Math.round(selectedSchool.budget * transferPercent));
    }
  }, [selectedSchool]);

  // Initialize AI coaches on first load
  useEffect(() => {
    if (Object.keys(aiCoaches).length === 0) {
      const coaches = generateAICoachNames();
      setAiCoaches(coaches);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectSchool = (school) => {
    initAudio();
    // Show coach name input modal instead of immediately selecting
    setPendingSchool(school);
  };

  const confirmSchoolWithCoach = () => {
    if (!tempCoachInput.trim()) {
      alert('Please enter your coach name!');
      return;
    }

    setCoachName(tempCoachInput.trim());
    setSelectedSchool(pendingSchool);
    setBudget(pendingSchool.budget);

    // Set initial coach success based on tier
    let initialSuccess = 50; // Default
    if (pendingSchool.tier === 'Blue Blood') {
      initialSuccess = 75;
    } else if (pendingSchool.tier === 'Power 4') {
      initialSuccess = 60;
    } else if (pendingSchool.tier === 'Group of 5') {
      initialSuccess = 40;
    }
    setCoachSuccess(initialSuccess);

    // Generate season schedule immediately after school selection
    const schedule = generateSeasonSchedule(pendingSchool);
    setSeasonSchedule(schedule);
    setSeasonRecord({ wins: 0, losses: 0, confWins: 0, confLosses: 0 });
    setGameResults([]);
    console.log('Season schedule generated on school selection:', schedule.length, 'games');

    setPendingSchool(null);
    setTempCoachInput('');
    setGameState('playing');

    // Save game will happen in the useEffect that watches for roster changes
  };

  // Helper functions for custom school names
  const getSchoolDisplayName = (school) => {
    return customSchoolNames[school.id] || school.name;
  };

  const getSchoolNickname = (school) => {
    return customNicknames[school.id] || school.nickname;
  };

  const getCoachName = (schoolId) => {
    // If this is the user's school, return their coach name
    if (selectedSchool && schoolId === selectedSchool.id) {
      return coachName || 'Unknown';
    }
    // Otherwise return AI coach name
    return aiCoaches[schoolId] || 'Unknown';
  };

  // School editing functions
  const startEditingSchool = (school) => {
    setEditingSchool(school);
    setTempSchoolName(getSchoolDisplayName(school));
    setTempNickname(getSchoolNickname(school));
    setTempCoachName(getCoachName(school.id));
  };

  const saveSchoolEdits = () => {
    if (!editingSchool) return;

    // Validate inputs
    if (!tempSchoolName.trim()) {
      alert('Team name cannot be empty!');
      return;
    }
    if (!tempNickname.trim()) {
      alert('Nickname cannot be empty!');
      return;
    }
    if (!tempCoachName.trim()) {
      alert('Coach name cannot be empty!');
      return;
    }

    // Save customizations
    setCustomSchoolNames(prev => ({
      ...prev,
      [editingSchool.id]: tempSchoolName.trim()
    }));
    setCustomNicknames(prev => ({
      ...prev,
      [editingSchool.id]: tempNickname.trim()
    }));
    setAiCoaches(prev => ({
      ...prev,
      [editingSchool.id]: tempCoachName.trim()
    }));

    // Clear editing state
    setEditingSchool(null);
    setTempSchoolName('');
    setTempNickname('');
    setTempCoachName('');
  };

  const cancelSchoolEdits = () => {
    setEditingSchool(null);
    setTempSchoolName('');
    setTempNickname('');
    setTempCoachName('');
  };

  // Conference name functions
  const getConferenceDisplayName = (conferenceName) => {
    return customConferenceNames[conferenceName] || conferenceName;
  };

  const startEditingConference = (conferenceName) => {
    setEditingConference(conferenceName);
    setTempConferenceName(getConferenceDisplayName(conferenceName));
  };

  const saveConferenceEdit = () => {
    if (!editingConference) return;

    if (!tempConferenceName.trim()) {
      alert('Conference name cannot be empty!');
      return;
    }

    setCustomConferenceNames(prev => ({
      ...prev,
      [editingConference]: tempConferenceName.trim()
    }));

    setEditingConference(null);
    setTempConferenceName('');
  };

  const cancelConferenceEdit = () => {
    setEditingConference(null);
    setTempConferenceName('');
  };

  const retireAndReset = () => {
    try {
      // Clear all saved data
      localStorage.removeItem('cfb-dynasty-save');
      
      // Verify it's cleared
      const check = localStorage.getItem('cfb-dynasty-save');
      if (check !== null) {
        console.error('Failed to clear localStorage');
        alert('Error clearing saved data. Please try again.');
        return;
      }
      
      // Try multiple reload methods for different environments
      try {
        window.location.reload(true);
      } catch (e1) {
        try {
          window.location.href = window.location.href;
        } catch (e2) {
          window.location.replace(window.location.href);
        }
      }
    } catch (e) {
      console.error('Error in retireAndReset:', e);
      alert('Error resetting game. Please refresh the page manually.');
    }
  };

  // Save game whenever critical state changes
  useEffect(() => {
    if (selectedSchool && roster.length > 0) {
      // Optimize recruits data - only save recruits that matter
      const optimizedRecruits = recruits.map(r => {
        // For recruits you're not targeting and have 0 interest, strip AI data
        if (!r.isTargeted && r.interest === 0 && !r.verbalCommit) {
          const { recruitingSchools, leadingSchool, commitmentLeader, ...essentialData } = r;
          return {
            ...essentialData,
            recruitingSchools: [], // Empty array to save space
            leadingSchool: null,
            commitmentLeader: null
          };
        }
        // For targeted or committed recruits, keep only top 3 recruiting schools
        if (r.recruitingSchools && r.recruitingSchools.length > 3) {
          return {
            ...r,
            recruitingSchools: r.recruitingSchools.slice(0, 3) // Only keep top 3
          };
        }
        return r;
      });
      
      const gameData = {
        selectedSchool,
        roster,
        recruits: optimizedRecruits, // Use optimized version
        recruitingPoints,
        budget,
        budgetAllocated,
        incomingFreshmanBudget,
        transferAdditionsBudget,
        currentDate,
        currentGameWeek,
        dismissedAlerts,
        offSeasonWeek,
        offSeasonWeeksCompleted,
        coachName,
        coachRecord,
        coachRivalRecord,
        coachChampionships,
        coachSuccess,
        aiCoaches,
        customSchoolNames,
        customNicknames,
        customConferenceNames,
        seasonSchedule,
        seasonRecord,
        gameResults,
        conferenceStandings,
        // Don't save aiRosters - they're not essential and huge
        // aiRosters can be regenerated if needed
      };
      
      try {
        localStorage.setItem('cfb-dynasty-save', JSON.stringify(gameData));
      } catch (e) {
        if (e.name === 'QuotaExceededError') {
          console.error('Save failed: Storage quota exceeded');
          // Could show user-friendly error here
          alert('⚠️ Save Warning: Storage limit reached. Some data may not be saved. Consider starting a new season.');
        }
      }
    }
  }, [selectedSchool, roster, recruits, recruitingPoints, budget, budgetAllocated, incomingFreshmanBudget, transferAdditionsBudget, currentDate, currentGameWeek, dismissedAlerts, offSeasonWeek, offSeasonWeeksCompleted, aiRosters, coachName, coachRecord, coachRivalRecord, coachChampionships, coachSuccess, aiCoaches, customSchoolNames, customNicknames, customConferenceNames, seasonSchedule, seasonRecord, gameResults, conferenceStandings]);

  // Reusable Position Group Component for Recruiting
  const PositionGroup = ({ position, title, recruits, expandedPositions, setExpandedPositions, canRecruit, recruitingPoints, executeRecruitingAction, showSubPosition = false }) => {
    const isExpanded = expandedPositions[position];
    
    const RECRUITING_ACTIONS = [
      { id: 'socialMedia', name: 'SOCIAL MEDIA', cost: 5, interestGain: 5, minInterest: 0 },
      { id: 'call', name: 'CALL', cost: 10, interestGain: 10, minInterest: 0 },
      { id: 'schoolVisit', name: 'SCHOOL VISIT', cost: 15, interestGain: 12, minInterest: 0, monthlyLimit: true },
      { id: 'campusVisit', name: 'CAMPUS VISIT', cost: 25, interestGain: 20, minInterest: 0, monthlyLimit: true },
      { id: 'officialVisit', name: 'OFFICIAL VISIT', cost: 50, interestGain: 30, minInterest: 75, oneTimeOnly: true },
    ];
    
    return (
      <div className="bg-gray-800 border-2 border-gray-600">
        <button
          onClick={() => setExpandedPositions({...expandedPositions, [position]: !isExpanded})}
          className="w-full p-2 flex justify-between items-center hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">{title}</span>
            <span className="text-gray-400 text-xs">
              ({recruits.length} {recruits.length === 1 ? 'recruit' : 'recruits'})
            </span>
          </div>
          {isExpanded ? <ChevronUp className="text-gray-400 w-4 h-4" /> : <ChevronDown className="text-gray-400 w-4 h-4" />}
        </button>
        
        {isExpanded && (
          <div className="border-t-2 border-gray-600">
            {recruits
              .sort((a, b) => b.stars - a.stars || b.rating - a.rating)
              .map((recruit, index) => (
                <div key={recruit.id} className={`border-b-2 border-gray-700 last:border-b-0 ${index % 2 === 0 ? 'bg-recruit-light' : 'bg-recruit-dark'}`}>
                  <div className="p-2 hover:bg-gray-750 transition-colors">
                    {/* Player Header - Compact */}
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-sm ${index % 2 === 0 ? 'text-gray-900' : 'text-white'}`}>{recruit.name}</span>
                          <span className="text-yellow-400 text-xs">{'⭐'.repeat(recruit.stars)}</span>
                          {/* Remove from My Recruits button */}
                          {recruit.isTargeted && !recruit.verbalCommit && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm(`Remove ${recruit.name} from your recruiting board?`)) {
                                  setRecruits(recruits.map(r => 
                                    r.id === recruit.id ? { ...r, isTargeted: false } : r
                                  ));
                                }
                              }}
                              className="bg-red-700 border border-red-600 px-1 py-0.5 text-xs hover:bg-red-600"
                              style={{ boxShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}
                              title="Remove from My Recruits"
                            >
                              ✕
                            </button>
                          )}
                          {recruit.isGenerational && recruit.interest >= 50 && (
                            <span className="bg-purple-600 px-1 py-0.5 text-xs border border-purple-400">🏆</span>
                          )}
                          {recruit.isDiamond && recruit.interest >= 50 && (
                            <span className="bg-blue-600 px-1 py-0.5 text-xs border border-blue-400">💎</span>
                          )}
                          {recruit.signingDayDecision && (
                            <span className="bg-orange-600 px-1 py-0.5 text-xs border border-orange-400" title="Signing Day Decision - Multiple schools competing">📅 SIGNING DAY</span>
                          )}
                        </div>
                        <div className="flex gap-2 text-xs mt-0.5">
                          <span className={index % 2 === 0 ? 'text-gray-700' : 'text-gray-400'}>{showSubPosition ? recruit.position : position}</span>
                          <span className={index % 2 === 0 ? 'text-gray-600' : 'text-gray-500'}>|</span>
                          {recruit.isTransfer ? (
                            <span className="text-purple-500">{recruit.previousSchool || 'Transfer'}</span>
                          ) : (
                            <span className={index % 2 === 0 ? 'text-gray-800' : 'text-gray-300'}>{recruit.hometown}, {recruit.state}</span>
                          )}
                          <span className={index % 2 === 0 ? 'text-gray-600' : 'text-gray-500'}>|</span>
                          <span className="text-blue-600">
                            OVR {recruit.interest >= 50 ? recruit.rating : '??'}
                          </span>
                        </div>
                      </div>
                      {recruit.verbalCommit && (
                        <div className={`border px-2 py-0.5 text-xs font-bold ${
                          recruit.committedSchool?.id === selectedSchool?.id
                            ? 'bg-green-900 border-green-600'
                            : 'bg-orange-900 border-orange-600'
                        }`}>
                          {recruit.committedSchool?.id === selectedSchool?.id
                            ? '✓ COMMITTED'
                            : `COMMITTED TO ${recruit.committedSchool?.name || 'OTHER SCHOOL'}`
                          }
                        </div>
                      )}
                    </div>

                    {/* Interest & Market Info - Compact inline */}
                    <div className="flex gap-2 mb-2 text-xs">
                      <div className={`border px-2 py-1 ${index % 2 === 0 ? 'bg-gray-200 border-gray-400' : 'bg-gray-800 border-gray-600'}`}>
                        <span className={index % 2 === 0 ? 'text-gray-700' : 'text-gray-400'}>INTEREST </span>
                        <span className={`font-bold ${
                          recruit.interest >= 75 ? (index % 2 === 0 ? 'text-green-700' : 'text-green-400') :
                          recruit.interest >= 50 ? (index % 2 === 0 ? 'text-yellow-700' : 'text-yellow-400') :
                          recruit.interest >= 25 ? (index % 2 === 0 ? 'text-blue-700' : 'text-blue-400') :
                          (index % 2 === 0 ? 'text-gray-700' : 'text-gray-400')
                        }`}>{Math.round(recruit.interest)}%</span>
                      </div>
                      <div className={`border px-2 py-1 ${index % 2 === 0 ? 'bg-gray-200 border-gray-400' : 'bg-gray-800 border-gray-600'}`}>
                        <span className={index % 2 === 0 ? 'text-gray-700' : 'text-gray-400'}>MARKET VALUE </span>
                        <span className={index % 2 === 0 ? 'text-green-700 font-bold' : 'text-green-400 font-bold'}>{formatCurrency(recruit.marketValue)}</span>
                      </div>
                      <div className={`border px-2 py-1 ${index % 2 === 0 ? 'bg-gray-200 border-gray-400' : 'bg-gray-800 border-gray-600'}`}>
                        <span className={index % 2 === 0 ? 'text-gray-700' : 'text-gray-400'}>ASKING PRICE </span>
                        <span className={index % 2 === 0 ? 'text-yellow-700 font-bold' : 'text-yellow-400 font-bold'}>{formatCurrency(recruit.askingPrice)}</span>
                      </div>
                    </div>

                    {/* Dream Schools (25-74% interest) - More compact */}
                    {recruit.interest >= 25 && recruit.interest < 75 && recruit.dreamSchools && recruit.dreamSchools.length > 0 && (
                      <div className={`mb-2 border px-2 py-1 text-xs ${index % 2 === 0 ? 'bg-gray-200 border-gray-400' : 'bg-gray-800 border-gray-600'}`}>
                        <span className={index % 2 === 0 ? 'text-gray-700' : 'text-gray-400'}>Dream Schools: </span>
                        {recruit.dreamSchools.slice(0, 3).map((s, i) => (
                          <span key={s.id} className={index % 2 === 0 ? 'text-gray-900' : 'text-gray-300'}>
                            {s.name}{i < Math.min(2, recruit.dreamSchools.length - 1) ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Top 3 (75%+ interest) - More compact */}
                    {recruit.interest >= 75 && recruit.topThree && recruit.topThree.length > 0 && (
                      <div className="mb-2 bg-yellow-900 border border-yellow-700 px-2 py-1 text-xs">
                        <span className="text-yellow-400 font-bold">TOP 3: </span>
                        {recruit.topThree.map((s, i) => (
                          <span key={s.id} className="text-white font-bold">
                            {s.name}{i < recruit.topThree.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* NIL Deal (if committed) - More compact */}
                    {recruit.verbalCommit && recruit.nilDeal && (
                      <div className="bg-green-900 border border-green-600 px-2 py-1 mb-2 text-xs">
                        💰 <span className="font-bold">NIL:</span> {formatCurrency(recruit.nilDeal)}
                        {recruit.commitmentInterest < 100 && (
                          <span className="text-yellow-400 ml-2">
                            ⚠ {Math.round(recruit.commitmentInterest)}% (flip: {recruit.flipMultiplier?.toFixed(2) || 1}x)
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Recruiting Battle - Show competition */}
                    {recruit.interest >= 25 && recruit.recruitingSchools && recruit.recruitingSchools.length > 0 && (
                      <div className={`mb-2 border px-2 py-1 text-xs ${
                        recruit.signingDayDecision
                          ? (index % 2 === 0 ? 'bg-orange-100 border-orange-500' : 'bg-orange-900 border-orange-600')
                          : (index % 2 === 0 ? 'bg-blue-100 border-blue-400' : 'bg-blue-900 border-blue-600')
                      }`}>
                        <div className={`font-bold mb-1 ${
                          recruit.signingDayDecision
                            ? (index % 2 === 0 ? 'text-orange-900' : 'text-orange-400')
                            : (index % 2 === 0 ? 'text-blue-900' : 'text-blue-400')
                        }`}>
                          {recruit.signingDayDecision ? '📅 SIGNING DAY BATTLE' : '🎯 RECRUITING BATTLE'}
                        </div>
                        {recruit.recruitingSchools.slice(0, 3).map((rs, i) => (
                          <div key={rs.schoolId} className="flex justify-between items-center mb-1">
                            <span className={`${index % 2 === 0 ? 'text-gray-900' : 'text-gray-300'} ${rs.interest > 85 ? 'font-bold' : ''}`}>
                              {i === 0 && recruit.leadingSchool?.schoolId === rs.schoolId && !recruit.verbalCommit && '👑 '}
                              {rs.schoolName}
                              {rs.interest > 85 && recruit.signingDayDecision && ' 🔥'}
                            </span>
                            <span className={`font-bold ${
                              rs.interest > 85
                                ? (index % 2 === 0 ? 'text-red-700' : 'text-red-400')
                                : (index % 2 === 0 ? 'text-blue-700' : 'text-blue-400')
                            }`}>
                              {Math.round(rs.interest)}%
                            </span>
                          </div>
                        ))}
                        {recruit.recruitingSchools.length > 3 && (
                          <div className={`text-xs opacity-70 ${index % 2 === 0 ? 'text-gray-700' : 'text-gray-500'}`}>
                            +{recruit.recruitingSchools.length - 3} more schools
                          </div>
                        )}
                        {recruit.signingDayDecision && (
                          <div className={`mt-1 pt-1 border-t ${index % 2 === 0 ? 'border-orange-400 text-orange-700' : 'border-orange-700 text-orange-400'} text-xs font-bold`}>
                            ⚠️ Multiple schools &gt;85% - Decision on Signing Day
                          </div>
                        )}
                        {recruit.leadingSchool && !recruit.verbalCommit && !recruit.signingDayDecision && (() => {
                          // Show leader only if an AI school has higher interest than user
                          const userInterest = recruit.interest || 0;
                          const aiLeaderInterest = recruit.leadingSchool?.interest || 0;
                          if (aiLeaderInterest > userInterest) {
                            return (
                              <div className={`mt-1 pt-1 border-t ${index % 2 === 0 ? 'border-blue-300 text-orange-700' : 'border-blue-700 text-orange-400'} text-xs font-bold`}>
                                ⚠ Leader: {recruit.leadingSchool.schoolName} ({recruit.leadingSchool.interest}%)
                              </div>
                            );
                          } else if (userInterest > aiLeaderInterest) {
                            return (
                              <div className={`mt-1 pt-1 border-t ${index % 2 === 0 ? 'border-blue-300 text-green-700' : 'border-blue-700 text-green-400'} text-xs font-bold`}>
                                👑 Leader: {getSchoolDisplayName(selectedSchool)} ({userInterest}%)
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    )}

                    {/* Scout Results - Show if scouted */}
                    {recruit.isScouted && recruit.traits && (
                      <div className={`mb-2 border-2 px-2 py-2 ${index % 2 === 0 ? 'bg-purple-100 border-purple-500' : 'bg-purple-900 border-purple-600'}`}>
                        <div className={`font-bold text-xs mb-1 ${index % 2 === 0 ? 'text-purple-900' : 'text-purple-300'}`}>
                          🔍 SCOUT REPORT
                        </div>
                        <div className="space-y-1">
                          {recruit.traits.map((trait, i) => (
                            <div key={i} className={`text-xs ${index % 2 === 0 ? 'text-purple-800' : 'text-purple-200'}`}>
                              • {trait}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recruiting Actions - More compact */}
                    {/* Step 1: Show OFFER SCHOLARSHIP and SCOUT if not yet targeted */}
                    {canRecruit && !recruit.signedCommit && !recruit.isTargeted && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <button
                          onClick={() => handleOfferScholarship(recruit)}
                          disabled={recruitingPoints < 10}
                          className={`border-2 p-2 text-xs transition-all ${
                            recruitingPoints >= 10
                              ? 'bg-blue-600 border-blue-400 hover:bg-blue-500'
                              : 'bg-gray-600 border-gray-500 opacity-50 cursor-not-allowed'
                          }`}
                          style={{ boxShadow: recruitingPoints >= 10 ? '2px 2px 0px rgba(0,0,0,0.5)' : 'none' }}
                        >
                          <div className="font-bold text-white">OFFER SCHOLARSHIP</div>
                          <div className="text-white opacity-90 text-xs mt-1">10 pts</div>
                        </button>
                        <button
                          onClick={() => handleScout(recruit)}
                          disabled={recruitingPoints < 25 || recruit.isScouted}
                          className={`border-2 p-2 text-xs transition-all ${
                            recruit.isScouted
                              ? 'bg-gray-700 border-gray-600 opacity-50 cursor-not-allowed'
                              : recruitingPoints >= 25
                                ? 'bg-purple-600 border-purple-400 hover:bg-purple-500'
                                : 'bg-gray-600 border-gray-500 opacity-50 cursor-not-allowed'
                          }`}
                          style={{ boxShadow: recruitingPoints >= 25 && !recruit.isScouted ? '2px 2px 0px rgba(0,0,0,0.5)' : 'none' }}
                        >
                          <div className="font-bold text-white">
                            {recruit.isScouted ? '✓ SCOUTED' : 'SCOUT'}
                          </div>
                          <div className="text-white opacity-90 text-xs mt-1">25 pts</div>
                        </button>
                      </div>
                    )}

                    {/* Step 2: Show regular recruiting actions if scholarship offered */}
                    {/* Allow recruiting if: not signed, interest < 100%, in recruiting period, AND scholarship offered */}
                    {/* Lock recruiting at 100% interest - no value in continuing. If interest drops below 100%, recruiting reopens */}
                    {canRecruit && !recruit.signedCommit && recruit.interest < 100 && recruit.isTargeted && (
                      <>
                        {/* Flip Attempt Warning - Only show if committed to ANOTHER school */}
                        {recruit.verbalCommit && recruit.committedSchool?.id !== selectedSchool?.id && (
                          <div className={`mb-2 border-2 px-2 py-1 text-xs ${
                            index % 2 === 0 ? 'bg-red-100 border-red-500 text-red-900' : 'bg-red-900 border-red-600 text-red-200'
                          }`}>
                            <div className="font-bold">🔄 FLIP ATTEMPT</div>
                            <div className="text-xs opacity-90">
                              Committed to {recruit.committedSchool.name} ({recruit.committedSchool.tier})
                              {recruit.committedSchool.tier === 'Blue Blood' && ' - Very Hard (-50%)'}
                              {recruit.committedSchool.tier === 'Power 4' && ' - Harder (-25%)'}
                            </div>
                          </div>
                        )}
                        <div className="grid grid-cols-4 gap-1"
>
                        {RECRUITING_ACTIONS.map(action => {
                          // Calculate star-based cost multiplier
                          let costMultiplier = 1.0; // Default for 3-stars
                          if (recruit.stars === 5) {
                            costMultiplier = 3.0; // 5-stars cost 3x
                          } else if (recruit.stars === 4) {
                            costMultiplier = 2.0; // 4-stars cost 2x
                          } else if (recruit.stars === 2) {
                            costMultiplier = 0.5; // 2-stars cost 0.5x
                          }

                          const adjustedCost = Math.round(action.cost * costMultiplier);

                          // Check if action was already used THIS WEEK (resets each week)
                          const usedThisWeek = (recruit.actionsUsedThisWeek || []).includes(action.id);

                          // Official visit is PERMANENTLY disabled after use
                          const officialVisitPermanentlyUsed = action.id === 'officialVisit' && recruit.officialVisitUsed;

                          // Monthly limit actions (School Visit, Campus Visit) - limited to ONCE PER MONTH
                          // Calculate recruiting month based on offSeasonWeek (resets every 4 weeks: weeks 5, 9, 13)
                          const recruitingMonth = offSeasonWeek ? Math.floor((offSeasonWeek - 1) / 4) + 1 : 0;
                          const monthlyLimitUsed = action.monthlyLimit &&
                            recruit.monthlyActionsUsed &&
                            recruit.monthlyActionsUsed[action.id] &&
                            recruit.monthlyActionsUsed[action.id].recruitingMonth === recruitingMonth &&
                            recruit.monthlyActionsUsed[action.id].year === currentDate.year;

                          // Visits are mutually exclusive WITHIN THE SAME WEEK (resets each week)
                          // If Official Visit used THIS WEEK → Campus Visit disabled THIS WEEK
                          // If Campus Visit used THIS WEEK → Official Visit disabled THIS WEEK
                          const otherVisitUsedThisWeek =
                            (action.id === 'campusVisit' && (recruit.actionsUsedThisWeek || []).includes('officialVisit')) ||
                            (action.id === 'officialVisit' && (recruit.actionsUsedThisWeek || []).includes('campusVisit'));

                          const canAfford = recruitingPoints >= adjustedCost;
                          const meetsRequirement = recruit.interest >= action.minInterest;

                          // Button is disabled if: used this week, other visit used this week, permanently used (official visit only), monthly limit used, can't afford, or doesn't meet requirement
                          const isDisabled = usedThisWeek || otherVisitUsedThisWeek || officialVisitPermanentlyUsed || monthlyLimitUsed || !canAfford || !meetsRequirement;

                          // Calculate adjusted interest gain to show on button (same formula as handleRecruitingAction)
                          let starDifficulty = 1.0;
                          if (recruit.stars === 5) starDifficulty = 0.5;
                          else if (recruit.stars === 4) starDifficulty = 0.7;
                          else if (recruit.stars === 2) starDifficulty = 1.3;

                          let diminishingReturns = 1.0;
                          if (recruit.interest < 30) diminishingReturns = 1.0;
                          else if (recruit.interest < 50) diminishingReturns = 0.8;
                          else if (recruit.interest < 70) diminishingReturns = 0.6;
                          else if (recruit.interest < 85) diminishingReturns = 0.4;
                          else diminishingReturns = 0.2;

                          let tierBonus = 1.0;
                          if (selectedSchool?.tier === 'Blue Blood') tierBonus = 1.2;
                          else if (selectedSchool?.tier === 'Power 4') tierBonus = 1.0;
                          else tierBonus = 0.8;

                          let flipDifficulty = 1.0;
                          if (recruit.verbalCommit && recruit.committedSchool?.id !== selectedSchool?.id) {
                            const committedTier = recruit.committedSchool?.tier;
                            if (committedTier === 'Blue Blood') flipDifficulty = 0.5;
                            else if (committedTier === 'Power 4') flipDifficulty = 0.75;
                            else flipDifficulty = 1.0;
                          }

                          const adjustedInterestGain = Math.round(action.interestGain * starDifficulty * diminishingReturns * tierBonus * flipDifficulty);

                          return (
                            <button
                              key={action.id}
                              onClick={() => {
                                if (!isDisabled) {
                                  // Call with correct parameters: (recruit, actionType, cost, interestGain)
                                  executeRecruitingAction(recruit, action.id, action.cost, action.interestGain);
                                }
                              }}
                              disabled={isDisabled}
                              className={`border-2 p-1 text-xs transition-all ${
                                usedThisWeek || otherVisitUsedThisWeek ? 'bg-gray-600 border-gray-500 opacity-60 cursor-not-allowed' :
                                officialVisitPermanentlyUsed ? 'bg-gray-700 border-gray-600 opacity-50 cursor-not-allowed' :
                                monthlyLimitUsed ? 'bg-gray-600 border-gray-500 opacity-60 cursor-not-allowed' :
                                !canAfford ? 'bg-red-900 border-red-700 opacity-50 cursor-not-allowed' :
                                !meetsRequirement ? 'bg-orange-900 border-orange-700 opacity-50 cursor-not-allowed' :
                                'bg-blue-700 border-blue-500 hover:bg-blue-600'
                              }`}
                              style={{ boxShadow: (usedThisWeek || otherVisitUsedThisWeek || officialVisitPermanentlyUsed || monthlyLimitUsed) ? 'none' : '2px 2px 0px rgba(0,0,0,0.5)' }}
                            >
                              <div className="font-bold" style={{ fontSize: '10px' }}>{action.name}</div>
                              <div className="opacity-75" style={{ fontSize: '8px' }}>
                                {usedThisWeek || otherVisitUsedThisWeek ? '✓ THIS WK' :
                                 officialVisitPermanentlyUsed ? '✓ USED' :
                                 monthlyLimitUsed ? 'Used this month' :
                                 !canAfford ? `${adjustedCost}` :
                                 !meetsRequirement ? (action.id === 'officialVisit' ? '(At 75% Interest)' : `${action.minInterest}%`) :
                                 `${adjustedCost} pts`}
                              </div>
                              {!isDisabled && canAfford && meetsRequirement && (
                                <div className="text-green-400" style={{ fontSize: '9px' }}>+{adjustedInterestGain}%</div>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Make NIL Offer Button - Only appears at 95%+ interest */}
                      {recruit.interest >= 95 && !recruit.nilOfferAccepted && !recruit.verbalCommit && (
                        <div className="mt-2">
                          <button
                            onClick={() => {
                              setNegotiatingRecruit({
                                ...recruit,
                                commitmentInterest: recruit.interest,
                                flipMultiplier: getFlipMultiplier(recruit.interest)
                              });
                              setCounterOffer(Math.round(recruit.marketValue * 0.5));
                              setShowNegotiationModal(true);
                            }}
                            className="w-full bg-green-700 border-2 border-green-500 p-2 text-sm font-bold hover:bg-green-600 transition-all"
                            style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                          >
                            💰 MAKE NIL OFFER
                          </button>
                        </div>
                      )}
                      </>
                    )}

                    {/* Show locked message at 100% interest */}
                    {canRecruit && !recruit.signedCommit && recruit.interest === 100 && (
                      <div className={`mt-2 border-2 px-3 py-2 text-xs text-center ${
                        index % 2 === 0 ? 'bg-green-100 border-green-600 text-green-900' : 'bg-green-900 border-green-600 text-green-200'
                      }`}>
                        <div className="font-bold">🔒 RECRUITING LOCKED AT 100%</div>
                        <div className="text-xs opacity-90 mt-1">
                          Maximum interest reached. {recruit.verbalCommit ? 'Maintain this commitment!' : 'Ready for NIL offer!'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

  const toggleTier = (tier) => {
    setExpandedTier(expandedTier === tier ? null : tier);
  };

  const formatCurrency = (value) => {
    return `$${(value / 1000000).toFixed(2)}M`;
  };

  const formatDate = (date) => {
    return `${MONTHS[date.month]} ${date.day}, ${date.year}`;
  };

  const toggleStarter = (playerId) => {
    // Work with pendingRoster if it exists, otherwise initialize from roster
    const workingRoster = hasUnsavedChanges ? pendingRoster : [...roster];
    
    const updatedRoster = workingRoster.map(p => 
      p.id === playerId ? { ...p, isStarter: !p.isStarter } : p
    );
    
    // Always allow the toggle, just track as pending
    setPendingRoster(updatedRoster);
    setHasUnsavedChanges(true);
  };

  const toggleStarterSpecialTeams = (playerId) => {
    // Work with pendingRoster if it exists, otherwise initialize from roster
    const workingRoster = hasUnsavedChanges ? pendingRoster : [...roster];
    
    const player = workingRoster.find(p => p.id === playerId);
    if (!player) return;
    
    // For special teams, only allow 1 starter per position (K or P)
    const updatedRoster = workingRoster.map(p => {
      // If toggling this player on, turn off all other starters at this position
      if (p.id === playerId) {
        return { ...p, isStarter: !p.isStarter };
      }
      // If same position as the player being toggled, turn them off
      if (p.position === player.position && player.isStarter === false) {
        return { ...p, isStarter: false };
      }
      return p;
    });
    
    setPendingRoster(updatedRoster);
    setHasUnsavedChanges(true);
  };
  
  const saveLineupChanges = () => {
    // Validate the pending roster
    if (!validateStarterCounts(pendingRoster)) {
      alert('Invalid starter configuration. Check position limits:\n• Offense: 1 QB, 5 OL, 1-2 RB, 2-4 WR, 0-2 TE (total 11)\n• Defense: Min 3 DL, Min 3 DB (total 11)');
      return;
    }
    
    // Save changes
    setRoster(pendingRoster);
    setHasUnsavedChanges(false);
    setPendingRoster([]);
  };

  const getCurrentEvent = () => {
    const current = CALENDAR_EVENTS.find(event => {
      // Handle events that cross year boundary (like Playoffs Dec 20 - Jan 20)
      if (event.crossesYear) {
        // If we're in the starting month/year
        if (currentDate.month === event.startMonth && currentDate.day >= event.startDay) {
          return true;
        }
        // If we're in the ending month/year (next year)
        if (currentDate.month === event.endMonth && currentDate.day <= event.endDay) {
          return true;
        }
        // If we're in December after start
        if (currentDate.month === 11 && currentDate.day >= event.startDay) {
          return true;
        }
        return false;
      }
      
      // Regular events within same year
      if (event.startMonth === event.endMonth) {
        // Single month event
        return currentDate.month === event.startMonth && 
               currentDate.day >= event.startDay && 
               currentDate.day <= event.endDay;
      } else {
        // Multi-month event
        if (currentDate.month > event.startMonth && currentDate.month < event.endMonth) {
          return true;
        }
        if (currentDate.month === event.startMonth && currentDate.day >= event.startDay) {
          return true;
        }
        if (currentDate.month === event.endMonth && currentDate.day <= event.endDay) {
          return true;
        }
      }
      return false;
    });
    
    // If in Regular Season, show specific game week
    if (current && current.title === 'Regular Season' && currentGameWeek > 0) {
      return `Regular Season - Week ${currentGameWeek}`;
    }
    
    return current ? current.title : 'Off Season';
  };
  
  const isRecruitingOpen = () => {
    const currentEvent = getCurrentEvent();
    // Check if current event has recruitingOpen flag
    const event = CALENDAR_EVENTS.find(e => {
      const title = e.title;
      return currentEvent === title || currentEvent?.includes(title);
    });
    return event?.recruitingOpen === true;
  };
  
  const isTransferPortalOpen = () => {
    const currentEvent = getCurrentEvent();
    return currentEvent === 'Transfer Portal Open' || 
           currentEvent === 'The Playoffs' || 
           currentEvent === 'Conference Championships';
  };
  
  const isSigningPeriod = () => {
    const currentEvent = CALENDAR_EVENTS.find(event => {
      // Check if we're currently in this event
      if (event.crossesYear) {
        if (currentDate.month === event.startMonth && currentDate.day >= event.startDay) return true;
        if (currentDate.month === event.endMonth && currentDate.day <= event.endDay) return true;
        if (currentDate.month === 11 && currentDate.day >= event.startDay) return true;
        return false;
      }
      
      if (event.startMonth === event.endMonth) {
        return currentDate.month === event.startMonth && 
               currentDate.day >= event.startDay && 
               currentDate.day <= event.endDay;
      } else {
        if (currentDate.month > event.startMonth && currentDate.month < event.endMonth) return true;
        if (currentDate.month === event.startMonth && currentDate.day >= event.startDay) return true;
        if (currentDate.month === event.endMonth && currentDate.day <= event.endDay) return true;
      }
      return false;
    });
    
    return currentEvent?.signingPeriod === true;
  };
  
  const handleSignRecruit = (recruit) => {
    // Move recruit from verbal commit to signed
    setRecruits(recruits.map(r => 
      r.id === recruit.id ? {
        ...r,
        signedCommit: true,
        signedDuring: isSigningPeriod() ? (getCurrentEvent().includes('Early') ? 'early' : 'national') : 'early'
      } : r
    ));
    
    // Add to signed class
    setSignedClass([...signedClass, { ...recruit, signedCommit: true }]);
  };

  const getUpcomingEvents = () => {
    const upcoming = [];
    const currentMonthIndex = currentDate.month;
    const currentDay = currentDate.day;
    const currentYear = currentDate.year;
    
    // Check if we're in Regular Season
    const inRegularSeason = currentMonthIndex >= 8 && currentMonthIndex <= 10;
    
    // If in regular season and not at final week, add next game week
    if (inRegularSeason && currentGameWeek > 0 && currentGameWeek < 12) {
      upcoming.push({
        title: `Week ${currentGameWeek + 1} Game`,
        daysUntil: 7,
        duration: 1,
        dateStr: 'Next Week',
        isGameWeek: true
      });
    }
    
    CALENDAR_EVENTS.forEach(event => {
      // Skip Regular Season event if we're already in it - we'll show individual weeks instead
      if (event.title === 'Regular Season' && inRegularSeason && currentGameWeek > 0) {
        return;
      }
      
      // Calculate if event is upcoming
      let isUpcoming = false;
      let daysUntil = 0;
      
      // Check if event hasn't started yet this year
      if (event.startMonth > currentMonthIndex || 
          (event.startMonth === currentMonthIndex && event.startDay > currentDay)) {
        isUpcoming = true;
        
        // Calculate days until event
        if (event.startMonth === currentMonthIndex) {
          daysUntil = event.startDay - currentDay;
        } else {
          daysUntil = (DAYS_IN_MONTH[currentMonthIndex] - currentDay) + event.startDay;
          for (let m = currentMonthIndex + 1; m < event.startMonth; m++) {
            daysUntil += DAYS_IN_MONTH[m];
          }
        }
      }
      // Check for events in next year (for events we've passed this year)
      else if (event.startMonth < currentMonthIndex || 
               (event.startMonth === currentMonthIndex && event.startDay <= currentDay)) {
        isUpcoming = true;
        
        // Days remaining in current year
        daysUntil = DAYS_IN_MONTH[currentMonthIndex] - currentDay;
        for (let m = currentMonthIndex + 1; m < 12; m++) {
          daysUntil += DAYS_IN_MONTH[m];
        }
        
        // Days into next year until event
        for (let m = 0; m < event.startMonth; m++) {
          daysUntil += DAYS_IN_MONTH[m];
        }
        daysUntil += event.startDay;
      }
      
      if (isUpcoming) {
        // Calculate duration
        let duration = 1;
        if (event.startMonth === event.endMonth) {
          duration = event.endDay - event.startDay + 1;
        } else {
          duration = (DAYS_IN_MONTH[event.startMonth] - event.startDay + 1);
          for (let m = event.startMonth + 1; m < event.endMonth; m++) {
            duration += DAYS_IN_MONTH[m];
          }
          duration += event.endDay;
        }
        
        // Determine if event is next year
        const isNextYear = event.startMonth < currentMonthIndex || 
                          (event.startMonth === currentMonthIndex && event.startDay <= currentDay);
        
        upcoming.push({
          ...event,
          daysUntil,
          duration,
          dateStr: `${MONTHS[event.startMonth]} ${event.startDay}${isNextYear ? ` ${currentYear + 1}` : ''}`,
          isGameWeek: false,
          year: isNextYear ? currentYear + 1 : currentYear
        });
      }
    });
    
    return upcoming.sort((a, b) => a.daysUntil - b.daysUntil).slice(0, 5);
  };

  // Process Transfer Portal - Called after Conference Championships
  const processTransferPortal = () => {
    const transferPortalPlayers = [];
    const retainedPlayers = [];
    const playersNeedingDecisions = []; // Seniors asking to return
    
    roster.forEach(player => {
      const year = player.year;
      const rating = player.rating;
      const satisfaction = player.satisfaction;
      const isStarter = player.isStarter;
      const currentNIL = player.currentNIL;
      const marketValue = player.marketValue || calculatePlayerMarketValue(player);
      const satisfactionScore = satisfaction === 'High' ? 75 : satisfaction === 'Medium' ? 50 : 25;
      
      // FIFTH YEAR - Never enter portal
      if (year === '5Y') {
        retainedPlayers.push(player);
        return;
      }
      
      // SENIORS
      if (year === 'SR') {
        if (rating >= 75) {
          // Leave for professional football
          console.log(`${player.name} (${rating} OVR) is leaving for professional football`);
          // Remove from roster - don't add to retained or portal
          return;
        } else if (rating >= 70 && rating <= 75) {
          // Ask user if they want player to return OR enter portal
          playersNeedingDecisions.push({
            player,
            decision: 'senior_return',
            message: `${player.name} (${rating} OVR ${player.position}) is considering returning for a 5th year or entering the transfer portal. Do you want to offer him a spot?`
          });
          return;
        } else {
          // Under 70 rating - retires from sport
          console.log(`${player.name} (${rating} OVR) is retiring from football`);
          return;
        }
      }
      
      // JUNIORS
      if (year === 'JR') {
        // NFL Early Departure - 93+ rating
        if (rating >= 93) {
          // High-rated junior considering NFL draft
          playersNeedingDecisions.push({
            player,
            decision: 'junior_nfl_departure',
            nilIncrease: Math.round(marketValue * 3), // 3x market value to stay
            message: `${player.name} (${rating} OVR ${player.position}, JR) is considering declaring for the NFL Draft. To convince him to return for senior year, you'll need to offer ${formatCurrency(Math.round(marketValue * 3))} (3x market value).`
          });
          return;
        }
        
        if (rating >= 70 && rating <= 79 && !isStarter) {
          // 50% chance to enter portal
          if (Math.random() < 0.5) {
            transferPortalPlayers.push({
              ...player,
              isTransfer: true,
              previousSchool: selectedSchool.name,
              interest: 0
            });
            console.log(`${player.name} (JR, ${rating} OVR, non-starter) entering portal`);
          } else {
            retainedPlayers.push(player);
          }
        } else {
          retainedPlayers.push(player);
        }
        return;
      }
      
      // SOPHOMORES
      if (year === 'SO') {
        if (isStarter) {
          // Check if NIL is more than 25% under value
          const nilDeficit = (marketValue - currentNIL) / marketValue;
          if (nilDeficit > 0.25) {
            // User should have chance to pay and retain
            playersNeedingDecisions.push({
              player,
              decision: 'sophomore_nil_increase',
              nilIncrease: Math.round(marketValue - currentNIL),
              message: `${player.name} (${rating} OVR ${player.position}, STARTER) is unhappy with NIL. Currently: ${formatCurrency(currentNIL)}, Market Value: ${formatCurrency(marketValue)}. Increase to retain?`
            });
          } else {
            retainedPlayers.push(player);
          }
        } else {
          // Not a starter - check satisfaction
          if (satisfactionScore < 40) {
            transferPortalPlayers.push({
              ...player,
              isTransfer: true,
              previousSchool: selectedSchool.name,
              interest: 0
            });
            console.log(`${player.name} (SO, non-starter, low satisfaction) entering portal`);
          } else {
            retainedPlayers.push(player);
          }
        }
        return;
      }
      
      // FRESHMEN
      if (year === 'FR') {
        // Blue Blood or P4 starters never transfer
        if (isStarter && (selectedSchool.tier === 'Blue Blood' || selectedSchool.tier === 'Power 4')) {
          retainedPlayers.push(player);
          return;
        }
        
        if (satisfactionScore < 30) {
          transferPortalPlayers.push({
            ...player,
            isTransfer: true,
            previousSchool: selectedSchool.name,
            interest: 0
          });
          console.log(`${player.name} (FR, very low satisfaction) entering portal`);
        } else if (satisfactionScore >= 31 && satisfactionScore <= 59) {
          // Ask for NIL increase
          playersNeedingDecisions.push({
            player,
            decision: 'freshman_nil_request',
            nilIncrease: Math.round(marketValue * 0.3), // Ask for 30% increase
            message: `${player.name} (${rating} OVR ${player.position}, FR) is unhappy and requesting a ${formatCurrency(Math.round(marketValue * 0.3))} NIL increase. Satisfaction: ${satisfaction}`
          });
        } else {
          retainedPlayers.push(player);
        }
        return;
      }
    });
    
    // If there are decisions needed, show them to user
    if (playersNeedingDecisions.length > 0) {
      // Store these for user to process
      setTransferDecisionsPending(playersNeedingDecisions);
      setShowTransferDecisionsModal(true);
    }
    
    // Update roster - remove players who left/transferred
    setRoster(retainedPlayers);
    
    // Add transfer portal players to recruits array
    if (transferPortalPlayers.length > 0) {
      setRecruits(prev => [...prev, ...transferPortalPlayers]);
      console.log(`${transferPortalPlayers.length} players entered the transfer portal`);
    }
    
    return {
      transferCount: transferPortalPlayers.length,
      retainedCount: retainedPlayers.length,
      decisionsNeeded: playersNeedingDecisions.length
    };
  };

  // Helper function to calculate player market value
  const calculatePlayerMarketValue = (player) => {
    const baseValues = {
      5: 700000,
      4: 350000,
      3: 150000,
      2: 50000
    };
    
    let value = baseValues[player.stars] || 50000;
    
    // Position multipliers
    if (player.position === 'QB' || player.position === 'EDGE') {
      value *= 1.3;
    } else if (player.position === 'OT' || player.position === 'CB') {
      value *= 1.2;
    }
    
    // Starter bonus
    if (player.isStarter) {
      value *= 1.5;
    }
    
    return Math.round(value);
  };

  // Process signing day decisions for recruits with multiple schools >85%
  const processSigningDayDecisions = () => {
    const decisionsToMake = recruits.filter(r =>
      r.signingDayDecision &&
      !r.verbalCommit &&
      r.recruitingSchools &&
      r.recruitingSchools.length > 0
    );

    if (decisionsToMake.length === 0) return [];

    const allSchools = [...SCHOOLS.blueBloods, ...SCHOOLS.power4, ...SCHOOLS.group5];
    const decisions = [];

    decisionsToMake.forEach(recruit => {
      // Get all schools with >85% interest
      const competingSchools = recruit.recruitingSchools.filter(rs => rs.interest > 85);

      if (competingSchools.length === 0) {
        // No competing schools, clear signing day flag
        setRecruits(prev => prev.map(r =>
          r.id === recruit.id ? { ...r, signingDayDecision: false } : r
        ));
        return;
      }

      // Calculate score for each competing school
      const schoolScores = competingSchools.map(rs => {
        const school = allSchools.find(s => s.id === rs.schoolId);

        // Interest component (50%)
        const interestScore = (rs.interest / 100) * 50;

        // NIL component (30%)
        // Estimate NIL offer based on school tier and recruit stars
        let estimatedNIL = recruit.marketValue;
        if (rs.schoolId === selectedSchool?.id && recruit.acceptedNILAmount) {
          // User's school - use actual accepted offer
          estimatedNIL = recruit.acceptedNILAmount;
        } else {
          // AI school - estimate based on tier
          const tierMultiplier = school?.tier === 'Blue Blood' ? 1.2 :
                                 school?.tier === 'Power 4' ? 1.0 : 0.8;
          estimatedNIL = recruit.marketValue * tierMultiplier;
        }
        const nilScore = (estimatedNIL / recruit.askingPrice) * 30;

        // Dream school bonus (15%)
        const isDreamSchool = recruit.dreamSchools?.some(ds => ds.id === rs.schoolId) || false;
        const dreamScore = isDreamSchool ? 15 : 0;

        // Random factor (5%)
        const randomScore = Math.random() * 5;

        const totalScore = interestScore + Math.min(30, nilScore) + dreamScore + randomScore;

        return {
          schoolId: rs.schoolId,
          schoolName: rs.schoolName || school?.name || 'Unknown',
          school: school,
          totalScore: totalScore,
          interest: rs.interest,
          estimatedNIL: estimatedNIL
        };
      });

      // Sort by score and pick winner
      schoolScores.sort((a, b) => b.totalScore - a.totalScore);
      const winner = schoolScores[0];

      // Commit recruit to winning school
      const isUserSchool = winner.schoolId === selectedSchool?.id;

      // CRITICAL: Only commit if we have a valid school object
      if (!winner.school) {
        console.error('Signing day error: No school object for winner', winner);
        return; // Skip this recruit if we don't have valid school data
      }

      setRecruits(prev => prev.map(r =>
        r.id === recruit.id ? {
          ...r,
          verbalCommit: true,
          signedCommit: true, // Signing day commits are automatically signed
          committedSchool: winner.school,
          nilDeal: winner.estimatedNIL,
          signingDayDecision: false,
          commitmentInterest: winner.interest,
          flipMultiplier: 0.2, // Signing day commits are very loyal
          isTargeted: isUserSchool ? true : r.isTargeted // Only set isTargeted if user won
        } : r
      ));

      decisions.push({
        recruit: recruit,
        winner: winner,
        isUserSchool: isUserSchool,
        competingSchools: schoolScores
      });
    });

    return decisions;
  };

  const advanceDay = (days = 1) => {
    let newDate = { ...currentDate };
    newDate.day += days;

    while (newDate.day > DAYS_IN_MONTH[newDate.month]) {
      newDate.day -= DAYS_IN_MONTH[newDate.month];
      newDate.month++;

      if (newDate.month > 11) {
        newDate.month = 0;
        newDate.year++;
      }
    }

    setCurrentDate(newDate);
  };

  // Process Early Signing Period
  const processESP = () => {
    console.log('🖊️ Processing Early Signing Period...');

    const userCommits = recruits.filter(r =>
      r.verbalCommit &&
      r.committedSchool?.id === selectedSchool?.id &&
      !r.signedCommit
    );

    const signed = [];
    const unsigned = [];
    const signingDayDecisions = [];

    userCommits.forEach(recruit => {
      // Signing Day Decision recruits NEVER sign early
      if (recruit.signingDayDecision) {
        signingDayDecisions.push(recruit);
        return;
      }

      // Calculate signing probability based on star rating
      let signingChance = 0;
      if (recruit.stars === 5) signingChance = 0.95; // 95%
      else if (recruit.stars === 4) signingChance = 0.80; // 80%
      else if (recruit.stars === 3) signingChance = 0.65; // 65%
      else signingChance = 0.20; // 2-stars = 20%

      // 100% in-state = auto-sign
      const isInState = recruit.state === selectedSchool?.state;
      if (recruit.interest >= 100 && isInState) {
        signingChance = 1.0;
      }

      // Roll for signing
      if (Math.random() < signingChance) {
        signed.push(recruit);
      } else {
        unsigned.push(recruit);
      }
    });

    // Store results
    setESPResults({ signed, unsigned, signingDay: signingDayDecisions });

    // Process AI school signings (same logic)
    const allSchools = [...SCHOOLS.blueBloods, ...SCHOOLS.power4, ...SCHOOLS.group5];
    const aiSigningResults = {};

    allSchools.forEach(school => {
      if (school.id === selectedSchool?.id) return; // Skip user school

      const schoolCommits = recruits.filter(r =>
        r.verbalCommit &&
        r.committedSchool?.id === school.id &&
        !r.signedCommit &&
        !r.signingDayDecision
      );

      const schoolSigned = schoolCommits.filter(recruit => {
        let signingChance = 0;
        if (recruit.stars === 5) signingChance = 0.95;
        else if (recruit.stars === 4) signingChance = 0.80;
        else if (recruit.stars === 3) signingChance = 0.65;
        else signingChance = 0.20;

        return Math.random() < signingChance;
      });

      aiSigningResults[school.id] = {
        signed: schoolSigned,
        total: schoolCommits.length
      };
    });

    // Calculate conference-wide results for display
    const conferenceResults = {};
    allSchools.forEach(school => {
      if (!conferenceResults[school.conference]) {
        conferenceResults[school.conference] = [];
      }

      const schoolSignedCount = school.id === selectedSchool?.id
        ? signed.length
        : (aiSigningResults[school.id]?.signed.length || 0);

      const signedRecruits = school.id === selectedSchool?.id
        ? signed
        : (aiSigningResults[school.id]?.signed || []);

      conferenceResults[school.conference].push({
        school: school,
        signedCount: schoolSignedCount,
        fiveStars: signedRecruits.filter(r => r.stars === 5).length,
        fourStars: signedRecruits.filter(r => r.stars === 4).length,
        threeStars: signedRecruits.filter(r => r.stars === 3).length,
        twoStars: signedRecruits.filter(r => r.stars === 2).length,
        nilSpent: signedRecruits.reduce((sum, r) => sum + (r.nilDeal || 0), 0)
      });
    });

    setConferenceRecruitingResults(conferenceResults);

    // Mark signed recruits as signed and move to next season roster
    setRecruits(prevRecruits => prevRecruits.map(r => {
      const isUserSigned = signed.find(s => s.id === r.id);
      const isAISigned = Object.values(aiSigningResults).some(result =>
        result.signed.find(s => s.id === r.id)
      );

      if (isUserSigned || isAISigned) {
        return { ...r, signedCommit: true };
      }
      return r;
    }));

    // Show ESP modal
    setShowESPModal(true);
  };

  // Process National Signing Day
  const processNSD = () => {
    console.log('🎓 Processing National Signing Day...');

    // Get all unsigned commits and signing day decisions
    const unsignedCommits = recruits.filter(r =>
      r.verbalCommit &&
      r.committedSchool?.id === selectedSchool?.id &&
      !r.signedCommit &&
      !r.signingDayDecision
    );

    const signingDayDecisions = recruits.filter(r =>
      r.signingDayDecision &&
      r.recruitingSchools?.some(rs => rs.schoolId === selectedSchool?.id && rs.interest > 85)
    );

    const nsdDecisions = [];

    // Process unsigned commits - determine why they didn't sign
    unsignedCommits.forEach(recruit => {
      let signed = true;
      let reason = '';
      let destination = selectedSchool;

      // Check various failure conditions
      if (recruit.interest < 80) {
        signed = false;
        reason = 'Lost interest over time';
        const highestInterest = Math.max(...(recruit.recruitingSchools || []).map(rs => rs.interest));
        const topSchool = recruit.recruitingSchools?.find(rs => rs.interest === highestInterest);
        destination = topSchool ? { id: topSchool.schoolId, name: topSchool.schoolName } : null;
      } else {
        // Determine if they sign with you (high probability for unsigned at this point)
        signed = Math.random() < 0.85; // 85% sign with you
        if (!signed) {
          reason = 'Last-minute cold feet - signed with dream school';
          destination = recruit.dreamSchools?.[0] || recruit.recruitingSchools?.[0];
        }
      }

      nsdDecisions.push({
        recruit,
        signed,
        reason,
        destination
      });
    });

    // Process signing day decisions using weighted algorithm
    signingDayDecisions.forEach(recruit => {
      const competingSchools = recruit.recruitingSchools.filter(rs => rs.interest > 85);

      const schoolScores = competingSchools.map(rs => {
        // Interest component (50%)
        const interestScore = (rs.interest / 100) * 50;

        // NIL component (30%)
        let estimatedNIL = recruit.marketValue;
        if (rs.schoolId === selectedSchool?.id && recruit.acceptedNILAmount) {
          estimatedNIL = recruit.acceptedNILAmount;
        }
        const nilScore = Math.min(30, (estimatedNIL / recruit.askingPrice) * 30);

        // Dream school bonus (15%)
        const isDreamSchool = recruit.dreamSchools?.some(ds => ds.id === rs.schoolId);
        const dreamScore = isDreamSchool ? 15 : 0;

        // Random factor (5%)
        const randomScore = Math.random() * 5;

        const totalScore = interestScore + nilScore + dreamScore + randomScore;

        return {
          schoolId: rs.schoolId,
          schoolName: rs.schoolName,
          totalScore,
          interest: rs.interest
        };
      });

      // Sort by score and pick winner
      schoolScores.sort((a, b) => b.totalScore - a.totalScore);
      const winner = schoolScores[0];

      nsdDecisions.push({
        recruit,
        signed: winner.schoolId === selectedSchool?.id,
        destination: { id: winner.schoolId, name: winner.schoolName },
        competingSchools: schoolScores
      });
    });

    setNSDResults(nsdDecisions);
    setNSDRevealing(true);
    setNSDCurrentRevealIndex(0);
    setShowNSDModal(true);
  };

  // Generate Week 1 Neutral Site Games (3 Blue Blood matchups)
  const generateWeek1NeutralSites = () => {
    const neutralSiteNames = [
      "Blue Blood Battle",
      "Blast Cola Kick-Off Classic",
      "Victory Sports Showdown"
    ];

    // Get all Blue Bloods shuffled
    const allBlueBloods = [...SCHOOLS.blueBloods].sort(() => Math.random() - 0.5);

    const matchups = [];
    const used = new Set();

    // Try to create 3 matchups (6 Blue Bloods)
    for (let i = 0; i < 3 && allBlueBloods.length >= 2; i++) {
      let team1 = null;
      let team2 = null;

      // Find first available team
      for (let j = 0; j < allBlueBloods.length; j++) {
        if (!used.has(allBlueBloods[j].id)) {
          team1 = allBlueBloods[j];
          used.add(team1.id);
          break;
        }
      }

      if (!team1) break;

      // Find second team from different conference
      for (let j = 0; j < allBlueBloods.length; j++) {
        const candidate = allBlueBloods[j];
        if (!used.has(candidate.id) && candidate.conference !== team1.conference) {
          team2 = candidate;
          used.add(team2.id);
          break;
        }
      }

      // If we found a valid pair, add matchup
      if (team1 && team2) {
        matchups.push({
          team1: team1,
          team2: team2,
          venue: neutralSiteNames[i],
          isNeutralSite: true
        });
      }
    }

    return matchups;
  };

  // Generate Season Schedule
  const generateSeasonSchedule = (schoolToUse = null) => {
    const school = schoolToUse || selectedSchool;
    if (!school) return [];

    const allSchools = [...SCHOOLS.blueBloods, ...SCHOOLS.power4, ...SCHOOLS.group5];
    const conferenceTeams = allSchools.filter(s =>
      s.conference === school.conference && s.id !== school.id
    );
    const nonConferenceTeams = allSchools.filter(s =>
      s.conference !== school.conference && s.id !== school.id
    );

    // Get all rivals for this school from RIVALRIES constant
    const schoolRivals = RIVALRIES[school.id] || [];
    const isRivalSchool = (opponentId) => schoolRivals.includes(opponentId);
    const rivalSchools = allSchools.filter(s => schoolRivals.includes(s.id));

    const schedule = [];

    // Check if user is in a Week 1 neutral site game
    const neutralSiteGames = generateWeek1NeutralSites();
    let userNeutralSiteGame = null;

    for (const matchup of neutralSiteGames) {
      if (matchup.team1.id === school.id) {
        userNeutralSiteGame = {
          week: 1,
          opponent: matchup.team2,
          isHome: false,
          isNeutralSite: true,
          neutralSiteVenue: matchup.venue,
          isRivalry: false,
          isConference: false
        };
        break;
      } else if (matchup.team2.id === school.id) {
        userNeutralSiteGame = {
          week: 1,
          opponent: matchup.team1,
          isHome: false,
          isNeutralSite: true,
          neutralSiteVenue: matchup.venue,
          isRivalry: false,
          isConference: false
        };
        break;
      }
    }

    if (userNeutralSiteGame) {
      schedule.push(userNeutralSiteGame);
    }

    // Conference games - aim for 9 if possible, or all teams if smaller conference
    const numConferenceGames = Math.min(9, conferenceTeams.length);
    const shuffledConferenceTeams = [...conferenceTeams].sort(() => Math.random() - 0.5);

    // Ensure ALL conference rivals are included in schedule
    const conferenceRivals = rivalSchools.filter(r => r.conference === school.conference);
    conferenceRivals.forEach(rival => {
      const rivalInList = shuffledConferenceTeams.find(t => t.id === rival.id);
      if (!rivalInList && shuffledConferenceTeams.length > 0) {
        // Replace a random non-rival team with this rival
        const nonRivalIndex = shuffledConferenceTeams.findIndex(t => !isRivalSchool(t.id));
        if (nonRivalIndex !== -1) {
          shuffledConferenceTeams[nonRivalIndex] = rival;
        }
      }
    });

    for (let i = 0; i < numConferenceGames; i++) {
      const opponent = shuffledConferenceTeams[i];
      schedule.push({
        week: schedule.length + 1,
        opponent: opponent,
        isHome: Math.random() > 0.5,
        isRivalry: isRivalSchool(opponent.id),
        isConference: true,
        isNeutralSite: false
      });
    }

    // Non-conference games - tiered by difficulty
    const numNonConfGames = 12 - schedule.length; // Remaining slots

    if (numNonConfGames > 0) {
      const g5Teams = nonConferenceTeams.filter(t => t.tier === 'Group of 5').sort(() => Math.random() - 0.5);
      const p4Teams = nonConferenceTeams.filter(t => t.tier === 'Power 4').sort(() => Math.random() - 0.5);
      const blueBloods = nonConferenceTeams.filter(t => t.tier === 'Blue Blood').sort(() => Math.random() - 0.5);

      const nonConfSchedule = [];

      if (school.tier === 'Blue Blood') {
        // Blue Blood: 2 easy (G5), 1 medium (P4) - unless already in neutral site
        const needed = Math.min(numNonConfGames, userNeutralSiteGame ? 2 : 3);

        for (let i = 0; i < Math.min(2, needed) && g5Teams.length > 0; i++) {
          nonConfSchedule.push({
            opponent: g5Teams[i],
            isHome: true, // Blue Bloods play G5 at home
            isRivalry: false,
            isConference: false,
            isNeutralSite: false
          });
        }

        if (needed > 2 && p4Teams.length > 0) {
          nonConfSchedule.push({
            opponent: p4Teams[0],
            isHome: Math.random() > 0.3, // 70% home
            isRivalry: false,
            isConference: false,
            isNeutralSite: false
          });
        }
      } else if (school.tier === 'Power 4') {
        // Power 4: 1 easy, 1 medium, 1 hard
        if (g5Teams.length > 0) {
          nonConfSchedule.push({
            opponent: g5Teams[0],
            isHome: Math.random() > 0.3, // 70% home
            isRivalry: false,
            isConference: false,
            isNeutralSite: false
          });
        }

        if (p4Teams.length > 0 && numNonConfGames > 1) {
          nonConfSchedule.push({
            opponent: p4Teams[0],
            isHome: Math.random() > 0.5, // 50/50
            isRivalry: false,
            isConference: false,
            isNeutralSite: false
          });
        }

        if (blueBloods.length > 0 && numNonConfGames > 2) {
          nonConfSchedule.push({
            opponent: blueBloods[0],
            isHome: false, // Power 4 goes to Blue Blood
            isRivalry: false,
            isConference: false,
            isNeutralSite: false
          });
        }
      } else {
        // Group of 5: mix of tiers
        const available = [...g5Teams, ...p4Teams, ...blueBloods];
        for (let i = 0; i < Math.min(numNonConfGames, available.length); i++) {
          nonConfSchedule.push({
            opponent: available[i],
            isHome: Math.random() > 0.5,
            isRivalry: false,
            isConference: false,
            isNeutralSite: false
          });
        }
      }

      // Add non-conf games to schedule with week numbers
      nonConfSchedule.forEach(game => {
        schedule.push({
          week: schedule.length + 1,
          ...game
        });
      });
    }

    // Add any non-conference rivals to schedule
    const nonConfRivals = rivalSchools.filter(r => r.conference !== school.conference);
    nonConfRivals.forEach(rival => {
      if (schedule.length >= 12) return;
      // Check if rival not already scheduled
      const rivalAlreadyScheduled = schedule.find(g => g.opponent.id === rival.id);
      if (!rivalAlreadyScheduled) {
        schedule.push({
          week: schedule.length + 1,
          opponent: rival,
          isHome: Math.random() > 0.5,
          isRivalry: true,
          isConference: false,
          isNeutralSite: false
        });
      }
    });

    // Separate Week 1 neutral site game from rest of schedule
    const week1Game = schedule.find(g => g.isNeutralSite && g.week === 1);
    const remainingGames = schedule.filter(g => !(g.isNeutralSite && g.week === 1));

    // Shuffle remaining games
    const shuffled = remainingGames.sort(() => Math.random() - 0.5);

    // If Week 1 neutral site exists, it stays at Week 1
    const finalSchedule = week1Game ? [week1Game] : [];

    // Add remaining games
    shuffled.forEach(game => {
      finalSchedule.push(game);
    });

    // Re-number all weeks sequentially
    finalSchedule.forEach((game, index) => {
      game.week = index + 1;
    });

    // Balance home/away (aim for 6 home, 6 away) - excluding neutral site
    const neutralSiteCount = finalSchedule.filter(g => g.isNeutralSite).length;
    const adjustableGames = finalSchedule.filter(g => !g.isNeutralSite);
    let homeGames = adjustableGames.filter(g => g.isHome).length;
    let awayGames = adjustableGames.filter(g => !g.isHome).length;
    const target = Math.floor((12 - neutralSiteCount) / 2);

    // Adjust if imbalanced
    if (homeGames > target + 1) {
      const excessHome = adjustableGames.filter(g => g.isHome).slice(0, homeGames - target);
      excessHome.forEach(g => g.isHome = false);
    } else if (awayGames > target + 1) {
      const excessAway = adjustableGames.filter(g => !g.isHome).slice(0, awayGames - target);
      excessAway.forEach(g => g.isHome = true);
    }

    return finalSchedule;
  };

  // Calculate Team Rating (for user's team or AI team)
  const calculateTeamRating = (teamRoster) => {
    if (!teamRoster || teamRoster.length === 0) return 70; // Default rating

    const starters = teamRoster.filter(p => p.isStarter);
    if (starters.length === 0) return 70;

    // Helper to get average rating for position group
    const getPositionAvg = (positions) => {
      const players = starters.filter(p => positions.includes(p.position));
      if (players.length === 0) return 70;
      return players.reduce((sum, p) => sum + p.overall, 0) / players.length;
    };

    // OFFENSIVE RATING
    const qbRating = getPositionAvg(['QB']) * 0.20; // 20%
    const rbRating = getPositionAvg(['RB']) * 0.10; // 10%
    const wrRating = getPositionAvg(['WR']) * 0.15; // 15%
    const teRating = getPositionAvg(['TE']) * 0.05; // 5%
    const olRating = getPositionAvg(['OL']) * 0.20; // 20%
    const offensiveRating = qbRating + rbRating + wrRating + teRating + olRating;

    // DEFENSIVE RATING
    const dlRating = getPositionAvg(['EDGE', 'DT']) * 0.20; // 20%
    const lbRating = getPositionAvg(['LB']) * 0.15; // 15%
    const secondaryRating = getPositionAvg(['CB', 'S']) * 0.25; // 25%
    const defensiveRating = dlRating + lbRating + secondaryRating;

    // SPECIAL TEAMS RATING
    const kRating = getPositionAvg(['K']) * 0.05; // 5%
    const pRating = getPositionAvg(['P']) * 0.03; // 3%
    // Return specialist = best overall RB or WR (simplified)
    const returnRating = Math.max(getPositionAvg(['RB']), getPositionAvg(['WR'])) * 0.02; // 2%
    const specialTeamsRating = kRating + pRating + returnRating;

    // FINAL TEAM RATING (Offense 40%, Defense 50%, Special Teams 10%)
    const finalRating = (offensiveRating * 0.40) + (defensiveRating * 0.50) + (specialTeamsRating * 0.10);

    return Math.round(finalRating);
  };

  // Calculate specific unit ratings for game plan analysis
  const calculateUnitRatings = (teamRoster) => {
    if (!teamRoster || teamRoster.length === 0) {
      return {
        passing: 70,
        rushing: 70,
        passDefense: 70,
        runDefense: 70,
        overall: 70
      };
    }

    const starters = teamRoster.filter(p => p.isStarter);
    const getPositionAvg = (positions) => {
      const players = starters.filter(p => positions.includes(p.position));
      if (players.length === 0) return 70;
      return players.reduce((sum, p) => sum + p.overall, 0) / players.length;
    };

    // Passing game: QB + WR + TE
    const passing = Math.round((getPositionAvg(['QB']) * 0.5 + getPositionAvg(['WR']) * 0.35 + getPositionAvg(['TE']) * 0.15));

    // Rushing game: RB + OL
    const rushing = Math.round((getPositionAvg(['RB']) * 0.4 + getPositionAvg(['OL']) * 0.6));

    // Pass defense: Secondary + EDGE (pass rush)
    const passDefense = Math.round((getPositionAvg(['CB', 'S']) * 0.7 + getPositionAvg(['EDGE']) * 0.3));

    // Run defense: DL + LB
    const runDefense = Math.round((getPositionAvg(['EDGE', 'DT']) * 0.5 + getPositionAvg(['LB']) * 0.5));

    const overall = calculateTeamRating(teamRoster);

    return {
      passing,
      rushing,
      passDefense,
      runDefense,
      overall
    };
  };

  const advanceWeek = () => {
    // Check if we're entering Early Signing Period
    const currentEvent = getCurrentEvent();

    advanceDay(7);

    // Check if we just entered ESP
    const newEvent = getCurrentEvent();
    if (newEvent === 'Early Signing Period' && currentEvent !== 'Early Signing Period') {
      // Process ESP
      setTimeout(() => processESP(), 500);
      return;
    }

    // Check if we just entered NSD
    if (newEvent === 'National Signing Day' && currentEvent !== 'National Signing Day') {
      // Process NSD
      setTimeout(() => processNSD(), 500);
      return;
    }

    // Only reset recruiting actions and restore points during recruiting open periods
    if (isRecruitingOpen()) {
      setRecruits(recruits.map(r => ({
        ...r,
        actionsUsedThisWeek: []
      })));
      
      // Simulate AI school recruiting activity
      const allSchools = [...SCHOOLS.blueBloods, ...SCHOOLS.power4, ...SCHOOLS.group5];
      const updatedRecruits = simulateAIRecruiting(recruits, allSchools, selectedSchool?.id, aiRosters);
      setRecruits(updatedRecruits);

      // Check if we're in a reduced points period (Regular Season)
      const currentEvent = CALENDAR_EVENTS.find(e => {
        const eventTitle = getCurrentEvent();
        return eventTitle === e.title || eventTitle?.includes(e.title);
      });
      const isReducedPoints = currentEvent?.reducedPoints === true;
      
      // Restore recruiting points based on school tier
      let weeklyRecruitingPoints = 200; // Group of 5 default
      if (selectedSchool?.tier === 'Blue Blood') {
        weeklyRecruitingPoints = 600;
      } else if (selectedSchool?.tier === 'Power 4') {
        weeklyRecruitingPoints = 400;
      }
      
      // Cut points in half during Regular Season
      if (isReducedPoints) {
        weeklyRecruitingPoints = Math.floor(weeklyRecruitingPoints / 2);
        console.log('Week advanced - Regular Season - HALF recruiting points restored:', weeklyRecruitingPoints);
      } else {
        console.log('Week advanced - Recruiting OPEN - Full points restored:', weeklyRecruitingPoints);
      }
      
      setRecruitingPoints(weeklyRecruitingPoints);
    } else {
      console.log('Week advanced - Recruiting CLOSED - No points restored');
    }
  };
  
  // Advance recruiting week during The Off-Season
  const advanceRecruitingWeek = () => {
    if (offSeasonWeek === null) return;
    
    // Special case: Week 16 completion
    if (offSeasonWeek === 16) {
      console.log('Off-Season complete! Returning to dashboard...');
      console.log('Setting offSeasonWeek to null...');

      // Set date to June 30 (end of Off-Season period)
      setCurrentDate({ year: currentDate.year, month: 5, day: 30 }); // Month 5 = June (0-indexed)

      // Mark uncommitted recruits with 100% interest as "Signing Day Decision"
      setRecruits(prevRecruits => prevRecruits.map(recruit => {
        // Skip if already committed
        if (recruit.verbalCommit) return recruit;

        // Check if any school has 100% interest (using recruitingSchools, not schoolInterests)
        const hasMaxInterest = recruit.recruitingSchools?.some(school => school.interest >= 100);

        // Mark as signing day decision if they have max interest but haven't committed
        if (hasMaxInterest) {
          return { ...recruit, signingDayDecision: true };
        }

        return recruit;
      }));

      // Clear off-season state
      setOffSeasonWeek(null);
      setOffSeasonWeeksCompleted(16);

      // Return to dashboard
      setActiveTab('dashboard');

      // Show completion message after state updates
      setTimeout(() => {
        alert('🎓 Off-Season Complete. Let\'s Get Ready for the Season!\n\n' +
              'Click "SIM TO NEXT EVENT" to continue.');
      }, 100);
      return;
    }
    
    // Don't allow advancing past week 16
    if (offSeasonWeek > 16) return;
    
    // Advance calendar by 7 days
    advanceDay(7);
    
    // Increment off-season week
    setOffSeasonWeek(offSeasonWeek + 1);
    setOffSeasonWeeksCompleted(offSeasonWeek);
    
    // Reset recruiting actions
    const recruitsBeforeAI = recruits.map(r => ({
      ...r,
      actionsUsedThisWeek: []
    }));

    // Simulate AI school recruiting activity
    const allSchools = [...SCHOOLS.blueBloods, ...SCHOOLS.power4, ...SCHOOLS.group5];
    const updatedRecruits = simulateAIRecruiting(recruitsBeforeAI, allSchools, selectedSchool?.id, aiRosters);

    // Find NEW AI commits this week
    const newAICommits = updatedRecruits.filter(recruit => {
      const wasCommitted = recruitsBeforeAI.find(r => r.id === recruit.id)?.verbalCommit;
      const isNowCommitted = recruit.verbalCommit && recruit.committedSchool?.id !== selectedSchool?.id;
      return !wasCommitted && isNowCommitted;
    });

    // Show weekly recruiting report if there are new AI commits
    if (newAICommits.length > 0) {
      setWeeklyAICommits(newAICommits);
      setTimeout(() => {
        setShowWeeklyRecruitingReport(true);
      }, 100);
    }

    setRecruits(updatedRecruits);

    // Restore full recruiting points
    let weeklyRecruitingPoints = 200; // Group of 5 default
    if (selectedSchool?.tier === 'Blue Blood') {
      weeklyRecruitingPoints = 600;
    } else if (selectedSchool?.tier === 'Power 4') {
      weeklyRecruitingPoints = 400;
    }
    setRecruitingPoints(weeklyRecruitingPoints);
    
    // Player progression during off-season (small rating boosts)
    if (offSeasonWeek === 5) {
      // Spring Game - small boosts for starters
      setRoster(roster.map(p => {
        if (p.isStarter && Math.random() < 0.3) {
          return { ...p, rating: Math.min(99, p.rating + 1) };
        }
        return p;
      }));
      console.log('Week 5 - Spring Game complete! Some starters improved.');
    } else if (offSeasonWeek % 4 === 0) {
      // Every 4 weeks - random player development
      setRoster(roster.map(p => {
        if (Math.random() < 0.15) {
          return { ...p, rating: Math.min(99, p.rating + 1) };
        }
        return p;
      }));
      console.log(`Week ${offSeasonWeek} - Summer development! Some players improved.`);
    }
    
    console.log(`Off-Season Week ${offSeasonWeek} → Week ${offSeasonWeek + 1} | Points restored: ${weeklyRecruitingPoints}`);
  };
  
  // Check if recruit qualifies for hometown auto-commit
  const checkHomeTownAutoCommit = (recruit) => {
    if (!selectedSchool || recruit.verbalCommit) return false;
    
    // Check if school is in recruit's dream schools
    const isDreamSchool = recruit.dreamSchools.some(s => s.id === selectedSchool.id);
    if (!isDreamSchool) return false;
    
    // Check if recruit is from same state as school
    const isSameState = recruit.state === selectedSchool.state;
    
    // 5-star: ONLY same state + Blue Blood
    if (recruit.stars === 5) {
      return isSameState && selectedSchool.tier === 'Blue Blood' && recruit.interest >= 75;
    }
    
    // 3-star & 4-star: same state OR nearby state (for Blue Blood/P4)
    if (recruit.stars === 3 || recruit.stars === 4) {
      if (isSameState) {
        return recruit.interest >= 75;
      }
      // For Blue Blood/P4, check nearby states (simplified - you can expand this)
      if (selectedSchool.tier === 'Blue Blood' || selectedSchool.tier === 'Power 4') {
        // Could add regional proximity logic here
        return false; // For now, require same state
      }
    }
    
    return false;
  };
  
  // Calculate flip multiplier based on commitment interest level
  const getFlipMultiplier = (commitmentInterest) => {
    if (commitmentInterest >= 100) return 1.0;
    if (commitmentInterest >= 90) return 1.1;
    if (commitmentInterest >= 80) return 1.25;
    if (commitmentInterest >= 70) return 1.5;
    return 2.0; // Very risky commits below 70%
  };
  
  // Handle recruiting action with early commitment and auto-commit checks
  // Calculate initial interest when scholarship is offered
  const calculateInitialInterest = (recruit) => {
    let baseInterest = 3 + Math.floor(Math.random() * 3); // 3-5% (halved from 5-10%)

    // Position Need Modifier (+3-5%)
    const positionNeed = calculatePositionNeed(recruit.position);
    const positionBonus = Math.round(positionNeed * 5); // 0-5% based on need (halved from 0-10%)

    // Geography Modifier (+3-5%)
    let geoBonus = 0;
    if (recruit.state === selectedSchool?.state) {
      geoBonus = 5; // Same state (halved from 10%)
    } else {
      // Check if neighboring state (simplified - could expand this)
      const neighboringStates = getNeighboringStates(selectedSchool?.state);
      if (neighboringStates.includes(recruit.state)) {
        geoBonus = 3; // Neighboring state (halved from 5%)
      }
    }

    // Dream School Modifier (+5-8%)
    let dreamBonus = 0;
    const isDreamSchool = recruit.dreamSchools?.some(ds => ds.id === selectedSchool?.id);
    if (isDreamSchool) {
      dreamBonus = 5 + Math.floor(Math.random() * 4); // 5-8% (halved from 10-15%)
    }

    // School Tier Modifier (+2-3%)
    let tierBonus = 0;
    if (selectedSchool?.tier === 'Blue Blood') {
      tierBonus = 3; // (halved from 5%)
    } else if (selectedSchool?.tier === 'Power 4') {
      tierBonus = 2; // (halved from 3%)
    }

    // Trait-based modifiers
    let traitBonus = 0;

    // Playing Time Focused: HEAVILY weights position need
    if (recruit.traits?.includes('Playing Time Focused')) {
      traitBonus += Math.round(positionNeed * 10); // Up to +10% if high need
      // Penalty if low need (depth at position)
      if (positionNeed < 0.3) {
        traitBonus -= 10; // -10% if position is stacked
      }
    }

    // Close to Home: HEAVILY weights geography
    if (recruit.traits?.includes('Close to Home')) {
      if (recruit.state === selectedSchool?.state) {
        traitBonus += 10; // Extra +10% for same state
      } else if (geoBonus > 0) {
        traitBonus += 5; // Extra +5% for neighboring state
      } else {
        traitBonus -= 5; // -5% if far from home
      }
    }

    // Championship Focused: HEAVILY weights school tier
    if (recruit.traits?.includes('Championship Focused')) {
      if (selectedSchool?.tier === 'Blue Blood') {
        traitBonus += 8; // Extra +8% for Blue Bloods
      } else if (selectedSchool?.tier === 'Power 4') {
        traitBonus += 3; // Small +3% for Power 4
      } else {
        traitBonus -= 8; // -8% for Group of 5
      }
    }

    // Development Focused: Modest tier bonus, more loyal later
    if (recruit.traits?.includes('Development Focused')) {
      if (selectedSchool?.tier === 'Blue Blood' || selectedSchool?.tier === 'Power 4') {
        traitBonus += 5; // +5% for good development programs
      }
    }

    const totalInterest = baseInterest + positionBonus + geoBonus + dreamBonus + tierBonus + traitBonus;
    console.log(`Initial interest for ${recruit.name}: Base=${baseInterest}, Position=${positionBonus}, Geo=${geoBonus}, Dream=${dreamBonus}, Tier=${tierBonus}, Trait=${traitBonus}, Total=${totalInterest}%`);

    return Math.max(0, Math.min(25, totalInterest)); // Cap at 25%, floor at 0%
  };

  // Calculate position need (0.0 = no need, 1.0 = high need)
  const calculatePositionNeed = (position) => {
    const positionPlayers = roster.filter(p => p.position === position);
    const avgRating = positionPlayers.length > 0
      ? positionPlayers.reduce((sum, p) => sum + p.rating, 0) / positionPlayers.length
      : 65;

    // High need if: few players OR low average rating
    const countNeed = positionPlayers.length < 3 ? 0.5 : 0;
    const ratingNeed = avgRating < 75 ? 0.5 : avgRating < 80 ? 0.3 : 0;

    return Math.min(1.0, countNeed + ratingNeed);
  };

  // Get neighboring states (simplified version)
  const getNeighboringStates = (state) => {
    const neighbors = {
      'Ohio': ['Pennsylvania', 'Michigan', 'Indiana', 'Kentucky', 'West Virginia'],
      'Texas': ['Oklahoma', 'Arkansas', 'Louisiana', 'New Mexico'],
      'California': ['Oregon', 'Nevada', 'Arizona'],
      'Florida': ['Georgia', 'Alabama'],
      'Georgia': ['Florida', 'Alabama', 'Tennessee', 'South Carolina', 'North Carolina'],
      // Add more as needed
    };
    return neighbors[state] || [];
  };

  // Handle OFFER SCHOLARSHIP action
  const handleOfferScholarship = (recruit) => {
    const cost = 10;

    if (recruitingPoints < cost) {
      return; // Not enough points
    }

    if (recruit.isTargeted) {
      return; // Already offered
    }

    // Calculate initial interest
    const initialInterest = calculateInitialInterest(recruit);

    // Deduct recruiting points
    setRecruitingPoints(recruitingPoints - cost);

    // Update recruit
    setRecruits(recruits.map(r =>
      r.id === recruit.id ? {
        ...r,
        isTargeted: true,
        interest: initialInterest
      } : r
    ));

    console.log(`Offered scholarship to ${recruit.name} - Initial interest: ${initialInterest}%`);
  };

  // Handle SCOUT action
  const handleScout = (recruit) => {
    const cost = 25;

    if (recruitingPoints < cost) {
      return; // Not enough points
    }

    if (recruit.isScouted) {
      return; // Already scouted
    }

    // Deduct recruiting points
    setRecruitingPoints(recruitingPoints - cost);

    // Update recruit
    setRecruits(recruits.map(r =>
      r.id === recruit.id ? {
        ...r,
        isScouted: true
      } : r
    ));

    console.log(`Scouted ${recruit.name} - Traits: ${recruit.traits.join(', ')}`);
  };

  const handleRecruitingAction = (recruit, actionType, cost, interestGain) => {
    // Apply star-based cost multiplier
    let costMultiplier = 1.0; // Default for 3-stars
    if (recruit.stars === 5) {
      costMultiplier = 3.0; // 5-stars cost 3x
    } else if (recruit.stars === 4) {
      costMultiplier = 2.0; // 4-stars cost 2x
    } else if (recruit.stars === 2) {
      costMultiplier = 0.5; // 2-stars cost 0.5x
    }

    const adjustedCost = Math.round(cost * costMultiplier);

    // Check if monthly action already used this month
    // Calculate recruiting month based on offSeasonWeek (resets every 4 weeks: weeks 5, 9, 13)
    const recruitingMonth = offSeasonWeek ? Math.floor((offSeasonWeek - 1) / 4) + 1 : 0;
    const monthlyActions = ['schoolVisit', 'campusVisit'];
    const monthlyActionUsed = monthlyActions.includes(actionType) &&
      recruit.monthlyActionsUsed &&
      recruit.monthlyActionsUsed[actionType] &&
      recruit.monthlyActionsUsed[actionType].recruitingMonth === recruitingMonth &&
      recruit.monthlyActionsUsed[actionType].year === currentDate.year;

    // Check if already used this week OR if official visit already used permanently OR if monthly action already used this month
    if (recruitingPoints < adjustedCost ||
        (recruit.actionsUsedThisWeek || []).includes(actionType) ||
        (actionType === 'officialVisit' && recruit.officialVisitUsed) ||
        monthlyActionUsed) {
      return;
    }

    // Apply star-based difficulty modifier to interest gain
    // Higher stars = harder to recruit
    let starDifficulty = 1.0; // Default for 3-stars
    if (recruit.stars === 5) {
      starDifficulty = 0.5; // 5-stars gain HALF interest
    } else if (recruit.stars === 4) {
      starDifficulty = 0.7; // 4-stars gain 70% interest
    } else if (recruit.stars === 2) {
      starDifficulty = 1.3; // 2-stars gain 130% interest (easier)
    }

    // Apply diminishing returns based on current interest
    // Getting to 100% should be much harder than getting to 30%
    let diminishingReturns = 1.0;
    if (recruit.interest < 30) {
      diminishingReturns = 1.0; // Full effect at low interest
    } else if (recruit.interest < 50) {
      diminishingReturns = 0.8; // 80% effect
    } else if (recruit.interest < 70) {
      diminishingReturns = 0.6; // 60% effect
    } else if (recruit.interest < 85) {
      diminishingReturns = 0.4; // 40% effect - much harder to reach commit threshold
    } else {
      diminishingReturns = 0.2; // 20% effect - very hard to get to 100%
    }

    // Apply tier bonus (user's school tier affects recruiting effectiveness)
    let tierBonus = 1.0;
    if (selectedSchool?.tier === 'Blue Blood') {
      tierBonus = 1.2; // Blue Bloods get 20% bonus
    } else if (selectedSchool?.tier === 'Power 4') {
      tierBonus = 1.0; // Power 4 baseline
    } else {
      tierBonus = 0.8; // Group of 5 gets penalty
    }

    // Apply flip difficulty if trying to flip a committed recruit
    let flipDifficulty = 1.0;
    if (recruit.verbalCommit && recruit.committedSchool?.id !== selectedSchool?.id) {
      // Harder to flip commits based on committed school's tier
      const committedTier = recruit.committedSchool?.tier;
      if (committedTier === 'Blue Blood') {
        flipDifficulty = 0.5; // 50% reduction - very hard to flip from Blue Bloods
      } else if (committedTier === 'Power 4') {
        flipDifficulty = 0.75; // 25% reduction - harder to flip from Power 4
      } else {
        flipDifficulty = 1.0; // No reduction - same difficulty from Group of 5
      }

      // Development Focused recruits are MORE LOYAL - harder to flip
      if (recruit.traits?.includes('Development Focused')) {
        flipDifficulty *= 0.7; // Additional 30% penalty when flipping Development Focused
      }
    }

    // Apply trait-based recruiting effectiveness modifiers
    let traitModifier = 1.0;

    // Championship Focused: Responds better to Blue Bloods
    if (recruit.traits?.includes('Championship Focused')) {
      if (selectedSchool?.tier === 'Blue Blood') {
        traitModifier *= 1.15; // +15% bonus for Blue Bloods
      } else if (selectedSchool?.tier === 'Group of 5') {
        traitModifier *= 0.85; // -15% penalty for Group of 5
      }
    }

    // Close to Home: Geography affects recruiting effectiveness
    if (recruit.traits?.includes('Close to Home')) {
      if (recruit.state === selectedSchool?.state) {
        traitModifier *= 1.2; // +20% bonus for same state
      } else {
        const neighboringStates = getNeighboringStates(selectedSchool?.state);
        if (neighboringStates.includes(recruit.state)) {
          traitModifier *= 1.1; // +10% for neighboring state
        } else {
          traitModifier *= 0.8; // -20% for far from home
        }
      }
    }

    // Playing Time Focused: Position need affects recruiting
    if (recruit.traits?.includes('Playing Time Focused')) {
      const positionNeed = calculatePositionNeed(recruit.position);
      if (positionNeed > 0.7) {
        traitModifier *= 1.25; // +25% if high need
      } else if (positionNeed < 0.3) {
        traitModifier *= 0.75; // -25% if position is stacked
      }
    }

    // Calculate final interest gain with ALL modifiers
    const adjustedInterestGain = Math.round(interestGain * starDifficulty * diminishingReturns * tierBonus * flipDifficulty * traitModifier);
    const newInterest = Math.min(100, recruit.interest + adjustedInterestGain);
    
    setRecruits(recruits.map(r =>
      r.id === recruit.id ? {
        ...r,
        interest: newInterest,
        actionsUsedThisWeek: [...(r.actionsUsedThisWeek || []), actionType],
        // Mark official visit as permanently used
        officialVisitUsed: actionType === 'officialVisit' ? true : r.officialVisitUsed,
        // Track monthly actions (School Visit, Campus Visit) - limited to once per month (every 4 weeks)
        monthlyActionsUsed: monthlyActions.includes(actionType) ? {
          ...(r.monthlyActionsUsed || {}),
          [actionType]: { recruitingMonth: recruitingMonth, year: currentDate.year }
        } : r.monthlyActionsUsed
        // isTargeted is now ONLY set when offering scholarship, not with regular actions
      } : r
    ));
    setRecruitingPoints(recruitingPoints - adjustedCost);
    
    // Check for hometown auto-commit (75%+)
    setTimeout(() => {
      const updatedRecruit = recruits.find(r => r.id === recruit.id);
      if (updatedRecruit && checkHomeTownAutoCommit({...updatedRecruit, interest: newInterest})) {
        // Auto-commit with slightly reduced NIL (95% of asking price)
        const autoCommitDeal = Math.round(updatedRecruit.askingPrice * 0.95);
        setRecruits(recruits.map(r => 
          r.id === updatedRecruit.id ? {
            ...r,
            verbalCommit: true,
            nilDeal: autoCommitDeal,
            committedSchool: selectedSchool,
            commitmentInterest: newInterest, // Track interest level at commitment
            flipMultiplier: 0.5, // Hometown loyalty = half normal flip chance
            isTargeted: true // Keep in My Recruits
          } : r
        ));
        alert(`🏠 HOMETOWN HERO! ${updatedRecruit.name} couldn't pass up playing for ${getSchoolDisplayName(selectedSchool)}! Auto-committed for ${formatCurrency(autoCommitDeal)}.`);
        return;
      }
      
      // Random commitment chance at 70%+ interest based on star rating
      if (newInterest >= 70 && !updatedRecruit?.verbalCommit && !updatedRecruit?.nilOfferAccepted) {
        if (updatedRecruit) {
          // Determine commitment probability based on star rating
          let commitChance = 0;
          if (updatedRecruit.stars === 5) {
            commitChance = 0.15; // 15% chance for 5-stars
          } else if (updatedRecruit.stars === 4) {
            commitChance = 0.30; // 30% chance for 4-stars
          } else {
            commitChance = 0.75; // 75% chance for 3-stars and 2-stars
          }

          // Roll for random commitment
          if (Math.random() < commitChance) {
            // Trigger NIL negotiation modal
            setNegotiatingRecruit({
              ...updatedRecruit,
              interest: newInterest,
              commitmentInterest: newInterest,
              flipMultiplier: getFlipMultiplier(newInterest)
            });
            setCounterOffer(Math.round(updatedRecruit.marketValue * 0.5));
            setShowNegotiationModal(true);
          }
        }
      }

      // Note: At 95%+, user can manually click "Make NIL Offer" button to initiate negotiations
    }, 500); // Small delay for UI feedback
  };
  
  const advanceMonth = () => {
    let newDate = { ...currentDate };
    newDate.month++;
    newDate.day = 1;
    
    if (newDate.month > 11) {
      newDate.month = 0;
      newDate.year++;
    }
    
    setCurrentDate(newDate);
  };

  const handleEventDecision = (option) => {
    const event = currentRandomEvent;
    const outcome = option.outcome;
    
    // Handle flip events separately
    if (event.type === EVENT_TYPES.SIGNING_DAY_FLIP) {
      // Apply budget changes for NIL increase
      if (option.cost > 0) {
        setBudget(prev => prev - option.cost);
      }
      
      // Update recruit based on flip outcome
      setRecruits(prev => prev.map(r => {
        if (r.id === event.recruit.id) {
          // If flipped, remove commitment
          if (outcome.flipped) {
            return {
              ...r,
              verbalCommit: false,
              signedCommit: false,
              committedSchool: event.rivalSchool, // They flipped to rival
              nilDeal: event.rivalOffer,
              flipMessage: `${r.name} has flipped to ${event.rivalSchool.name}!`
            };
          } else {
            // If stayed, update NIL and boost commitment
            return {
              ...r,
              nilDeal: outcome.newNIL,
              commitmentInterest: outcome.commitmentBoost ? 100 : Math.min(100, (r.commitmentInterest || 50) + 20),
              flipMultiplier: outcome.commitmentBoost ? 0.1 : (r.flipMultiplier || 1.0) * 0.5 // Reduce flip risk
            };
          }
        }
        return r;
      }));
      
      // Show result message
      if (outcome.flipped) {
        const flippedRecruit = recruits.find(r => r.id === event.recruit.id);
        alert(`💔 ${flippedRecruit.name} has flipped to ${event.rivalSchool.name}!\n\nThey accepted their ${formatCurrency(event.rivalOffer)} offer. This is a huge blow to your recruiting class.`);
      } else {
        alert(outcome.message);
      }
      
      setShowEventModal(false);
      setCurrentRandomEvent(null);
      return;
    }
    
    // Apply budget changes
    if (option.cost > 0) {
      setBudget(prev => prev - option.cost);
    }
    
    // Apply NIL changes to player
    if (outcome.nilChange && event.player) {
      setRoster(prev => prev.map(p => {
        if (p.id === event.player.id) {
          return {
            ...p,
            currentNIL: Math.max(0, p.currentNIL + outcome.nilChange),
            satisfaction: outcome.satisfactionChange || p.satisfaction
          };
        }
        return p;
      }));
      
      // Update budget allocated
      setBudgetAllocated(prev => prev + outcome.nilChange);
    }
    
    // Handle player removal (transfer portal)
    if (outcome.removePlayer && event.player) {
      setRoster(prev => prev.filter(p => p.id !== event.player.id));
      setBudgetAllocated(prev => prev - event.player.currentNIL);
    }
    
    // Handle satisfaction changes without NIL changes
    if (outcome.satisfactionChange && !outcome.nilChange && event.player) {
      setRoster(prev => prev.map(p => {
        if (p.id === event.player.id) {
          return { ...p, satisfaction: outcome.satisfactionChange };
        }
        return p;
      }));
    }
    
    // Show outcome message (you could enhance this with a separate modal)
    alert(outcome.message);
    
    // Close modal
    setShowEventModal(false);
    setCurrentRandomEvent(null);
  };

  const simulateToNextEvent = () => {
    const nextEvent = getUpcomingEvents()[0];
    if (!nextEvent) return;
    
    // Check if simulating to next event would cross into a new year (January)
    const willCrossYear = currentDate.month > 0 && nextEvent.title === 'Transfer Portal Open';
    
    // If crossing into new year and over budget, block simulation
    if (willCrossYear && budgetRemaining < 0) {
      alert('⚠️ BUDGET CRISIS!\n\nYou cannot advance to the next season while over budget.\n\nCurrent Budget Status:\n' +
            `• Total Allocated: ${formatCurrency(totalAllocated)}\n` +
            `• Total Budget: ${formatCurrency(budget)}\n` +
            `• Over Budget By: ${formatCurrency(Math.abs(budgetRemaining))}\n\n` +
            'You must reduce NIL spending or cut players before the new season begins.');
      return;
    }
    
    // Warn if low on budget but not over
    if (willCrossYear && budgetRemaining < budget * 0.05) {
      const confirmed = confirm('⚠️ LOW BUDGET WARNING\n\n' +
                                `You only have ${formatCurrency(budgetRemaining)} remaining (${budgetUtilization}% utilized).\n\n` +
                                'Do you want to continue to the next season?');
      if (!confirmed) return;
    }
    
    // Check if we're simming to a game week during regular season
    if (nextEvent.isGameWeek) {
      // Advance one week (7 days)
      advanceDay(7);
      setCurrentGameWeek(prev => prev + 1);
      
      // Reset recruiting actions and restore points (HALF during Regular Season)
      if (isRecruitingOpen()) {
        setRecruits(recruits.map(r => ({
          ...r,
          actionsUsedThisWeek: []
        })));
        
        // Restore recruiting points - HALF during Regular Season
        let weeklyRecruitingPoints = 200; // Group of 5 default
        if (selectedSchool?.tier === 'Blue Blood') {
          weeklyRecruitingPoints = 600;
        } else if (selectedSchool?.tier === 'Power 4') {
          weeklyRecruitingPoints = 400;
        }
        
        // Cut in half for Regular Season
        weeklyRecruitingPoints = Math.floor(weeklyRecruitingPoints / 2);
        setRecruitingPoints(weeklyRecruitingPoints);
        
        console.log(`Regular Season Week ${nextEvent.week} - HALF recruiting points restored: ${weeklyRecruitingPoints}`);
      }
    } else {
      // Check if we're entering Regular Season
      if (nextEvent.title === 'Regular Season') {
        advanceDay(nextEvent.daysUntil);
        setCurrentGameWeek(1); // Start at Week 1

        // Set HALF recruiting points when entering Regular Season
        let weeklyRecruitingPoints = 200; // Group of 5 default
        if (selectedSchool?.tier === 'Blue Blood') {
          weeklyRecruitingPoints = 600;
        } else if (selectedSchool?.tier === 'Power 4') {
          weeklyRecruitingPoints = 400;
        }
        weeklyRecruitingPoints = Math.floor(weeklyRecruitingPoints / 2);
        setRecruitingPoints(weeklyRecruitingPoints);
        console.log('Entering Regular Season - HALF recruiting points set:', weeklyRecruitingPoints);

        // Schedule was already generated at The Off-Season start
        console.log('Regular Season started with', seasonSchedule.length, 'games scheduled');
      } else {
        // Regular event, reset game week if leaving season
        advanceDay(nextEvent.daysUntil);
        if (currentGameWeek > 0) {
          setCurrentGameWeek(0); // Reset when leaving regular season
        }
        
        // TRIGGER TRANSFER PORTAL after Conference Championships
        if (nextEvent.title === 'The Playoffs') {
          // We just passed Conference Championships, process transfer portal
          console.log('Processing Transfer Portal after Conference Championships...');
          const portalResults = processTransferPortal();
          
          // Show summary to user
          setTimeout(() => {
            alert(`🔄 TRANSFER PORTAL OPENED\n\n` +
                  `• ${portalResults.transferCount} players entered the portal\n` +
                  `• ${portalResults.retainedCount} players retained\n` +
                  `• ${portalResults.decisionsNeeded} decisions needed`);
          }, 500);
        }
      }
    }
    
    // Simulate AI school recruiting activity during recruiting-open periods
    if (isRecruitingOpen() || nextEvent.recruitingOpen) {
      const allSchools = [...SCHOOLS.blueBloods, ...SCHOOLS.power4, ...SCHOOLS.group5];
      const oldRecruits = recruits;
      const updatedRecruits = simulateAIRecruiting(recruits, allSchools, selectedSchool?.id, aiRosters);
      setRecruits(updatedRecruits);
      
      // Generate recruiting update summary
      const myTargets = updatedRecruits.filter(r => r.isTargeted || r.interest > 0);
      const newCommits = updatedRecruits.filter(r => 
        r.verbalCommit && 
        r.committedSchool?.id !== selectedSchool?.id &&
        !oldRecruits.find(old => old.id === r.id && old.verbalCommit)
      );
      
      // Show notification if there's activity on your targets
      if (myTargets.length > 0 && Math.random() < 0.3) {
        // 30% chance of showing update each week
        const target = myTargets[Math.floor(Math.random() * myTargets.length)];
        const leadingSchool = target.leadingSchool;
        
        if (leadingSchool && leadingSchool.schoolId !== selectedSchool?.id) {
          setTimeout(() => {
            alert(`📰 RECRUITING UPDATE\n\n${leadingSchool.schoolName} made a ${leadingSchool.lastAction} with ${target.name}!\n\nThey're now at ${leadingSchool.interest}% interest.\n\n${target.interest > 0 ? `You're at ${target.interest}%` : 'You haven\'t started recruiting them yet'}`);
          }, 800);
        }
      }
      
      // Alert if AI school got a commit to a recruit you were targeting
      const lostTargets = newCommits.filter(r => r.interest > 0 || r.isTargeted);
      if (lostTargets.length > 0) {
        const lostRecruit = lostTargets[0];
        setTimeout(() => {
          alert(`💔 COMMITMENT ALERT!\n\n${lostRecruit.name} has committed to ${lostRecruit.committedSchool.name}!\n\n${lostRecruit.isTargeted ? 'This was one of your targets!' : ''}\n\nYou had ${lostRecruit.interest}% interest.`);
        }, 1000);
      }
    }
    
    // Check for random event
    const eventContext = nextEvent.isGameWeek ? `Regular Season - Week ${currentGameWeek + 1}` : nextEvent.title;
    const randomEvent = generateRandomEvent(roster, eventContext, budget);
    
    // During signing periods, process signing day decisions and flip attempts
    let flipAttempt = null;
    if (nextEvent.signingPeriod && nextEvent.recruitingOpen) {
      // Process signing day decisions FIRST
      const signingDayResults = processSigningDayDecisions();

      // Show signing day results to user
      if (signingDayResults.length > 0) {
        const wins = signingDayResults.filter(d => d.isUserSchool);
        const losses = signingDayResults.filter(d => !d.isUserSchool);

        setTimeout(() => {
          let message = `📅 SIGNING DAY RESULTS\n\n`;
          message += `${signingDayResults.length} recruit${signingDayResults.length !== 1 ? 's' : ''} made their decision${signingDayResults.length !== 1 ? 's' : ''}!\n\n`;

          if (wins.length > 0) {
            message += `✅ YOU WON (${wins.length}):\n`;
            wins.forEach(w => {
              message += `• ${w.recruit.name} (${w.recruit.stars}⭐ ${w.recruit.position})\n`;
            });
            message += `\n`;
          }

          if (losses.length > 0) {
            message += `❌ YOU LOST (${losses.length}):\n`;
            losses.forEach(l => {
              message += `• ${l.recruit.name} → ${l.winner.schoolName}\n`;
            });
          }

          alert(message);
        }, 500);
      }

      // Then check for flip attempts
      const allSchools = [...SCHOOLS.blueBloods, ...SCHOOLS.power4, ...SCHOOLS.group5];
      flipAttempt = generateFlipAttempt(recruits, allSchools, selectedSchool, budget);
    }

    // Prioritize flip attempts during signing periods (more urgent)
    if (flipAttempt) {
      setCurrentRandomEvent(flipAttempt);
      setShowEventModal(true);
    } else if (randomEvent) {
      setCurrentRandomEvent(randomEvent);
      setShowEventModal(true);
    }
  };

  const totalAllocated = budgetAllocated + incomingFreshmanBudget + transferAdditionsBudget;
  const budgetRemaining = budget - totalAllocated;
  const budgetUtilization = ((totalAllocated / budget) * 100).toFixed(1);

  // OPTIONS MODAL COMPONENT - Shows on all pages
  const OptionsModal = () => {
    if (!showOptions) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setShowOptions(false)}>
        <div className="bg-gray-900 border-4 border-yellow-500 p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()} style={{
          boxShadow: '12px 12px 0px rgba(0,0,0,0.8)',
          fontFamily: '"Press Start 2P", cursive'
        }}>
          <h2 className="text-2xl text-yellow-400 mb-6 text-center">OPTIONS</h2>
          
          {/* Music Toggle */}
          <div className="mb-6 p-4 bg-gray-800 border-2 border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">MUSIC / SFX</span>
              <button
                onClick={() => setSfxEnabled(!sfxEnabled)}
                className={`relative w-16 h-8 rounded-full transition-colors ${sfxEnabled ? 'bg-green-600' : 'bg-gray-600'}`}
                style={{ border: '2px solid #000' }}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${sfxEnabled ? 'right-1' : 'left-1'}`} style={{ border: '2px solid #000' }}></div>
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              {sfxEnabled ? 'ENABLED' : 'DISABLED'}
            </div>
          </div>
          
          {/* Retire Button */}
          <div className="mb-6">
            <button
              onClick={() => {
                if (confirm('⚠️ RETIRE FROM COACHING?\n\nThis will:\n• Delete all saved progress\n• Reset the game completely\n• Return you to the title screen\n\nAre you sure?')) {
                  retireAndReset();
                }
              }}
              className="w-full bg-red-800 border-4 border-red-600 p-4 hover:bg-red-700 transition-all text-white font-bold"
              style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
            >
              🏁 RETIRE & RESET
            </button>
            <div className="text-xs text-gray-400 mt-2 text-center">
              Deletes all saved data
            </div>
          </div>
          
          {/* Close Button */}
          <button
            onClick={() => setShowOptions(false)}
            className="w-full bg-gray-700 border-4 border-gray-600 p-3 hover:bg-gray-600 transition-all text-white"
            style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
          >
            CLOSE
          </button>
        </div>
      </div>
    );
  };

  // TITLE SCREEN
  if (gameState === 'titleScreen') {
    const handleStartGame = () => {
      // Start audio on first click
      if (window.startTitleAudio && !window.titleScreenAudio) {
        window.startTitleAudio();
      }
      
      // Boost volume for cheer effect
      if (window.titleScreenAudio) {
        const { gainNode } = window.titleScreenAudio;
        const audioCtx = audioContextRef.current;
        
        if (audioCtx && gainNode) {
          gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
          gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.8, audioCtx.currentTime + 0.1); // Loud cheer!
          gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 1.5); // Fade to ambient
        }
      }
      
      // Enable SFX
      setSfxEnabled(true);
      
      // Go to school select
      setGameState('schoolSelect');
    };
    
    return (
      <div 
        className="min-h-screen text-white flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
        onClick={handleStartGame}
        style={{
          fontFamily: '"Press Start 2P", cursive',
          imageRendering: 'pixelated'
        }}
      >
        {/* 16-bit Championship Photo Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('data:image/png;base64,${(() => {
              // This would be the base64 of your championship photo
              // For now, using a placeholder that will be replaced
              return '';
            })()}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'contrast(1.3) saturate(0.7) blur(1px)',
            imageRendering: 'pixelated',
            transform: 'scale(1.02)'
          }}
        />
        
        {/* Dark overlay for readability */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.75), rgba(30, 58, 138, 0.75), rgba(0, 0, 0, 0.85))'
          }}
        />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          * { image-rendering: pixelated; }
          
          /* Make background look 16-bit */
          .min-h-screen::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: inherit;
            filter: contrast(1.2) saturate(0.8);
            z-index: -1;
          }
          
          @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes glow {
            0%, 100% { text-shadow: 0 0 10px #fbbf24, 0 0 20px #fbbf24, 0 0 30px #fbbf24; }
            50% { text-shadow: 0 0 20px #fbbf24, 0 0 30px #fbbf24, 0 0 40px #fbbf24, 0 0 50px #f59e0b; }
          }
          
          @keyframes confettiFall {
            0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0.8;
            }
          }
        `}</style>
        
        {/* Falling Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          {[...Array(50)].map((_, i) => {
            const colors = ['#FFD700', '#FFA500', '#FF6347', '#4169E1', '#32CD32', '#FF1493', '#00CED1', '#FF69B4', '#FFFF00', '#FFF'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const animationDuration = 3 + Math.random() * 4;
            const animationDelay = Math.random() * 5;
            const size = 8 + Math.random() * 8;
            
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${left}%`,
                  top: '-100px',
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  animation: `confettiFall ${animationDuration}s linear ${animationDelay}s infinite`,
                  opacity: 0.9
                }}
              />
            );
          })}
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `flicker ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: Math.random() * 2 + 's'
              }}
            />
          ))}
        </div>
        
        {/* Giant Trophy Background - Photorealistic championship trophy */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 z-20">
          <svg width="600" height="700" viewBox="0 0 300 400" style={{ animation: 'float 4s ease-in-out infinite' }}>
            <defs>
              {/* Radial gradient for metallic sphere effect */}
              <radialGradient id="goldSphere" cx="35%" cy="35%">
                <stop offset="0%" style={{ stopColor: '#FFF8DC', stopOpacity: 1 }} />
                <stop offset="30%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                <stop offset="70%" style={{ stopColor: '#DAA520', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#8B7500', stopOpacity: 1 }} />
              </radialGradient>
              
              {/* Column gradient */}
              <linearGradient id="columnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#8B7500', stopOpacity: 1 }} />
                <stop offset="15%" style={{ stopColor: '#B8860B', stopOpacity: 1 }} />
                <stop offset="40%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                <stop offset="60%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                <stop offset="85%" style={{ stopColor: '#B8860B', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#8B7500', stopOpacity: 1 }} />
              </linearGradient>
              
              {/* Base gradient */}
              <linearGradient id="baseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#4d4d4d', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#2d2d2d', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#1a1a1a', stopOpacity: 1 }} />
              </linearGradient>
              
              {/* Football gradient */}
              <radialGradient id="footballGrad" cx="40%" cy="40%">
                <stop offset="0%" style={{ stopColor: '#CD853F', stopOpacity: 1 }} />
                <stop offset="40%" style={{ stopColor: '#8B4513', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#654321', stopOpacity: 1 }} />
              </radialGradient>
              
              {/* Shadow */}
              <radialGradient id="shadow">
                <stop offset="0%" style={{ stopColor: '#000', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#000', stopOpacity: 0 }} />
              </radialGradient>
            </defs>
            
            {/* Ground shadow */}
            <ellipse cx="150" cy="390" rx="80" ry="10" fill="url(#shadow)"/>
            
            {/* Base - Multi-tiered pedestal */}
            <ellipse cx="150" cy="380" rx="50" ry="7" fill="url(#baseGrad)"/>
            <path d="M 100 380 L 100 373 L 200 373 L 200 380 Z" fill="#1a1a1a"/>
            <ellipse cx="150" cy="373" rx="50" ry="7" fill="#2d2d2d"/>
            
            <ellipse cx="150" cy="365" rx="40" ry="6" fill="url(#baseGrad)"/>
            <path d="M 110 365 L 110 358 L 190 358 L 190 365 Z" fill="#2d2d2d"/>
            <ellipse cx="150" cy="358" rx="40" ry="6" fill="#3d3d3d"/>
            
            <ellipse cx="150" cy="350" rx="30" ry="5" fill="url(#baseGrad)"/>
            <path d="M 120 350 L 120 345 L 180 345 L 180 350 Z" fill="#3d3d3d"/>
            <ellipse cx="150" cy="345" rx="30" ry="5" fill="#4d4d4d"/>
            
            {/* Trophy column/stem */}
            <ellipse cx="150" cy="345" rx="12" ry="5" fill="#DAA520"/>
            <path d="M 138 345 L 138 295 L 162 295 L 162 345 Z" fill="url(#columnGrad)"/>
            <ellipse cx="150" cy="295" rx="12" ry="5" fill="#FFD700"/>
            
            {/* Trophy body - Large football on pedestal style */}
            {/* Wide decorative base of trophy */}
            <ellipse cx="150" cy="290" rx="25" ry="8" fill="#DAA520"/>
            <path d="M 125 290 L 128 275 L 172 275 L 175 290 Z" fill="url(#columnGrad)"/>
            <ellipse cx="150" cy="275" rx="23" ry="7" fill="#FFD700"/>
            
            {/* Main trophy - Giant football sculpture */}
            {/* Football base attachment */}
            <ellipse cx="150" cy="270" rx="18" ry="6" fill="#B8860B"/>
            <path d="M 132 270 L 135 250 L 165 250 L 168 270 Z" fill="url(#columnGrad)"/>
            <ellipse cx="150" cy="250" rx="15" ry="5" fill="#DAA520"/>
            
            {/* Large golden football - main trophy piece */}
            <ellipse cx="150" cy="160" rx="55" ry="85" fill="url(#goldSphere)" stroke="#B8860B" strokeWidth="3"/>
            
            {/* Football details - seams and texture */}
            <ellipse cx="150" cy="160" rx="55" ry="85" fill="none" stroke="#DAA520" strokeWidth="1" opacity="0.3"/>
            <line x1="150" y1="80" x2="150" y2="240" stroke="#B8860B" strokeWidth="2"/>
            
            {/* Laces engraved on golden football */}
            <line x1="135" y1="145" x2="165" y2="145" stroke="#8B7500" strokeWidth="2.5"/>
            <line x1="135" y1="155" x2="165" y2="155" stroke="#8B7500" strokeWidth="2.5"/>
            <line x1="135" y1="165" x2="165" y2="165" stroke="#8B7500" strokeWidth="2.5"/>
            <line x1="135" y1="175" x2="165" y2="175" stroke="#8B7500" strokeWidth="2.5"/>
            
            {/* Highlight shine on golden football */}
            <ellipse cx="130" cy="120" rx="20" ry="35" fill="#FFF" opacity="0.4"/>
            <ellipse cx="125" cy="115" rx="12" ry="20" fill="#FFF" opacity="0.3"/>
            
            {/* Shadow on opposite side */}
            <ellipse cx="170" cy="200" rx="20" ry="40" fill="#000" opacity="0.2"/>
          </svg>
        </div>
        
        {/* Title */}
        <div className="text-center mb-12 relative z-30">
          <h1
            className="text-7xl mb-8 font-bold tracking-wider"
            style={{
              animation: 'glow 2s ease-in-out infinite',
              color: '#fbbf24',
              letterSpacing: '0.2em',
              textShadow: '6px 6px 0px rgba(0,0,0,0.7)'
            }}
          >
            THE PROGRAM
          </h1>
          <h2
            className="text-3xl font-bold tracking-wider"
            style={{
              animation: 'glow 2s ease-in-out infinite',
              animationDelay: '0.2s',
              color: '#fff',
              letterSpacing: '0.15em',
              textShadow: '4px 4px 0px rgba(0,0,0,0.5)'
            }}
          >
            College Football Simulator
          </h2>
        </div>
        
        {/* Press Start Text */}
        <div 
          className="text-2xl mb-8 relative z-30"
          style={{ 
            animation: 'flicker 1.5s ease-in-out infinite',
            color: '#fff',
            textShadow: '2px 2px 0px rgba(0,0,0,0.5)'
          }}
        >
          PRESS START
        </div>
        
        {/* Options Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowOptions(true);
          }}
          className="absolute top-4 right-4 bg-gray-800 border-2 border-gray-600 px-4 py-2 hover:bg-gray-700 transition-all text-white text-xs relative z-30"
          style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
        >
          ⚙️ OPTIONS
        </button>
        
        {/* Version */}
        <div className="absolute bottom-4 right-4 text-xs text-gray-500">
          v1.0.0
        </div>
        
        {/* Options Modal */}
        <OptionsModal />
      </div>
    );
  }

  if (gameState === 'schoolSelect') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 relative overflow-hidden" style={{
        fontFamily: '"Press Start 2P", cursive',
        imageRendering: 'pixelated'
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          * { image-rendering: pixelated; }
          
          @keyframes movePlayer1 { 0%, 100% { transform: translate(0, 0) scale(0.4); } 25% { transform: translate(20px, -15px) scale(0.42); } 50% { transform: translate(-10px, 10px) scale(0.38); } 75% { transform: translate(15px, -5px) scale(0.41); } }
          @keyframes movePlayer2 { 0%, 100% { transform: translate(0, 0) scale(0.4); } 33% { transform: translate(-15px, 12px) scale(0.39); } 66% { transform: translate(18px, -8px) scale(0.43); } }
          @keyframes movePlayer3 { 0%, 100% { transform: translate(0, 0) scale(0.4); } 20% { transform: translate(12px, 15px) scale(0.44); } 60% { transform: translate(-20px, -10px) scale(0.37); } 80% { transform: translate(8px, 5px) scale(0.41); } }
          @keyframes movePlayer4 { 0%, 100% { transform: translate(0, 0) scale(0.42); } 30% { transform: translate(-18px, -12px) scale(0.4); } 70% { transform: translate(15px, 8px) scale(0.44); } }
          @keyframes movePlayer5 { 0%, 100% { transform: translate(0, 0) scale(0.4); } 40% { transform: translate(22px, -18px) scale(0.43); } 80% { transform: translate(-12px, 12px) scale(0.38); } }
          @keyframes movePlayer6 { 0%, 100% { transform: translate(0, 0) scale(0.44); } 25% { transform: translate(-25px, 10px) scale(0.42); } 75% { transform: translate(20px, -15px) scale(0.46); } }
          @keyframes movePlayer7 { 0%, 100% { transform: translate(0, 0) scale(0.38); } 35% { transform: translate(10px, -20px) scale(0.4); } 65% { transform: translate(-15px, 15px) scale(0.36); } }
          
          .player-animate-1 { animation: movePlayer1 8s ease-in-out infinite; }
          .player-animate-2 { animation: movePlayer2 7s ease-in-out infinite; }
          .player-animate-3 { animation: movePlayer3 9s ease-in-out infinite; }
          .player-animate-4 { animation: movePlayer4 8.5s ease-in-out infinite; }
          .player-animate-5 { animation: movePlayer5 7.5s ease-in-out infinite; }
          .player-animate-6 { animation: movePlayer6 9.5s ease-in-out infinite; }
          .player-animate-7 { animation: movePlayer7 8s ease-in-out infinite; }
        `}</style>
        
        {/* Stadium Background */}
        <div className="fixed inset-0 z-0">
          {/* Night Sky */}
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-black via-indigo-950 to-blue-900"></div>
          
          {/* Stars */}
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={`star-${i}`} className="absolute bg-white rounded-full" style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 40}%`,
              width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2
            }} />
          ))}
          
          {/* Stadium Lights - Left Side */}
          <div className="absolute left-0 top-1/4 w-32 h-64 bg-gradient-to-r from-gray-800 to-transparent opacity-80">
            <div className="absolute left-4 top-0 w-3 h-full bg-gray-700 border-l-2 border-gray-900"></div>
            <div className="absolute left-12 top-0 w-3 h-full bg-gray-700 border-l-2 border-gray-900"></div>
            {[0, 1, 2, 3].map((i) => (
              <div key={`light-l-${i}`}>
                <div className="absolute left-2 w-6 h-4 bg-yellow-300 border-2 border-yellow-500" style={{ top: `${i * 25}%` }}></div>
                <div className="absolute left-10 w-6 h-4 bg-yellow-300 border-2 border-yellow-500" style={{ top: `${i * 25}%` }}></div>
                <div className="absolute left-4 w-32 h-48 bg-gradient-to-r from-yellow-300 to-transparent opacity-20" style={{ top: `${i * 25}%`, clipPath: 'polygon(0 0, 100% 25%, 100% 75%, 0 100%)' }}></div>
              </div>
            ))}
          </div>
          
          {/* Stadium Lights - Right Side */}
          <div className="absolute right-0 top-1/4 w-32 h-64 bg-gradient-to-l from-gray-800 to-transparent opacity-80">
            <div className="absolute right-4 top-0 w-3 h-full bg-gray-700 border-r-2 border-gray-900"></div>
            <div className="absolute right-12 top-0 w-3 h-full bg-gray-700 border-r-2 border-gray-900"></div>
            {[0, 1, 2, 3].map((i) => (
              <div key={`light-r-${i}`}>
                <div className="absolute right-2 w-6 h-4 bg-yellow-300 border-2 border-yellow-500" style={{ top: `${i * 25}%` }}></div>
                <div className="absolute right-10 w-6 h-4 bg-yellow-300 border-2 border-yellow-500" style={{ top: `${i * 25}%` }}></div>
                <div className="absolute right-4 w-32 h-48 bg-gradient-to-l from-yellow-300 to-transparent opacity-20" style={{ top: `${i * 25}%`, clipPath: 'polygon(100% 0, 0 25%, 0 75%, 100% 100%)' }}></div>
              </div>
            ))}
          </div>
          
          {/* Stadium Structure - Left */}
          <div className="absolute left-0 bottom-1/3 w-1/4 h-1/2 bg-gradient-to-r from-gray-900 via-gray-800 to-transparent border-t-4 border-gray-700">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`seat-l-${i}`} className="absolute left-0 right-0 h-1 bg-gray-700" style={{ top: `${i * 5}%` }} />
            ))}
          </div>
          
          {/* Stadium Structure - Right */}
          <div className="absolute right-0 bottom-1/3 w-1/4 h-1/2 bg-gradient-to-l from-gray-900 via-gray-800 to-transparent border-t-4 border-gray-700">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`seat-r-${i}`} className="absolute left-0 right-0 h-1 bg-gray-700" style={{ top: `${i * 5}%` }} />
            ))}
          </div>
          
          {/* Pixelated Crowd in Stands - Left */}
          <div className="absolute left-0 bottom-1/3 w-1/4 h-1/2 opacity-60">
            {Array.from({ length: 80 }).map((_, i) => (
              <div key={`crowd-l-${i}`} className="absolute" style={{
                left: `${(i % 10) * 10}%`, top: `${Math.floor(i / 10) * 12}%`,
                width: '6px', height: '10px',
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#A8E6CF'][Math.floor(Math.random() * 5)]
              }} />
            ))}
          </div>
          
          {/* Pixelated Crowd in Stands - Right */}
          <div className="absolute right-0 bottom-1/3 w-1/4 h-1/2 opacity-60">
            {Array.from({ length: 80 }).map((_, i) => (
              <div key={`crowd-r-${i}`} className="absolute" style={{
                right: `${(i % 10) * 10}%`, top: `${Math.floor(i / 10) * 12}%`,
                width: '6px', height: '10px',
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#A8E6CF'][Math.floor(Math.random() * 5)]
              }} />
            ))}
          </div>
          
          {/* Football Field */}
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-b from-green-600 to-green-800" style={{ transform: 'rotateX(60deg)', transformOrigin: 'bottom' }}>
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="absolute left-0 right-0 border-t-2 border-white opacity-40" style={{ top: `${i * 9}%`, height: '2px' }} />
            ))}
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={`hash-l-${i}`} className="absolute bg-white opacity-30" style={{ left: '30%', top: `${i * 2}%`, width: '4px', height: '8px' }} />
            ))}
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={`hash-r-${i}`} className="absolute bg-white opacity-30" style={{ right: '30%', top: `${i * 2}%`, width: '4px', height: '8px' }} />
            ))}
          </div>
          
          {/* Animated Players on Field */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
            {[
              { left: '30%', bottom: '18%', anim: 'player-animate-1' },
              { left: '38%', bottom: '20%', anim: 'player-animate-2' },
              { left: '45%', bottom: '20%', anim: 'player-animate-3' },
              { left: '52%', bottom: '20%', anim: 'player-animate-4' },
              { left: '60%', bottom: '18%', anim: 'player-animate-5' },
              { left: '45%', bottom: '16%', anim: 'player-animate-6' },
              { left: '42%', bottom: '14%', anim: 'player-animate-7' },
            ].map((pos, i) => (
              <div key={`team1-${i}`} className={`absolute ${pos.anim}`} style={{ left: pos.left, bottom: pos.bottom, width: '32px', height: '40px' }}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-400 border-2 border-gray-600 rounded-sm"></div>
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-red-600 border-2 border-red-800"></div>
                <div className="absolute top-6 left-0 w-3 h-8 bg-red-500 border border-red-700"></div>
                <div className="absolute top-6 right-0 w-3 h-8 bg-red-500 border border-red-700"></div>
                <div className="absolute top-16 left-2 w-3 h-10 bg-gray-500 border border-gray-700"></div>
                <div className="absolute top-16 right-2 w-3 h-10 bg-gray-500 border border-gray-700"></div>
              </div>
            ))}
            
            {[
              { left: '30%', bottom: '22%', anim: 'player-animate-2' },
              { left: '38%', bottom: '24%', anim: 'player-animate-4' },
              { left: '45%', bottom: '24%', anim: 'player-animate-1' },
              { left: '52%', bottom: '24%', anim: 'player-animate-5' },
              { left: '60%', bottom: '22%', anim: 'player-animate-3' },
              { left: '45%', bottom: '26%', anim: 'player-animate-7' },
              { left: '48%', bottom: '28%', anim: 'player-animate-6' },
            ].map((pos, i) => (
              <div key={`team2-${i}`} className={`absolute ${pos.anim}`} style={{ left: pos.left, bottom: pos.bottom, width: '32px', height: '40px' }}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 border-2 border-blue-800 rounded-sm">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-yellow-400"></div>
                </div>
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-blue-700 border-2 border-blue-900"></div>
                <div className="absolute top-6 left-0 w-3 h-8 bg-blue-600 border border-blue-800"></div>
                <div className="absolute top-6 right-0 w-3 h-8 bg-blue-600 border border-blue-800"></div>
                <div className="absolute top-16 left-2 w-3 h-10 bg-yellow-400 border border-yellow-600"></div>
                <div className="absolute top-16 right-2 w-3 h-10 bg-yellow-400 border border-yellow-600"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="fixed top-2 left-2 bg-black bg-opacity-60 px-2 py-1 text-yellow-400 z-50" style={{ fontSize: '8px' }}>P1</div>
        
        {/* Options Button */}
        <button
          onClick={() => setShowOptions(true)}
          className="fixed top-4 right-4 bg-gray-800 border-2 border-gray-600 px-4 py-2 hover:bg-gray-700 transition-all text-white text-xs z-50"
          style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
        >
          ⚙️ OPTIONS
        </button>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl mb-4 text-yellow-400 font-bold" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.8)' }}>THE PROGRAM</h1>
            <h2 className="text-2xl text-yellow-400" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.8)' }}>College Football Simulator</h2>
            <p className="text-sm mt-8 text-gray-400">SELECT YOUR PROGRAM</p>
          </div>

          {/* Blue Bloods */}
          <div className="mb-8">
            <button onClick={() => toggleTier('blueBloods')} className="w-full text-left text-xl mb-4 text-red-400 border-4 border-red-400 bg-red-900 p-4 hover:bg-red-800" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>
              <div className="flex justify-between items-center">
                <span>BLUE BLOODS</span>
                <span className="text-sm">{expandedTier === 'blueBloods' ? '▼' : '▶'} ({SCHOOLS.blueBloods.length} TEAMS)</span>
              </div>
            </button>
            {expandedTier === 'blueBloods' && (
              <div className="grid grid-cols-2 gap-2 ml-4">
                {SCHOOLS.blueBloods.map(school => (
                  <button key={school.id} onClick={() => selectSchool(school)} className="bg-red-900 border-2 border-red-600 p-3 hover:bg-red-800 text-left" style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
                    <div className="text-xs mb-1">{school.name}</div>
                    <div className="text-xs text-gray-400 mb-1">{school.conference}</div>
                    <div className="text-green-400 text-xs">{formatCurrency(school.budget)}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Power 4 */}
          <div className="mb-8">
            <button onClick={() => toggleTier('power4')} className="w-full text-left text-xl mb-4 text-blue-400 border-4 border-blue-400 bg-blue-900 p-4 hover:bg-blue-800" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>
              <div className="flex justify-between items-center">
                <span>POWER 4</span>
                <span className="text-sm">{expandedTier === 'power4' ? '▼' : '▶'} ({SCHOOLS.power4.length} TEAMS)</span>
              </div>
            </button>
            {expandedTier === 'power4' && (
              <div className="grid grid-cols-2 gap-2 ml-4">
                {SCHOOLS.power4.map(school => (
                  <button key={school.id} onClick={() => selectSchool(school)} className="bg-blue-900 border-2 border-blue-600 p-3 hover:bg-blue-800 text-left" style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
                    <div className="text-xs mb-1">{school.name}</div>
                    <div className="text-xs text-gray-400 mb-1">{school.conference}</div>
                    <div className="text-green-400 text-xs">{formatCurrency(school.budget)}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Group of 5 */}
          <div>
            <button onClick={() => toggleTier('group5')} className="w-full text-left text-xl mb-4 text-yellow-400 border-4 border-yellow-400 bg-yellow-900 p-4 hover:bg-yellow-800" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>
              <div className="flex justify-between items-center">
                <span>GROUP OF 5</span>
                <span className="text-sm">{expandedTier === 'group5' ? '▼' : '▶'} ({SCHOOLS.group5.length} TEAMS)</span>
              </div>
            </button>
            {expandedTier === 'group5' && (
              <div className="grid grid-cols-2 gap-2 ml-4">
                {SCHOOLS.group5.map(school => (
                  <button key={school.id} onClick={() => selectSchool(school)} className="bg-yellow-900 border-2 border-yellow-600 p-3 hover:bg-yellow-800 text-left" style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
                    <div className="text-xs mb-1">{school.name}</div>
                    <div className="text-xs text-gray-400 mb-1">{school.conference}</div>
                    <div className="text-green-400 text-xs">{formatCurrency(school.budget)}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Coach Name Input Modal */}
        {pendingSchool && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border-4 border-yellow-400 max-w-md w-full p-6" style={{ boxShadow: '12px 12px 0px rgba(0,0,0,0.8)' }}>
              <h2 className="text-xl text-yellow-400 mb-4 text-center">ENTER YOUR NAME</h2>

              <div className="mb-4 text-center">
                <div className="text-sm text-gray-400 mb-2">You've selected:</div>
                <div className="text-lg" style={{ color: pendingSchool.colors.primary }}>
                  {pendingSchool.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">{pendingSchool.conference}</div>
              </div>

              <div className="mb-6">
                <label className="text-xs text-gray-400 block mb-2">COACH NAME:</label>
                <input
                  type="text"
                  value={tempCoachInput}
                  onChange={(e) => setTempCoachInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      confirmSchoolWithCoach();
                    }
                  }}
                  placeholder="Enter your name..."
                  maxLength={30}
                  className="w-full bg-gray-800 border-2 border-gray-600 text-white px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
                  style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setPendingSchool(null);
                    setTempCoachInput('');
                  }}
                  className="flex-1 bg-gray-700 border-2 border-gray-600 text-white py-2 px-4 hover:bg-gray-600 text-xs"
                  style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                >
                  CANCEL
                </button>
                <button
                  onClick={confirmSchoolWithCoach}
                  className="flex-1 bg-yellow-500 border-2 border-yellow-600 text-black font-bold py-2 px-4 hover:bg-yellow-400 text-xs"
                  style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                >
                  START CAREER
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Options Modal */}
        <OptionsModal />
      </div>
    );
  }

  // Main Game Screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white" style={{ fontFamily: '"Press Start 2P", cursive' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        .bg-recruit-light { background-color: #ffffff; }
        .bg-recruit-dark { background-color: #777777; }
        .bg-gray-750 { background-color: #2d3139; }
        .school-primary { background-color: ${selectedSchool.colors.primary}; }
        .school-secondary { background-color: ${selectedSchool.colors.secondary}; }
        .school-accent { color: ${selectedSchool.colors.accent}; }
        .border-school-primary { border-color: ${selectedSchool.colors.primary}; }
        .border-school-secondary { border-color: ${selectedSchool.colors.secondary}; }
      `}</style>
      
      <div className="fixed top-2 left-2 bg-black bg-opacity-60 px-2 py-1 text-yellow-400 z-50" style={{ fontSize: '8px' }}>
        P{activeTab === 'dashboard' ? '2' : activeTab === 'team' ? '3' : activeTab === 'donors' ? '4' : '5'}
      </div>

      {/* Header */}
      <div className="school-primary border-b-4 border-school-secondary p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <div className="text-sm school-accent">{getSchoolDisplayName(selectedSchool)}</div>
            <div className="text-gray-300 mt-1" style={{ fontSize: '8px' }}>{getConferenceDisplayName(selectedSchool.conference)} • {selectedSchool.tier}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-300" style={{ fontSize: '8px' }}>SEASON</div>
            <div className="text-sm school-accent">{currentDate.year}</div>
            <div className="text-gray-300 mt-1" style={{ fontSize: '8px' }}>
              {getCurrentEvent()}
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-300" style={{ fontSize: '8px' }}>REMAINING BUDGET</div>
            <div className={`text-sm ${budgetRemaining < 0 ? 'text-red-400' : budgetRemaining < budget * 0.1 ? 'text-yellow-400' : 'text-green-400'}`}>
              {formatCurrency(budgetRemaining)}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-900 border-b-4 border-school-primary p-2">
        <div className="max-w-7xl mx-auto flex gap-2 justify-between items-center flex-wrap">
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'dashboard', label: 'DASHBOARD', short: 'DASH' },
              { id: 'team', label: 'TEAM', short: 'TEAM' },
              { id: 'recruiting', label: 'RECRUITING', short: 'RECRUIT' },
              { id: 'schools', label: 'SCHOOLS', short: 'SCHOOLS' },
              { id: 'donors', label: 'NIL', short: 'NIL' }
            ].map(tab => {
              const isRecruiting = tab.id === 'recruiting';
              const recruitingClosed = isRecruiting && !isRecruitingOpen();
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 border-2 text-xs whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'school-primary border-school-secondary school-accent' 
                      : recruitingClosed
                        ? 'bg-gray-700 border-gray-600 opacity-60'
                        : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                  }`}
                  style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                >
                  <span className="hidden sm:inline">
                    {tab.label}
                    {recruitingClosed && ' 🔒'}
                  </span>
                  <span className="inline sm:hidden">
                    {tab.short}
                    {recruitingClosed && ' 🔒'}
                  </span>
                </button>
              );
            })}
          </div>
          
          <div className="flex gap-2 items-center">
            {/* Options Button */}
            <button
              onClick={() => setShowOptions(true)}
              className="bg-gray-800 border-2 border-gray-600 px-3 py-2 hover:bg-gray-700 transition-all text-white text-xs"
              style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
            >
              ⚙️
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'dashboard' && (
          <div>
            {/* Messenger - Collapsible */}
            <div className="mb-6">
              <button
                onClick={() => setShowMessenger(!showMessenger)}
                className="w-full bg-gray-800 border-4 border-gray-600 p-4 hover:bg-gray-700 transition-all text-left"
                style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-yellow-400 mb-2">NEWS</div>
                    <div className="text-xs text-gray-300">
                      {roster.filter(p => p.satisfaction === 'Low').length} Critical Alerts
                    </div>
                  </div>
                  <div className="text-2xl text-yellow-400">{showMessenger ? '▼' : '▶'}</div>
                </div>
              </button>
              
              {showMessenger && (
                <div className="mt-4 bg-gray-800 border-4 border-gray-600 p-4 max-h-96 overflow-y-auto" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>
                  <div style={{ fontSize: '10px' }} className="space-y-2">
                    {/* Welcome Message - Always shows first */}
                    <div className="bg-blue-900 border-2 border-blue-600 p-3">
                      <div className="text-blue-400 font-bold mb-2">📰 WELCOME TO YOUR PROGRAM</div>
                      <div className="text-gray-300 leading-relaxed">
                        Welcome, Coach! Use the <span className="text-yellow-400">CALENDAR</span> section below to simulate through the season. Click <span className="text-yellow-400">"SIM TO NEXT EVENT"</span> to advance time and experience key moments like Spring Football, Recruiting Periods, Regular Season games, and the Transfer Portal.
                        <br /><br />
                        Monitor your <span className="text-yellow-400">BUDGET</span> carefully - you must stay under budget before the new season begins. Use the <span className="text-yellow-400">TEAM</span> tab to manage your roster and set your starting lineup.
                        <br /><br />
                        Random events will occur throughout the season - handle NIL negotiations, portal threats, injuries, and more. Good luck!
                      </div>
                    </div>
                    
                    {/* Player Satisfaction Alerts - Show ALL with proper actions */}
                    <div className="max-h-96 overflow-y-auto space-y-2">
                      {roster
                        .filter(p => p.satisfaction === 'Low' && !dismissedAlerts.includes(p.id))
                        .map(player => {
                          const nilIncrease = Math.round(player.currentNIL * 0.2);
                          const canAfford = budgetRemaining >= nilIncrease;
                          
                          return (
                            <div key={player.id} className="bg-gray-900 border-2 border-red-700 p-3">
                              <div className="flex justify-between items-start gap-3">
                                <div className="flex-1">
                                  <div className="text-white font-bold mb-1">
                                    <span className="text-red-400">⚠</span> {player.name} ({player.position})
                                  </div>
                                  <div className="text-gray-400 text-xs">
                                    {player.year} • {'⭐'.repeat(player.stars)} • Rating: {player.rating}
                                  </div>
                                  <div className="text-gray-400 text-xs mt-1">
                                    Current NIL: {formatCurrency(player.currentNIL)} • Market Value: {formatCurrency(player.marketValue)}
                                  </div>
                                  <div className="text-red-400 text-xs mt-1">
                                    Underpaid by {((1 - player.currentNIL / player.marketValue) * 100).toFixed(0)}% - HIGH PORTAL RISK
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1" style={{ fontSize: '8px' }}>
                                  <button
                                    onClick={() => {
                                      if (canAfford) {
                                        const updatedRoster = roster.map(p => {
                                          if (p.id === player.id) {
                                            const newNIL = p.currentNIL + nilIncrease;
                                            const newPayPercent = newNIL / p.marketValue;
                                            return {
                                              ...p,
                                              currentNIL: newNIL,
                                              satisfaction: newPayPercent >= 0.85 ? 'High' : newPayPercent >= 0.70 ? 'Medium' : 'Low'
                                            };
                                          }
                                          return p;
                                        });
                                        setRoster(updatedRoster);
                                        setBudgetAllocated(prev => prev + nilIncrease);
                                      } else {
                                        alert(`Insufficient budget!\n\nNeed: ${formatCurrency(nilIncrease)}\nAvailable: ${formatCurrency(budgetRemaining)}`);
                                      }
                                    }}
                                    className={`${canAfford ? 'bg-green-700 hover:bg-green-600 border-green-500' : 'bg-gray-600 border-gray-500 cursor-not-allowed'} border px-2 py-1 text-white whitespace-nowrap`}
                                    disabled={!canAfford}
                                  >
                                    {canAfford ? `✓ Raise +20%` : `✗ Can't Afford`}
                                    <div className="text-xs">{formatCurrency(nilIncrease)}</div>
                                  </button>
                                  <button
                                    onClick={() => {
                                      // Dismiss/Decline - keep player at current NIL, remove from alerts
                                      setDismissedAlerts(prev => [...prev, player.id]);
                                    }}
                                    className="bg-red-700 hover:bg-red-600 border border-red-500 px-2 py-1 text-white whitespace-nowrap"
                                  >
                                    Decline Request
                                  </button>
                                  <button
                                    onClick={() => {
                                      setActiveTab('team');
                                      // Expand the correct section
                                      if (OFFENSIVE_POSITIONS.includes(player.position)) {
                                        setOffenseExpanded(true);
                                        setOffensePositionExpanded(prev => ({ ...prev, [player.position]: true }));
                                      } else if (DEFENSIVE_POSITIONS.includes(player.position)) {
                                        setDefenseExpanded(true);
                                        setDefensePositionExpanded(prev => ({ ...prev, [player.position]: true }));
                                      } else if (SPECIAL_TEAMS_POSITIONS.includes(player.position)) {
                                        setSpecialTeamsExpanded(true);
                                        setSpecialTeamsPositionExpanded(prev => ({ ...prev, [player.position]: true }));
                                      }
                                    }}
                                    className="bg-blue-700 hover:bg-blue-600 border border-blue-500 px-2 py-1 text-white whitespace-nowrap"
                                  >
                                    View in Team
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    
                    {roster.filter(p => p.satisfaction === 'Low' && !dismissedAlerts.includes(p.id)).length === 0 && (
                      <div className="text-gray-400 bg-gray-900 border-2 border-gray-700 p-3 text-center">
                        {roster.filter(p => p.satisfaction === 'Low').length > 0 
                          ? `All ${roster.filter(p => p.satisfaction === 'Low').length} critical alerts have been addressed`
                          : 'No critical alerts at this time'}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Calendar - Collapsible */}
            <div className="mb-6">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full bg-gray-800 border-4 border-gray-600 p-4 hover:bg-gray-700 transition-all text-left"
                style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-yellow-400 mb-2">CALENDAR</div>
                    <div className="text-xs text-gray-300">
                      {formatDate(currentDate)} • {getUpcomingEvents().length} Upcoming Events
                    </div>
                  </div>
                  <div className="text-2xl text-yellow-400">{showCalendar ? '▼' : '▶'}</div>
                </div>
              </button>
              
              {showCalendar && (
                <div className="mt-4 bg-gray-800 border-4 border-gray-600 p-4" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>
                  <div className="text-center mb-4">
                    <div className="text-lg text-white mb-4 flex items-center justify-center gap-3">
                      <span>{formatDate(currentDate)}</span>
                      <svg width="24" height="16" viewBox="0 0 24 16" className="inline-block">
                        <rect x="4" y="0" width="16" height="4" fill="white"/>
                        <rect x="2" y="4" width="20" height="8" fill="white"/>
                        <rect x="4" y="12" width="16" height="4" fill="white"/>
                        <rect x="0" y="6" width="2" height="4" fill="white"/>
                        <rect x="22" y="6" width="2" height="4" fill="white"/>
                        <rect x="11" y="4" width="2" height="8" fill="#1f2937"/>
                        <rect x="8" y="7" width="8" height="2" fill="#1f2937"/>
                      </svg>
                      <span>{getCurrentEvent()}</span>
                    </div>
                    
                    <button
                      onClick={() => {
                        console.log('SIM TO NEXT EVENT clicked. offSeasonWeek:', offSeasonWeek);
                        simulateToNextEvent();
                      }}
                      disabled={offSeasonWeek !== null && offSeasonWeek <= 16}
                      className={`px-6 py-3 border-4 border-gray-300 text-sm font-bold transition-all ${
                        offSeasonWeek !== null && offSeasonWeek <= 16
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                          : 'bg-white text-black hover:bg-gray-200'
                      }`}
                      style={{ boxShadow: '6px 6px 0px rgba(0,0,0,0.5)' }}
                    >
                      SIM TO NEXT EVENT ▶
                    </button>
                    
                    {offSeasonWeek !== null && offSeasonWeek <= 16 && (
                      <div className="text-xs text-yellow-400 mt-2">
                        ⚠ Complete all 16 recruiting weeks first (Week {offSeasonWeek}/16)
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-400 mt-4">
                      Next Event: {getUpcomingEvents()[0]?.title || 'None'}
                    </div>
                    
                    {getCurrentEvent()?.includes('Regular Season') && (
                      <div className="mt-3 bg-blue-900 border-2 border-blue-600 p-2 text-xs text-blue-200">
                        💡 <span className="text-blue-300 font-bold">Recruiting Tip:</span> Regular Season recruiting is open! 
                        Visit the <span className="text-yellow-400">RECRUITING</span> tab to spend your weekly points (half points during season).
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Budget Overview - Collapsible */}
            <div className="mb-6">
              <button
                onClick={() => setShowBudgetBreakdown(!showBudgetBreakdown)}
                className="w-full bg-gray-800 border-4 border-gray-600 p-4 hover:bg-gray-700 transition-all text-left"
                style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-yellow-400 mb-2">BUDGET OVERVIEW</div>
                    <div className="text-xs text-gray-300">{formatCurrency(totalAllocated)} / {formatCurrency(budget)} ({budgetUtilization}% utilized)</div>
                  </div>
                  <div className="text-2xl text-yellow-400">{showBudgetBreakdown ? '▼' : '▶'}</div>
                </div>
              </button>
              
              {showBudgetBreakdown && (
                <div className="mt-4 bg-gray-800 border-4 border-gray-600 p-4" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>
                  <div className="mb-4 flex justify-between items-center">
                    <div className="text-xs text-gray-300">BUDGET ALLOCATION</div>
                    <div className="text-xs text-gray-300">{formatCurrency(totalAllocated)} / {formatCurrency(budget)}</div>
                  </div>
                  
                  <div 
                    className="relative w-full h-16 bg-gray-900 border-4 border-gray-700 overflow-hidden group cursor-pointer"
                    style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                    title={`Total Utilization: ${budgetUtilization}%`}
                  >
                    <div 
                      className="absolute top-0 left-0 h-full transition-all duration-500"
                      style={{ 
                        width: `${(budgetAllocated / budget) * 100}%`,
                        backgroundColor: selectedSchool.colors.primary
                      }}
                    ></div>
                    
                    <div 
                      className="absolute top-0 h-full transition-all duration-500"
                      style={{ 
                        left: `${(budgetAllocated / budget) * 100}%`,
                        width: `${(incomingFreshmanBudget / budget) * 100}%`,
                        backgroundColor: selectedSchool.colors.secondary
                      }}
                    ></div>
                    
                    <div 
                      className="absolute top-0 h-full transition-all duration-500"
                      style={{ 
                        left: `${((budgetAllocated + incomingFreshmanBudget) / budget) * 100}%`,
                        width: `${(transferAdditionsBudget / budget) * 100}%`,
                        backgroundColor: selectedSchool.colors.accent,
                        opacity: 0.8
                      }}
                    ></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                      <div className="text-2xl font-bold text-white">{budgetUtilization}%</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-700" style={{ backgroundColor: selectedSchool.colors.primary }}></div>
                      <div>
                        <div className="text-gray-300">Current Roster</div>
                        <div style={{ color: selectedSchool.colors.primary }}>{formatCurrency(budgetAllocated)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-700" style={{ backgroundColor: selectedSchool.colors.secondary }}></div>
                      <div>
                        <div className="text-gray-300">Incoming Freshman</div>
                        <div style={{ color: selectedSchool.colors.secondary }}>{formatCurrency(incomingFreshmanBudget)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-700" style={{ backgroundColor: selectedSchool.colors.accent }}></div>
                      <div>
                        <div className="text-gray-300">Transfer Additions</div>
                        <div style={{ color: selectedSchool.colors.accent }}>{formatCurrency(transferAdditionsBudget)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t-2 border-gray-700 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-gray-400">REMAINING</div>
                      <div className="text-lg text-purple-400">{formatCurrency(budgetRemaining)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">TOTAL ALLOCATED</div>
                      <div className="text-lg text-green-400">{formatCurrency(totalAllocated)}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Roster Overview - Collapsible */}
            <div className="mb-6">
              <button
                onClick={() => setShowRosterBreakdown(!showRosterBreakdown)}
                className="w-full bg-gray-800 border-4 border-gray-600 p-4 hover:bg-gray-700 transition-all text-left"
                style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-yellow-400 mb-2">ROSTER OVERVIEW</div>
                    <div className="text-xs text-gray-300">
                      {roster.length}/85 Players • {roster.filter(p => p.satisfaction === 'High').length} Happy • {roster.filter(p => p.satisfaction === 'Low').length} Unhappy
                    </div>
                  </div>
                  <div className="text-2xl text-yellow-400">{showRosterBreakdown ? '▼' : '▶'}</div>
                </div>
              </button>
              
              {showRosterBreakdown && (
                <div className="mt-4 bg-gray-800 border-4 border-gray-600 p-4" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>
                  <div className="mb-4 pb-4 border-b-2 border-gray-700">
                    <div className="flex justify-between items-center flex-wrap gap-2" style={{ fontSize: '9px' }}>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400">Total:</span>
                          <span className="text-white font-bold">{roster.length}/85</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-green-400 font-bold">{roster.filter(p => p.satisfaction === 'High').length}</span>
                          <span className="text-gray-400">😊</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400 font-bold">{roster.filter(p => p.satisfaction === 'Medium').length}</span>
                          <span className="text-gray-400">😐</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-red-400 font-bold">{roster.filter(p => p.satisfaction === 'Low').length}</span>
                          <span className="text-gray-400">😠</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span className="text-purple-400 font-bold">{roster.filter(p => p.stars === 5).length}</span>
                          <span className="text-gray-400">⭐⭐⭐⭐⭐</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-blue-400 font-bold">{roster.filter(p => p.stars === 4).length}</span>
                          <span className="text-gray-400">⭐⭐⭐⭐</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-green-400 font-bold">{roster.filter(p => p.stars === 3).length}</span>
                          <span className="text-gray-400">⭐⭐⭐</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400 font-bold">{roster.filter(p => p.stars === 2).length}</span>
                          <span className="text-gray-500">Other</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 pb-6 border-b-2 border-gray-700">
                    <h4 className="text-xs text-gray-400 mb-3">BY POSITION</h4>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-2" style={{ fontSize: '10px' }}>
                      {POSITIONS.map(position => {
                        const count = roster.filter(p => p.position === position).length;
                        const target = POSITION_TARGETS[position];
                        const isAtOrAboveTarget = count >= target;
                        return (
                          <div 
                            key={position} 
                            className="bg-gray-900 border-2 border-gray-700 p-2 text-center cursor-help"
                            title={`Target: ${target} players`}
                          >
                            <div className="text-gray-400">{position}</div>
                            <div className={`text-lg font-bold ${isAtOrAboveTarget ? 'text-green-400' : 'text-red-400'}`}>
                              {count}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs text-gray-400 mb-3">BY CLASS</h4>
                    <div className="grid grid-cols-5 gap-4" style={{ fontSize: '10px' }}>
                      {YEARS.map(year => {
                        const count = roster.filter(p => p.year === year).length;
                        const yearLabel = year === 'FR' ? 'Freshman' : year === 'SO' ? 'Sophomore' : year === 'JR' ? 'Junior' : year === 'SR' ? 'Senior' : '5th Year';
                        return (
                          <div key={year} className="bg-gray-900 border-2 border-gray-700 p-3 text-center">
                            <div className="text-gray-400">{yearLabel}</div>
                            <div className="text-2xl text-white">{count}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recruiting Overview - Collapsible */}
            <div className="mb-6">
              <button
                onClick={() => setShowRecruitingOverview(!showRecruitingOverview)}
                className="w-full bg-gray-800 border-4 border-gray-600 p-4 hover:bg-gray-700 transition-all text-left"
                style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-yellow-400 mb-2">RECRUITING OVERVIEW</div>
                    <div className="text-xs text-gray-300">
                      {(() => {
                        const fifthYears = roster.filter(p => p.year === '5Y').length;
                        const seniors = roster.filter(p => p.year === 'SR').length;
                        const nflEligibleJuniors = roster.filter(p => p.year === 'JR' && p.rating >= 93).length;
                        const expectedDepartures = fifthYears + Math.ceil(seniors * 0.75) + nflEligibleJuniors;
                        const openSpots = 85 - roster.length + expectedDepartures;
                        const currentCommits = recruits.filter(r => r.verbalCommit && r.committedSchool?.id === selectedSchool?.id).length;
                        return `${openSpots} Expected Open Spots • ${currentCommits} Commit${currentCommits !== 1 ? 's' : ''}`;
                      })()}
                    </div>
                  </div>
                  <div className="text-2xl text-yellow-400">{showRecruitingOverview ? '▼' : '▶'}</div>
                </div>
              </button>
              
              {showRecruitingOverview && (
                <div className="mt-4 bg-gray-800 border-4 border-gray-600 p-4" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>
                  <div className="mb-4 pb-4 border-b-2 border-gray-700">
                    <div className="text-xs text-gray-400 mb-2">CLASS PROJECTION</div>
                    <div className="grid grid-cols-2 gap-4" style={{ fontSize: '10px' }}>
                      <div className="bg-gray-900 border-2 border-gray-700 p-3">
                        <div className="text-gray-400 mb-1">Expected Departures</div>
                        <div className="text-2xl text-red-400">
                          {(() => {
                            const fifthYears = roster.filter(p => p.year === '5Y').length;
                            const seniors = roster.filter(p => p.year === 'SR').length;
                            const nflEligibleJuniors = roster.filter(p => p.year === 'JR' && p.rating >= 93).length;
                            return fifthYears + Math.ceil(seniors * 0.75) + nflEligibleJuniors;
                          })()}
                        </div>
                        <div className="text-gray-500 text-xs mt-2 space-y-1">
                          <div>{roster.filter(p => p.year === '5Y').length} 5th Year</div>
                          <div>{Math.ceil(roster.filter(p => p.year === 'SR').length * 0.75)} Seniors</div>
                          {roster.filter(p => p.year === 'JR' && p.rating >= 93).length > 0 && (
                            <div className="text-purple-400">
                              {roster.filter(p => p.year === 'JR' && p.rating >= 93).length} Early Pro Departures
                            </div>
                          )}
                        </div>
                        {/* Budget Relief from Departures */}
                        <div className="mt-3 pt-2 border-t border-gray-700">
                          <div className="text-gray-400 mb-1">Budget Relief</div>
                          <div className="text-lg text-green-400 font-bold">
                            {(() => {
                              const fifthYearPlayers = roster.filter(p => p.year === '5Y');
                              const seniorPlayers = roster.filter(p => p.year === 'SR');
                              const nflJuniors = roster.filter(p => p.year === 'JR' && p.rating >= 93);
                              
                              const fifthYearNIL = fifthYearPlayers.reduce((sum, p) => sum + p.currentNIL, 0);
                              const seniorDepartureNIL = Math.round(seniorPlayers.reduce((sum, p) => sum + p.currentNIL, 0) * 0.75);
                              const nflJuniorNIL = nflJuniors.reduce((sum, p) => sum + p.currentNIL, 0);
                              
                              return formatCurrency(fifthYearNIL + seniorDepartureNIL + nflJuniorNIL);
                            })()}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-900 border-2 border-gray-700 p-3">
                        <div className="text-gray-400 mb-1">Available Spots</div>
                        <div className="text-2xl text-green-400">
                          {(() => {
                            const fifthYears = roster.filter(p => p.year === '5Y').length;
                            const seniors = roster.filter(p => p.year === 'SR').length;
                            const nflEligibleJuniors = roster.filter(p => p.year === 'JR' && p.rating >= 93).length;
                            const expectedDepartures = fifthYears + Math.ceil(seniors * 0.75) + nflEligibleJuniors;
                            const currentCommits = recruits.filter(r => r.verbalCommit && r.committedSchool?.id === selectedSchool?.id).length;
                            return 85 - roster.length + expectedDepartures - currentCommits;
                          })()}
                        </div>
                        <div className="text-gray-500 text-xs mt-2">
                          {85 - roster.length} Current Open +{' '}
                          {(() => {
                            const fifthYears = roster.filter(p => p.year === '5Y').length;
                            const seniors = roster.filter(p => p.year === 'SR').length;
                            const nflEligibleJuniors = roster.filter(p => p.year === 'JR' && p.rating >= 93).length;
                            return fifthYears + Math.ceil(seniors * 0.75) + nflEligibleJuniors;
                          })()}{' '}
                          Departures
                          {(() => {
                            const currentCommits = recruits.filter(r => r.verbalCommit && r.committedSchool?.id === selectedSchool?.id).length;
                            return currentCommits > 0 ? ` - ${currentCommits} Commits` : '';
                          })()}
                        </div>
                        {/* NIL Already Promised to Commits */}
                        <div className="mt-3 pt-2 border-t border-gray-700">
                          <div className="text-gray-400 mb-1">NIL Promised</div>
                          <div className="text-lg text-yellow-400 font-bold">
                            {(() => {
                              const committedNIL = recruits
                                .filter(r => r.verbalCommit && r.committedSchool?.id === selectedSchool?.id)
                                .reduce((sum, r) => sum + (r.nilDeal || 0), 0);
                              return formatCurrency(committedNIL);
                            })()}
                          </div>                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400 mb-2">CURRENT COMMITS</div>
                    {recruits.filter(r => r.verbalCommit && r.committedSchool?.id === selectedSchool?.id).length === 0 ? (
                      <div className="bg-gray-900 border-2 border-gray-700 p-4 text-center">
                        <div className="text-gray-400" style={{ fontSize: '10px' }}>
                          No commits yet - Start recruiting to build your class!
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {recruits.filter(r => r.verbalCommit && r.committedSchool?.id === selectedSchool?.id).map(recruit => (
                          <div key={recruit.id} className="bg-gray-900 border-2 border-blue-600 p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="text-white font-bold text-sm">{recruit.name}</div>
                                <div className="text-gray-400 text-xs mt-1">
                                  {recruit.position} • {recruit.hometown}, {recruit.state}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-yellow-400 text-xs">{'⭐'.repeat(recruit.stars)}</span>
                                  <span className="text-white text-xs">
                                    {recruit.interest >= 50 ? recruit.rating : '??'} OVR
                                  </span>
                                  {recruit.isGenerational && recruit.interest >= 50 && <span className="text-xs">🏆</span>}
                                  {recruit.isDiamond && recruit.interest >= 50 && <span className="text-xs">💎</span>}
                                  {recruit.signingDayDecision && <span className="text-xs">📅</span>}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-green-400 text-sm font-bold">{formatCurrency(recruit.nilDeal)}</div>
                                {recruit.signedCommit ? (
                                  <div className="text-green-400 text-xs mt-1">📝 Signed</div>
                                ) : (
                                  <>
                                    <div className="text-blue-400 text-xs mt-1">🤝 Verbal</div>
                                    {isSigningPeriod() && (
                                      <button
                                        onClick={() => handleSignRecruit(recruit)}
                                        className="mt-2 bg-yellow-600 border-2 border-yellow-400 px-2 py-1 text-xs hover:bg-yellow-500"
                                        style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                                      >
                                        📝 SIGN
                                      </button>
                                    )}
                                    {/* Push for Early Signature button during playoffs */}
                                    {(() => {
                                      const currentEvent = getCurrentEvent();
                                      const isPlayoffPeriod = currentEvent && (
                                        currentEvent.includes('Playoff') ||
                                        currentEvent.includes('Championship') ||
                                        currentEvent.includes('Conference')
                                      );
                                      const alreadyPushed = pushForSignatureUsed[recruit.id];

                                      return isPlayoffPeriod && !alreadyPushed && (
                                        <button
                                          onClick={() => {
                                            setPushingRecruit(recruit);
                                            setShowPushModal(true);
                                          }}
                                          className="mt-2 bg-purple-600 border-2 border-purple-400 px-2 py-1 text-xs hover:bg-purple-500"
                                          style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                                        >
                                          🚀 PUSH TO SIGN
                                        </button>
                                      );
                                    })()}
                                    {!isSigningPeriod() && (() => {
                                      // In-state recruits with 100% interest are locked in
                                      const isInState = recruit.state === selectedSchool?.state;
                                      const hasMaxInterest = recruit.interest >= 100;
                                      const isLockedIn = isInState && hasMaxInterest;

                                      return isLockedIn ? (
                                        <div className="text-green-400 text-xs mt-1">🔒 Locked In</div>
                                      ) : (
                                        <div className="text-yellow-400 text-xs mt-1">⚠ Can flip</div>
                                      );
                                    })()}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Class Summary */}
                        <div className="bg-gray-800 border-2 border-gray-600 p-3 mt-3">
                          <div className="text-xs text-gray-400 mb-2">CLASS SUMMARY</div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-400">Total Commits:</span>
                              <span className="text-white ml-2">{recruits.filter(r => r.verbalCommit && r.committedSchool?.id === selectedSchool?.id).length}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Total NIL:</span>
                              <span className="text-green-400 ml-2">
                                {formatCurrency(recruits.filter(r => r.verbalCommit && r.committedSchool?.id === selectedSchool?.id).reduce((sum, r) => sum + r.nilDeal, 0))}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400">Signed:</span>
                              <span className="text-yellow-400 ml-2">{recruits.filter(r => r.signedCommit && r.committedSchool?.id === selectedSchool?.id).length}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Unsigned:</span>
                              <span className="text-blue-400 ml-2">{recruits.filter(r => r.verbalCommit && !r.signedCommit && r.committedSchool?.id === selectedSchool?.id).length}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Class Rankings - Show only if there are signed recruits */}
                        {recruits.filter(r => r.signedCommit).length > 0 && (() => {
                          const allSchools = [...SCHOOLS.blueBloods, ...SCHOOLS.power4, ...SCHOOLS.group5];
                          const rankings = calculateClassRankings(recruits, allSchools, selectedSchool.id);
                          const playerClass = rankings.playerClass;
                          
                          if (!playerClass) return null;
                          
                          return (
                            <div className="mt-4 bg-gradient-to-r from-purple-900 to-purple-800 border-2 border-purple-500 p-3">
                              <div className="text-xs text-purple-300 mb-2 font-bold">🏆 CLASS RANKINGS</div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-900 border border-purple-600 p-2">
                                  <div className="text-xs text-gray-400">National Rank</div>
                                  <div className="text-2xl font-bold text-yellow-400">#{playerClass.nationalRank}</div>
                                  <div className="text-xs text-gray-400 mt-1">of 134 teams</div>
                                </div>
                                <div className="bg-gray-900 border border-purple-600 p-2">
                                  <div className="text-xs text-gray-400">Conference Rank</div>
                                  <div className="text-2xl font-bold text-green-400">#{playerClass.conferenceRank}</div>
                                  <div className="text-xs text-gray-400 mt-1">in {selectedSchool.conference}</div>
                                </div>
                                <div className="bg-gray-900 border border-purple-600 p-2">
                                  <div className="text-xs text-gray-400">Total Points</div>
                                  <div className="text-xl font-bold text-blue-400">{playerClass.totalPoints}</div>
                                  <div className="text-xs text-gray-400 mt-1">{playerClass.signedCount} signees</div>
                                </div>
                                <div className="bg-gray-900 border border-purple-600 p-2">
                                  <div className="text-xs text-gray-400">Avg Stars</div>
                                  <div className="text-xl font-bold text-yellow-400">{playerClass.avgStars.toFixed(2)} ⭐</div>
                                  <div className="text-xs text-yellow-400 mt-1">{'⭐'.repeat(Math.round(playerClass.avgStars))}</div>
                                </div>
                              </div>
                              
                              {/* Top 3 in Conference */}
                              {playerClass.conferenceRank <= 3 && (
                                <div className="mt-2 bg-green-900 border border-green-600 p-2 text-center">
                                  <div className="text-xs text-green-400 font-bold">
                                    🎯 TOP 3 IN {selectedSchool.conference.toUpperCase()}!
                                  </div>
                                </div>
                              )}
                              
                              {/* Top 10 National */}
                              {playerClass.nationalRank <= 10 && (
                                <div className="mt-2 bg-yellow-900 border border-yellow-600 p-2 text-center">
                                  <div className="text-xs text-yellow-400 font-bold">
                                    🏆 TOP 10 NATIONAL CLASS!
                                  </div>
                                </div>
                              )}
                              
                              {/* Top 25 National */}
                              {playerClass.nationalRank <= 25 && playerClass.nationalRank > 10 && (
                                <div className="mt-2 bg-blue-900 border border-blue-600 p-2 text-center">
                                  <div className="text-xs text-blue-400 font-bold">
                                    📊 TOP 25 NATIONAL CLASS
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                        
                        {/* Signed Class Display */}
                        {recruits.filter(r => r.signedCommit && r.committedSchool?.id === selectedSchool.id).length > 0 && (
                          <div className="mt-4 bg-yellow-900 border-2 border-yellow-600 p-3">
                            <div className="text-xs text-yellow-400 mb-2 font-bold">📝 SIGNED CLASS ({recruits.filter(r => r.signedCommit && r.committedSchool?.id === selectedSchool.id).length})</div>
                            <div className="space-y-1">
                              {recruits.filter(r => r.signedCommit && r.committedSchool?.id === selectedSchool.id).map(recruit => (
                                <div key={recruit.id} className="bg-gray-900 border border-yellow-600 p-2 flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <span className="text-white text-xs">{recruit.name}</span>
                                    <span className="text-gray-400 text-xs">{recruit.position}</span>
                                    <span className="text-yellow-400 text-xs">{'⭐'.repeat(recruit.stars)}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-white text-xs">{recruit.rating}</span>
                                    <span className="text-green-400 text-xs">{formatCurrency(recruit.nilDeal)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div>
            {/* COACH PROFILE SECTION */}
            <div className="mb-6">
              <button
                onClick={() => setShowCoachProfile(!showCoachProfile)}
                className="w-full bg-gray-800 border-4 border-gray-600 p-4 hover:border-yellow-500 transition-all"
                style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-left">
                    <h3 className="text-xs font-bold text-yellow-400">COACH</h3>
                    <p className="text-white mt-1 text-sm">{coachName || 'Unknown Coach'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`text-sm font-bold ${
                      coachSuccess >= 80 ? 'text-green-400' :
                      coachSuccess >= 60 ? 'text-blue-400' :
                      coachSuccess >= 40 ? 'text-yellow-400' :
                      coachSuccess >= 20 ? 'text-orange-400' : 'text-red-400'
                    }`}>
                      {coachSuccess}%
                    </div>
                    {showCoachProfile ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {/* Success Bar */}
                <div className="w-full bg-gray-700 h-3 border-2 border-gray-900 relative">
                  <div
                    className={`h-full transition-all ${
                      coachSuccess >= 80 ? 'bg-green-500' :
                      coachSuccess >= 60 ? 'bg-blue-500' :
                      coachSuccess >= 40 ? 'bg-yellow-500' :
                      coachSuccess >= 20 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${coachSuccess}%` }}
                  />
                </div>

                {/* Status message */}
                <div className="mt-1 text-xs">
                  {selectedSchool?.tier === 'Blue Blood' && (
                    <div>
                      {coachSuccess >= 90 && <span className="text-green-400">🔥 Elite Coach - Job Secure</span>}
                      {coachSuccess >= 75 && coachSuccess < 90 && <span className="text-yellow-400">⚠ Meeting Expectations</span>}
                      {coachSuccess >= 60 && coachSuccess < 75 && <span className="text-orange-400">⚠ Hot Seat - Need Results</span>}
                      {coachSuccess < 60 && <span className="text-red-400">🚨 DANGER - At Risk of Firing</span>}
                    </div>
                  )}
                  {selectedSchool?.tier === 'Power 4' && (
                    <div>
                      {coachSuccess >= 80 && <span className="text-green-400">🔥 Elite Coach - Job Secure</span>}
                      {coachSuccess >= 60 && coachSuccess < 80 && <span className="text-yellow-400">⚠ Meeting Expectations</span>}
                      {coachSuccess >= 40 && coachSuccess < 60 && <span className="text-orange-400">⚠ Hot Seat - Need Results</span>}
                      {coachSuccess < 40 && <span className="text-red-400">🚨 DANGER - At Risk of Firing</span>}
                    </div>
                  )}
                  {selectedSchool?.tier === 'Group of 5' && (
                    <div>
                      {coachSuccess >= 70 && <span className="text-green-400">🔥 Elite Coach - Job Secure</span>}
                      {coachSuccess >= 40 && coachSuccess < 70 && <span className="text-yellow-400">⚠ Meeting Expectations</span>}
                      {coachSuccess >= 20 && coachSuccess < 40 && <span className="text-orange-400">⚠ Hot Seat - Need Results</span>}
                      {coachSuccess < 20 && <span className="text-red-400">🚨 DANGER - At Risk of Firing</span>}
                    </div>
                  )}
                </div>
              </button>

              {showCoachProfile && (
                <div className="bg-gray-900 border-4 border-t-0 border-gray-600 p-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {/* Career Record */}
                    <div className="bg-gray-800 border-2 border-gray-700 p-3">
                      <div className="text-xs text-gray-400 mb-1">CAREER RECORD</div>
                      <div className="text-lg font-bold">
                        <span className="text-green-400">{coachRecord.wins}</span>
                        <span className="text-gray-500"> - </span>
                        <span className="text-red-400">{coachRecord.losses}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {coachRecord.wins + coachRecord.losses > 0
                          ? `${((coachRecord.wins / (coachRecord.wins + coachRecord.losses)) * 100).toFixed(1)}% Win Rate`
                          : 'No games played'}
                      </div>
                    </div>

                    {/* Vs Rivals - Record + List */}
                    <div className="bg-gray-800 border-2 border-gray-700 p-3">
                      <div className="text-xs text-gray-400 mb-1">RECORD VS RIVALS</div>
                      <div className="text-sm font-bold">
                        <span className="text-green-400">{coachRivalRecord.wins}</span>
                        <span className="text-gray-500"> - </span>
                        <span className="text-red-400">{coachRivalRecord.losses}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 mb-3">
                        {coachRivalRecord.wins + coachRivalRecord.losses > 0
                          ? `${((coachRivalRecord.wins / (coachRivalRecord.wins + coachRivalRecord.losses)) * 100).toFixed(1)}% Win Rate`
                          : 'No rival games played'}
                      </div>

                      {/* Rivals List */}
                      <div className="space-y-1 mt-2 pt-2 border-t border-gray-700">
                        {RIVALRIES[selectedSchool?.id]?.map(rivalId => {
                          const allSchools = [...SCHOOLS.blueBloods, ...SCHOOLS.power4, ...SCHOOLS.group5];
                          const rivalSchool = allSchools.find(s => s.id === rivalId);
                          if (!rivalSchool) return null;
                          return (
                            <div key={rivalId} className="flex items-center gap-1 text-xs">
                              <div
                                className="w-2 h-2 border border-gray-600"
                                style={{ backgroundColor: rivalSchool.colors.primary }}
                              />
                              <span className="text-white text-xs" style={{ fontSize: '10px' }}>{rivalSchool.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Championships */}
                    <div className="bg-gray-800 border-2 border-gray-700 p-3">
                      <div className="text-xs text-gray-400 mb-2">CHAMPIONSHIPS</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">National:</span>
                          <span className="text-yellow-400 font-bold">{coachChampionships.national}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Conference:</span>
                          <span className="text-blue-400 font-bold">{coachChampionships.conference}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bowl Wins:</span>
                          <span className="text-green-400 font-bold">{coachChampionships.bowlWins}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Success Boost Values */}
                  <div className="bg-gray-800 border-2 border-gray-700 p-3 mt-4">
                    <div className="text-xs text-gray-400 mb-2">Success Boost Values ({selectedSchool?.tier}):</div>
                    {selectedSchool?.tier === 'Blue Blood' && (
                      <div className="space-y-1 text-xs">
                        <div>• National Championship: <span className="text-yellow-400">+20%</span></div>
                        <div>• Conference Championship: <span className="text-blue-400">+10%</span></div>
                        <div>• Bowl Win: <span className="text-green-400">+5%</span></div>
                        <div>• Season Win: <span className="text-gray-300">+1%</span></div>
                      </div>
                    )}
                    {selectedSchool?.tier === 'Power 4' && (
                      <div className="space-y-1 text-xs">
                        <div>• National Championship: <span className="text-yellow-400">+30%</span></div>
                        <div>• Conference Championship: <span className="text-blue-400">+15%</span></div>
                        <div>• Bowl Win: <span className="text-green-400">+8%</span></div>
                        <div>• Season Win: <span className="text-gray-300">+1.5%</span></div>
                      </div>
                    )}
                    {selectedSchool?.tier === 'Group of 5' && (
                      <div className="space-y-1 text-xs">
                        <div>• National Championship: <span className="text-yellow-400">+40%</span></div>
                        <div>• Conference Championship: <span className="text-blue-400">+20%</span></div>
                        <div>• Bowl Win: <span className="text-green-400">+12%</span></div>
                        <div>• Season Win: <span className="text-gray-300">+2%</span></div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* SCHEDULE SECTION */}
            {seasonSchedule.length > 0 && (
              <div className="mb-6">
                <button
                  onClick={() => setScheduleExpanded(!scheduleExpanded)}
                  className="w-full bg-gray-800 border-4 border-gray-600 p-4 hover:border-yellow-500 transition-all flex justify-between items-center"
                  style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}
                >
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-yellow-400">
                      📅 SEASON SCHEDULE
                    </h3>
                    <p className="text-gray-400 mt-1 text-xs">
                      {seasonRecord.wins}-{seasonRecord.losses}
                      {seasonRecord.wins + seasonRecord.losses > 0 && (
                        <span className="ml-2">
                          ({seasonRecord.confWins}-{seasonRecord.confLosses} Conf)
                        </span>
                      )}
                      {seasonRecord.wins + seasonRecord.losses === 0 && (
                        <span className="ml-2">12 Games Scheduled</span>
                      )}
                    </p>
                  </div>
                  {scheduleExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {scheduleExpanded && (
                  <div className="bg-gray-900 border-4 border-t-0 border-gray-600 p-4" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>
                    <div className="space-y-2">
                    {seasonSchedule.map((game, index) => {
                      const gameResult = gameResults.find(r => r.week === game.week);
                      const isPlayed = gameResult !== undefined;
                      const won = gameResult && gameResult.userScore > gameResult.opponentScore;
                      const lost = gameResult && gameResult.userScore < gameResult.opponentScore;

                      return (
                        <div
                          key={index}
                          className={`border-2 p-3 ${
                            isPlayed
                              ? won
                                ? 'bg-green-900 border-green-600'
                                : 'bg-red-900 border-red-600'
                              : game.week === currentGameWeek
                              ? 'bg-blue-900 border-blue-500'
                              : 'bg-gray-900 border-gray-700'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="text-xs font-bold text-yellow-400 w-16">
                                WEEK {game.week}
                              </div>
                              <div>
                                <div className="text-sm font-bold">
                                  {game.isHome ? 'vs' : '@'} {getSchoolDisplayName(game.opponent)}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  {game.isNeutralSite && (
                                    <span className="text-purple-400">⚡ {game.neutralSiteVenue}</span>
                                  )}
                                  {game.isRivalry && !game.isNeutralSite && (
                                    <span className="text-red-400">🔥 RIVALRY</span>
                                  )}
                                  {game.isConference && !game.isRivalry && (
                                    <span className="text-blue-400">• Conference</span>
                                  )}
                                  {!game.isConference && !game.isRivalry && !game.isNeutralSite && (
                                    <span className="text-gray-500">• Non-Conference</span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              {isPlayed ? (
                                <div>
                                  <div className={`text-lg font-bold ${won ? 'text-green-400' : 'text-red-400'}`}>
                                    {won ? 'W' : 'L'} {gameResult.userScore}-{gameResult.opponentScore}
                                  </div>
                                  {game.isConference && (
                                    <div className="text-xs text-gray-400 mt-1">
                                      Conf: {seasonRecord.confWins}-{seasonRecord.confLosses}
                                    </div>
                                  )}
                                </div>
                              ) : game.week === currentGameWeek ? (
                                <div className="text-blue-400 font-bold text-sm">
                                  ▶ THIS WEEK
                                </div>
                              ) : (
                                <div className="text-gray-500 text-xs">
                                  Upcoming
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    </div>

                    {seasonRecord.wins + seasonRecord.losses > 0 && (
                      <div className="mt-4 pt-4 border-t-2 border-gray-700">
                        <div className="flex justify-between text-xs">
                          <div>
                            <span className="text-gray-400">Overall:</span>{' '}
                            <span className="text-white font-bold">
                              {seasonRecord.wins}-{seasonRecord.losses}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Conference:</span>{' '}
                            <span className="text-blue-400 font-bold">
                              {seasonRecord.confWins}-{seasonRecord.confLosses}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Win %:</span>{' '}
                            <span className="text-green-400 font-bold">
                              {((seasonRecord.wins / (seasonRecord.wins + seasonRecord.losses)) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-sm text-yellow-400">ROSTER</h2>
                {/* Team Ratings */}
                <div className="flex gap-3 text-xs">
                  <div className="bg-gray-800 border-2 border-gray-600 px-3 py-1">
                    <span className="text-gray-400">OFF:</span> <span className="text-green-400 font-bold">
                      {(() => {
                        const offensePlayers = roster.filter(p => OFFENSIVE_POSITIONS.includes(p.position));
                        const avgRating = offensePlayers.length > 0 
                          ? Math.round(offensePlayers.reduce((sum, p) => sum + p.rating, 0) / offensePlayers.length)
                          : 0;
                        return avgRating;
                      })()}
                    </span>
                  </div>
                  <div className="bg-gray-800 border-2 border-gray-600 px-3 py-1">
                    <span className="text-gray-400">DEF:</span> <span className="text-blue-400 font-bold">
                      {(() => {
                        const defensePlayers = roster.filter(p => DEFENSIVE_POSITIONS.includes(p.position));
                        const avgRating = defensePlayers.length > 0
                          ? Math.round(defensePlayers.reduce((sum, p) => sum + p.rating, 0) / defensePlayers.length)
                          : 0;
                        return avgRating;
                      })()}
                    </span>
                  </div>
                  <div className="bg-gray-800 border-2 border-gray-600 px-3 py-1">
                    <span className="text-gray-400">ST:</span> <span className="text-yellow-400 font-bold">
                      {(() => {
                        const stPlayers = roster.filter(p => SPECIAL_TEAMS_POSITIONS.includes(p.position));
                        const avgRating = stPlayers.length > 0
                          ? Math.round(stPlayers.reduce((sum, p) => sum + p.rating, 0) / stPlayers.length)
                          : 0;
                        return avgRating;
                      })()}
                    </span>
                  </div>
                </div>
              </div>
              {hasUnsavedChanges && (
                <button
                  onClick={saveLineupChanges}
                  className="bg-green-700 border-2 border-green-500 px-4 py-2 text-xs text-white hover:bg-green-600 transition-all"
                  style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                >
                  SAVE LINEUP CHANGES
                </button>
              )}
            </div>
            
            {/* OFFENSE SECTION */}
            <div className="mb-4">
              <button
                onClick={() => setOffenseExpanded(!offenseExpanded)}
                className="w-full bg-gray-800 border-4 border-gray-600 p-4 hover:border-yellow-500 transition-all flex justify-between items-center"
                style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}
              >
                <div className="text-left">
                  <h3 className="text-xs font-bold text-white">OFFENSE</h3>
                  <p className="text-gray-400 mt-1" style={{ fontSize: '8px' }}>
                    {(hasUnsavedChanges ? pendingRoster : roster).filter(p => OFFENSIVE_POSITIONS.includes(p.position) && p.isStarter).length}/11 Starters
                  </p>
                </div>
                {offenseExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {offenseExpanded && (
                <div className="bg-gray-900 border-4 border-t-0 border-gray-600 p-4">
                  <div className="space-y-2">
                    {OFFENSIVE_POSITIONS.map(position => {
                      const displayRoster = hasUnsavedChanges ? pendingRoster : roster;
                      const players = displayRoster.filter(p => p.position === position).sort((a, b) => b.rating - a.rating);
                      if (players.length === 0) return null;
                      
                      const positionExpanded = offensePositionExpanded[position];
                      const starterCount = players.filter(p => p.isStarter).length;
                      
                      return (
                        <div key={position}>
                          <button
                            onClick={() => setOffensePositionExpanded(prev => ({ ...prev, [position]: !prev[position] }))}
                            className="w-full bg-gray-800 border-2 border-gray-700 p-2 hover:border-yellow-500 transition-all flex justify-between items-center"
                          >
                            <div className="flex items-center gap-2">
                              <div className="text-yellow-400 font-bold" style={{ fontSize: '8px' }}>{position}</div>
                              <div className="text-gray-400" style={{ fontSize: '7px' }}>({starterCount} starter{starterCount !== 1 ? 's' : ''})</div>
                            </div>
                            {positionExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </button>
                          
                          {positionExpanded && (
                            <div className="ml-2 mt-1 space-y-1">
                              {players.map(player => (
                                <div 
                                  key={player.id} 
                                  className={`bg-gray-800 border-2 p-2 flex items-center justify-between ${
                                    player.satisfaction === 'High' ? 'border-green-600' : 
                                    player.satisfaction === 'Medium' ? 'border-yellow-600' : 'border-red-600'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 flex-1">
                                    <input
                                      type="checkbox"
                                      checked={player.isStarter}
                                      onChange={() => toggleStarter(player.id)}
                                      className="w-3 h-3 cursor-pointer"
                                    />
                                    <div>
                                      <div className="text-xs font-bold text-white">{player.name}</div>
                                      <div className="text-gray-400 mt-1" style={{ fontSize: '8px' }}>
                                        {player.year} • {'⭐'.repeat(player.stars)}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm font-bold text-yellow-400">{player.rating}</div>
                                    <div className="text-gray-400" style={{ fontSize: '7px' }}>OVR</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* DEFENSE SECTION */}
            <div className="mb-4">
              <button
                onClick={() => setDefenseExpanded(!defenseExpanded)}
                className="w-full bg-gray-800 border-4 border-gray-600 p-4 hover:border-yellow-500 transition-all flex justify-between items-center"
                style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}
              >
                <div className="text-left">
                  <h3 className="text-xs font-bold text-white">DEFENSE</h3>
                  <p className="text-gray-400 mt-1" style={{ fontSize: '8px' }}>
                    {(hasUnsavedChanges ? pendingRoster : roster).filter(p => DEFENSIVE_POSITIONS.includes(p.position) && p.isStarter).length}/11 Starters
                  </p>
                </div>
                {defenseExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {defenseExpanded && (
                <div className="bg-gray-900 border-4 border-t-0 border-gray-600 p-4">
                  <div className="space-y-2">
                    {DEFENSIVE_POSITIONS.map(position => {
                      const displayRoster = hasUnsavedChanges ? pendingRoster : roster;
                      const players = displayRoster.filter(p => p.position === position).sort((a, b) => b.rating - a.rating);
                      if (players.length === 0) return null;
                      
                      const positionExpanded = defensePositionExpanded[position];
                      const starterCount = players.filter(p => p.isStarter).length;
                      
                      return (
                        <div key={position}>
                          <button
                            onClick={() => setDefensePositionExpanded(prev => ({ ...prev, [position]: !prev[position] }))}
                            className="w-full bg-gray-800 border-2 border-gray-700 p-2 hover:border-yellow-500 transition-all flex justify-between items-center"
                          >
                            <div className="flex items-center gap-2">
                              <div className="text-yellow-400 font-bold" style={{ fontSize: '8px' }}>{position}</div>
                              <div className="text-gray-400" style={{ fontSize: '7px' }}>({starterCount} starter{starterCount !== 1 ? 's' : ''})</div>
                            </div>
                            {positionExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </button>
                          
                          {positionExpanded && (
                            <div className="ml-2 mt-1 space-y-1">
                              {players.map(player => (
                                <div 
                                  key={player.id} 
                                  className={`bg-gray-800 border-2 p-2 flex items-center justify-between ${
                                    player.satisfaction === 'High' ? 'border-green-600' : 
                                    player.satisfaction === 'Medium' ? 'border-yellow-600' : 'border-red-600'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 flex-1">
                                    <input
                                      type="checkbox"
                                      checked={player.isStarter}
                                      onChange={() => toggleStarter(player.id)}
                                      className="w-3 h-3 cursor-pointer"
                                    />
                                    <div>
                                      <div className="text-xs font-bold text-white">{player.name}</div>
                                      <div className="text-gray-400 mt-1" style={{ fontSize: '8px' }}>
                                        {player.year} • {'⭐'.repeat(player.stars)}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm font-bold text-yellow-400">{player.rating}</div>
                                    <div className="text-gray-400" style={{ fontSize: '7px' }}>OVR</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* SPECIAL TEAMS SECTION */}
            <div className="mb-4">
              <button
                onClick={() => setSpecialTeamsExpanded(!specialTeamsExpanded)}
                className="w-full bg-gray-800 border-4 border-gray-600 p-4 hover:border-yellow-500 transition-all flex justify-between items-center"
                style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}
              >
                <div className="text-left">
                  <h3 className="text-xs font-bold text-white">SPECIAL TEAMS</h3>
                  <p className="text-gray-400 mt-1" style={{ fontSize: '8px' }}>
                    {(hasUnsavedChanges ? pendingRoster : roster).filter(p => SPECIAL_TEAMS_POSITIONS.includes(p.position)).length} Players
                  </p>
                </div>
                {specialTeamsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {specialTeamsExpanded && (
                <div className="bg-gray-900 border-4 border-t-0 border-gray-600 p-4">
                  <div className="space-y-2">
                    {SPECIAL_TEAMS_POSITIONS.map(position => {
                      const displayRoster = hasUnsavedChanges ? pendingRoster : roster;
                      const players = displayRoster.filter(p => p.position === position).sort((a, b) => b.rating - a.rating);
                      if (players.length === 0) return null;
                      
                      const positionExpanded = specialTeamsPositionExpanded[position];
                      const starterCount = players.filter(p => p.isStarter).length;
                      
                      return (
                        <div key={position}>
                          <button
                            onClick={() => setSpecialTeamsPositionExpanded(prev => ({ ...prev, [position]: !prev[position] }))}
                            className="w-full bg-gray-800 border-2 border-gray-700 p-2 hover:border-yellow-500 transition-all flex justify-between items-center"
                          >
                            <div className="flex items-center gap-2">
                              <div className="text-yellow-400 font-bold" style={{ fontSize: '8px' }}>{position}</div>
                              <div className="text-gray-400" style={{ fontSize: '7px' }}>({starterCount} starter{starterCount !== 1 ? 's' : ''})</div>
                            </div>
                            {positionExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </button>
                          
                          {positionExpanded && (
                            <div className="ml-2 mt-1 space-y-1">
                              {players.map(player => (
                                <div 
                                  key={player.id} 
                                  className={`bg-gray-800 border-2 p-2 flex items-center justify-between ${
                                    player.satisfaction === 'High' ? 'border-green-600' : 
                                    player.satisfaction === 'Medium' ? 'border-yellow-600' : 'border-red-600'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 flex-1">
                                    <input
                                      type="checkbox"
                                      checked={player.isStarter}
                                      onChange={() => toggleStarterSpecialTeams(player.id)}
                                      className="w-3 h-3 cursor-pointer"
                                    />
                                    <div>
                                      <div className="text-xs font-bold text-white">{player.name}</div>
                                      <div className="text-gray-400 mt-1" style={{ fontSize: '8px' }}>
                                        {player.year} • {'⭐'.repeat(player.stars)}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm font-bold text-yellow-400">{player.rating}</div>
                                    <div className="text-gray-400" style={{ fontSize: '7px' }}>OVR</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'donors' && (
          <div className="text-center py-12">
            <h2 className="text-sm mb-4 text-yellow-400">NIL MANAGEMENT</h2>
            <p className="text-gray-400" style={{ fontSize: '10px' }}>Coming soon...</p>
          </div>
        )}

        {activeTab === 'schools' && (() => {
          // Get all schools as flat array
          const allSchools = [...SCHOOLS.blueBloods, ...SCHOOLS.power4, ...SCHOOLS.group5];
          
          // Group schools by conference
          const schoolsByConference = {};
          allSchools.forEach(school => {
            if (!schoolsByConference[school.conference]) {
              schoolsByConference[school.conference] = [];
            }
            schoolsByConference[school.conference].push(school);
          });
          
          // Sort conferences
          const conferences = Object.keys(schoolsByConference).sort();
          
          return (
            <div className="max-w-7xl mx-auto">
              <div className="mb-4 bg-gray-800 border-4 border-gray-600 p-4" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>
                <h2 className="text-xl text-yellow-400 mb-2">SCHOOL BROWSER</h2>
                <p className="text-xs text-gray-400">
                  Scout the competition - {allSchools.length} schools organized by conference
                </p>
              </div>
              
              {/* Conference Sections */}
              {conferences.map(conference => {
                const schools = schoolsByConference[conference];
                const isExpanded = expandedConferences[conference];
                
                return (
                  <div key={conference} className="mb-4">
                    <div
                      className="w-full bg-gray-800 border-4 border-gray-600 p-4 transition-all"
                      style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}
                    >
                      {editingConference === conference ? (
                        // Edit Mode
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={tempConferenceName}
                            onChange={(e) => setTempConferenceName(e.target.value)}
                            className="flex-1 bg-gray-900 border-2 border-gray-600 px-3 py-2 text-white text-sm font-bold"
                            placeholder="Conference Name"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <button
                            onClick={saveConferenceEdit}
                            className="bg-green-700 border-2 border-green-600 px-3 py-1 text-xs hover:bg-green-600"
                            style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                          >
                            ✓ SAVE
                          </button>
                          <button
                            onClick={cancelConferenceEdit}
                            className="bg-gray-700 border-2 border-gray-600 px-3 py-1 text-xs hover:bg-gray-600"
                            style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        // View Mode
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => setExpandedConferences({ ...expandedConferences, [conference]: !isExpanded })}
                            className="flex-1 flex justify-between items-center hover:opacity-80 transition-opacity text-left"
                          >
                            <div>
                              <h3 className="text-xs font-bold text-white">{getConferenceDisplayName(conference).toUpperCase()}</h3>
                              <p className="text-gray-400 mt-1" style={{ fontSize: '8px' }}>
                                {schools.length} school{schools.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditingConference(conference);
                            }}
                            className="ml-3 bg-blue-700 border-2 border-blue-600 px-2 py-1 text-xs hover:bg-blue-600"
                            style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                          >
                            ✎ EDIT
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {isExpanded && (
                      <div className="bg-gray-900 border-4 border-t-0 border-gray-600 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {schools.map(school => (
                            <button
                              key={school.id}
                              onClick={() => setViewingSchool(school)}
                              className="bg-gray-800 border-2 p-3 text-left hover:bg-gray-700 transition-all"
                              style={{
                                borderColor: school.colors.primary,
                                boxShadow: '4px 4px 0px rgba(0,0,0,0.5)'
                              }}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="text-sm font-bold mb-1" style={{ color: school.colors.primary }}>
                                    {getSchoolDisplayName(school)}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {getSchoolNickname(school)} • {school.state}
                                  </div>
                                </div>
                                {school.id === selectedSchool.id && (
                                  <span className="text-xs bg-green-700 border border-green-600 px-2 py-0.5">
                                    YOU
                                  </span>
                                )}
                              </div>

                              <div className="text-xs space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Coach:</span>
                                  <span className="text-white" style={{ fontSize: '10px' }}>
                                    {getCoachName(school.id)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Tier:</span>
                                  <span className={
                                    school.tier === 'Blue Blood' ? 'text-red-400' :
                                    school.tier === 'Power 4' ? 'text-blue-400' :
                                    'text-yellow-400'
                                  }>{school.tier}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">NIL Budget:</span>
                                  <span className="text-green-400" style={{ fontSize: '10px' }}>
                                    {formatCurrency(school.budget)}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="mt-2 text-xs text-center text-gray-500 border-t border-gray-700 pt-2">
                                Click to view details →
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })()}
        
        {/* School Detail Modal */}
        {viewingSchool && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50" onClick={() => setViewingSchool(null)}>
            <div 
              className="bg-gray-900 border-4 p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              style={{
                borderColor: viewingSchool.colors.primary,
                boxShadow: '8px 8px 0px rgba(0,0,0,0.8)'
              }}
            >
              {/* School Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  {editingSchool?.id === viewingSchool.id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">TEAM NAME</label>
                        <input
                          type="text"
                          value={tempSchoolName}
                          onChange={(e) => setTempSchoolName(e.target.value)}
                          className="w-full bg-gray-800 border-2 border-gray-600 px-3 py-2 text-white text-lg font-bold"
                          placeholder="Team Name"
                          style={{ color: viewingSchool.colors.primary }}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">NICKNAME</label>
                        <input
                          type="text"
                          value={tempNickname}
                          onChange={(e) => setTempNickname(e.target.value)}
                          className="w-full bg-gray-800 border-2 border-gray-600 px-3 py-2 text-white text-sm"
                          placeholder="Nickname"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">HEAD COACH</label>
                        <input
                          type="text"
                          value={tempCoachName}
                          onChange={(e) => setTempCoachName(e.target.value)}
                          disabled={viewingSchool?.id === selectedSchool?.id}
                          className={`w-full bg-gray-800 border-2 border-gray-600 px-3 py-2 text-white text-sm ${
                            viewingSchool?.id === selectedSchool?.id ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          placeholder="Coach Name"
                        />
                        {viewingSchool?.id === selectedSchool?.id && (
                          <div className="text-xs text-gray-500 mt-1">
                            Your coach name was set at game start and cannot be changed
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {viewingSchool.state} • {getConferenceDisplayName(viewingSchool.conference)} • {viewingSchool.tier}
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <h2 className="text-2xl font-bold mb-2" style={{ color: viewingSchool.colors.primary }}>
                        {getSchoolDisplayName(viewingSchool)}
                      </h2>
                      <div className="text-sm text-gray-400">
                        {getSchoolNickname(viewingSchool)} • {viewingSchool.state} • {getConferenceDisplayName(viewingSchool.conference)} • {viewingSchool.tier}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  {editingSchool?.id === viewingSchool.id ? (
                    // Save/Cancel buttons in edit mode
                    <>
                      <button
                        onClick={saveSchoolEdits}
                        className="bg-green-700 border-2 border-green-600 px-4 py-2 text-sm hover:bg-green-600"
                        style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                      >
                        ✓ SAVE
                      </button>
                      <button
                        onClick={cancelSchoolEdits}
                        className="bg-gray-700 border-2 border-gray-600 px-4 py-2 text-sm hover:bg-gray-600"
                        style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                      >
                        ✕ CANCEL
                      </button>
                    </>
                  ) : (
                    // Edit/Close buttons in view mode
                    <>
                      <button
                        onClick={() => startEditingSchool(viewingSchool)}
                        className="bg-blue-700 border-2 border-blue-600 px-4 py-2 text-sm hover:bg-blue-600"
                        style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                      >
                        ✎ EDIT
                      </button>
                      <button
                        onClick={() => setViewingSchool(null)}
                        className="bg-red-700 border-2 border-red-600 px-4 py-2 text-sm hover:bg-red-600"
                        style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                      >
                        ✕ CLOSE
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {/* School Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-gray-800 border-2 border-gray-600 p-3">
                  <div className="text-xs text-gray-400 mb-1">HEAD COACH</div>
                  <div className="text-white font-bold">{getCoachName(viewingSchool.id)}</div>
                </div>
                <div className="bg-gray-800 border-2 border-gray-600 p-3">
                  <div className="text-xs text-gray-400 mb-1">NIL BUDGET</div>
                  <div className="text-green-400 font-bold">{formatCurrency(viewingSchool.budget)}</div>
                </div>
                <div className="bg-gray-800 border-2 border-gray-600 p-3">
                  <div className="text-xs text-gray-400 mb-1">TIER</div>
                  <div className={`font-bold ${
                    viewingSchool.tier === 'Blue Blood' ? 'text-red-400' :
                    viewingSchool.tier === 'Power 4' ? 'text-blue-400' :
                    'text-yellow-400'
                  }`}>{viewingSchool.tier}</div>
                </div>
                <div className="bg-gray-800 border-2 border-gray-600 p-3">
                  <div className="text-xs text-gray-400 mb-1">TEAM RATING</div>
                  <div className="text-yellow-400 font-bold">
                    {aiRosters[viewingSchool.id] ? calculateTeamRating(aiRosters[viewingSchool.id]) : '--'}
                  </div>
                </div>
              </div>
              
              {/* Coming Soon Sections */}
              <div className="space-y-4">
                <div className="bg-gray-800 border-2 border-gray-600 p-4">
                  <h3 className="text-sm text-yellow-400 mb-2">ROSTER</h3>
                  {aiRosters[viewingSchool.id] ? (
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between text-gray-300">
                        <span>Total Players:</span>
                        <span className="text-white">{aiRosters[viewingSchool.id].length}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>5-Star Players:</span>
                        <span className="text-yellow-400">{aiRosters[viewingSchool.id].filter(p => p.stars === 5).length}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>4-Star Players:</span>
                        <span className="text-blue-400">{aiRosters[viewingSchool.id].filter(p => p.stars === 4).length}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>3-Star Players:</span>
                        <span className="text-green-400">{aiRosters[viewingSchool.id].filter(p => p.stars === 3).length}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>2-Star Players:</span>
                        <span className="text-gray-400">{aiRosters[viewingSchool.id].filter(p => p.stars === 2).length}</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-700">
                        <p className="text-gray-400">Full depth chart coming soon</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400">
                      Roster loading...
                    </p>
                  )}
                </div>

                {/* Rivals Section */}
                <div className="bg-gray-800 border-2 border-gray-600 p-4">
                  <h3 className="text-sm text-yellow-400 mb-3">RIVALS</h3>
                  {RIVALRIES[viewingSchool.id] && RIVALRIES[viewingSchool.id].length > 0 ? (
                    <div className="space-y-2">
                      {RIVALRIES[viewingSchool.id].map(rivalId => {
                        const allSchools = [...SCHOOLS.blueBloods, ...SCHOOLS.power4, ...SCHOOLS.group5];
                        const rivalSchool = allSchools.find(s => s.id === rivalId);
                        if (!rivalSchool) return null;
                        return (
                          <div key={rivalId} className="flex items-center justify-between text-xs bg-gray-900 border border-gray-700 p-2">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 border border-gray-600"
                                style={{ backgroundColor: rivalSchool.colors.primary }}
                              />
                              <span className="text-white font-bold">{rivalSchool.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs ${
                                rivalSchool.tier === 'Blue Blood' ? 'text-red-400' :
                                rivalSchool.tier === 'Power 4' ? 'text-blue-400' :
                                'text-yellow-400'
                              }`}>
                                {rivalSchool.tier}
                              </span>
                              {rivalSchool.id === selectedSchool.id && (
                                <span className="text-xs bg-green-700 border border-green-600 px-2 py-0.5">
                                  YOU
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400">No designated rivals</p>
                  )}
                </div>

                <div className="bg-gray-800 border-2 border-gray-600 p-4">
                  <h3 className="text-sm text-yellow-400 mb-2">RECRUITING CLASS</h3>
                  <p className="text-xs text-gray-400">
                    Coming soon: See their commits and who they're recruiting
                  </p>
                </div>

                <div className="bg-gray-800 border-2 border-gray-600 p-4">
                  <h3 className="text-sm text-yellow-400 mb-2">HEAD-TO-HEAD</h3>
                  <p className="text-xs text-gray-400">
                    Coming soon: See which recruits you're both targeting
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recruiting' && (() => {
          // Check if recruiting is closed
          if (!isRecruitingOpen()) {
            return (
              <div className="text-center py-12">
                <h2 className="text-2xl mb-4 text-yellow-400">RECRUITING CLOSED</h2>
                <p className="text-gray-400 mb-2">Recruiting is only open during specific periods:</p>
                <div className="mt-4 space-y-2 text-sm text-gray-300">
                  <div>• March 1 - June 30: The Off-Season <span className="text-blue-400">(16 weeks)</span></div>
                  <div>• September 1 - November 30: Regular Season <span className="text-yellow-400">(Half Points)</span></div>
                </div>
                <p className="text-gray-500 text-xs mt-4">
                  Current Event: {getCurrentEvent()}
                </p>
              </div>
            );
          }
          
          // Check if recruits exist
          if (!recruits || recruits.length === 0) {
            return (
              <div className="text-center py-12">
                <h2 className="text-2xl mb-4 text-yellow-400">RECRUITING</h2>
                <p className="text-gray-400 mb-2">Generating recruiting class...</p>
                <p className="text-gray-500 text-xs">(If this persists, try selecting a school again)</p>
              </div>
            );
          }
          
          // Filter recruits based on selected filters
          let filteredRecruits = recruits;
          
          if (recruitStarFilter) {
            filteredRecruits = filteredRecruits.filter(r => r.stars === recruitStarFilter);
          }
          if (recruitPositionFilter) {
            filteredRecruits = filteredRecruits.filter(r => r.position === recruitPositionFilter);
          }
          if (recruitStateFilter) {
            filteredRecruits = filteredRecruits.filter(r => r.state === recruitStateFilter);
          }
          if (showMyRecruitsOnly) {
            filteredRecruits = filteredRecruits.filter(r => r.isTargeted);
          }
          
          return (
            <div className="max-w-7xl mx-auto">
              {/* Sticky Header Container */}
              <div className="sticky top-0 z-10 bg-gray-900">
                {/* Recruiting Header */}
                <div className="mb-4 bg-gray-800 border-4 border-gray-600 p-2" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>
                <div className="flex justify-between items-center">
                  {/* Left Section */}
                  <div className="flex items-center gap-6">
                    <h2 className="text-base text-yellow-400 font-bold">2026<br/>RECRUITING</h2>
                    <div className="text-xs">
                      <div className="text-gray-400">
                        {filteredRecruits.length} of {recruits.length} Prospects
                      </div>
                      <div className="text-blue-400">
                        {recruits.filter(r => r.isTargeted).length} Targeted
                      </div>
                    </div>
                  </div>

                  {/* Center Section - Needs */}
                  {(() => {
                    // Calculate roster needs based on POSITION_TARGETS
                    const positionCounts = {};
                    POSITIONS.forEach(pos => {
                      positionCounts[pos] = roster.filter(p => p.position === pos).length;
                    });

                    const needs = [];
                    Object.keys(POSITION_TARGETS).forEach(pos => {
                      const current = positionCounts[pos] || 0;
                      const target = POSITION_TARGETS[pos];
                      if (current < target) {
                        needs.push({ position: pos, deficit: target - current });
                      }
                    });

                    if (needs.length === 0) {
                      return null;
                    }

                    return (
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-xs">Needs:</span>
                        <div className="bg-gray-700 border-2 border-gray-600 px-2 py-1">
                          <div className="grid grid-flow-col auto-cols-max gap-2" style={{ fontSize: '10px' }}>
                            {needs.map((need) => (
                              <div key={need.position} className="border border-gray-500 px-1 text-center">
                                <div className="text-orange-300">{need.position}</div>
                                <div className="text-gray-400">{need.deficit}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Right Section - Recruiting Points */}
                  <div className="bg-gray-700 border-2 border-gray-600 px-3 py-1">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-300 text-xs uppercase tracking-wide">Recruiting<br/>Points</span>
                      <span className="text-green-400 font-bold text-2xl">{recruitingPoints}</span>
                      <span className="text-gray-400 text-xs">
                        {(() => {
                          const currentEventTitle = getCurrentEvent();
                          const isRegularSeason = currentEventTitle?.includes('Regular Season');
                          const basePoints = selectedSchool?.tier === 'Blue Blood' ? 600 :
                                            selectedSchool?.tier === 'Power 4' ? 400 : 200;
                          const displayPoints = isRegularSeason ? Math.floor(basePoints / 2) : basePoints;

                          return (
                            <>
                              {displayPoints}/week
                              {isRegularSeason && <span className="text-yellow-400 ml-1">⚠</span>}
                            </>
                          );
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Off-Season Week Progress (if in off-season) */}
              {offSeasonWeek !== null && (
                <div className="mb-4 bg-blue-900 border-4 border-blue-600 p-3" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>
                  {/* Title row - same structure as info row for alignment */}
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="invisible">March 1</span>
                    <span className="invisible font-bold">Week {offSeasonWeek} of 16</span>
                    <h3 className="text-sm text-white font-bold">THE OFF-SEASON</h3>
                    <span className="invisible">{offSeasonWeeksCompleted} weeks completed</span>
                    <span className="invisible">June 30</span>
                  </div>

                  {/* Info row with button in center */}
                  <div className="flex justify-between items-center text-sm text-blue-200 mb-2">
                    <span>March 1</span>
                    <span className="font-bold">Week {offSeasonWeek} of 16</span>
                    <button
                      onClick={advanceRecruitingWeek}
                      disabled={offSeasonWeek > 16}
                      className={`px-3 py-1 border-2 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed ${
                        offSeasonWeek === 16
                          ? 'bg-green-500 text-black border-green-600 hover:bg-green-400'
                          : 'bg-yellow-500 text-black border-yellow-600 hover:bg-yellow-400'
                      }`}
                      style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                    >
                      {offSeasonWeek === 16 ? '✓ COMPLETE OFF-SEASON' : 'ADVANCE WEEK ▶'}
                    </button>
                    <span>{offSeasonWeeksCompleted} weeks completed</span>
                    <span>June 30</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 h-2 border border-gray-900">
                    <div
                      className="bg-red-500 h-full transition-all"
                      style={{ width: `${(offSeasonWeek / 16) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              </div>
              {/* End Sticky Header Container */}

              {/* High School Recruiting Section */}
              <div className="mb-4">
                <button
                  onClick={() => setShowHighSchoolRecruiting(!showHighSchoolRecruiting)}
                  className="w-full bg-green-800 border-4 border-green-600 p-4 hover:bg-green-700 transition-all text-left"
                  style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg text-green-300 font-bold">🎓 HIGH SCHOOL RECRUITING</div>
                      <div className="text-xs text-green-200 mt-1">
                        {filteredRecruits.length} Prospects Available
                      </div>
                    </div>
                    <div className="text-2xl text-green-300">{showHighSchoolRecruiting ? '▼' : '▶'}</div>
                  </div>
                </button>
                {showHighSchoolRecruiting && (
                  <div className="bg-gray-900 border-4 border-t-0 border-green-600 p-4">
                    {/* Filters */}
                    <div className="mb-4 bg-gray-800 border-2 border-gray-600 p-3" style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
                      <div className="flex gap-2 items-center flex-wrap text-xs">
                        <span className="text-gray-400">FILTER:</span>
                        
                        {/* Star Filters */}
                        <button 
                          onClick={() => setRecruitStarFilter(null)}
                          className={`px-2 py-1 border-2 ${!recruitStarFilter ? 'bg-yellow-600 border-yellow-500' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}
                          style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                        >
                          ALL ⭐
                        </button>
                        {[5, 4, 3, 2].map(star => (
                          <button 
                            key={star}
                            onClick={() => setRecruitStarFilter(star)}
                            className={`px-2 py-1 border-2 ${recruitStarFilter === star ? 'bg-yellow-600 border-yellow-500' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}
                            style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                          >
                            {star}⭐
                          </button>
                        ))}
                        
                        <span className="text-gray-600">|</span>
                        
                        {/* My Recruits Toggle */}
                        <button 
                          onClick={() => setShowMyRecruitsOnly(!showMyRecruitsOnly)}
                          className={`px-2 py-1 border-2 ${showMyRecruitsOnly ? 'bg-blue-600 border-blue-500' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}
                          style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                        >
                          MY RECRUITS
                        </button>
                        
                        <span className="text-gray-600">|</span>
                        
                        {/* Collapse All Button */}
                        <button 
                          onClick={() => setExpandedRecruitingPositions({
                            QB: false, RB: false, WR: false, TE: false, OL: false,
                            EDGE: false, DT: false, LB: false, CB: false, S: false
                          })}
                          className="px-2 py-1 border-2 bg-gray-700 border-gray-600 hover:bg-gray-600"
                          style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                        >
                          COLLAPSE ALL
                        </button>
                      </div>
                    </div>
                    
                  <div className="mt-4 space-y-3">
                    
                    {/* OFFENSE POSITIONS */}
                    {filteredRecruits.filter(r => r.position === 'QB').length > 0 && (
                      <PositionGroup
                        position="QB"
                        title="QB - QUARTERBACKS"
                        recruits={filteredRecruits.filter(r => r.position === 'QB')}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'RB').length > 0 && (
                      <PositionGroup
                        position="RB"
                        title="RB - RUNNING BACKS"
                        recruits={filteredRecruits.filter(r => r.position === 'RB')}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'WR').length > 0 && (
                      <PositionGroup
                        position="WR"
                        title="WR - WIDE RECEIVERS"
                        recruits={filteredRecruits.filter(r => r.position === 'WR')}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'TE').length > 0 && (
                      <PositionGroup
                        position="TE"
                        title="TE - TIGHT ENDS"
                        recruits={filteredRecruits.filter(r => r.position === 'TE')}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => ['OT', 'OG', 'C'].includes(r.position)).length > 0 && (
                      <PositionGroup
                        position="OL"
                        title="OL - OFFENSIVE LINE"
                        recruits={filteredRecruits.filter(r => ['OT', 'OG', 'C'].includes(r.position))}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                        showSubPosition={true}
                      />
                    )}

                    {/* DEFENSE POSITIONS */}
                    {filteredRecruits.filter(r => r.position === 'EDGE').length > 0 && (
                      <PositionGroup
                        position="EDGE"
                        title="EDGE - EDGE RUSHERS"
                        recruits={filteredRecruits.filter(r => r.position === 'EDGE')}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'DT').length > 0 && (
                      <PositionGroup
                        position="DT"
                        title="DT - DEFENSIVE TACKLES"
                        recruits={filteredRecruits.filter(r => r.position === 'DT')}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'LB').length > 0 && (
                      <PositionGroup
                        position="LB"
                        title="LB - LINEBACKERS"
                        recruits={filteredRecruits.filter(r => r.position === 'LB')}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'CB').length > 0 && (
                      <PositionGroup
                        position="CB"
                        title="CB - CORNERBACKS"
                        recruits={filteredRecruits.filter(r => r.position === 'CB')}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'S').length > 0 && (
                      <PositionGroup
                        position="S"
                        title="S - SAFETIES"
                        recruits={filteredRecruits.filter(r => r.position === 'S')}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {/* SPECIAL TEAMS POSITIONS */}
                    {filteredRecruits.filter(r => r.position === 'K').length > 0 && (
                      <PositionGroup
                        position="K"
                        title="K - KICKERS"
                        recruits={filteredRecruits.filter(r => r.position === 'K')}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'P').length > 0 && (
                      <PositionGroup
                        position="P"
                        title="P - PUNTERS"
                        recruits={filteredRecruits.filter(r => r.position === 'P')}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                  </div>
                  </div>
                )}
              </div>
              
              {/* Transfer Portal Section */}
              <div className="mb-4">
                <button
                  onClick={() => setShowTransferPortal(!showTransferPortal)}
                  disabled={!isTransferPortalOpen()}
                  className={`w-full border-4 p-4 transition-all text-left ${
                    isTransferPortalOpen()
                      ? 'bg-purple-800 border-purple-600 hover:bg-purple-700'
                      : 'bg-gray-700 border-gray-600 opacity-50 cursor-not-allowed'
                  }`}
                  style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg text-purple-300 font-bold">
                        🔄 TRANSFER PORTAL RECRUITING
                        {!isTransferPortalOpen() && ' 🔒'}
                      </div>
                      <div className="text-xs text-purple-200 mt-1">
                        {isTransferPortalOpen() 
                          ? 'Portal is OPEN - Transfer players available' 
                          : 'Opens during Conference Championships, Playoffs & January Portal Window'
                        }
                      </div>
                    </div>
                    {isTransferPortalOpen() && (
                      <div className="text-2xl text-purple-300">{showTransferPortal ? '▼' : '▶'}</div>
                    )}
                  </div>
                </button>
                
                {showTransferPortal && isTransferPortalOpen() && (
                  <div className="bg-gray-900 border-4 border-t-0 border-purple-600 p-4">
                    {/* Filters */}
                    <div className="mb-4 bg-gray-800 border-2 border-gray-600 p-3" style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
                      <div className="flex gap-2 items-center flex-wrap text-xs">
                        <span className="text-gray-400">FILTER:</span>
                        
                        {/* Star Filters */}
                        <button 
                          onClick={() => setRecruitStarFilter(null)}
                          className={`px-2 py-1 border-2 ${!recruitStarFilter ? 'bg-yellow-600 border-yellow-500' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}
                          style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                        >
                          ALL ⭐
                        </button>
                        {[5, 4, 3, 2].map(star => (
                          <button 
                            key={star}
                            onClick={() => setRecruitStarFilter(star)}
                            className={`px-2 py-1 border-2 ${recruitStarFilter === star ? 'bg-yellow-600 border-yellow-500' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}
                            style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                          >
                            {star}⭐
                          </button>
                        ))}
                        
                        <span className="text-gray-600">|</span>
                        
                        {/* My Recruits Toggle */}
                        <button 
                          onClick={() => setShowMyRecruitsOnly(!showMyRecruitsOnly)}
                          className={`px-2 py-1 border-2 ${showMyRecruitsOnly ? 'bg-blue-600 border-blue-500' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}`}
                          style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                        >
                          MY RECRUITS
                        </button>
                        
                        <span className="text-gray-600">|</span>
                        
                        {/* Collapse All Button */}
                        <button 
                          onClick={() => setExpandedRecruitingPositions({
                            QB: false, RB: false, WR: false, TE: false, OL: false,
                            EDGE: false, DT: false, LB: false, CB: false, S: false
                          })}
                          className="px-2 py-1 border-2 bg-gray-700 border-gray-600 hover:bg-gray-600"
                          style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                        >
                          COLLAPSE ALL
                        </button>
                      </div>
                    </div>
                    
                  <div className="mt-4 space-y-3">
                    
                    {/* OFFENSE POSITIONS */}
                    {filteredRecruits.filter(r => r.position === 'QB' && r.isTransfer).length > 0 && (
                      <PositionGroup
                        position="QB"
                        title="QB - QUARTERBACKS"
                        recruits={filteredRecruits.filter(r => r.position === 'QB' && r.isTransfer)}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'RB' && r.isTransfer).length > 0 && (
                      <PositionGroup
                        position="RB"
                        title="RB - RUNNING BACKS"
                        recruits={filteredRecruits.filter(r => r.position === 'RB' && r.isTransfer)}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'WR' && r.isTransfer).length > 0 && (
                      <PositionGroup
                        position="WR"
                        title="WR - WIDE RECEIVERS"
                        recruits={filteredRecruits.filter(r => r.position === 'WR' && r.isTransfer)}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'TE' && r.isTransfer).length > 0 && (
                      <PositionGroup
                        position="TE"
                        title="TE - TIGHT ENDS"
                        recruits={filteredRecruits.filter(r => r.position === 'TE' && r.isTransfer)}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => ['OT', 'OG', 'C'].includes(r.position) && r.isTransfer).length > 0 && (
                      <PositionGroup
                        position="OL"
                        title="OL - OFFENSIVE LINE"
                        recruits={filteredRecruits.filter(r => ['OT', 'OG', 'C'].includes(r.position) && r.isTransfer)}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                        showSubPosition={true}
                      />
                    )}

                    {/* DEFENSE POSITIONS */}
                    {filteredRecruits.filter(r => r.position === 'EDGE' && r.isTransfer).length > 0 && (
                      <PositionGroup
                        position="EDGE"
                        title="EDGE - EDGE RUSHERS"
                        recruits={filteredRecruits.filter(r => r.position === 'EDGE' && r.isTransfer)}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'DT' && r.isTransfer).length > 0 && (
                      <PositionGroup
                        position="DT"
                        title="DT - DEFENSIVE TACKLES"
                        recruits={filteredRecruits.filter(r => r.position === 'DT' && r.isTransfer)}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'LB' && r.isTransfer).length > 0 && (
                      <PositionGroup
                        position="LB"
                        title="LB - LINEBACKERS"
                        recruits={filteredRecruits.filter(r => r.position === 'LB' && r.isTransfer)}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'CB' && r.isTransfer).length > 0 && (
                      <PositionGroup
                        position="CB"
                        title="CB - CORNERBACKS"
                        recruits={filteredRecruits.filter(r => r.position === 'CB' && r.isTransfer)}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'S' && r.isTransfer).length > 0 && (
                      <PositionGroup
                        position="S"
                        title="S - SAFETIES"
                        recruits={filteredRecruits.filter(r => r.position === 'S' && r.isTransfer)}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {/* SPECIAL TEAMS POSITIONS */}
                    {filteredRecruits.filter(r => r.position === 'K' && r.isTransfer).length > 0 && (
                      <PositionGroup
                        position="K"
                        title="K - KICKERS"
                        recruits={filteredRecruits.filter(r => r.position === 'K' && r.isTransfer)}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {filteredRecruits.filter(r => r.position === 'P' && r.isTransfer).length > 0 && (
                      <PositionGroup
                        position="P"
                        title="P - PUNTERS"
                        recruits={filteredRecruits.filter(r => r.position === 'P' && r.isTransfer)}
                        expandedPositions={expandedRecruitingPositions}
                        setExpandedPositions={setExpandedRecruitingPositions}
                        canRecruit={isRecruitingOpen()}
                        recruitingPoints={recruitingPoints}
                        executeRecruitingAction={handleRecruitingAction}
                      />
                    )}

                    {/* No Transfer Portal Recruits Available Message */}
                    {filteredRecruits.filter(r => r.isTransfer).length === 0 && (
                      <div className="bg-gray-800 border-2 border-purple-600 p-6 text-center">
                        <div className="text-gray-400 text-sm">
                          No transfer portal players available yet.
                          <div className="text-xs text-gray-500 mt-2">
                            Transfer portal will populate after the regular season with college players looking to change schools.
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Event Decision Modal */}
      {showEventModal && currentRandomEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-4 border-yellow-500 max-w-2xl w-full" style={{ boxShadow: '12px 12px 0px rgba(0,0,0,0.8)' }}>
            {/* Modal Header */}
            <div className="bg-yellow-500 text-black p-4 border-b-4 border-yellow-600">
              <h2 className="text-lg font-bold">{currentRandomEvent.title}</h2>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {/* Player Info if applicable */}
              {currentRandomEvent.player && (
                <div className="bg-gray-800 border-2 border-gray-600 p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-bold">{currentRandomEvent.player.name}</div>
                      <div className="text-gray-400 text-xs mt-1">
                        {currentRandomEvent.player.position} • {currentRandomEvent.player.year} • {'⭐'.repeat(currentRandomEvent.player.stars)}
                        {currentRandomEvent.player.isStarter && ' • STARTER'}
                      </div>
                      {/* Injury-specific info */}
                      {currentRandomEvent.injury && (
                        <div className="mt-2 pt-2 border-t border-gray-700">
                          <div className="text-red-400 text-xs font-bold">{currentRandomEvent.injury}</div>
                          <div className="text-gray-400 text-xs">
                            Severity: {currentRandomEvent.severity} • Base Recovery: {currentRandomEvent.baseWeeks} weeks
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-right text-xs">
                      <div className="text-gray-400">Current NIL</div>
                      <div className="text-green-400">{formatCurrency(currentRandomEvent.player.currentNIL)}</div>
                      <div className={`mt-1 ${
                        currentRandomEvent.player.satisfaction === 'High' ? 'text-green-400' : 
                        currentRandomEvent.player.satisfaction === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {currentRandomEvent.player.satisfaction}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Event Description */}
              <div className="text-gray-300 text-sm mb-6 leading-relaxed">
                {currentRandomEvent.description}
              </div>
              
              {/* Decision Options */}
              <div className="space-y-3">
                {currentRandomEvent.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleEventDecision(option)}
                    className="w-full bg-gray-800 border-2 border-gray-600 p-4 hover:bg-gray-700 hover:border-yellow-500 transition-all text-left"
                    style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-white font-bold text-sm">{option.label}</div>
                      {option.cost > 0 && (
                        <div className="text-red-400 text-xs">-{formatCurrency(option.cost)}</div>
                      )}
                      {option.cost === 0 && (
                        <div className="text-green-400 text-xs">No Cost</div>
                      )}
                    </div>
                    <div className="text-gray-400 text-xs">{option.effect}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Transfer Decisions Modal */}
      {showTransferDecisionsModal && transferDecisionsPending.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-4 border-purple-500 max-w-3xl w-full max-h-screen overflow-y-auto" style={{ boxShadow: '12px 12px 0px rgba(0,0,0,0.8)' }}>
            {/* Modal Header */}
            <div className="bg-purple-500 text-black p-4 border-b-4 border-purple-600 sticky top-0">
              <h2 className="text-lg font-bold">🔄 TRANSFER PORTAL DECISIONS</h2>
              <div className="text-xs mt-1">
                {transferDecisionsPending.length} player{transferDecisionsPending.length > 1 ? 's' : ''} need{transferDecisionsPending.length === 1 ? 's' : ''} your decision
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {transferDecisionsPending.map((decision, index) => (
                <div key={index} className="bg-gray-800 border-2 border-purple-600 p-4">
                  {/* Player Info */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-white font-bold text-lg">{decision.player.name}</div>
                      <div className="text-gray-400 text-sm">
                        {decision.player.position} • {decision.player.year} • {'⭐'.repeat(decision.player.stars)} • {decision.player.rating} OVR
                        {decision.player.isStarter && ' • STARTER'}
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <div className="text-gray-400">Current NIL</div>
                      <div className="text-green-400">{formatCurrency(decision.player.currentNIL)}</div>
                    </div>
                  </div>
                  
                  {/* Decision Message */}
                  <div className="text-gray-300 text-sm mb-4 bg-gray-900 p-3 border-l-4 border-purple-500">
                    {decision.message}
                  </div>
                  
                  {/* Decision Buttons */}
                  <div className="flex gap-3">
                    {decision.decision === 'senior_return' && (
                      <>
                        <button
                          onClick={() => {
                            // Offer 5th year spot
                            const updatedPlayer = { ...decision.player, year: '5Y' };
                            setRoster(prev => [...prev, updatedPlayer]);
                            setTransferDecisionsPending(prev => prev.filter((_, i) => i !== index));
                            if (transferDecisionsPending.length === 1) setShowTransferDecisionsModal(false);
                          }}
                          className="flex-1 bg-green-700 border-2 border-green-600 p-3 text-sm hover:bg-green-600"
                          style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                        >
                          ✅ OFFER 5TH YEAR
                          <div className="text-xs mt-1 opacity-75">Retain player</div>
                        </button>
                        <button
                          onClick={() => {
                            // Send to transfer portal
                            const portalPlayer = {
                              ...decision.player,
                              isTransfer: true,
                              previousSchool: selectedSchool.name,
                              interest: 0
                            };
                            setRecruits(prev => [...prev, portalPlayer]);
                            setTransferDecisionsPending(prev => prev.filter((_, i) => i !== index));
                            if (transferDecisionsPending.length === 1) setShowTransferDecisionsModal(false);
                          }}
                          className="flex-1 bg-red-700 border-2 border-red-600 p-3 text-sm hover:bg-red-600"
                          style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                        >
                          ⛔ DECLINE
                          <div className="text-xs mt-1 opacity-75">Enters portal</div>
                        </button>
                      </>
                    )}
                    
                    {decision.decision === 'junior_nfl_departure' && (
                      <>
                        <button
                          onClick={() => {
                            // Approve NIL increase to retain junior
                            if (budgetRemaining >= decision.nilIncrease) {
                              const updatedPlayer = { 
                                ...decision.player, 
                                currentNIL: decision.player.currentNIL + decision.nilIncrease,
                                satisfaction: 'High'
                              };
                              setRoster(prev => prev.map(p => p.id === decision.player.id ? updatedPlayer : p));
                              setBudgetAllocated(prev => prev + decision.nilIncrease);
                              setTransferDecisionsPending(prev => prev.filter((_, i) => i !== index));
                              if (transferDecisionsPending.length === 1) setShowTransferDecisionsModal(false);
                              
                              alert(`🎉 ${decision.player.name} has decided to return for his senior season!`);
                            } else {
                              alert('Not enough budget available!');
                            }
                          }}
                          disabled={budgetRemaining < decision.nilIncrease}
                          className="flex-1 bg-green-700 border-2 border-green-600 p-3 text-sm hover:bg-green-600 disabled:opacity-50"
                          style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                        >
                          ✅ PAY TO RETAIN
                          <div className="text-xs mt-1 opacity-75">{formatCurrency(decision.nilIncrease)}</div>
                          {budgetRemaining < decision.nilIncrease && (
                            <div className="text-red-400 text-xs mt-1">Not enough budget!</div>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            // Let player leave for NFL - show newspaper splash
                            setNFLDeparturePlayer(decision.player);
                            setShowNFLDepartureModal(true);
                            
                            // Remove from roster
                            setRoster(prev => prev.filter(p => p.id !== decision.player.id));
                            setBudgetAllocated(prev => prev - decision.player.currentNIL);
                            setTransferDecisionsPending(prev => prev.filter((_, i) => i !== index));
                            if (transferDecisionsPending.length === 1) setShowTransferDecisionsModal(false);
                          }}
                          className="flex-1 bg-red-700 border-2 border-red-600 p-3 text-sm hover:bg-red-600"
                          style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                        >
                          ⛔ LET HIM GO
                          <div className="text-xs mt-1 opacity-75">NFL Draft</div>
                        </button>
                      </>
                    )}
                    
                    {(decision.decision === 'sophomore_nil_increase' || decision.decision === 'freshman_nil_request') && (
                      <>
                        <button
                          onClick={() => {
                            // Approve NIL increase
                            if (budgetRemaining >= decision.nilIncrease) {
                              const updatedPlayer = { 
                                ...decision.player, 
                                currentNIL: decision.player.currentNIL + decision.nilIncrease,
                                satisfaction: 'High'
                              };
                              setRoster(prev => prev.map(p => p.id === decision.player.id ? updatedPlayer : p));
                              setBudgetAllocated(prev => prev + decision.nilIncrease);
                              setTransferDecisionsPending(prev => prev.filter((_, i) => i !== index));
                              if (transferDecisionsPending.length === 1) setShowTransferDecisionsModal(false);
                            } else {
                              alert('Not enough budget available!');
                            }
                          }}
                          disabled={budgetRemaining < decision.nilIncrease}
                          className="flex-1 bg-green-700 border-2 border-green-600 p-3 text-sm hover:bg-green-600 disabled:opacity-50"
                          style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                        >
                          ✅ APPROVE INCREASE
                          <div className="text-xs mt-1 opacity-75">{formatCurrency(decision.nilIncrease)}</div>
                          {budgetRemaining < decision.nilIncrease && (
                            <div className="text-red-400 text-xs mt-1">Not enough budget!</div>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            // Decline - player enters portal
                            const portalPlayer = {
                              ...decision.player,
                              isTransfer: true,
                              previousSchool: selectedSchool.name,
                              interest: 0
                            };
                            setRecruits(prev => [...prev, portalPlayer]);
                            setRoster(prev => prev.filter(p => p.id !== decision.player.id));
                            setBudgetAllocated(prev => prev - decision.player.currentNIL);
                            setTransferDecisionsPending(prev => prev.filter((_, i) => i !== index));
                            if (transferDecisionsPending.length === 1) setShowTransferDecisionsModal(false);
                          }}
                          className="flex-1 bg-red-700 border-2 border-red-600 p-3 text-sm hover:bg-red-600"
                          style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                        >
                          ⛔ DECLINE
                          <div className="text-xs mt-1 opacity-75">Enters portal</div>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* NFL Departure Newspaper Modal */}
      {showNFLDepartureModal && nflDeparturePlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-gray-100 border-8 border-gray-800 max-w-2xl w-full p-8 relative text-black"
            style={{ 
              boxShadow: '20px 20px 0px rgba(0,0,0,0.9)',
              fontFamily: 'Georgia, serif'
            }}
          >
            {/* Newspaper Header */}
            <div className="border-b-4 border-black pb-4 mb-6">
              <div className="text-center text-black">
                <div className="text-xs font-bold tracking-widest mb-1 text-black">COLLEGE FOOTBALL DAILY</div>
                <div className="text-4xl font-bold text-black" style={{ fontFamily: 'Georgia, serif' }}>
                  THE SPORTS TRIBUNE
                </div>
                <div className="text-xs mt-1 flex justify-between items-center text-black">
                  <span>{formatDate(currentDate)}</span>
                  <span>BREAKING NEWS</span>
                  <span>SPECIAL EDITION</span>
                </div>
              </div>
            </div>
            
            {/* Headline */}
            <div className="border-t-2 border-b-2 border-black py-4 mb-4">
              <h1 className="text-5xl font-bold text-center leading-tight text-black" style={{ fontFamily: 'Georgia, serif' }}>
                {nflDeparturePlayer.name.toUpperCase()}<br/>
                TURNING PRO
              </h1>
            </div>
            
            {/* Subheadline */}
            <div className="text-center text-xl font-bold mb-6 italic text-black">
              {getSchoolDisplayName(selectedSchool)} {nflDeparturePlayer.position} Star Declares for NFL Draft
            </div>

            {/* Article Body */}
            <div className="border-t border-black pt-4 mb-6 text-sm leading-relaxed text-black" style={{ columnCount: 2, columnGap: '2rem' }}>
              <p className="mb-3">
                <span className="text-4xl font-bold float-left mr-2 leading-none text-black">I</span>n a move that has sent shockwaves through the college football world, {nflDeparturePlayer.name}, the {nflDeparturePlayer.rating}-rated {nflDeparturePlayer.position} from {getSchoolDisplayName(selectedSchool)}, has officially announced his decision to forgo his senior season and declare for the NFL Draft.
              </p>
              <p className="mb-3">
                The {nflDeparturePlayer.year === 'JR' ? 'junior' : 'senior'} standout, who has been a cornerstone of the {getSchoolDisplayName(selectedSchool)} roster, made the announcement after much deliberation. Scouts have been circling {nflDeparturePlayer.name} for months, with many projecting him as a potential first-round selection.
              </p>
              <p className="mb-3">
                "{nflDeparturePlayer.name} has been an incredible asset to our program," said sources close to the team. "While we'll miss his presence on the field, we support his decision to pursue his NFL dreams."
              </p>
              <p>
                {nflDeparturePlayer.name} leaves {getSchoolDisplayName(selectedSchool)} as one of the most decorated {nflDeparturePlayer.position}s in recent program history. His departure creates a significant hole in the roster that coaching staff will need to address through recruiting and the transfer portal.
              </p>
            </div>
            
            {/* Player Stats Box */}
            <div className="border-4 border-black p-4 mb-6 bg-gray-200 text-black">
              <div className="text-center font-bold mb-2 border-b-2 border-black pb-2 text-black">PLAYER PROFILE</div>
              <div className="grid grid-cols-2 gap-3 text-sm text-black">
                <div>
                  <span className="font-bold">Name:</span> {nflDeparturePlayer.name}
                </div>
                <div>
                  <span className="font-bold">Position:</span> {nflDeparturePlayer.position}
                </div>
                <div>
                  <span className="font-bold">Rating:</span> {nflDeparturePlayer.rating} OVR
                </div>
                <div>
                  <span className="font-bold">Stars:</span> {'⭐'.repeat(nflDeparturePlayer.stars)}
                </div>
                <div>
                  <span className="font-bold">Class:</span> {nflDeparturePlayer.year}
                </div>
                <div>
                  <span className="font-bold">Status:</span> {nflDeparturePlayer.isStarter ? 'STARTER' : 'RESERVE'}
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setShowNFLDepartureModal(false);
                  setNFLDeparturePlayer(null);
                }}
                className="px-8 py-3 bg-black text-white font-bold border-4 border-gray-800 hover:bg-gray-800 transition-all"
                style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Handler functions for recruit decisions */}
      {(() => {
        const handleKeepRecruitingToFlip = (recruitId) => {
          setRecruitDecisions(prev => ({
            ...prev,
            [recruitId]: 'flip'
          }));
        };

        const handleWalkAway = (recruitId) => {
          setRecruitDecisions(prev => ({
            ...prev,
            [recruitId]: 'walkAway'
          }));

          // Update recruits to mark this one as walked away
          setRecruits(prevRecruits =>
            prevRecruits.map(r =>
              r.id === recruitId ? { ...r, walkedAway: true } : r
            )
          );
        };

        // Store handlers in window for access in modal (temporary solution)
        if (typeof window !== 'undefined') {
          window.handleKeepRecruitingToFlip = handleKeepRecruitingToFlip;
          window.handleWalkAway = handleWalkAway;
        }

        return null;
      })()}

      {/* Weekly Recruiting Report Modal */}
      {showWeeklyRecruitingReport && weeklyAICommits.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-4 border-blue-500 max-w-3xl w-full max-h-[80vh] overflow-y-auto" style={{ boxShadow: '12px 12px 0px rgba(0,0,0,0.8)' }}>
            {/* Modal Header with Close Button */}
            <div className="bg-blue-500 text-black p-4 border-b-4 border-blue-600 sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">📰 WEEKLY RECRUITING REPORT</h2>
                  <div className="text-xs mt-1 opacity-75">
                    {(() => {
                      const targeted = weeklyAICommits.filter(r => r.interest > 0 || r.isTargeted).length;
                      return targeted > 0
                        ? `${targeted} Target${targeted !== 1 ? 's' : ''} Lost • ${weeklyAICommits.length} Total Commitments`
                        : `${weeklyAICommits.length} New Commitment${weeklyAICommits.length !== 1 ? 's' : ''} This Week`;
                    })()}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowWeeklyRecruitingReport(false);
                    setWeeklyAICommits([]);
                    setReportTargetsExpanded(true);
                    setReportOthersExpanded(false);
                  }}
                  className="px-6 py-2 bg-black text-white font-bold border-2 border-gray-900 hover:bg-gray-900 transition-all ml-4"
                  style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                >
                  CONTINUE RECRUITING ▶
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {(() => {
                const recruitsYouTargeted = weeklyAICommits.filter(r => r.interest > 0 || r.isTargeted);
                const otherRecruits = weeklyAICommits.filter(r => r.interest === 0 && !r.isTargeted);

                return (
                  <>
                    {/* Section 1: Recruits You Had Interest In */}
                    {recruitsYouTargeted.length > 0 && (
                      <div className="mb-6">
                        <button
                          onClick={() => setReportTargetsExpanded(!reportTargetsExpanded)}
                          className="w-full bg-red-600 text-white p-3 border-4 border-red-700 mb-3 hover:bg-red-700 transition-all flex justify-between items-center"
                          style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                        >
                          <div className="text-left">
                            <h3 className="font-bold">⚠️ RECRUITS YOU HAD INTEREST IN</h3>
                            <div className="text-xs mt-1 opacity-90">
                              {recruitsYouTargeted.length} target{recruitsYouTargeted.length !== 1 ? 's' : ''} lost to other schools
                            </div>
                          </div>
                          <div className="text-2xl">{reportTargetsExpanded ? '▼' : '▶'}</div>
                        </button>
                        {reportTargetsExpanded && (
                          <div className="space-y-3">
                          {recruitsYouTargeted.map((recruit) => (
                            <div
                              key={recruit.id}
                              className="bg-white border-2 border-red-400 p-4"
                              style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="text-black font-bold text-lg">{recruit.name}</div>
                                  <div className="text-gray-600 text-sm mt-1">
                                    {recruit.position} • {recruit.hometown}, {recruit.state} • {'⭐'.repeat(recruit.stars)}
                                  </div>
                                  <div className="mt-2 text-red-600 text-xs font-bold">
                                    ❌ YOU HAD {recruit.interest}% INTEREST
                                  </div>
                                  {recruit.isGenerational && recruit.interest >= 50 && (
                                    <div className="mt-2 text-purple-600 text-xs font-bold">
                                      🌟 GENERATIONAL TALENT
                                    </div>
                                  )}
                                  {recruit.isDiamond && recruit.interest >= 50 && (
                                    <div className="mt-2 text-blue-600 text-xs font-bold">
                                      💎 DIAMOND IN THE ROUGH
                                    </div>
                                  )}
                                  {recruit.signingDayDecision && (
                                    <div className="mt-2 text-orange-600 text-xs font-bold">
                                      📅 SIGNING DAY DECISION
                                    </div>
                                  )}
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-gray-600">COMMITTED TO</div>
                                  <div
                                    className="text-lg font-bold mt-1"
                                    style={{ color: recruit.committedSchool?.colors?.primary || '#000000' }}
                                  >
                                    {recruit.committedSchool?.name || 'Unknown'}
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1">
                                    {recruit.committedSchool?.tier}
                                  </div>
                                  <div className="text-xs text-green-600 mt-2 font-bold">
                                    {formatCurrency(recruit.nilDeal || 0)} NIL
                                  </div>
                                </div>
                              </div>

                              {/* Flip or Walk Away Buttons */}
                              <div className="mt-4 pt-4 border-t-2 border-red-200">
                                {!recruitDecisions[recruit.id] ? (
                                  <div className="flex gap-3">
                                    <button
                                      onClick={() => window.handleKeepRecruitingToFlip(recruit.id)}
                                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 border-4 border-orange-700 transition-all text-sm"
                                      style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}
                                    >
                                      🔄 KEEP RECRUITING TO FLIP
                                    </button>
                                    <button
                                      onClick={() => window.handleWalkAway(recruit.id)}
                                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 border-4 border-gray-700 transition-all text-sm"
                                      style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}
                                    >
                                      👋 WALK AWAY
                                    </button>
                                  </div>
                                ) : recruitDecisions[recruit.id] === 'flip' ? (
                                  <div className="bg-orange-100 border-2 border-orange-500 p-3 text-center">
                                    <div className="text-orange-700 font-bold text-sm">
                                      🔄 KEEPING IN RECRUITING BOARD - You can continue recruiting this player
                                    </div>
                                  </div>
                                ) : (
                                  <div className="bg-gray-100 border-2 border-gray-500 p-3 text-center">
                                    <div className="text-gray-700 font-bold text-sm">
                                      👋 WALKED AWAY - This recruit will no longer appear in your recruiting board
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Section 2: All Other Commitments */}
                    {otherRecruits.length > 0 && (
                      <div>
                        <button
                          onClick={() => setReportOthersExpanded(!reportOthersExpanded)}
                          className="w-full bg-gray-700 text-white p-3 border-4 border-gray-600 mb-3 hover:bg-gray-600 transition-all flex justify-between items-center"
                          style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                        >
                          <div className="text-left">
                            <h3 className="font-bold">📊 ALL OTHER COMMITMENTS</h3>
                            <div className="text-xs mt-1 opacity-90">
                              {otherRecruits.length} commitment{otherRecruits.length !== 1 ? 's' : ''}
                            </div>
                          </div>
                          <div className="text-2xl">{reportOthersExpanded ? '▼' : '▶'}</div>
                        </button>
                        {reportOthersExpanded && (
                          <div className="space-y-3">
                          {otherRecruits.map((recruit) => (
                            <div
                              key={recruit.id}
                              className="bg-white border-2 border-gray-400 p-4"
                              style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="text-black font-bold text-lg">{recruit.name}</div>
                                  <div className="text-gray-600 text-sm mt-1">
                                    {recruit.position} • {recruit.hometown}, {recruit.state} • {'⭐'.repeat(recruit.stars)}
                                  </div>
                                  {recruit.isGenerational && recruit.interest >= 50 && (
                                    <div className="mt-2 text-purple-600 text-xs font-bold">
                                      🌟 GENERATIONAL TALENT
                                    </div>
                                  )}
                                  {recruit.isDiamond && recruit.interest >= 50 && (
                                    <div className="mt-2 text-blue-600 text-xs font-bold">
                                      💎 DIAMOND IN THE ROUGH
                                    </div>
                                  )}
                                  {recruit.signingDayDecision && (
                                    <div className="mt-2 text-orange-600 text-xs font-bold">
                                      📅 SIGNING DAY DECISION
                                    </div>
                                  )}
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-gray-600">COMMITTED TO</div>
                                  <div
                                    className="text-lg font-bold mt-1"
                                    style={{ color: recruit.committedSchool?.colors?.primary || '#000000' }}
                                  >
                                    {recruit.committedSchool?.name || 'Unknown'}
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1">
                                    {recruit.committedSchool?.tier}
                                  </div>
                                  <div className="text-xs text-green-600 mt-2 font-bold">
                                    {formatCurrency(recruit.nilDeal || 0)} NIL
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* NIL Negotiation Modal */}
      {showNegotiationModal && negotiatingRecruit && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-4 border-green-500 max-w-md w-full max-h-[90vh] overflow-y-auto" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.8)' }}>
            {/* Modal Header */}
            <div className="bg-green-500 text-black p-3 border-b-4 border-green-600">
              <h2 className="text-base font-bold">💰 NIL NEGOTIATION</h2>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              {/* Recruit Info */}
              <div className="bg-gray-800 border-2 border-gray-600 p-3 mb-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-white font-bold text-lg">{negotiatingRecruit.name}</div>
                    <div className="text-gray-400 text-xs mt-1">
                      {negotiatingRecruit.position} • {negotiatingRecruit.hometown}, {negotiatingRecruit.state}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-400">{'⭐'.repeat(negotiatingRecruit.stars)}</span>
                      <span className="text-white text-sm">
                        {negotiatingRecruit.interest >= 50 ? negotiatingRecruit.rating : '??'} OVR
                      </span>
                      {negotiatingRecruit.isGenerational && negotiatingRecruit.interest >= 50 && (
                        <span className="bg-yellow-600 px-2 py-1 text-xs border border-yellow-500">🏆 GENERATIONAL</span>
                      )}
                      {negotiatingRecruit.isDiamond && negotiatingRecruit.interest >= 50 && (
                        <span className="bg-blue-600 px-2 py-1 text-xs border border-blue-500">💎 DIAMOND</span>
                      )}
                      {negotiatingRecruit.signingDayDecision && (
                        <span className="bg-orange-600 px-2 py-1 text-xs border border-orange-500">📅 SIGNING DAY</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="border-t-2 border-gray-700 pt-3 mt-3">
                  <div className="text-green-400 font-bold mb-2">🤝 VERBAL COMMITMENT!</div>
                  <div className="text-gray-300 text-sm">
                    {negotiatingRecruit.name} wants to join {selectedSchool?.name}! Now you need to negotiate an NIL deal.
                  </div>
                  {negotiatingRecruit.interest < 100 && (
                    <div className="mt-2 bg-yellow-900 border border-yellow-600 p-2 text-xs text-yellow-200">
                      ⚠️ <span className="font-bold">Early Commitment:</span> Only {Math.round(negotiatingRecruit.interest)}% interest.
                      Flip risk is <span className="text-yellow-400">{negotiatingRecruit.flipMultiplier?.toFixed(2) || 1}x higher</span> than normal.
                      {negotiatingRecruit.interest < 80 && ' Very risky!'}
                    </div>
                  )}
                </div>
              </div>
              
              {/* NIL Details */}
              <div className="bg-gray-800 border-2 border-gray-600 p-3 mb-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-gray-400 text-xs mb-1">MARKET VALUE</div>
                    <div className="text-white text-base">{formatCurrency(negotiatingRecruit.marketValue)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">ASKING PRICE</div>
                    <div className="text-yellow-400 text-base font-bold">{formatCurrency(negotiatingRecruit.askingPrice)}</div>
                  </div>
                </div>

                {/* Counter Offer Slider */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-400 text-xs">YOUR OFFER</span>
                    <span className="text-green-400 text-base font-bold">{formatCurrency(counterOffer)}</span>
                  </div>
                  <input
                    type="range"
                    min={Math.round(negotiatingRecruit.marketValue * 0.5)}
                    max={Math.round(negotiatingRecruit.askingPrice * 1.2)}
                    value={counterOffer}
                    onChange={(e) => setCounterOffer(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{formatCurrency(Math.round(negotiatingRecruit.marketValue * 0.5))}</span>
                    <span>{formatCurrency(Math.round(negotiatingRecruit.askingPrice * 1.2))}</span>
                  </div>
                </div>
                
                {/* Budget Check */}
                <div className="mt-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Your Available Budget:</span>
                    <span className={budgetRemaining >= counterOffer ? 'text-green-400' : 'text-red-400'}>
                      {formatCurrency(budgetRemaining)}
                    </span>
                  </div>
                  {budgetRemaining < counterOffer && (
                    <div className="text-red-400 mt-1">⚠ Not enough budget for this offer!</div>
                  )}
                </div>
                
                {/* Flip Risk Preview - Show how offer affects loyalty */}
                <div className="mt-3 bg-gray-800 border-2 border-gray-600 p-2">
                  <div className="text-xs text-yellow-400 font-bold mb-2">💰 OVERPAY = LOYALTY</div>
                  {(() => {
                    const baseFlip = negotiatingRecruit.flipMultiplier || 1.0;
                    const currentOfferFlip = calculateFlipMultiplierFromNIL(
                      counterOffer,
                      negotiatingRecruit.askingPrice,
                      negotiatingRecruit.marketValue,
                      baseFlip
                    );
                    const percentOfAsking = (counterOffer / negotiatingRecruit.askingPrice * 100).toFixed(0);
                    
                    let loyaltyLevel = '';
                    let loyaltyColor = '';
                    if (currentOfferFlip <= 0.3) {
                      loyaltyLevel = 'LOCKED IN 🔒';
                      loyaltyColor = 'text-green-400';
                    } else if (currentOfferFlip <= 0.5) {
                      loyaltyLevel = 'Very Loyal';
                      loyaltyColor = 'text-green-300';
                    } else if (currentOfferFlip <= 0.7) {
                      loyaltyLevel = 'Loyal';
                      loyaltyColor = 'text-blue-400';
                    } else if (currentOfferFlip <= 0.9) {
                      loyaltyLevel = 'Satisfied';
                      loyaltyColor = 'text-gray-300';
                    } else if (currentOfferFlip <= 1.1) {
                      loyaltyLevel = 'Content';
                      loyaltyColor = 'text-yellow-400';
                    } else if (currentOfferFlip <= 1.4) {
                      loyaltyLevel = 'Uncertain';
                      loyaltyColor = 'text-orange-400';
                    } else {
                      loyaltyLevel = 'FLIP RISK ⚠';
                      loyaltyColor = 'text-red-400';
                    }
                    
                    return (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Current Offer:</span>
                          <span className="text-white font-bold">{percentOfAsking}% of asking</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Loyalty Level:</span>
                          <span className={`font-bold ${loyaltyColor}`}>{loyaltyLevel}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Flip Multiplier:</span>
                          <span className={`font-bold ${loyaltyColor}`}>{currentOfferFlip.toFixed(2)}x</span>
                        </div>
                        
                        {/* Quick reference guide */}
                        <div className="mt-3 pt-2 border-t border-gray-700 text-xs text-gray-400">
                          <div className="font-bold mb-1">Quick Guide:</div>
                          <div>• 120%+ asking = 🔒 Locked In (0.3x flip)</div>
                          <div>• 110-120% = Very Loyal (0.5x flip)</div>
                          <div>• 100-110% = Loyal (0.7-0.9x flip)</div>
                          <div>• 90-100% = Risky (1.1-1.2x flip)</div>
                          <div>• Under 90% = Very Risky (1.4x flip)</div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // Accept their asking price
                    if (budgetRemaining >= negotiatingRecruit.askingPrice) {
                      const baseFlipMultiplier = negotiatingRecruit.flipMultiplier || 1.0;
                      const finalFlipMultiplier = calculateFlipMultiplierFromNIL(
                        negotiatingRecruit.askingPrice,
                        negotiatingRecruit.askingPrice,
                        negotiatingRecruit.marketValue,
                        baseFlipMultiplier
                      );

                      // Check for competition - only auto-commit if 100% interest + no other school >85%
                      const competingSchools = (negotiatingRecruit.recruitingSchools || []).filter(
                        rs => rs.schoolId !== selectedSchool.id && rs.interest > 85
                      );
                      const hasCompetition = competingSchools.length > 0;
                      const shouldAutoCommit = negotiatingRecruit.interest === 100 && !hasCompetition;

                      setRecruits(recruits.map(r =>
                        r.id === negotiatingRecruit.id ? {
                          ...r,
                          verbalCommit: true, // ALWAYS commit when NIL accepted
                          nilDeal: negotiatingRecruit.askingPrice,
                          committedSchool: selectedSchool, // ALWAYS set school when NIL accepted
                          commitmentInterest: negotiatingRecruit.interest,
                          flipMultiplier: finalFlipMultiplier,
                          signingDayDecision: hasCompetition, // Only signing day decision if there's real competition
                          nilOfferAccepted: true,
                          acceptedNILAmount: negotiatingRecruit.askingPrice
                        } : r
                      ));

                      // Show appropriate message
                      if (shouldAutoCommit) {
                        alert(`🎉 ${negotiatingRecruit.name} has COMMITTED to ${getSchoolDisplayName(selectedSchool)}!\n\nNo other schools had >85% interest, so this is a done deal!`);
                      } else {
                        alert(`💼 NIL Deal Accepted!\n\n${negotiatingRecruit.name} accepted your offer of ${formatCurrency(negotiatingRecruit.askingPrice)}.\n\n${hasCompetition ? `⚠️ SIGNING DAY DECISION: ${competingSchools.length} other school${competingSchools.length > 1 ? 's have' : ' has'} >85% interest.\n\nKeep recruiting to improve your chances on Signing Day!` : 'Continue recruiting to reach 100% interest for an auto-commit!'}`);
                      }

                      setShowNegotiationModal(false);
                      setNegotiatingRecruit(null);
                    }
                  }}
                  disabled={budgetRemaining < negotiatingRecruit.askingPrice}
                  className="flex-1 bg-green-700 border-2 border-green-600 p-2 text-sm hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}
                >
                  ✅ ACCEPT ASKING PRICE
                  <div className="text-xs mt-1">{formatCurrency(negotiatingRecruit.askingPrice)}</div>
                </button>

                <button
                  onClick={() => {
                    // Counter offer logic
                    if (budgetRemaining >= counterOffer) {
                      const acceptanceChance = Math.min(95, (counterOffer / negotiatingRecruit.askingPrice) * 100);
                      if (Math.random() * 100 < acceptanceChance) {
                        // Accepted counter
                        const baseFlipMultiplier = negotiatingRecruit.flipMultiplier || 1.0;
                        const finalFlipMultiplier = calculateFlipMultiplierFromNIL(
                          counterOffer,
                          negotiatingRecruit.askingPrice,
                          negotiatingRecruit.marketValue,
                          baseFlipMultiplier
                        );

                        // Check for competition - only auto-commit if 100% interest + no other school >85%
                        const competingSchools = (negotiatingRecruit.recruitingSchools || []).filter(
                          rs => rs.schoolId !== selectedSchool.id && rs.interest > 85
                        );
                        const hasCompetition = competingSchools.length > 0;
                        const shouldAutoCommit = negotiatingRecruit.interest === 100 && !hasCompetition;

                        setRecruits(recruits.map(r =>
                          r.id === negotiatingRecruit.id ? {
                            ...r,
                            verbalCommit: true, // ALWAYS commit when NIL accepted
                            nilDeal: counterOffer,
                            committedSchool: selectedSchool, // ALWAYS set school when NIL accepted
                            commitmentInterest: negotiatingRecruit.interest,
                            flipMultiplier: finalFlipMultiplier,
                            signingDayDecision: hasCompetition, // Only signing day decision if there's real competition
                            nilOfferAccepted: true,
                            acceptedNILAmount: counterOffer
                          } : r
                        ));

                        // Show appropriate message
                        if (shouldAutoCommit) {
                          alert(`🎉 ${negotiatingRecruit.name} has COMMITTED to ${getSchoolDisplayName(selectedSchool)}!\n\nNo other schools had >85% interest, so this is a done deal!`);
                        } else {
                          alert(`💼 Counter Offer Accepted!\n\n${negotiatingRecruit.name} accepted your counter offer of ${formatCurrency(counterOffer)}.\n\n${hasCompetition ? `⚠️ SIGNING DAY DECISION: ${competingSchools.length} other school${competingSchools.length > 1 ? 's have' : ' has'} >85% interest.\n\nKeep recruiting to improve your chances on Signing Day!` : 'Continue recruiting to reach 100% interest for an auto-commit!'}`);
                        }

                        setShowNegotiationModal(false);
                        setNegotiatingRecruit(null);
                      } else {
                        // Rejected counter - recruit lost
                        alert(`${negotiatingRecruit.name} rejected your offer and will consider other schools.`);
                        setRecruits(recruits.map(r =>
                          r.id === negotiatingRecruit.id ? {
                            ...r,
                            interest: 75, // Drop interest back down
                            actionsUsedThisWeek: [] // Allow recruiting again
                          } : r
                        ));
                        setShowNegotiationModal(false);
                        setNegotiatingRecruit(null);
                      }
                    }
                  }}
                  disabled={budgetRemaining < counterOffer}
                  className="flex-1 bg-yellow-700 border-2 border-yellow-600 p-2 text-sm hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}
                >
                  💵 COUNTER OFFER
                  <div className="text-xs mt-1">{formatCurrency(counterOffer)}</div>
                  <div className="text-xs opacity-70">
                    {Math.round(Math.min(95, (counterOffer / negotiatingRecruit.askingPrice) * 100))}% chance
                  </div>
                </button>

                <button
                  onClick={() => {
                    // Decline - lose recruit
                    setRecruits(recruits.map(r =>
                      r.id === negotiatingRecruit.id ? {
                        ...r,
                        interest: 0,
                        actionsUsedThisWeek: []
                      } : r
                    ));
                    setShowNegotiationModal(false);
                    setNegotiatingRecruit(null);
                  }}
                  className="flex-1 bg-red-700 border-2 border-red-600 p-2 text-sm hover:bg-red-600"
                  style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}
                >
                  ❌ DECLINE
                  <div className="text-xs mt-1">Let him walk</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Early Signing Period Results Modal */}
      {showESPModal && espResults && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-4 border-yellow-600 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
               style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>

            {/* Header */}
            <div className="bg-yellow-600 p-4 border-b-4 border-yellow-700 sticky top-0 z-10">
              <h2 className="text-2xl font-bold text-center">🖊️ EARLY SIGNING PERIOD RESULTS</h2>
              <div className="text-center text-sm mt-1">December Signing Period</div>
            </div>

            <div className="p-6 space-y-6">

              {/* SIGNED & LOCKED Section */}
              {espResults.signed.length > 0 && (
                <div>
                  <div className="bg-green-700 text-white p-3 border-4 border-green-600 mb-3">
                    <h3 className="font-bold text-lg">✅ SIGNED & LOCKED IN</h3>
                    <div className="text-xs mt-1">
                      {espResults.signed.length} recruit{espResults.signed.length !== 1 ? 's' : ''} signed their National Letter of Intent
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {espResults.signed.map(recruit => (
                      <div key={recruit.id}
                           className="bg-gray-800 border-2 border-green-600 p-3"
                           style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-bold text-white">{recruit.name}</div>
                            <div className="text-sm text-gray-400">
                              {recruit.position} • {recruit.hometown}, {recruit.state}
                            </div>
                            <div className="flex gap-2 mt-2 items-center">
                              <span className="text-yellow-500">{'⭐'.repeat(recruit.stars)}</span>
                              <span className="text-blue-400">OVR {recruit.rating}</span>
                              {recruit.isGenerational && (
                                <span className="bg-purple-600 px-2 py-0.5 text-xs border border-purple-400">🏆 GENERATIONAL</span>
                              )}
                              {recruit.isDiamond && (
                                <span className="bg-blue-600 px-2 py-0.5 text-xs border border-blue-400">💎 DIAMOND</span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 font-bold text-lg">✅ SIGNED</div>
                            <div className="text-xs text-gray-400 mt-1">
                              NIL: {formatCurrency(recruit.acceptedNILAmount || recruit.nilDeal)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="mt-3 bg-gray-800 border-2 border-gray-600 p-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Star Breakdown:</span>
                        <div className="mt-1">
                          {[5, 4, 3, 2].map(stars => {
                            const count = espResults.signed.filter(r => r.stars === stars).length;
                            return count > 0 ? (
                              <div key={stars} className="text-yellow-500">
                                {'⭐'.repeat(stars)}: {count}
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400">Total NIL Committed:</span>
                        <div className="text-white font-bold mt-1">
                          {formatCurrency(espResults.signed.reduce((sum, r) => sum + (r.acceptedNILAmount || r.nilDeal || 0), 0))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* WAITING FOR NATIONAL SIGNING DAY Section */}
              {espResults.unsigned.length > 0 && (
                <div>
                  <div className="bg-orange-600 text-white p-3 border-4 border-orange-700 mb-3">
                    <h3 className="font-bold text-lg">⚠️ WAITING FOR NATIONAL SIGNING DAY</h3>
                    <div className="text-xs mt-1">
                      {espResults.unsigned.length} commit{espResults.unsigned.length !== 1 ? 's' : ''} did not sign early - still at risk
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {espResults.unsigned.map(recruit => {
                      // Calculate flip risk
                      const flipMultiplier = recruit.flipMultiplier || 1.0;
                      let riskLevel = '';
                      let riskColor = '';
                      if (flipMultiplier <= 0.5) {
                        riskLevel = 'Very Low Risk';
                        riskColor = 'text-green-400';
                      } else if (flipMultiplier <= 0.9) {
                        riskLevel = 'Low Risk';
                        riskColor = 'text-blue-400';
                      } else if (flipMultiplier <= 1.2) {
                        riskLevel = 'Moderate Risk';
                        riskColor = 'text-yellow-400';
                      } else {
                        riskLevel = 'HIGH RISK ⚠️';
                        riskColor = 'text-red-400';
                      }

                      return (
                        <div key={recruit.id}
                             className="bg-gray-800 border-2 border-orange-600 p-3"
                             style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="font-bold text-white">{recruit.name}</div>
                              <div className="text-sm text-gray-400">
                                {recruit.position} • {recruit.hometown}, {recruit.state}
                              </div>
                              <div className="flex gap-2 mt-2 items-center">
                                <span className="text-yellow-500">{'⭐'.repeat(recruit.stars)}</span>
                                <span className="text-blue-400">OVR {recruit.rating}</span>
                                {recruit.isGenerational && (
                                  <span className="bg-purple-600 px-2 py-0.5 text-xs border border-purple-400">🏆 GENERATIONAL</span>
                                )}
                                {recruit.isDiamond && (
                                  <span className="bg-blue-600 px-2 py-0.5 text-xs border border-blue-400">💎 DIAMOND</span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`font-bold ${riskColor}`}>{riskLevel}</div>
                              <div className="text-xs text-gray-400 mt-1">
                                Interest: {recruit.interest}%
                              </div>
                              <div className="text-xs text-gray-400">
                                Flip: {flipMultiplier.toFixed(2)}x
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 bg-red-900 border-2 border-red-700 p-3">
                    <div className="text-red-300 text-sm">
                      ⚠️ <strong>Warning:</strong> These recruits are still committed but did not sign. Continue recruiting during the playoffs to secure them before National Signing Day!
                    </div>
                  </div>
                </div>
              )}

              {/* SIGNING DAY DECISIONS Section */}
              {espResults.signingDay.length > 0 && (
                <div>
                  <div className="bg-purple-600 text-white p-3 border-4 border-purple-700 mb-3">
                    <h3 className="font-bold text-lg">📅 SIGNING DAY DECISIONS</h3>
                    <div className="text-xs mt-1">
                      {espResults.signingDay.length} recruit{espResults.signingDay.length !== 1 ? 's' : ''} will announce on National Signing Day
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {espResults.signingDay.map(recruit => {
                      // Get competing schools
                      const competingSchools = (recruit.recruitingSchools || [])
                        .filter(rs => rs.interest > 85)
                        .sort((a, b) => b.interest - a.interest);

                      return (
                        <div key={recruit.id}
                             className="bg-gray-800 border-2 border-purple-600 p-3"
                             style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="font-bold text-white">{recruit.name}</div>
                              <div className="text-sm text-gray-400">
                                {recruit.position} • {recruit.hometown}, {recruit.state}
                              </div>
                              <div className="flex gap-2 mt-2 items-center">
                                <span className="text-yellow-500">{'⭐'.repeat(recruit.stars)}</span>
                                <span className="text-blue-400">OVR {recruit.rating}</span>
                                {recruit.isGenerational && (
                                  <span className="bg-purple-600 px-2 py-0.5 text-xs border border-purple-400">🏆 GENERATIONAL</span>
                                )}
                                {recruit.isDiamond && (
                                  <span className="bg-blue-600 px-2 py-0.5 text-xs border border-blue-400">💎 DIAMOND</span>
                                )}
                              </div>
                              {competingSchools.length > 0 && (
                                <div className="mt-2 text-xs">
                                  <div className="text-gray-400 mb-1">Competing with:</div>
                                  {competingSchools.slice(0, 3).map(school => (
                                    <div key={school.schoolId} className="text-yellow-400">
                                      • {school.schoolName} ({school.interest}% interest)
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-purple-400 font-bold">UNDECIDED</div>
                              <div className="text-xs text-gray-400 mt-1">
                                Your Interest: {recruit.recruitingSchools?.find(rs => rs.schoolId === selectedSchool?.id)?.interest || 0}%
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 bg-purple-900 border-2 border-purple-700 p-3">
                    <div className="text-purple-300 text-sm">
                      📅 These recruits will make their final decision on National Signing Day. Keep recruiting!
                    </div>
                  </div>
                </div>
              )}

              {/* Conference-Wide AI Results */}
              {conferenceRecruitingResults && (
                <div>
                  <div className="bg-gray-700 text-white p-3 border-4 border-gray-600 mb-3">
                    <h3 className="font-bold text-lg">📊 {getConferenceDisplayName(selectedSchool.conference)} RECRUITING RESULTS</h3>
                    <div className="text-xs mt-1">Early Signing Period commitments across the conference</div>
                  </div>

                  <div className="grid gap-2">
                    {conferenceRecruitingResults
                      .sort((a, b) => b.totalSigned - a.totalSigned)
                      .map((schoolResult, index) => {
                        const isUserSchool = schoolResult.schoolId === selectedSchool?.id;
                        return (
                          <div key={schoolResult.schoolId}
                               className={`p-3 border-2 ${isUserSchool ? 'bg-blue-900 border-blue-600' : 'bg-gray-800 border-gray-600'}`}
                               style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
                            <div className="flex justify-between items-center">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-400 text-sm">#{index + 1}</span>
                                  <span className={`font-bold ${isUserSchool ? 'text-blue-300' : 'text-white'}`}>
                                    {schoolResult.schoolName}
                                  </span>
                                  {isUserSchool && <span className="text-xs text-blue-400">(YOU)</span>}
                                </div>
                              </div>
                              <div className="flex gap-4 text-sm">
                                <div className="text-center">
                                  <div className="text-gray-400 text-xs">Signed</div>
                                  <div className="text-white font-bold">{schoolResult.totalSigned}</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-gray-400 text-xs">5⭐</div>
                                  <div className="text-yellow-500 font-bold">{schoolResult.fiveStars}</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-gray-400 text-xs">4⭐</div>
                                  <div className="text-yellow-400 font-bold">{schoolResult.fourStars}</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-gray-400 text-xs">Avg OVR</div>
                                  <div className="text-blue-400 font-bold">{schoolResult.avgRating}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Close Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => {
                    setShowESPModal(false);
                    setESPResults(null);
                  }}
                  className="bg-blue-700 border-4 border-blue-600 px-8 py-3 text-lg font-bold hover:bg-blue-600"
                  style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                >
                  CONTINUE TO PLAYOFFS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* National Signing Day Reveal Modal */}
      {showNSDModal && nsdResults && nsdResults.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-4 border-red-600 max-w-3xl w-full"
               style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>

            {/* Header */}
            <div className="bg-red-600 p-4 border-b-4 border-red-700">
              <h2 className="text-2xl font-bold text-center">🎓 NATIONAL SIGNING DAY</h2>
              <div className="text-center text-sm mt-1">February Signing Day Decisions</div>
              <div className="text-center text-xs mt-2 text-red-200">
                Decision {nsdCurrentRevealIndex + 1} of {nsdResults.length}
              </div>
            </div>

            <div className="p-6">
              {nsdRevealing && nsdCurrentRevealIndex < nsdResults.length ? (
                // Reveal Mode - One at a time
                (() => {
                  const decision = nsdResults[nsdCurrentRevealIndex];
                  const recruit = decision.recruit;
                  const signed = decision.signed;
                  const destination = decision.destination;
                  const reason = decision.reason;

                  return (
                    <div className="space-y-6">
                      {/* Recruit Info */}
                      <div className="bg-gray-800 border-2 border-gray-600 p-4"
                           style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-2">{recruit.name}</div>
                          <div className="text-gray-400">
                            {recruit.position} • {recruit.hometown}, {recruit.state}
                          </div>
                          <div className="flex justify-center gap-2 mt-3 items-center">
                            <span className="text-yellow-500 text-xl">{'⭐'.repeat(recruit.stars)}</span>
                            <span className="text-blue-400 text-lg">OVR {recruit.rating}</span>
                          </div>
                          {recruit.isGenerational && (
                            <div className="mt-2">
                              <span className="bg-purple-600 px-3 py-1 text-sm border-2 border-purple-400">
                                🏆 GENERATIONAL TALENT
                              </span>
                            </div>
                          )}
                          {recruit.isDiamond && (
                            <div className="mt-2">
                              <span className="bg-blue-600 px-3 py-1 text-sm border-2 border-blue-400">
                                💎 DIAMOND IN THE ROUGH
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Envelope Reveal */}
                      <div className="text-center">
                        <div className="text-6xl mb-4">✉️</div>
                        <div className="text-gray-400 text-sm mb-4">Opening decision letter...</div>
                      </div>

                      {/* Decision */}
                      <div className={`p-6 border-4 ${signed ? 'bg-green-900 border-green-600' : 'bg-red-900 border-red-600'}`}
                           style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
                        {signed ? (
                          <div className="text-center">
                            <div className="text-4xl mb-3">🎉</div>
                            <div className="text-3xl font-bold text-green-300 mb-2">
                              SIGNED WITH YOU!
                            </div>
                            <div className="text-green-200 text-lg">
                              {recruit.name} is officially a {getSchoolNickname(selectedSchool)}!
                            </div>
                            {recruit.acceptedNILAmount && (
                              <div className="mt-3 text-green-300 text-sm">
                                NIL Deal: {formatCurrency(recruit.acceptedNILAmount)}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="text-4xl mb-3">💔</div>
                            <div className="text-3xl font-bold text-red-300 mb-2">
                              SIGNED ELSEWHERE
                            </div>
                            <div className="text-red-200 text-lg mb-3">
                              {recruit.name} signed with {destination?.name || 'another school'}
                            </div>
                            {reason && (
                              <div className="mt-3 bg-red-950 border-2 border-red-700 p-3">
                                <div className="text-red-300 text-sm">
                                  <strong>Reason:</strong> {reason}
                                </div>
                              </div>
                            )}
                            {decision.competingSchools && decision.competingSchools.length > 1 && (
                              <div className="mt-3 text-xs text-red-300">
                                <div className="mb-1">Final Competition:</div>
                                {decision.competingSchools.slice(0, 3).map((school, idx) => (
                                  <div key={idx} className={school.schoolId === selectedSchool?.id ? 'text-yellow-400' : ''}>
                                    {idx + 1}. {school.schoolName} ({school.interest}% interest)
                                    {school.schoolId === destination?.id && ' ✓ SIGNED'}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Next Button */}
                      <div className="flex justify-center pt-4">
                        {nsdCurrentRevealIndex < nsdResults.length - 1 ? (
                          <button
                            onClick={() => setNSDCurrentRevealIndex(nsdCurrentRevealIndex + 1)}
                            className="bg-blue-700 border-4 border-blue-600 px-8 py-3 text-lg font-bold hover:bg-blue-600"
                            style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                          >
                            NEXT DECISION →
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setNSDRevealing(false);
                              setNSDCurrentRevealIndex(0);
                            }}
                            className="bg-green-700 border-4 border-green-600 px-8 py-3 text-lg font-bold hover:bg-green-600"
                            style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                          >
                            VIEW FINAL RESULTS
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()
              ) : (
                // Summary Mode - All decisions revealed
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-white mb-2">🎓 SIGNING DAY COMPLETE</div>
                    <div className="text-gray-400">All decisions have been revealed</div>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-900 border-2 border-green-600 p-4 text-center"
                         style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
                      <div className="text-3xl font-bold text-green-300">
                        {nsdResults.filter(d => d.signed).length}
                      </div>
                      <div className="text-green-200 text-sm mt-1">Signed with You</div>
                    </div>
                    <div className="bg-red-900 border-2 border-red-600 p-4 text-center"
                         style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
                      <div className="text-3xl font-bold text-red-300">
                        {nsdResults.filter(d => !d.signed).length}
                      </div>
                      <div className="text-red-200 text-sm mt-1">Signed Elsewhere</div>
                    </div>
                  </div>

                  {/* All Decisions List */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {nsdResults.map((decision, idx) => (
                      <div key={idx}
                           className={`p-3 border-2 ${decision.signed ? 'bg-gray-800 border-green-600' : 'bg-gray-800 border-red-600'}`}
                           style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-bold text-white">{decision.recruit.name}</div>
                            <div className="text-sm text-gray-400">
                              {decision.recruit.position} • {'⭐'.repeat(decision.recruit.stars)} • OVR {decision.recruit.rating}
                            </div>
                          </div>
                          <div className="text-right">
                            {decision.signed ? (
                              <div className="text-green-400 font-bold">✅ SIGNED</div>
                            ) : (
                              <div>
                                <div className="text-red-400 font-bold">❌ LOST</div>
                                <div className="text-xs text-gray-400 mt-1">
                                  → {decision.destination?.name || 'Other'}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Close Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={() => {
                        // Mark all signed recruits as officially signed
                        setRecruits(prevRecruits => prevRecruits.map(r => {
                          const nsdDecision = nsdResults.find(d => d.recruit.id === r.id);
                          if (nsdDecision) {
                            if (nsdDecision.signed) {
                              return { ...r, signedCommit: true };
                            } else {
                              // Remove from user's recruits if they signed elsewhere
                              return { ...r, verbalCommit: false, committedSchool: null, interest: 0 };
                            }
                          }
                          return r;
                        }));

                        setShowNSDModal(false);
                        setNSDResults([]);
                        setNSDRevealing(false);
                        setNSDCurrentRevealIndex(0);
                      }}
                      className="bg-blue-700 border-4 border-blue-600 px-8 py-3 text-lg font-bold hover:bg-blue-600"
                      style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                    >
                      CONTINUE TO OFF-SEASON
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Push for Early Signature Modal */}
      {showPushModal && pushingRecruit && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-4 border-purple-600 max-w-2xl w-full"
               style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>

            {/* Header */}
            <div className="bg-purple-600 p-4 border-b-4 border-purple-700">
              <h2 className="text-xl font-bold text-center">🚀 PUSH FOR EARLY SIGNATURE</h2>
              <div className="text-center text-xs mt-1">Make one final push before National Signing Day</div>
            </div>

            <div className="p-6">
              {/* Recruit Info */}
              <div className="bg-gray-800 border-2 border-gray-600 p-4 mb-4"
                   style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>
                <div className="text-center">
                  <div className="text-xl font-bold text-white mb-2">{pushingRecruit.name}</div>
                  <div className="text-sm text-gray-400">
                    {pushingRecruit.position} • {pushingRecruit.hometown}, {pushingRecruit.state}
                  </div>
                  <div className="flex justify-center gap-2 mt-2 items-center">
                    <span className="text-yellow-500">{'⭐'.repeat(pushingRecruit.stars)}</span>
                    <span className="text-blue-400">OVR {pushingRecruit.rating}</span>
                  </div>
                </div>
              </div>

              {/* Current Status */}
              <div className="bg-blue-900 border-2 border-blue-600 p-3 mb-4">
                <div className="text-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Your Current Offer:</span>
                    <span className="text-white font-bold">{formatCurrency(pushingRecruit.acceptedNILAmount || pushingRecruit.nilDeal)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Your Interest Level:</span>
                    <span className="text-blue-400 font-bold">{pushingRecruit.interest}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Commitment Status:</span>
                    <span className="text-yellow-400 font-bold">🤝 Verbal (Not Signed)</span>
                  </div>
                </div>
              </div>

              {/* Competing Offers */}
              {(() => {
                // Generate competing AI offers
                const competingSchools = (pushingRecruit.recruitingSchools || [])
                  .filter(rs => rs.schoolId !== selectedSchool?.id && rs.interest > 70)
                  .sort((a, b) => b.interest - a.interest)
                  .slice(0, 3);

                return competingSchools.length > 0 && (
                  <div className="bg-red-900 border-2 border-red-600 p-3 mb-4">
                    <div className="text-sm font-bold text-red-300 mb-2">⚠️ COMPETING OFFERS</div>
                    <div className="space-y-2">
                      {competingSchools.map(school => {
                        // Estimate their NIL offer (110-140% of asking price based on interest)
                        const offerMultiplier = 1.1 + ((school.interest - 70) / 100);
                        const estimatedOffer = Math.round(pushingRecruit.askingPrice * offerMultiplier);

                        return (
                          <div key={school.schoolId}
                               className="bg-gray-800 border border-red-700 p-2 flex justify-between items-center">
                            <div>
                              <div className="text-white text-xs font-bold">{school.schoolName}</div>
                              <div className="text-gray-400 text-xs">{school.interest}% interest</div>
                            </div>
                            <div className="text-right">
                              <div className="text-red-300 text-xs font-bold">
                                ~{formatCurrency(estimatedOffer)}
                              </div>
                              <div className="text-xs text-gray-500">estimated</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* NIL Offer Input */}
              <div className="bg-gray-800 border-2 border-gray-600 p-4 mb-4">
                <div className="text-sm font-bold text-white mb-3">💰 NEW NIL OFFER</div>
                <div className="text-xs text-gray-400 mb-2">
                  Enter additional NIL funds to convince {pushingRecruit.name} to sign early
                </div>
                <input
                  type="number"
                  id="pushNILAmount"
                  placeholder="Additional NIL amount"
                  min="0"
                  step="10000"
                  className="w-full bg-gray-900 border-2 border-gray-600 px-3 py-2 text-white"
                  onInput={(e) => {
                    const input = e.target;
                    const value = parseInt(input.value) || 0;
                    const currentOffer = pushingRecruit.acceptedNILAmount || pushingRecruit.nilDeal || 0;
                    const newTotal = currentOffer + value;
                    const percentOfAsking = ((newTotal / pushingRecruit.askingPrice) * 100).toFixed(0);

                    // Calculate success probability
                    let successChance = 0;
                    if (newTotal >= pushingRecruit.askingPrice * 1.3) {
                      successChance = 85; // Very high chance
                    } else if (newTotal >= pushingRecruit.askingPrice * 1.2) {
                      successChance = 70;
                    } else if (newTotal >= pushingRecruit.askingPrice * 1.1) {
                      successChance = 55;
                    } else if (newTotal >= pushingRecruit.askingPrice) {
                      successChance = 40;
                    } else {
                      successChance = 20; // Low chance if under asking
                    }

                    // Update display
                    const display = document.getElementById('pushSuccessDisplay');
                    if (display) {
                      display.innerHTML = `
                        <div class="flex justify-between mb-2">
                          <span class="text-gray-400">New Total Offer:</span>
                          <span class="text-white font-bold">${formatCurrency(newTotal)}</span>
                        </div>
                        <div class="flex justify-between mb-2">
                          <span class="text-gray-400">% of Asking Price:</span>
                          <span class="text-blue-400 font-bold">${percentOfAsking}%</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-gray-400">Success Chance:</span>
                          <span class="text-${successChance >= 70 ? 'green' : successChance >= 50 ? 'yellow' : 'red'}-400 font-bold">${successChance}%</span>
                        </div>
                      `;
                    }
                  }}
                />
                <div id="pushSuccessDisplay" className="mt-3 text-sm">
                  <div className="text-gray-500 text-xs">Enter an amount to see success probability</div>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-yellow-900 border-2 border-yellow-600 p-3 mb-4">
                <div className="text-yellow-300 text-xs">
                  ⚠️ <strong>One-Time Opportunity:</strong> You can only use "Push for Early Signature" once per recruit. Choose your offer wisely!
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const input = document.getElementById('pushNILAmount');
                    const additionalNIL = parseInt(input.value) || 0;

                    if (additionalNIL <= 0) {
                      alert('You must offer additional NIL funds to push for signature!');
                      return;
                    }

                    if (budgetRemaining < additionalNIL) {
                      alert(`Insufficient budget! You only have ${formatCurrency(budgetRemaining)} remaining.`);
                      return;
                    }

                    const currentOffer = pushingRecruit.acceptedNILAmount || pushingRecruit.nilDeal || 0;
                    const newTotal = currentOffer + additionalNIL;

                    // Calculate success probability
                    let successChance = 0;
                    if (newTotal >= pushingRecruit.askingPrice * 1.3) {
                      successChance = 0.85;
                    } else if (newTotal >= pushingRecruit.askingPrice * 1.2) {
                      successChance = 0.70;
                    } else if (newTotal >= pushingRecruit.askingPrice * 1.1) {
                      successChance = 0.55;
                    } else if (newTotal >= pushingRecruit.askingPrice) {
                      successChance = 0.40;
                    } else {
                      successChance = 0.20;
                    }

                    // Roll for success
                    const success = Math.random() < successChance;

                    // Update recruit
                    setRecruits(prevRecruits => prevRecruits.map(r => {
                      if (r.id === pushingRecruit.id) {
                        if (success) {
                          // Signed early!
                          return {
                            ...r,
                            signedCommit: true,
                            acceptedNILAmount: newTotal,
                            nilDeal: newTotal
                          };
                        } else {
                          // Failed - still increase NIL but don't sign
                          return {
                            ...r,
                            acceptedNILAmount: newTotal,
                            nilDeal: newTotal
                          };
                        }
                      }
                      return r;
                    }));

                    // Mark as used
                    setPushForSignatureUsed(prev => ({
                      ...prev,
                      [pushingRecruit.id]: true
                    }));

                    // Show result
                    if (success) {
                      alert(`🎉 SUCCESS!\n\n${pushingRecruit.name} has SIGNED their National Letter of Intent!\n\nYour total NIL commitment: ${formatCurrency(newTotal)}`);
                    } else {
                      alert(`💔 NOT QUITE ENOUGH\n\n${pushingRecruit.name} appreciated the increased offer (now ${formatCurrency(newTotal)}) but wants to wait until National Signing Day to make a final decision.\n\nYou've used your one push attempt for this recruit.`);
                    }

                    setShowPushModal(false);
                    setPushingRecruit(null);
                  }}
                  className="flex-1 bg-green-700 border-2 border-green-600 p-3 font-bold hover:bg-green-600"
                  style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}
                >
                  ✅ MAKE OFFER
                </button>

                <button
                  onClick={() => {
                    setShowPushModal(false);
                    setPushingRecruit(null);
                  }}
                  className="flex-1 bg-gray-700 border-2 border-gray-600 p-3 font-bold hover:bg-gray-600"
                  style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}
                >
                  ❌ CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Options Modal */}
      <OptionsModal />
    </div>
  );
};

export default App;
