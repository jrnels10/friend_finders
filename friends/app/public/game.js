$(document).ready(function () {
    let questAnswArray = [];
    let questionsSurvey;
    let mansBF;
    let survQuest;
    let tallyQest = 1;
    if ($('.credentials').is(":visible")) {
        $('.survey').show();
    } else {
        $('.survey').show();
    }
    $('.start-quiz').on('click', function () {
        $('.credentials').hide();
        $('.survey').show();
        displayQ();
    })



    $.get('/api/questlist', function (req, res) {
        survQuest = req;
        // console.log(req)
    });
    // survey page pulls array of friendslist to compare against user input.
    $.get('/api/friendslist', function (req, res) {
        mansBF = req;

    });

    function displayQ() {

        for (i = 0; i < survQuest.length; i++) {
            // console.log(survQuest[i].num)
            if (tallyQest > 10) {
                console.log("survey ended")
                submit();
                return;
            }
            if (tallyQest === parseInt(survQuest[i].num)) {
                console.log(survQuest[i].question);
                console.log(tallyQest)
                let qAnda = $(`<div class="jumbotron display-div col-12">
                                 <div class="row quest-top">
                                    <h4 class="display-4 w-100 text-center question-survey">${survQuest[i].num}. ${survQuest[i].question}</h4>
                                   <hr class="my-4">
                                </div>
                                <div class="row quest-mid">
                                    <div class="gif">
                                    <div style="width:100%;height:0;padding-bottom:82%;position:relative;">
                                    <iframe src="${survQuest[i].gif}" width="100%" height="100%" style="position:absolute" frameBorder="0"
                                    class="giphy-embed" allowFullScreen></iframe>
                                    </div>
                                    </div>
                                </div>
                                <div class="row quest-btm">
                                <p class="lead m-auto w-100 text-center">
                                    <button type="button" class="btn btn-warning q1" value="5">5 Most likely
                                        <i class="glyphicon glyphicon-ok"></i>
                                        </button>
                                        <button type="button" class="btn btn-warning q1" value="4">4
                                            <i class="glyphicon glyphicon-ok"></i>
                                        </button>
                                        <button type="button" class="btn btn-warning q1" value="3">3
                                            <i class="glyphicon glyphicon-ok"></i>
                                        </button>
                                        <button type="button" class="btn btn-warning q1" value="3">2
                                            <i class="glyphicon glyphicon-ok"></i>
                                        </button>
                                        <button type="button" class="btn btn-warning q1" value="1">1 Least likely
                                             <i class="glyphicon glyphicon-ok"></i>
                                        </button>
                                </p>
                                </div>
                                
                                </div>`);
                $('.display-div').replaceWith(qAnda)

            }
        }



        $('.q1').on('click', function () {
            tallyQest++
            displayQ();
            questAnswArray.push(this.value);
            // console.log('questions: ' + survQuest)
        });


    }
    function submit() {
        $('.lead').replaceWith(`<button class="btn btn-primary submit">Submit</button>`);
        $('.submit').on('click', function () {
            surveyEnded();
        })
    }
    $(function () { // you can wrap it here with in document ready block

    });


    // console.log(mansBF)








    // once user submits survey, and object is built based on their input.
    function surveyEnded() {


        event.preventDefault();

        // Here we grab the form elements
        questionsSurvey = {
            friendName: $(".user-name").val().trim(),
            image: $(".user-img").val(),
            questions: questAnswArray
        };
        console.log(questionsSurvey);
        console.log('mansBF: ' + mansBF)

        // Calculating the users total score
        let userTally = 0;
        for (i = 0; i < questionsSurvey.questions.length; i++) {
            userTally = userTally + parseInt(questionsSurvey.questions[i]);
        }
        console.log(userTally)


        // Calculating the total score for each of the default friends
        // begins here
        let doggo;
        let doggoArray = [];
        let mansBfArray = [];
        let counts = [];
        let index = [];

        for (i = 0; i < mansBF.length; i++) {
            // userTally = userTally + parseInt(questionsSurvey.questions[i]);
            doggo = mansBF[i];

            let dogTally = 0
            for (k = 0; k < doggo.questions.length; k++) {
                dogTally = dogTally + parseInt(doggo.questions[k]);
            }
            console.log(doggo.friendName + ':  Dog tally: ' + dogTally + "\n")
            counts.push(dogTally);

            index[i] = {
                friendName: mansBF[i].friendName,
                image: mansBF[i].image,
                questions: mansBF[i].questions,
                dogTally: dogTally
            };
            doggoArray.push(index[i])

        }
        console.log('counts: ' + counts)
        console.log(doggoArray)

        let closest = counts.reduce(function (prev, curr) {
            return (Math.abs(curr - userTally) < Math.abs(prev - userTally) ? curr : prev);
        });
        console.log("closest number: " + closest);
        let bestFriend;
        for (i = 0; i < doggoArray.length; i++) {
            if (doggoArray[i].dogTally == closest) {
                console.log('best friend: ' + doggoArray[i].friendName)
                bestFriend = doggoArray[i];
            }
        };

        // let userImage = $(`<div class="user float-left w-50 p-2">
        //     <img class ="image-friend w-100" src="${questionsSurvey.image}">
        //     </div>`);
        // $('.display-div').replaceWith(userImage);


        let friendImage = $(`<div class="friends-wrap">
                             <h1 class="best-friends w-100 text-center">Best friends</h1>        
                            <div class="user float-left w-50 p-2">
                            <h2 class="friend-name text-center">${questionsSurvey.friendName}</h2>
                            <img class ="image-friend w-100 align-middle" src="${questionsSurvey.image}">
                            </div>
                            <div class="bf float-left w-50 p-2">
                                <h2 class="friend-name text-center">${bestFriend.friendName}</h2>
                            <img class="image-friend w-100" src="${bestFriend.image}">
                            </div>
                            
                            <a href="/survey"><button class="btn btn-primary new-friend">New friend</button>
                            <a href="/"><button class="btn btn-primary home">Home</button>
                            
                            </div>`);
        $('.display-div').replaceWith(friendImage);

        // $('.new-friend').on('click', function(){

        // })






        // posting to friendslist api begins here.
        // The user input hasn't been added to the friendslist array until the following happens.
        let currentURL = window.location.origin;

        $.post(currentURL + '/api/friendslist', questionsSurvey, function (data) {
            console.log('posted');

        })
        $('.user-name').val('');
        questAnswArray = [];
        console.log(questAnswArray);








    }

})
