# Social Network with MongoDB

## Description

This repo is the back-end for an imaginary social network where users can post their thoughts and reactions. A user can create an account, post, edit, and delete a `Thought`, and post a `Reaction` to another user's `Thought`. This back-end uses two technologies: 
1. [express.js](https://expressjs.com) 
2. [MongoDB](https://www.mongodb.com) combined with [Mongoose](https://mongoosejs.com) (with its [npm package](https://www.npmjs.com/package//mongoose)).

The purpose of this repo is to practice learning a NoSQL database along with an ORM, and combining it with RESTful API endpoints. Since this is only a back-end application, the front-end testing was done with [Insomnia](https://insomnia.rest). It was a good learning experience especially because my NoSQL database experience is with Google Firebase's NoSQL database. Learning MongoDB wasn't that much different, but there was still a learning curve.

## Walkthrough Video

https://github.com/nathangero/social-network-mongodb/assets/25491849/86e25d4d-0f10-45ec-942b-9ce896278abe


## Learning Points

* Using a ORM with a NoSQL database was pretty nice. I'm used to Firebase's implementation using Swift, where they have own code library to access their database.
* Structuring a NoSQL database is very different than a SQL one. With SQL you can just make as many tables and join tables as you want, and then relate them to each other. However, with NoSQL, you have to plan out how you structure your data because you don't want to be redundant and/or have a lot of deeply nested data.
* NoSQL seems very simple to understand how storing and retreiving data works. Instead of looking at tables and trying to understand how tables relate to one another, we can just look at a document as a whole and quickly see how the data is organized/categorized.
    * For example, storing multiple `Reaction` schemas as a subdocument to a `Thought` is a lot easier to understand visually than making a `Reaction` table belong to a `Thought` table.
* NoSQL doesn't seem as efficient when querying data. SQL can get *so much* data with the right query, but NoSQL might require more than one query to get all the data needed.

## Code Highlight

Deleting all the `thoughts` and `friends` of a deleted user. After the user is deleted from the users document, the code then searches for any `Thought` and `Friend` associated with the user's username. Since a username is unique, this works out nicely. One thing to note is that this took 3 different queries to accomplish. In a SQL database setup with the right relationships, we would only need to delete the user to accomplish this is in 1 query.

```js
async deleteUser(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete({ _id: new ObjectId(req.params.id) })

        const deletedThoughts = [];
        deletedUser.thoughts.forEach(async (thought) => {
            const deletedThought = await Thought.findByIdAndDelete(new ObjectId(thought._id))
            deletedThoughts.push(deletedThought);
        })

        const deletedFriends = [];
        deletedUser.friends.forEach(async (friend) => {
            const deletedFriend = await User.findByIdAndUpdate(
                friend._id,
                { $pull: { friends: new ObjectId(req.params.id) } },
                { new: true }
            )
            deletedFriends.push(deletedFriend);
        })

        const results = {
            deletedUser: deletedUser,
            deletedThoughts: deletedThoughts,
            deletedFriends: deletedFriends,
        }

        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
},
```

## Credits

[Idea for mongoose populate](https://stackoverflow.com/a/18002078)

[Model update with $addToSet](https://stackoverflow.com/a/13405495)

### Resources

[Regex for email](https://regexr.com/3e48o)

[Mongoose docs: virtuals](https://mongoosejs.com/docs/tutorials/virtuals.html)

[Mongoose docs: populate and reference](https://mongoosejs.com/docs/populate.html)

[Mongoose docs: getters/setters](https://mongoosejs.com/docs/tutorials/getters-setters.html)
