import { Post } from "./models/Post";
import { User } from "./models/user";

export const resolvers = {
    Query:{
        helloWorld:()=>'hellow world',
        getPosts:() => 

Post.find().limit(350)

            // var data = {}
            // Post.find(function (err, kittens) {
            //     if (err) return console.error(err);
            //     var kitt = kittens.slice(0,1);
            //     console.log(kitt)
            //     return kitt
            //   })
              

            
            
        
        ,
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
            let post = await Post.findById(postId);
            
            post.likes += 1;
            
            await post.save()
            return post;
            
        },

         async addPost(_,{ postId, username},context){
            
            const user = await User.findOne({username});

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


        async dislikePost(_,{ postId,},context){
            let post = await Post.findById(postId);
            
            post.dislikes += 1;
            
            await post.save()
            return post;
            
        },

        addUser: async(_,{username,date})=>{
            const user = await User.findOne({username});
            if(user){
                
            } else{
                const puppy = new User({username,date});
                await puppy.save();
                return puppy;

            }
          
        }

 





    }


}