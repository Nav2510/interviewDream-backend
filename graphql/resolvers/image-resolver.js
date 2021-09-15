const Image = require("../../models/image");

exports.getBackgroundImages = async function (parent, args, context, info) {
  const fetchedImages = await Image.find({ type: "background" });
  return fetchedImages.map((imageObject) => {
    return imageObject.imagePath;
  });
};
