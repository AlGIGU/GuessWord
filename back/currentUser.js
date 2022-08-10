import bcrypt from "bcrypt";
import User from "./User.js";
// получение из cockies... 
// когда-нибудь


class CurrentUser{
    constructor(){
        this.headTitle = "GuessWord";
        this.cssList = ["./front/header.css", "./front/footer.css"];
        this.scriptsList = ['./scripts/header.js', './scripts/footer.js'];

        this.currentLink = undefined;          
        this.userProfile = {
            id : undefined,
            logined : false,
            name : undefined,

            coins : undefined,
            mail: undefined,
            status: undefined,

            privilegeLevel: undefined,
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

    get userInfo(){
        return this.userProfile;
    }

    updateStatus(obj){
        this.cssList = ["./front/header.css", './front/footer.css'];
        this.scriptsList = ["./scripts/header.js", "./scripts/footer.js"];

        for (let i of Object.keys(obj)){
            if (i == "cssList") {
                this[i] = this[i].concat(obj[i]);
                continue;
            } else if (i == "scriptsList"){
                this[i] = this[i].concat(obj[i]);
                continue;
            };

            if (this.hasOwnProperty(i)){    
                this[i] = obj[i];
            }
        };
    };

    updateUser(obj){
        for (let i of Object.keys(obj)){
            if (this.userProfile.hasOwnProperty(i)){
                this.userProfile[i] = obj[i]
            }
        };
    }

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
            
            // если пользователь найден - вывести данные, иначе - ошибка
            if (Object.keys(schemaResponse).length > 0){
                if (await bcrypt.compare(password, schemaResponse.password)){
                    return {
                        id : schemaResponse._id,
                        name : schemaResponse.name,
                        mail : schemaResponse.mail,
                        coins : schemaResponse.coins,
                        status : schemaResponse.privilege,
                        privilegeLevel : schemaResponse.privilegeLevel,
                    };

                } else {
                    throw new Error('Неправильный пароль');
                };

            } else {
                throw new Error('Неправильный логин');
            };

        } catch(e){
            console.log(e.message);
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
        for (let i of Object.keys(this.userProfile)){
            this.userProfile[i] = undefined;
        }
    };
};

export default new CurrentUser({});