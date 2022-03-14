const { Router } = require('express'); 

const router = new Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
//const { pool } = require('../database');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const uploadImage = multer({
    storage,
    limits: {fileSize: 10 * 1024 * 1024
            ,files: 100}
});

//-----------------------------------

router.post('/singleupload', uploadImage.single('image'), (req, res) => {
    try {
        const avatar = req.file;
        if (!avatar) {
            res.status(400).send({
                status: false,
                data: 'No file is selected.'
            });
        } else {
            // send response
            res.send({
                status: true,
                message: 'File is uploaded.',
                data: {
                    name: avatar.originalname,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
//--------------------------------------------------------------------------

router.post('/multiupload', uploadImage.array('files', 50), async (req, res) => {
    try {
        const photos = req.files;
        // check if photos are available
        if (!photos) {
            res.status(400).send({
                status: false,
                data: 'No photo is selected.'
            });
        } else {
            let data = [];

            // iterate over all photos
            photos.map(p => data.push({
                name: p.originalname,
                mimetype: p.mimetype,
                size: p.size
            }));

            // send response
            res.send({
                status: true,
                message: 'Photos are uploaded.',
                data: data
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
//---------------------------------------------------------------------------------------
router.get('/getimages', (req, res) => {//https://arjunphp.com/node-js-auto-generate-photo-gallery-directory/ THANKS
    let images = getImagesFromDir(path.join(__dirname, '../public/uploads'));
    res.json({
        status: true,
        data: images
    });
});

// dirPath: target image directory
function getImagesFromDir(dirPath) {
    console.log(dirPath);
    let allImages = [];
    let files = fs.readdirSync(dirPath);
    files = files.map(file => {
        return fs.readFileSync(path.join(dirPath, file)).toString('base64');
    });
    return files;
    /*for (file of files) {
        let fileLocation = path.join(dirPath, file);
        var stat = fs.statSync(fileLocation);
        if (stat && stat.isDirectory()) {
            getImagesFromDir(fileLocation);
        } else if (stat && stat.isFile() && ['.jpg', '.png','.jpeg'].indexOf(path.extname(fileLocation)) != -1) {
            allImages.push('static/'+file);
        }
    }
    // return all images in array formate
    return allImages;*/
}

//-----------------------------------------------------------------------------------------------
/*router.get('/testquery', async (req, res) => {
    sampleQuery();
    res.send();
})*/

//----------------------------------------------------------

router.post('/deleteimage',  (req, res) =>{
    var pathfile = path.join(__dirname , '../public/uploads/' , req.body.id)
    fs.unlink(pathfile,(err)=>{
        if(err){
            console.log(err)
            return
        }
    } )
})

module.exports = router;