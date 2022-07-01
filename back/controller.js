function mainObject(obj){
    let res = {
        headTitle : "Guess Word",
        cssList : ["./front/header.css"],
        logined : false,
        profileName : undefined,
        currentLink : undefined,
        scripstList : []
    };

    for (let i of Object.keys(obj)){
        if (i == "cssList"){
            res[i] = res[i].concat(obj[i]);
            continue;
        }
        res[i] = obj[i];
    };

    return res;
};


class Controller{
    index(req, res){
        res.render('index',
        mainObject({
            cssList:["./front/main.css"],
            currentLink : "/"
        })    
        );       
    };

    login(req, res){
        res.render('login', mainObject({
            headTitle:"Login",

            // скрипты и css - обрабатываются как статика
            cssList: ['./front/login.css'],
            scriptsList : ['./scripts/login.js']
        }));        
    };
    
    reg(req, res){
        res.render('reg', mainObject({
            headTitle:"Sign Up",
            cssList: ['./front/reg.css'],
            scriptsList : ['./scripts/reg.js']
        }) 

        );        
    };
    
    //В названии странице сделать имя пользователя
    profile(req, res){
        res.render('profile', mainObject({
            headTitle : "Profile"
        })
        );        
    };
    
    game(req, res){
        res.render('game', mainObject({
            headTitle : "Guess Word"
        })
        )        
    };
   
    rules(req, res){
        res.render('rules', mainObject({
            headTitle:"Guess Word",
            cssList:['./front/rules.css'],
            currentLink:"/rules"
        })
        );
    };

    // перенести
    getUser(req,res){
        pass;
    };

    postUser(req,res){
        console.log(req);
        return res.json(req.body);
    };

    notFound(req,res){
        res.render('notFound', mainObject({
            headTitle:"404 not found",
            currentLink:'/notFound',
            cssList:['./front/notFound.css']
        }))
    }

};

export default new Controller();