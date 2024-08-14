const { default: mongoose } = require('mongoose');

async function main(){
    await mongoose.connect("mongodb+srv://Vanshika1609:Vanshika1609@cluster0.2h74f3f.mongodb.net/")
}

main().then(()=>console.log("Connected to database")).catch((error)=>console.log(error))