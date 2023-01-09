{
    //method to submit form data via AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) { 
            e.preventDefault();

            $.ajax({
                type: "POST",
                url: "/posts/create",
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data);
                    $('#posts-list-container>ul').prepend(newPost);
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM

    let newPostDom = function(Post){
        const post = Post.post;
        const name = Post.name;
        
            return $(`<li id="post-${post._id}">

                        <p>
                            
                                <small>
                                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                                </small>

                            
                    
                                    ${ post.content }
                                    <br>
                                    <small>
                                        ${name}
                                    </small>
                        </p>

                        <div class="post-comments">
                           
                    
                                <form action="/comments/create" method="POST">
                                    <input type="text" name="content" placeholder="type here to add comment...">
                                    <input type="hidden" name="post" value="${post._id}">
                                    <input type="submit" value="Add comment">
                                </form>
                    
                              
                    
                        </div>
                    
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                    
                    
                            </ul>
                        </div>
                    
                        <br><br>
        
        </li>`)
    }

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post deleted!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(err){
                    console.log(error.responseText);
                }
            })
        })
    }

    //loop and add dynamic delete to older posts
    $('.delete-post-button').each(function(){
        deletePost(this);
    });


    createPost();
}