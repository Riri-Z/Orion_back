const { cloudinary } = require('../utils/cloudinary')

const upload = (req, res, next) => {

  let sampleFile;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    return next() /* res.status(400).send('No files were uploaded') */
  }
  sampleFile = req.files.sampleFile
  sampleFile.name = sampleFile.name.toLowerCase()
  uploadPath = __dirname + '/uploads/' + sampleFile.name
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err)
  })
  next()
}

const uploadResponse = async (req, res, next) => {
  try {
    let sampleFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
      return next() /* res.status(400).send('No files were uploaded') */
    }
    sampleFile = req.files.sampleFile
    sampleFile.name = sampleFile.name.toLowerCase()
    uploadPath = __dirname + '/uploads/' + sampleFile.name
    await sampleFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err)
    })


    await cloudinary.uploader.upload(
      "middleware/uploads/" + req.files.sampleFile.name.toLowerCase())

    next()
  } catch (e) {
    res.json(e)
  }

}
module.exports = uploadResponse;
