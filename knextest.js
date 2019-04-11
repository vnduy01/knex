const Koa = require('koa');
const app = new Koa();

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'duynt',
      password : '1',
      database : 'tri'
    }
});

const findUser = async (context, next) => {

    if(!context.query.name){
        context.body = "Insert Data"
    }else {
        await next(); 
    }
    
}

const execute = async (context) => {
    const result = await knex.select('*').from('users').where('username', 'like', '%'+context.query.name+'%');
    context.body = result;
}

app.use(findUser);
app.use(execute);
app.listen(3000);
