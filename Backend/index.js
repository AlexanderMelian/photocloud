import app from "./src/routesApp.js"
import { sequelize } from "./src/database/database.js";
import { User } from "./src/model/user.js";
import { Photo } from "./src/model/photo.js";
async function main(){
    await sequelize.sync({force: true})
    app.listen(process.env.APP_PORT);
    console.log('App en puerto', process.env.APP_PORT)
}

main()