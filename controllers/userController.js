const asyncCatch = require('../utils/asyncCatch');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const path = require('path');
const AWS = require('aws-sdk');

exports.getUser = asyncCatch(async (req, res, next) => {
  console.log('req.params', req.params);
  const user = await User.findById(req.params.id).select('-__v');

  //Using class for errors
  if (!user) return next(new AppError(`User not found`, 404));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

//UPLOAD AVATAR
exports.uploadAvatar = asyncCatch(async (req, res, next) => {
  //1) Find user byID in PARAMS
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('User not found', 401));
  //2 Upload image file from client
  ///////////////////////////////////////////

  //1) Checking body if file exists
  // console.log('req.files', req.files);
  if (!req.files || Object.keys(req.files).length === 0)
    return next(new AppError('Please select file', 400));

  const file = req.files.hero;
  console.log('file', file);

  //2) Check for mime type
  if (!file.mimetype.startsWith('image'))
    return next(new AppError('file not image', 400));

  //3) Create name attribute for file
  file.name = `hero_${user._id}${path.parse(file.name).ext}`;

  //4) Create Blob for AWS S3 upload
  const Blob = req.files.hero.data;

  (async () => {
    try {
      AWS.config.setPromisesDependency();
      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1',
      });
      const s3 = new AWS.S3();
      // const response = await s3
      //   .listObjectVersions({
      //     Bucket: 'my-ecommerce-bucket',
      //   })
      //   .promise();
      // console.log('response', response);

      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: file.name,
        Body: Blob,
      };

      s3.upload(params, (err, data) => {
        if (err) return console.log('err to upload to s3', err);
        console.log('data', data);
      });

      //5) After Blob uploaded to AWS S3
      const newAvatar = await User.findByIdAndUpdate(
        req.params.id,
        {
          avatar: file.name,
        },
        { new: true }
      );

      res.json({ message: 'success', newAvatar });
    } catch (err) {
      console.log('error ', err);
    }
  })();
});
