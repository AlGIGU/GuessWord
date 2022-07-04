import User from "./User.js";
// получение из cockies 



class CurrentUser{
    findUser(id){
        try{
            const schemaResponse = User.findById(id);
            if (schemaResponse){
                return {
                    name : schemaResponse.name,
                    mail : schemaResponse.mail,
                    password : schemaResponse.password,
                    coins : schemaResponse.coins,
                    avatar: schemaResponse.avatar ?? './defaultAvatar',
                };
            };
            return false;
        } catch(e){
            return new Error(e.message);
        };
    };
};

export default new CurrentUser();