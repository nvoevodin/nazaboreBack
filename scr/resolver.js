import { Post } from "./models/Post";
import { User } from "./models/user";

export const resolvers = {
    Query:{
        helloWorld:()=>'hellow world',
        countPosts:()=> Post.countDocuments({}, function(err, count) {
            if (err) { return handleError(err) } //handle possible errors
            const count1 = count
            console.log(count1)
            return(count1)
            //and do some other fancy stuff
        }),
        getPosts:()=> Post.find().limit(350),
        async getUser(_,{ user },context){
            let post = await User.find({username:user})
            console.log(post)

            return post;
            
        },
        getUsers:()=>{
            let users = User.find()
            

            return users;
            
        },
        async filterPosts(_,{ word },context){
            var word1 = word.toLowerCase();
            console.log({word: word1})
            
            const user = await Post.find({word: word1});

            

            return user
        },
        async filterCategory(_,{ category },context){
            
            
            const user = await Post.find({category});

          

            return user
        },

    
    
    },

    Mutation:{
        createPost: async(_,{word,description,example,signature,date,uid,likes,dislikes,category})=>{
            const puppy = new Post({word,description,example,signature,date,uid,likes,dislikes,category});
            await puppy.save();
            return puppy;
        },


        async likePost(_,{ postId },context){
            let post = await Post.findById({postId});
            
            post.likes += 1;
            
            await post.save()
            return post;
            
        },

        async addOnePost(_,{ username },context){
            let post = await User.findOne({username});
            console.log(post)
            post.postCount += 1;
            
            await post.save()
            return post;
            
        },

         async addPost(_,{ postId, username},context){
            
            const user = await User.findOne(username);

            let post = user.favorites.some(i => i.postId === postId)

            console.log(post)

  

            if(post){

            } else {
                user.favorites.push(
                    {postId,
                    dateAdded: new Date().toISOString()}
                );
                
                await user.save()
                return user;

            }

 
            },


            async addUserWord(_,{ postId, username},context){
            
                const user = await User.findOne({username});
    
                let post = user.posts.some(i => i.postId === postId)
    
                console.log(post)
    
      
    
                if(post){
    
                } else {
                    user.posts.push(
                        {postId,
                        dateAdded: new Date().toISOString()}
                    );
                    
                    await user.save()
                    return user;
    
                }
    
     
                },


        async dislikePost(_,{ postId,},context){
            let post = await Post.findById(postId);
            
            post.dislikes += 1;
            
            await post.save()
            return post;
            
        },

        addUser: async(_,{username,date,postCount})=>{
            const user = await User.findOne({username});
            if(user){
                
            } else{
                const puppy = new User({username,date,postCount});
                await puppy.save();
                return puppy;

            }
          
        }

 





    }


}