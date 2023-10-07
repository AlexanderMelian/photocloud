import { Photo } from "../model/photo.js"
import { dirname , join , extname } from 'path';
import { statSync , readdirSync } from 'fs';


export async function singleStore(req, res){
  try{
    const { filename: key } = req.file;
    const name = `${key}`;
    if (!key) {
      return res.status(400).json({
        status: false,
        data: 'No file is selected.',
      });
    }
    let user_id = 1
    const photoCreated = await Photo.create({
      name,
      user_id,
    });
    return res.status(201).json({
      status: true,
      message: 'File is uploaded and photo record created.',
      data: {
        name: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        photo: photoCreated,
      },
    });
  } catch (error) {
    console.error('Error while handling file upload and photo creation:', error);
    return res.status(500).json({
      status: false,
      message: 'Internal server error.',
    });
  }
}


export async function getImages(req, res){
  let images = getImagesFromDir('/usr/src/app/tmp/uploads');
  res.render('index', { title: 'Gallery', images: images})
}

function getImagesFromDir(dirPath) {
  let allImages = [];
  let files = readdirSync(dirPath);
  for (let file of files) {
    let fileLocation = join(dirPath, file);
    var stat = statSync(fileLocation);
    if (stat && stat.isDirectory()) {
      // Recursión
      allImages = allImages.concat(getImagesFromDir(fileLocation));
    } else if (stat && stat.isFile() && ['.jpg', '.png', '.jpeg'].indexOf(extname(fileLocation)) != -1) {
      allImages.push('static/' + file);
    }
  }
  // Retorna todas las imágenes en el nivel actual de la recursión
  return allImages;
}
