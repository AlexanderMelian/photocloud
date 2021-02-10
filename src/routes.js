const { Router } = require('express'); 

const router = new Router();

const path = require('path');
const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const uploadImage = multer({
    storage,
    limits: {fileSize: 2 * 1024 * 1024
            ,files: 100}
});

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

//-----------------------------------
router.get('/singleupload',(req,res) =>{
    res.sendFile(path.join(__dirname,'../public/singleUpload.html'))
})
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
router.get('/multiupload', (req,res) =>{
    res.sendFile(path.join(__dirname,'../public/multiUpload.html'))
});

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


module.exports = router;