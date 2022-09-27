const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png' :'png',
  'image/jpeg' :'jpg',
  'image/jpg' :'jpg'
};

const storage = multer.diskStorage({
  destination: function (req,file,cb) {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime Type");
    if (isValid)
    {
      error = null;
      // console.log("i am here");
    }
    cb(null,"server/images");
  },
  filename:function (req,file,cb){
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext =  MIME_TYPE_MAP[file.mimetype];
    cb(null,name + '-' + Date.now() + '.' + ext);
  },
});

module.exports = multer({storage: storage}).single("image");
