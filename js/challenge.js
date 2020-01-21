document.addEventListener("DOMContentLoaded", function() {
    let timer;
    let likeNumber = 1;
    
    const counter = document.getElementById('counter');
    const minusButton = document.getElementById('minus');
    const plusButton = document.getElementById('plus');
    const heartButton = document.getElementById('heart');
    const pauseButton = document.getElementById('pause');
    const likesList = document.getElementsByClassName('likes')[0];
    const buttons = [minusButton, plusButton, heartButton];

    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('list');
    const commentInput = document.getElementById('comment-input');
    

    timer = setInterval(function(){counter.innerText = parseInt(counter.innerText) + 1}, 1000);
    commentForm.addEventListener("submit", addComment);
    plusButton.addEventListener("click", addOneToTimer);
    minusButton.addEventListener("click", minusOneToTimer);
    pauseButton.addEventListener("click", stopTimer);
    heartButton.addEventListener("click", addLike)


    function startTimer(){
        timer = setInterval(function(){counter.innerText = parseInt(counter.innerText) + 1}, 1000);
        pauseButton.innerText = "pause"
        swapTimerListener(pauseButton);
    };

    function swapTimerListener(button){
        if (button.innerText == "pause"){
            button.removeEventListener("click", startTimer)
            button.addEventListener("click", stopTimer)
            for(let i = 0; i < buttons.length; i++){
                buttons[i].disabled = false;
            }
        }
        else {
            button.removeEventListener("click", stopTimer);
            button.addEventListener("click", startTimer);
            for(let i = 0; i < buttons.length; i++){
                buttons[i].disabled = true;
            }
        }
    }

    function stopTimer(){
        clearInterval(timer);
        pauseButton.innerText = "resume";
        swapTimerListener(pauseButton);
    };

    function addOneToTimer(){
        counter.innerText = parseInt(counter.innerText, 10) + 1;
    }

    function minusOneToTimer(){
        counter.innerText = parseInt(counter.innerText, 10) - 1;
    };

    function addComment(){
        event.preventDefault();

        const newComment = document.createElement('li');
        newComment.innerText = commentInput.value
        appendNewComment(newComment);

        event.target.reset();
    };

    function appendNewComment(comment){
        commentList.appendChild(comment);
    };

    function addLike(){
        let likes = likesList.getElementsByTagName('li');
        let like = likes[likes.length - 1];
        const counter = document.getElementById('counter');
        let timerNumber = counter.innerText;

        if (likes.length != 0 && like.innerText.startsWith(`${timerNumber}`)){
            likeNumber += 1;
            like.innerText = `${timerNumber} has been liked ${likeNumber} times`;
        }
        else {
            const newLike = document.createElement('li');
            likeNumber = 1;
            newLike.innerText = `${timerNumber} has been liked ${likeNumber} times`;
            appendNewLike(newLike);
        }
    };

    function appendNewLike(like){
        document.getElementsByClassName('likes')[0].appendChild(like);
    };

});