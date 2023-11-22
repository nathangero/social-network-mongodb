const usersData = [
    {
        username: "tony",
        email: "tony@stark.com",
        thoughts: [],
        friends: []
    },
    {
        username: "steve",
        email: "steve@rogers.com",
        thoughts: [],
        friends: []
    },
    {
        username: "clint",
        email: "clint@barton.com",
        thoughts: [],
        friends: []
    },
];

const reactionsData = [
    {
        reactionBody: "How much money do you have?",
        username: "steve",
        createdAt: Date.now
    },
    {
        reactionBody: "More than you",
        username: "tony",
        createdAt: Date.now
    },
    {
        reactionBody: "But you hate Tony",
        username: "clint",
        createdAt: Date.now
    },
]

const thoughtsData = [
    {
        thoughtText: "I'm really rich and I like it",
        createdAt: Date.now,
        username: "tony",
        reactions: [
            reactionsData[0],
            reactionsData[1]
        ]
    },
    {
        thoughtText: "Check out this new bow I got",
        createdAt: Date.now,
        username: "clint",
        reactions: [
            reactionsData[0],
            reactionsData[1]
        ]
    },
    {
        thoughtText: "I love my country",
        createdAt: Date.now,
        username: "steve",
        reactions: [
            reactionsData[2],
        ]
    },

]

module.exports = { usersData, thoughtsData }