const express = require("express");
const imageRouter = express.Router();

const upload = require("../utilities/upload");
const singleUpload = upload.single("image");

imageRouter.post("/:id/add-image", function (req, res) {
  const stampID = req.params.id;

  singleUpload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }

    let update = { profilePicture: req.file.location };

    Stamp.findByIdAndUpdate(stampID, update, { new: true })
      .then((user) => res.status(200).json({ success: true, user: user }))
      .catch((err) => res.status(400).json({ success: false, error: err }));
  });
});
