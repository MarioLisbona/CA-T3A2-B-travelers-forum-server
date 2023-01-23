import { PostModel } from './models/post.js'
import { CommentModel } from './models/comment.js'
import { MemberModel } from './models/member.js'
import { dbConnect, dbClose } from './db.js'

dbConnect()

await PostModel.deleteMany()
console.log('Deleted all Posts')
await CommentModel.deleteMany()
console.log('Deleted all Comments')
await MemberModel.deleteMany()
console.log('Deleted all members')

const posts = [
    // -------
    // Asia
    // -------
    {
    title: 'India by Train - They do things differently!' ,
    author: 'Callum' ,
    date_posted: new Date().toJSON() ,
    category: 'Asia' ,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' 
    },
    {
    title: 'I tried Pho from every city in Vietnam, and the best one was...' ,
    author: 'Mario' ,
    date_posted: new Date().toJSON() ,
    category: 'Asia' ,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' 
    },
    {
    title: 'They built the Great Wall of China to keep me out... but it didn\'t work' ,
    author: 'Chuck Norris' ,
    date_posted: new Date().toJSON() ,
    category: 'Asia' ,
    content: 'Chuck Norris was an only child...eventually Chuck Norris is the only man to ever defeat a brick wall in a game of tennis. Chuck Norris invented Kentucky Fried Chicken\'s famous secret recipe, with eleven herbs and spices. But nobody ever mentions the twelfth ingredient: Fear Chuck Norris has two speeds. Walk, and Kill. Chuck Norris doesn\'t read books. He stares them down until he gets the information he wants. Chuck Norris does not sleep. He waits. Police label anyone attacking Chuck Norris as a Code 45-11... a suicide Someone once videotaped Chuck Norris getting pissed off. It was called Walker: Texas Chain Saw Massacre. Chuck Norris does not get frostbite. Chuck Norris bites frost. Police label anyone attacking Chuck Norris as a Code 45-11... a suicide.' 
    },
    {
    title: 'Shipwrecked in Beijing' ,
    author: 'Jack Sparrow' ,
    date_posted: new Date().toJSON() ,
    category: 'Asia' ,
    content: 'Yar Pirate Ipsum. Reef sails strike colors code of conduct parley sloop yardarm square-rigged mizzen loaded to the gunwalls keel. Bilge rat scuttle gangway heave down piracy nipper pirate mizzen topmast deadlights. Aft case shot lugsail Gold Road scourge of the seven seas mutiny skysail reef bowsprit Admiral of the Black. Man-of-war yardarm plunder Gold Road case shot capstan poop deck grog blossom clap of thunder topsail. Jack Tar coffer weigh anchor lateen sail warp crimp wench square-rigged careen pirate. Ye hearties interloper cable schooner ho avast tackle booty heave down. Prow reef sails Davy Jones\' Locker spike red ensign boom scurvy ahoy belay Sea Legs. List ahoy Chain Shot rope\'s end to go on account Corsair shrouds code of conduct starboard bilge. Jack Ketch crow\'s nest topmast run a rig stern Pieces of Eight Jolly Roger Sail ho cog grog blossom.' 
    },
    {
    title: 'Laying about in Laos' ,
    author: 'Florence' ,
    date_posted: new Date().toJSON() ,
    category: 'Asia' ,
    content: 'Oh. You need a little dummy text for your mockup? How quaint. I bet you\'re still using Bootstrap too…Freegan before they sold out poke taxidermy, pop-up vaporware vegan pinterest. Messenger bag pitchfork la croix gluten-free. Activated charcoal vexillologist iPhone, man braid bespoke tote bag kogi man bun adaptogen sustainable ethical intelligentsia vape. Tumblr sriracha umami, slow-carb typewriter celiac quinoa ethical keytar poke cloud bread hexagon kitsch tbh organic.' 
    },
    {
    title: 'Happy Little Rainforests' ,
    author: 'BoB Ross' ,
    date_posted: new Date().toJSON() ,
    category: 'Asia' ,
    content: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. Just go back and put one little more happy tree in there. Everybody\'s different. Trees are different. Let them all be individuals. We\'ll put some happy little leaves here and there. These things happen automatically. All you have to do is just let them happen. Everyone wants to enjoy the good parts - but you have to build the framework first. Let\'s do that again. I\'m gonna start with a little Alizarin crimson and a touch of Prussian blue. The very fact that you\'re aware of suffering is enough reason to be overjoyed that you\'re alive and can experience it. If you do too much it\'s going to lose its effectiveness. If you don\'t think every day is a good day - try missing a few. You\'ll see. In life you need colors. Fluff it up a little and hypnotize it.  We can fix anything. Automatically, all of these beautiful, beautiful things will happen. There we go. Look at them little rascals.' 
    },
    // -------------
    // Africa
    // -------------
    {
    title: 'Seeing the Great Pyramids' ,
    author: 'Callum' ,
    date_posted: new Date().toJSON() ,
    category: 'Africa' ,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' 
    },
    {
    title: 'My trip from the bottom of Africa to the Mediterranean' ,
    author: 'Mario' ,
    date_posted: new Date().toJSON() ,
    category: 'Africa' ,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' 
    },
    {
    title: 'An angry stampede of elephants ran away from ME' ,
    author: 'Chuck Norris' ,
    date_posted: new Date().toJSON() ,
    category: 'Africa' ,
    content: 'Chuck Norris was an only child...eventually Chuck Norris is the only man to ever defeat a brick wall in a game of tennis. Chuck Norris invented Kentucky Fried Chicken\'s famous secret recipe, with eleven herbs and spices. But nobody ever mentions the twelfth ingredient: Fear Chuck Norris has two speeds. Walk, and Kill. Chuck Norris doesn\'t read books. He stares them down until he gets the information he wants. Chuck Norris does not sleep. He waits. Police label anyone attacking Chuck Norris as a Code 45-11... a suicide Someone once videotaped Chuck Norris getting pissed off. It was called Walker: Texas Chain Saw Massacre. Chuck Norris does not get frostbite. Chuck Norris bites frost. Police label anyone attacking Chuck Norris as a Code 45-11... a suicide.' 
    },
    {
    title: 'Sailing around the Cape of Good Hope' ,
    author: 'Jack Sparrow' ,
    date_posted: new Date().toJSON() ,
    category: 'Africa' ,
    content: 'Yar Pirate Ipsum. Reef sails strike colors code of conduct parley sloop yardarm square-rigged mizzen loaded to the gunwalls keel. Bilge rat scuttle gangway heave down piracy nipper pirate mizzen topmast deadlights. Aft case shot lugsail Gold Road scourge of the seven seas mutiny skysail reef bowsprit Admiral of the Black. Man-of-war yardarm plunder Gold Road case shot capstan poop deck grog blossom clap of thunder topsail. Jack Tar coffer weigh anchor lateen sail warp crimp wench square-rigged careen pirate. Ye hearties interloper cable schooner ho avast tackle booty heave down. Prow reef sails Davy Jones\' Locker spike red ensign boom scurvy ahoy belay Sea Legs. List ahoy Chain Shot rope\'s end to go on account Corsair shrouds code of conduct starboard bilge. Jack Ketch crow\'s nest topmast run a rig stern Pieces of Eight Jolly Roger Sail ho cog grog blossom.' 
    },
    {
    title: 'Lions are so extra' ,
    author: 'Florence' ,
    date_posted: new Date().toJSON() ,
    category: 'Africa' ,
    content: 'Oh. You need a little dummy text for your mockup? How quaint. I bet you\'re still using Bootstrap too…Freegan before they sold out poke taxidermy, pop-up vaporware vegan pinterest. Messenger bag pitchfork la croix gluten-free. Activated charcoal vexillologist iPhone, man braid bespoke tote bag kogi man bun adaptogen sustainable ethical intelligentsia vape. Tumblr sriracha umami, slow-carb typewriter celiac quinoa ethical keytar poke cloud bread hexagon kitsch tbh organic.' 
    },
    {
    title: 'Happy Little Savannahs' ,
    author: 'BoB Ross' ,
    date_posted: new Date().toJSON() ,
    category: 'Africa' ,
    content: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. Just go back and put one little more happy tree in there. Everybody\'s different. Trees are different. Let them all be individuals. We\'ll put some happy little leaves here and there. These things happen automatically. All you have to do is just let them happen. Everyone wants to enjoy the good parts - but you have to build the framework first. Let\'s do that again. I\'m gonna start with a little Alizarin crimson and a touch of Prussian blue. The very fact that you\'re aware of suffering is enough reason to be overjoyed that you\'re alive and can experience it. If you do too much it\'s going to lose its effectiveness. If you don\'t think every day is a good day - try missing a few. You\'ll see. In life you need colors. Fluff it up a little and hypnotize it.  We can fix anything. Automatically, all of these beautiful, beautiful things will happen. There we go. Look at them little rascals.' 
    },
    // -------------
    // North America
    // -------------
    {
    title: 'I went to every McDonalds in the US' ,
    author: 'Callum' ,
    date_posted: new Date().toJSON() ,
    category: 'North America' ,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' 
    },
    {
    title: 'Skiing the Rockies... and an avalanche??!!' ,
    author: 'Mario' ,
    date_posted: new Date().toJSON() ,
    category: 'North America' ,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' 
    },
    {
    title: 'I went for a swim at Venice beach and caused a tsunami' ,
    author: 'Chuck Norris' ,
    date_posted: new Date().toJSON() ,
    category: 'North America' ,
    content: 'Chuck Norris was an only child...eventually Chuck Norris is the only man to ever defeat a brick wall in a game of tennis. Chuck Norris invented Kentucky Fried Chicken\'s famous secret recipe, with eleven herbs and spices. But nobody ever mentions the twelfth ingredient: Fear Chuck Norris has two speeds. Walk, and Kill. Chuck Norris doesn\'t read books. He stares them down until he gets the information he wants. Chuck Norris does not sleep. He waits. Police label anyone attacking Chuck Norris as a Code 45-11... a suicide Someone once videotaped Chuck Norris getting pissed off. It was called Walker: Texas Chain Saw Massacre. Chuck Norris does not get frostbite. Chuck Norris bites frost. Police label anyone attacking Chuck Norris as a Code 45-11... a suicide.' 
    },
    {
    title: 'Shipwrecked in San Francisco so I traded me plunder for an airbnb' ,
    author: 'Jack Sparrow' ,
    date_posted: new Date().toJSON() ,
    category: 'North America' ,
    content: 'Yar Pirate Ipsum. Reef sails strike colors code of conduct parley sloop yardarm square-rigged mizzen loaded to the gunwalls keel. Bilge rat scuttle gangway heave down piracy nipper pirate mizzen topmast deadlights. Aft case shot lugsail Gold Road scourge of the seven seas mutiny skysail reef bowsprit Admiral of the Black. Man-of-war yardarm plunder Gold Road case shot capstan poop deck grog blossom clap of thunder topsail. Jack Tar coffer weigh anchor lateen sail warp crimp wench square-rigged careen pirate. Ye hearties interloper cable schooner ho avast tackle booty heave down. Prow reef sails Davy Jones\' Locker spike red ensign boom scurvy ahoy belay Sea Legs. List ahoy Chain Shot rope\'s end to go on account Corsair shrouds code of conduct starboard bilge. Jack Ketch crow\'s nest topmast run a rig stern Pieces of Eight Jolly Roger Sail ho cog grog blossom.' 
    },
    {
    title: 'Everyone here is obsessed with American football?' ,
    author: 'Florence' ,
    date_posted: new Date().toJSON() ,
    category: 'North America' ,
    content: 'Oh. You need a little dummy text for your mockup? How quaint. I bet you\'re still using Bootstrap too…Freegan before they sold out poke taxidermy, pop-up vaporware vegan pinterest. Messenger bag pitchfork la croix gluten-free. Activated charcoal vexillologist iPhone, man braid bespoke tote bag kogi man bun adaptogen sustainable ethical intelligentsia vape. Tumblr sriracha umami, slow-carb typewriter celiac quinoa ethical keytar poke cloud bread hexagon kitsch tbh organic.' 
    },
    {
    title: 'Happy Little North American Things' ,
    author: 'BoB Ross' ,
    date_posted: new Date().toJSON() ,
    category: 'North America' ,
    content: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. Just go back and put one little more happy tree in there. Everybody\'s different. Trees are different. Let them all be individuals. We\'ll put some happy little leaves here and there. These things happen automatically. All you have to do is just let them happen. Everyone wants to enjoy the good parts - but you have to build the framework first. Let\'s do that again. I\'m gonna start with a little Alizarin crimson and a touch of Prussian blue. The very fact that you\'re aware of suffering is enough reason to be overjoyed that you\'re alive and can experience it. If you do too much it\'s going to lose its effectiveness. If you don\'t think every day is a good day - try missing a few. You\'ll see. In life you need colors. Fluff it up a little and hypnotize it.  We can fix anything. Automatically, all of these beautiful, beautiful things will happen. There we go. Look at them little rascals.' 
    },
    // -------------
    // South America
    // -------------
    {
    title: 'I swam with SHARKS!' ,
    author: 'Callum' ,
    date_posted: new Date().toJSON() ,
    category: 'South America' ,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' 
    },
    {
    title: 'Hiking through the Amazon - CRAZY!!!' ,
    author: 'Mario' ,
    date_posted: new Date().toJSON() ,
    category: 'South America' ,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' 
    },
    {
    title: 'Summiting every mountain in Patagonia in 24 hours' ,
    author: 'Chuck Norris' ,
    date_posted: new Date().toJSON() ,
    category: 'South America' ,
    content: 'Chuck Norris was an only child...eventually Chuck Norris is the only man to ever defeat a brick wall in a game of tennis. Chuck Norris invented Kentucky Fried Chicken\'s famous secret recipe, with eleven herbs and spices. But nobody ever mentions the twelfth ingredient: Fear Chuck Norris has two speeds. Walk, and Kill. Chuck Norris doesn\'t read books. He stares them down until he gets the information he wants. Chuck Norris does not sleep. He waits. Police label anyone attacking Chuck Norris as a Code 45-11... a suicide Someone once videotaped Chuck Norris getting pissed off. It was called Walker: Texas Chain Saw Massacre. Chuck Norris does not get frostbite. Chuck Norris bites frost. Police label anyone attacking Chuck Norris as a Code 45-11... a suicide.' 
    },
    {
    title: 'The cartels sank me ship' ,
    author: 'Jack Sparrow' ,
    date_posted: new Date().toJSON() ,
    category: 'South America' ,
    content: 'Yar Pirate Ipsum. Reef sails strike colors code of conduct parley sloop yardarm square-rigged mizzen loaded to the gunwalls keel. Bilge rat scuttle gangway heave down piracy nipper pirate mizzen topmast deadlights. Aft case shot lugsail Gold Road scourge of the seven seas mutiny skysail reef bowsprit Admiral of the Black. Man-of-war yardarm plunder Gold Road case shot capstan poop deck grog blossom clap of thunder topsail. Jack Tar coffer weigh anchor lateen sail warp crimp wench square-rigged careen pirate. Ye hearties interloper cable schooner ho avast tackle booty heave down. Prow reef sails Davy Jones\' Locker spike red ensign boom scurvy ahoy belay Sea Legs. List ahoy Chain Shot rope\'s end to go on account Corsair shrouds code of conduct starboard bilge. Jack Ketch crow\'s nest topmast run a rig stern Pieces of Eight Jolly Roger Sail ho cog grog blossom.' 
    },
    {
    title: 'Everyone here is obsessed with football?' ,
    author: 'Florence' ,
    date_posted: new Date().toJSON() ,
    category: 'South America' ,
    content: 'Oh. You need a little dummy text for your mockup? How quaint. I bet you\'re still using Bootstrap too…Freegan before they sold out poke taxidermy, pop-up vaporware vegan pinterest. Messenger bag pitchfork la croix gluten-free. Activated charcoal vexillologist iPhone, man braid bespoke tote bag kogi man bun adaptogen sustainable ethical intelligentsia vape. Tumblr sriracha umami, slow-carb typewriter celiac quinoa ethical keytar poke cloud bread hexagon kitsch tbh organic.' 
    },
    {
    title: 'Happy Little Mountains' ,
    author: 'BoB Ross' ,
    date_posted: new Date().toJSON() ,
    category: 'South America' ,
    content: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. Just go back and put one little more happy tree in there. Everybody\'s different. Trees are different. Let them all be individuals. We\'ll put some happy little leaves here and there. These things happen automatically. All you have to do is just let them happen. Everyone wants to enjoy the good parts - but you have to build the framework first. Let\'s do that again. I\'m gonna start with a little Alizarin crimson and a touch of Prussian blue. The very fact that you\'re aware of suffering is enough reason to be overjoyed that you\'re alive and can experience it. If you do too much it\'s going to lose its effectiveness. If you don\'t think every day is a good day - try missing a few. You\'ll see. In life you need colors. Fluff it up a little and hypnotize it.  We can fix anything. Automatically, all of these beautiful, beautiful things will happen. There we go. Look at them little rascals.' 
    },
    // ----------
    // Antarctica
    // ----------
    {
    title: 'Staying in an Antarctic research station' ,
    author: 'Callum' ,
    date_posted: new Date().toJSON() ,
    category: 'Antarctica' ,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' 
    },
    {
    title: 'I went to the south pole and all I got was hypothermia' ,
    author: 'Mario' ,
    date_posted: new Date().toJSON() ,
    category: 'Antarctica' ,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' 
    },
    {
    title: 'I got heat stroke in Antarctica' ,
    author: 'Chuck Norris' ,
    date_posted: new Date().toJSON() ,
    category: 'Antarctica' ,
    content: 'Chuck Norris was an only child...eventually Chuck Norris is the only man to ever defeat a brick wall in a game of tennis. Chuck Norris invented Kentucky Fried Chicken\'s famous secret recipe, with eleven herbs and spices. But nobody ever mentions the twelfth ingredient: Fear Chuck Norris has two speeds. Walk, and Kill. Chuck Norris doesn\'t read books. He stares them down until he gets the information he wants. Chuck Norris does not sleep. He waits. Police label anyone attacking Chuck Norris as a Code 45-11... a suicide Someone once videotaped Chuck Norris getting pissed off. It was called Walker: Texas Chain Saw Massacre. Chuck Norris does not get frostbite. Chuck Norris bites frost. Police label anyone attacking Chuck Norris as a Code 45-11... a suicide.' 
    },
    {
    title: 'Yar me hearties ship hit an iceberg' ,
    author: 'Jack Sparrow' ,
    date_posted: new Date().toJSON() ,
    category: 'Antarctica' ,
    content: 'Yar Pirate Ipsum. Reef sails strike colors code of conduct parley sloop yardarm square-rigged mizzen loaded to the gunwalls keel. Bilge rat scuttle gangway heave down piracy nipper pirate mizzen topmast deadlights. Aft case shot lugsail Gold Road scourge of the seven seas mutiny skysail reef bowsprit Admiral of the Black. Man-of-war yardarm plunder Gold Road case shot capstan poop deck grog blossom clap of thunder topsail. Jack Tar coffer weigh anchor lateen sail warp crimp wench square-rigged careen pirate. Ye hearties interloper cable schooner ho avast tackle booty heave down. Prow reef sails Davy Jones\' Locker spike red ensign boom scurvy ahoy belay Sea Legs. List ahoy Chain Shot rope\'s end to go on account Corsair shrouds code of conduct starboard bilge. Jack Ketch crow\'s nest topmast run a rig stern Pieces of Eight Jolly Roger Sail ho cog grog blossom.' 
    },
    {
    title: 'Brrrrrrrrrrrr Cold' ,
    author: 'Florence' ,
    date_posted: new Date().toJSON() ,
    category: 'Antarctica' ,
    content: 'Oh. You need a little dummy text for your mockup? How quaint. I bet you\'re still using Bootstrap too…Freegan before they sold out poke taxidermy, pop-up vaporware vegan pinterest. Messenger bag pitchfork la croix gluten-free. Activated charcoal vexillologist iPhone, man braid bespoke tote bag kogi man bun adaptogen sustainable ethical intelligentsia vape. Tumblr sriracha umami, slow-carb typewriter celiac quinoa ethical keytar poke cloud bread hexagon kitsch tbh organic.' 
    },
    {
    title: 'There are no happy little trees here' ,
    author: 'BoB Ross' ,
    date_posted: new Date().toJSON() ,
    category: 'Antarctica' ,
    content: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. Just go back and put one little more happy tree in there. Everybody\'s different. Trees are different. Let them all be individuals. We\'ll put some happy little leaves here and there. These things happen automatically. All you have to do is just let them happen. Everyone wants to enjoy the good parts - but you have to build the framework first. Let\'s do that again. I\'m gonna start with a little Alizarin crimson and a touch of Prussian blue. The very fact that you\'re aware of suffering is enough reason to be overjoyed that you\'re alive and can experience it. If you do too much it\'s going to lose its effectiveness. If you don\'t think every day is a good day - try missing a few. You\'ll see. In life you need colors. Fluff it up a little and hypnotize it.  We can fix anything. Automatically, all of these beautiful, beautiful things will happen. There we go. Look at them little rascals.' 
    },
    // ------
    // Europe
    // ------
    {
    title: 'My trip to Greece' ,
    author: 'Callum' ,
    date_posted: new Date().toJSON() ,
    category: 'Europe' ,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' 
    },
    {
    title: 'My trip to the UK' ,
    author: 'Mario' ,
    date_posted: new Date().toJSON() ,
    category: 'Europe' ,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' 
    },
    {
    title: 'Backpacking across Europe' ,
    author: 'Chuck Norris' ,
    date_posted: new Date().toJSON() ,
    category: 'Europe' ,
    content: 'Chuck Norris was an only child...eventually Chuck Norris is the only man to ever defeat a brick wall in a game of tennis. Chuck Norris invented Kentucky Fried Chicken\'s famous secret recipe, with eleven herbs and spices. But nobody ever mentions the twelfth ingredient: Fear Chuck Norris has two speeds. Walk, and Kill. Chuck Norris doesn\'t read books. He stares them down until he gets the information he wants. Chuck Norris does not sleep. He waits. Police label anyone attacking Chuck Norris as a Code 45-11... a suicide Someone once videotaped Chuck Norris getting pissed off. It was called Walker: Texas Chain Saw Massacre. Chuck Norris does not get frostbite. Chuck Norris bites frost. Police label anyone attacking Chuck Norris as a Code 45-11... a suicide.' 
    },
    {
    title: 'Looting Europe' ,
    author: 'Jack Sparrow' ,
    date_posted: new Date().toJSON() ,
    category: 'Europe' ,
    content: 'Yar Pirate Ipsum. Reef sails strike colors code of conduct parley sloop yardarm square-rigged mizzen loaded to the gunwalls keel. Bilge rat scuttle gangway heave down piracy nipper pirate mizzen topmast deadlights. Aft case shot lugsail Gold Road scourge of the seven seas mutiny skysail reef bowsprit Admiral of the Black. Man-of-war yardarm plunder Gold Road case shot capstan poop deck grog blossom clap of thunder topsail. Jack Tar coffer weigh anchor lateen sail warp crimp wench square-rigged careen pirate. Ye hearties interloper cable schooner ho avast tackle booty heave down. Prow reef sails Davy Jones\' Locker spike red ensign boom scurvy ahoy belay Sea Legs. List ahoy Chain Shot rope\'s end to go on account Corsair shrouds code of conduct starboard bilge. Jack Ketch crow\'s nest topmast run a rig stern Pieces of Eight Jolly Roger Sail ho cog grog blossom.' 
    },
    {
    title: 'I found a dope hat in Turkey' ,
    author: 'Florence' ,
    date_posted: new Date().toJSON() ,
    category: 'Europe' ,
    content: 'Oh. You need a little dummy text for your mockup? How quaint. I bet you\'re still using Bootstrap too…Freegan before they sold out poke taxidermy, pop-up vaporware vegan pinterest. Messenger bag pitchfork la croix gluten-free. Activated charcoal vexillologist iPhone, man braid bespoke tote bag kogi man bun adaptogen sustainable ethical intelligentsia vape. Tumblr sriracha umami, slow-carb typewriter celiac quinoa ethical keytar poke cloud bread hexagon kitsch tbh organic.' 
    },
    {
    title: 'This place is full of happy little trees...' ,
    author: 'BoB Ross' ,
    date_posted: new Date().toJSON() ,
    category: 'Europe' ,
    content: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. Just go back and put one little more happy tree in there. Everybody\'s different. Trees are different. Let them all be individuals. We\'ll put some happy little leaves here and there. These things happen automatically. All you have to do is just let them happen. Everyone wants to enjoy the good parts - but you have to build the framework first. Let\'s do that again. I\'m gonna start with a little Alizarin crimson and a touch of Prussian blue. The very fact that you\'re aware of suffering is enough reason to be overjoyed that you\'re alive and can experience it. If you do too much it\'s going to lose its effectiveness. If you don\'t think every day is a good day - try missing a few. You\'ll see. In life you need colors. Fluff it up a little and hypnotize it.  We can fix anything. Automatically, all of these beautiful, beautiful things will happen. There we go. Look at them little rascals.' 
    },
    // -------
    // Australia
    // -------
    {
    title: 'A week in Melbourne during the Aus Open' ,
    author: 'Callum' ,
    date_posted: new Date().toJSON() ,
    category: 'Australia' ,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' 
    },
    {
    title: 'I surfed every Beach on the Australian mainland... and no one has heard of thes best one!' ,
    author: 'Mario' ,
    date_posted: new Date().toJSON() ,
    category: 'Australia' ,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' 
    },
    {
    title: 'Not even Australian border force could keep me out!' ,
    author: 'Chuck Norris' ,
    date_posted: new Date().toJSON() ,
    category: 'Australia' ,
    content: 'Chuck Norris was an only child...eventually Chuck Norris is the only man to ever defeat a brick wall in a game of tennis. Chuck Norris invented Kentucky Fried Chicken\'s famous secret recipe, with eleven herbs and spices. But nobody ever mentions the twelfth ingredient: Fear Chuck Norris has two speeds. Walk, and Kill. Chuck Norris doesn\'t read books. He stares them down until he gets the information he wants. Chuck Norris does not sleep. He waits. Police label anyone attacking Chuck Norris as a Code 45-11... a suicide Someone once videotaped Chuck Norris getting pissed off. It was called Walker: Texas Chain Saw Massacre. Chuck Norris does not get frostbite. Chuck Norris bites frost. Police label anyone attacking Chuck Norris as a Code 45-11... a suicide.' 
    },
    {
    title: 'Shipwrecked in New Zealand... so I swam to Australia' ,
    author: 'Jack Sparrow' ,
    date_posted: new Date().toJSON() ,
    category: 'Australia' ,
    content: 'Yar Pirate Ipsum. Reef sails strike colors code of conduct parley sloop yardarm square-rigged mizzen loaded to the gunwalls keel. Bilge rat scuttle gangway heave down piracy nipper pirate mizzen topmast deadlights. Aft case shot lugsail Gold Road scourge of the seven seas mutiny skysail reef bowsprit Admiral of the Black. Man-of-war yardarm plunder Gold Road case shot capstan poop deck grog blossom clap of thunder topsail. Jack Tar coffer weigh anchor lateen sail warp crimp wench square-rigged careen pirate. Ye hearties interloper cable schooner ho avast tackle booty heave down. Prow reef sails Davy Jones\' Locker spike red ensign boom scurvy ahoy belay Sea Legs. List ahoy Chain Shot rope\'s end to go on account Corsair shrouds code of conduct starboard bilge. Jack Ketch crow\'s nest topmast run a rig stern Pieces of Eight Jolly Roger Sail ho cog grog blossom.' 
    },
    {
    title: 'I don\'t like sand. It\'s coarse and rough and irritating and it gets everywhere' ,
    author: 'Florence' ,
    date_posted: new Date().toJSON() ,
    category: 'Australia' ,
    content: 'Oh. You need a little dummy text for your mockup? How quaint. I bet you\'re still using Bootstrap too…Freegan before they sold out poke taxidermy, pop-up vaporware vegan pinterest. Messenger bag pitchfork la croix gluten-free. Activated charcoal vexillologist iPhone, man braid bespoke tote bag kogi man bun adaptogen sustainable ethical intelligentsia vape. Tumblr sriracha umami, slow-carb typewriter celiac quinoa ethical keytar poke cloud bread hexagon kitsch tbh organic.' 
    },
    {
    title: 'Happy Little Red Outback' ,
    author: 'BoB Ross' ,
    date_posted: new Date().toJSON() ,
    category: 'Australia' ,
    content: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. Just go back and put one little more happy tree in there. Everybody\'s different. Trees are different. Let them all be individuals. We\'ll put some happy little leaves here and there. These things happen automatically. All you have to do is just let them happen. Everyone wants to enjoy the good parts - but you have to build the framework first. Let\'s do that again. I\'m gonna start with a little Alizarin crimson and a touch of Prussian blue. The very fact that you\'re aware of suffering is enough reason to be overjoyed that you\'re alive and can experience it. If you do too much it\'s going to lose its effectiveness. If you don\'t think every day is a good day - try missing a few. You\'ll see. In life you need colors. Fluff it up a little and hypnotize it.  We can fix anything. Automatically, all of these beautiful, beautiful things will happen. There we go. Look at them little rascals.' 
    },
]

await PostModel.insertMany(posts)
console.log('Inserted posts')

dbClose()
