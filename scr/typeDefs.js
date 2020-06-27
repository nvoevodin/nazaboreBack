import {gql} from "apollo-server-express";
export const typeDefs = gql`

type Query{
    helloWorld: String!
    getPosts:[Post!]!
    countPosts:Int!
    getUsers:[User!]!
    getUser(user:String):[User]
    filterPosts(word:String):[Post!]!
    filterCategory(category:String):[Post!]!
}
type Post {
    id:ID!
    word: String!
    description: String!
    example: String!
    signature: String!
    date: String!
    uid: String!
    likes: Int
    dislikes: Int
    category: String!
}


type User {
    username: String!
    date: String!
    favorites: [Favs]!
    posts: [UserWord]!
    postCount: Int!
}

type Favs{
    postId:String!
    dateAdded:String!
}

type UserWord{
    postId:String!
    dateAdded:String!
}


type Mutation{
    createPost(word:String!, description:String!, example:String!, signature: String!, date: String!, uid: String!, likes: Int, dislikes: Int, category: String!): Post!
    likePost(postId:ID!): Post!
    dislikePost(postId:ID!): Post!
    addUser(username:String!, date: String!, postCount: Int!): User!
    addPost(postId:String!, username:String!): Favs!
    addUserWord(postId:String!, username:String!): UserWord!
    addOnePost(username:String!): User!

}


`;