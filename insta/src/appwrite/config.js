import conf from "../conf/conf";
import { Client, ID, Storage, Databases, Query } from "appwrite";

export class Service{
    client = new Client()
    bucket;
    databases;

    constructor(){
        this.client
           .setEndpoint(conf.appwriteUrl)
           .setProject(conf.appwriteProjectId)
        this.bucket = new Storage(this.client)
        this.databases = new Databases(this.client)
    }
async createPost({slug,featuredImage,userId,content,status}){
  try {
    return this.databases.createDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        slug,
        {
          featuredImage,
          userId,
          content,
          status,
          slug  
        }
    )
  } catch (error) {
    console.log("Appwrite service :: createPost :: error", error)
  }
}
async updatePost(slug,{featuredImage,content,status}){
    try {
        return this.databases.updateDocument(
            conf.appwriteDataBaseId,
            conf.appwriteCollectionId,
            slug,
            {
                featuredImage,
                content,
                status
            }
        )
    } catch (error) {
        console.log("Appwrite service :: updatePost :: error", error)
    }
}
async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwriteDataBaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true;
    } catch (error) {
        console.log("Appwrite service :: deletePost :: error", error)
        return false;
    }
}
async getPost(slug){
    try {
       return this.databases.getDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        slug
       ) 
    } catch (error) {
        console.log("Appwrite service :: getPost :: error", error)
    }
}
async getPosts(queries = Query.equal["status","active"]){
    try {
        return this.databases.listDocuments(
            conf.appwriteDataBaseId,
            conf.appwriteCollectionId,
            queries
        )
    } catch (error) {
        console.log("Appwrite service :: getPosts :: error", error)
    }
}
async uploadFile(file){
 try {
    return this.bucket.createFile(
        conf.appwriteBucketid,
        ID.unique(),
        file
    )
 } catch (error) {
    console.log("Appwrite service :: uploadFile :: error", error)
 }
}
async uploadPic(file,dpid){
    try {
        return this.bucket.createFile(
            conf.appwriteBucketid,
            dpid,
            file
        )
    } catch (error) {
        console.log("Appwrite service :: uploadPic :: error", error)
    }
}
async deleteFile(fileId){
   try {
    await this.bucket.deleteFile(
        conf.appwriteBucketid,
        fileId
    )
    return true;
   } catch (error) {
    console.log("Appwrite service :: deleteFile :: error", error)
    return false;
   }
}
  getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketid,
        fileId
    )
}

}
const service = new Service()
export default service;