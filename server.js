const express = require("express");
const router = express.Router();
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();


/*.then(() => saveAllSpotLocations());*/
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/assets", express.static('assets'))

router.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname,'index.html'))
})

app.use('/', router)
app.listen(PORT, function() {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});
