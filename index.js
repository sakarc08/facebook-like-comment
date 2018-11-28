(function () {
    commentBox = document.querySelector("#comment-box");
    commentContainer = document.querySelector("#comments-container");
    comment = document.querySelector("#comment");
    commentArray = [];
    replyArray = [];
    commentCount = [];
    replyCount = [];
    isUsernamePresent()
    areCommentsPresent()
})();

function isUsernamePresent() {
    if (sessionStorage.getItem('username')) commentBox.classList.add("show")
    else commentBox.classList.add('hide');
}

function areCommentsPresent() {
    if (commentCount.length) commentContainer.classList.add("hide")
    else commentContainer.classList.add("show");
}


function saveUsername() {
    let username = document.getElementById('enter-name-input').value
    if (username) {
        sessionStorage.setItem('username', username);
        commentBox.classList.remove("hide");
        commentBox.classList.add("show")
    } else return;
}

function addComment() {
    var obj = {
        id: commentArray.length + 1,
        likes: 0,
        content: comment.value,
        replies: []
    }

    commentArray.push(obj);
    renderComment();
}

function renderComment() {
    var str = '';
    commentContainer.innerHTML = '';
    commentArray.forEach((obj, index) => {
        str = '<div class="comment-div" id="comment-div-' + obj.id + '">' +
            '<p id="comment-text" class="comment-text">' + obj.content + '</p>' +
            '<div class="replies-corner" id="replies-corner-' + obj.id + '"></div>' +

            '<div class="add-reply-container hide"> <textarea placeholder= "Enter reply" class="reply-text" id="reply-text"> </textarea>' +
            '<button id="post-reply-button" class="post-reply-button btn" onclick="addReply(' + obj.id + ')"> Post </button></div>' +
            '<div id="comment-options" class="comment-options">' +
            '<button class="like-button btn" id="like-button" onclick="addLikeComment(' + obj.id + ')">Like' +
            '<span class="glyphicon glyphicon-thumbs-up" ></span>' +
            '</button>' +
            '<button class="reply-button btn" id="reply-button" onclick="showReplyField(' + obj.id + ')">Reply' +
            '<span class="glyphicon glyphicon-share-alt"></span>' +
            '</button>' +
            '<button class="delete-button btn" id="delete-button onclick="deleteComment(' + obj.id + '">Delete' +
            '<span class="glyphicon glyphicon-trash"></span>' +
            '</button>' +
            '<div class="total-likes" id="likes-count-' + obj.id + '"></div>' +
            '</div>' +
            '</div';
        commentContainer.innerHTML += str;
        renderReply(obj);
    });
    comment.value = "";
}

function addLikeComment(id) {
    const comment = document.getElementById('likes-count-' + id);
    comment.innerHTML = ++commentArray[id - 1].likes;
}

function deleteComment(id) {
    console.log(id);
}

function showReplyField(id) {
    let replyFieldContainer = document.getElementsByClassName('add-reply-container')[id - 1];
    replyFieldContainer.classList.toggle('show');
    replyFieldContainer.classList.toggle('hide');

}

function addReply(id) {
    console.log(id);
    // var commentIndex = 0;
    commentArray.forEach((element, index) => {
        if (element.id == id) {
            var replyText = document.querySelectorAll("#reply-text")[id - 1];
            var obj = {
                replyId: element.replies.length + 1,
                likes: 0,
                content: replyText.value,
                commentId: id
            }
            element.replies.push(obj);
            renderReply(element);
            // commentIndex = index;
        }
    })
}

function renderReply(objItem) {
    var str = '';
    let repliesCorner = document.querySelector("#replies-corner-" + objItem.id);
    repliesCorner.innerHTML = "";

    objItem.replies.forEach(obj => {
        str = '<div class="reply-div" id="reply-div";"></div' +
            '<p id="reply-text" class="reply-text">' + obj.content + '</p>' +
            '<div id="reply-options" class="reply-options">' +
            '<button class="like-button btn" id="like-button">Like' +
            '<span class="glyphicon glyphicon-thumbs-up" ></span>' +
            '</button>' +
            '<button class="delete-button btn" id="delete-button">Delete' +
            '<span class="glyphicon glyphicon-trash"></span>' +
            '</button>' +
            '</div>';

        repliesCorner.innerHTML += str;
        showReplyField(objItem.id);
    });
}