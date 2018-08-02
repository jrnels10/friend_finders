// ===============================================================================
// DATA
// Below data will hold all of the reserved tables.
// Initially we just set it equal to a "dummy" customer.
// But you could have it be an empty array as well.
// ===============================================================================

var tableArray = [
    {
        friendName: "Scott",
        image: 'https://i2.wp.com/uniquefacts.net/wp-content/uploads/2016/11/25.-Diego.jpg?w=880&ssl=1',
        questions: ['3', '4', '5', '4', '5', '3', '5', '4', '5', '3']
    },
    {
        friendName: "Betty",
        image: 'https://i1.wp.com/uniquefacts.net/wp-content/uploads/2016/11/8.-Mira.jpg?w=880&ssl=1',
        questions: ['4', '3', '1', '4', '1', '4', '3', '4', '2', '5']
    },
    {
        friendName: "Nicole",
        image: 'https://i0.wp.com/uniquefacts.net/wp-content/uploads/2016/11/2.-Cawa.jpg?w=880&ssl=1',
        questions: ['5', '5', '5', '5', '5', '5', '5', '5', '5', '5']
    },
    {
        friendName: 'Robert',
        image: 'https://i1.wp.com/uniquefacts.net/wp-content/uploads/2016/11/1.-Moritz.jpg?w=880&ssl=1',
        questions: ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1']
    },
    {
        friendName: "Craig",
        image: 'https://i1.wp.com/uniquefacts.net/wp-content/uploads/2016/11/4.-Roxy.jpg?w=880&ssl=1',
        questions: ['1', '1', '3', '4', '4', '1', '1', '3', '1', '3']
    },
    {
        friendName: "Eric",
        image: 'https://i1.wp.com/uniquefacts.net/wp-content/uploads/2016/11/16.-Bella.jpg?w=880&ssl=1',
        questions: ['5', '5', '3', '5', '3', '1', '5', '5', '1', '3']
    },
    {
        friendName: "George",
        image: 'https://i0.wp.com/uniquefacts.net/wp-content/uploads/2016/11/24.-Klara.jpg?w=880&ssl=1',
        questions: ['5', '1', '3', '4', '4', '1', '2', '3', '1', '2']
    }
];

// Note how we export the array. This makes it accessible to other files using require.
module.exports = tableArray;
//     surveyQuestions
// ]
