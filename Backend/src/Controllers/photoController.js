import { Photo } from "../model/photo.js"


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
    let user_id = req.userId
    console.log(user_id)
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