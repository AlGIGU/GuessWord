import bcrypt from "bcrypt";
import User from "./User.js";
// получение из cockies... 
// когда-нибудь


class CurrentUser{
    constructor(){
        this.headTitle = "GuessWord";
        this.cssList = ["./front/header.css"];
        this.scriptsList = ['./scripts/header.js'];
        this.currentLink = undefined;          
        this.userProfile = {
            id : undefined,
            logined : false,
            name : undefined,
            coins : undefined,
            mail: undefined,
            status: undefined,
        };
        
    };

    get getStatus(){
        return {
            headTitle : this.headTitle,
            cssList : this.cssList,
            currentLink : this.currentLink,
            scriptsList : this.scriptsList,
            userProfile : this.userProfile,
        };
    };

    updateStatus(obj){
        this.cssList = ["./front/header.css"];
        this.scriptsList = ["./scripts/header.js"];

        for (let i of Object.keys(obj)){
            if (i == "cssList") {
                this[i] = ["./front/header.css"].concat(obj[i]);
                continue;
            } else if (i == "scriptsList"){
                this[i] = ["./scripts/header.js"].concat(obj[i]);
                continue;
            };

            if (this.hasOwnProperty(i)){    
                this[i] = obj[i];
            }
        };
    };
    
    
    async userInDB(name, mail){

        // поиск пользователя по возможным кретериям
        const res = await User.find({
            $or: [
                {"name":name},
                {"mail":mail}
            ]
        });
        return res.length != 0;
    };

    async findUser(criterion, password){
        try{
            let schemaResponse = undefined;
            // поиск пользователя по почте или логину(в зависимости от введенного)
            if (criterion.includes('@')){
                schemaResponse = await User.findOne({
                    mail:`${criterion}`
                })
            } else {
                schemaResponse = await User.findOne({
                    name:`${criterion}`
                });
            };
            console.log("schemaResponse:");
            console.log(schemaResponse);

            // если необходимо только проверить наличие пользователя в БД
            // if (!password) {
            //     return (Object.keys(schemaResponse).length != 0)
            // };

            // если пользователь найден - вывести данные, иначе - ошибка
            if (Object.keys(schemaResponse).length != 0){
                if (bcrypt.hashSync(password, 8) = schemaResponse.password){
                    return {
                        id : schemaResponse._id,
                        name : schemaResponse.name,
                        mail : schemaResponse.mail,
                        coins : schemaResponse.coins,
                        status : schemaResponse.status
                    };
                    
                } else {
                    throw new Error('Не правильный пароль');
                };

            } else {
                throw new Error('Неправильный логин');
            };
            
        } catch(e){
            return new Error(e.message);
        };
    };


    setUser(params){
        this.userProfile.logined = true;

        for (let i of Object.keys(params)){
            if (this.userProfile.hasOwnProperty(i)){
                this.userProfile[i] = params[i];
            };
        };
    };

    unsetUser(){
        this.userProfile = {
            id : undefined,
            logined : false,
            name : undefined,
            coins : undefined,
            mail: undefined,
            status: undefined,
        };
    };
};

export default new CurrentUser({});