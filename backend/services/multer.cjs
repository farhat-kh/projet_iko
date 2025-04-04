const fs = require('fs');
const multer = require('multer');
const path = require('path');

// definir le dossier ou seront enregistrés les fichiers uploadés
const uploadFolder = path.join(__dirname, '../public/uploads');

// verifier et creer le dossier "uploads" s'il n'existe pas
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
    console.log("Le dossier 'uploads' a été créé avec succès.");
  } else {
    console.log("Le dossier 'uploads' existe déjà.");
  }

// configuration du stockage des fichiers uploadés
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
      },
})

// Creation du middleware multer
const upload = multer({ storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            return cb(new Error('Seuls les fichiers JPG, JPEG et PNG sont autorisés !'));
        }
    }
 });

module.exports = upload;