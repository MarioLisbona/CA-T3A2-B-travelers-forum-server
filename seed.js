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
    {
    title: 'My trip to Brazil' ,
    author: 'Callum' ,
    date_posted: new Date().toJSON() ,
    category: 'South America' ,
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
    
]

await PostModel.insertMany(posts)
console.log('Inserted posts')



dbClose()
