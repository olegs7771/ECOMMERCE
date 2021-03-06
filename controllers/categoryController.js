const asyncCatch = require('../utils/asyncCatch');
const Category = require('../models/Category');
const AppErrorHandler = require('../utils/AppError');
const slugify = require('slugify');
const { cloudinary } = require('../utils/claudinary');

// CREATE GATEGORY BY ADMIN
const create = asyncCatch(async (req, res, next) => {
  //1) Check if name correct

  if (req.body.name.length < 3) {
    return next(new AppErrorHandler('Name too short', 401));
  }

  //1) Create slug
  const slug = slugify(req.body.name, { lower: true });
  console.log('slug', slug);

  const uploadedResponse = await cloudinary.uploader.upload(req.body.image, {
    upload_preset: 'dev_setups',
    folder: `categories/${slug}`,
  });
  //2) Create new body to store in db
  console.log('uploadedResponse', uploadedResponse);
  const bodyObject = { name: req.body.name, image: uploadedResponse.public_id };

  const category = await Category.create(bodyObject);

  // console.log('req.body create category', req.body);
  // const category = await Category.create(req.body);
  res.status(200).json({ status: 'success', data: category });
});
////////////////////////////////////////////////////
// FIND ALL CATEGORIES PUBLIC
const list = asyncCatch(async (req, res, next) => {
  console.log('list');
  const categories = await Category.find().sort({ createAt: -1 });
  res
    .status(200)
    .json({ status: 'success', qnt: categories.length, data: categories });
});

/////////////////////////////////////////////////////
// FIND ONE CATEGORY PUBLIC
const read = asyncCatch(async (req, res, next) => {
  console.log('req.params read', req.params);
  const category = await Category.findOne({ slug: req.params.slug }).select(
    '-__v'
  );
  if (!category) return next(new AppErrorHandler('Category not found', 401));
  res.status(200).json({ status: 'success', data: category });
});

////////////////////////////////////////////////////////
// UPDATE CATEGORY  DESC && IMAGE
const update = asyncCatch(async (req, res, next) => {
  // console.log('update category name body', req.body);
  console.log('update category name params', req.params);

  // 1) CHECK IF CATEGORY EXISTS
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category)
    return next(
      new AppErrorHandler(`Category ${req.params.slug} not exists`, 404)
    );
  console.log('category  found', category);

  // IF UPDATING ONLY DESCRIPTION
  if (!req.body.image) {
    console.log('only text');
    category.description = req.body.desc;
    await category.save();
    const message = `Category ${req.params.slug} updated.`;
    res.status(200).json({ status: 'success', data: category, message });
  } else {
    console.log('updating all');
    //2) DELETE PREVIOUS IMAGE IN CLOUDINARY
    const deleteResponse = await cloudinary.api.delete_resources(
      category.image
    );

    console.log('previous deleted deleteResponse', deleteResponse);
    //2) UPDATE IMAGE IN CLOUDINARY
    const uploadedResponse = await cloudinary.uploader.upload(req.body.image, {
      upload_preset: 'dev_setups',
      folder: `categories/${category.slug}`,
    });
    console.log('uploadedResponse', uploadedResponse);

    //  UPDATE CATEGORY

    category.description = req.body.desc;
    category.image = uploadedResponse.public_id;
    await category.save();
    const message = `Category ${req.params.slug} updated.`;
    res.status(200).json({ status: 'success', data: category, message });
  }
});
////////////////////////////////////////////////////
// REMOVE ONE CATEGORY
const remove = asyncCatch(async (req, res, next) => {
  console.log('req.params', req.params);
  //1)Delete category in db
  const category = await Category.findOneAndDelete({ slug: req.params.slug });
  console.log('category remove', category);

  //2 Delete asset in the forlder
  const deleteResponse = await cloudinary.api.delete_resources(category.image, {
    all: true,
  });
  console.log('deleteResponse', deleteResponse);
  //3) Delete empty folder in cloudinary
  const cloudinaryResponse = await cloudinary.api.delete_folder(
    `categories/${category.slug}`
  );
  console.log('cloudinaryResponse', cloudinaryResponse);

  if (!category)
    return next(
      new AppErrorHandler(`No category ${req.params.slug} found `, 404)
    );
  res.status(200).json({ status: 'success', data: category });
});

module.exports = { create, read, update, remove, list };
