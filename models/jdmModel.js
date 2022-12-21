// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const JdmSchema = new Schema({
    brand: String,
    model: String,
    engine: String,
}, {
    toJSON: {virtuals: true}
});

// Add virtual property to Jdm, to include (dynamic) links
JdmSchema.virtual("_links").get(
    function () {
        return {
            self: {
                href: `${process.env.BASE_URI}jdms/${this._id}`
            },
            collection: {
                href: `${process.env.BASE_URI}jdms/`
            }
        }
    }
    // () =>  (
    //      {
    //         self: {
    //             href: `${process.env.BASE_URI}jdms/${this._id}`
    //         },
    //         collection: {
    //             href: `${process.env.BASE_URI}jdms/`
    //         },
    //     }
    // )
);

// Export function to create "SomeModel" model class
module.exports = mongoose.model("Jdm", JdmSchema);