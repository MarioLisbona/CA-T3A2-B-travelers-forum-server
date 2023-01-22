import { PostModel } from './models/post.js'
import { CommentModel } from './models/comment.js'
import { MemberModel } from './models/member.js'
import { dbClose } from './db.js'

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
]

await PostModel.insertMany(posts)
console.log('Inserted posts')

dbClose()
