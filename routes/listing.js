const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {listingSchema } = require("../schema.js");
const {isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});



router.route("/")
.get( wrapAsync(listingController.index))
 .post( isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));
// .post( (req, res) =>{
//     res.send(req.file);
// });



// const validateListing = (req, res, next) =>{
//   let {error} = listingSchema.validate(req.body);
//   if ( error) {
//     let errMsg = error.details.map((el)=> el.message).join(",");
//     throw new ExpressError(400, errMsg);

//   }
//   else{
//     next();
//   }
// };


//Index Route
// router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm );

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));





// Show Route
//router.get("/:id", wrapAsync(listingController.showListing));


//Create Route
//router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, upload.single('listing[image]'), wrapAsync(listingController.renderEdit));

//Update Route
//router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

//Delete Route
//router.delete("/:id", isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;