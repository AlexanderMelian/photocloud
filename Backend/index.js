import app from "./src/routesApp.js"
import { sequelize } from "./src/database/database.js";
import { User } from "./src/model/user.js";
import { Photo } from "./src/model/photo.js";
async function main(){

    console.log(process.env.DB_PASSWORD)
    console.log(process.env.DB_HOST)
    console.log(process.env.DB_USER)
    await sequelize.sync({force: true})
    app.listen(process.env.APP_PORT);
    app.set('view engine', 'ejs');
    console.log('App en puerto', process.env.APP_PORT)
}

main()