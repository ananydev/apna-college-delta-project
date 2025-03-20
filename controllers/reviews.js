const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.createReview =  async (req, res) => {
  
  let listing = await Listing.findById(req.params.id);        // Find the listing by its ID from the database
  let newReview = new Review(req.body.review);               // Create a new review object using the data sent in the request
  newReview.author = req.user._id;
  listing.reviews.push(newReview);                           // Add the new review to the listing's reviews array
  await newReview.save();                                    // Save the new review to the database
  await listing.save();                                      // Save the updated listing (which now includes the new review) to the database
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", " Review Deleted!");
    res.redirect(`/listings/${id}`);
  };