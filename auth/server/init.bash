# sequelize model:generate --name user --attributes firstName:string,lastName:string,email:string,password:string,profilePic:string,gitHub:string
# sequelize model:generate --name notes --attributes language:array,noteFile:string
# sequelize model:generate --name assess --attributes language:array,rating:integer,comment:string
sequelize model:generate --name googleToken --attributes token:string 