import bcrypt from "bcrypt";
import User from "./User.js";
// получение из cockies 



class CurrentUser{
    async findUser(criterion, password){
        try{

            // поиск пользователя по почте или логину(в зависимости от введенного)
            if (criterion.includes('@')){
                const schemaResponse = await User.findOne({
                    mail:criterion
                });
            } else {
                const schemaResponse = await User.findOne({
                    name:criterion
                });
            };
            
            // если необходимо только проверить наличие пользователя в БД
            if (!password) {
                return (Object.keys(schemaResponse).length != 0)
            };

            // если пользователь найде - вывести данные, иначе - ошибка
            if (Object.keys(schemaResponse).length != 0){
                if (bcrypt.compare(password, schemaResponse.password)){
                    return {
                        id : schemaResponse._id,
                        name : schemaResponse.name,
                        mail : schemaResponse.mail,
                        coins : schemaResponse.coins,
                        avatar: schemaResponse.avatar ?? 'defaultAvatar.jpg',
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
};

export default new CurrentUser();