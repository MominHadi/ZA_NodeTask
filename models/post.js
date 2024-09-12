const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: []
    }],
    createdAt: { type: Date, default: Date.now },
 
    updatedAt: {
        type: Date,
        default: Date.now
    }

})


// PostSchema.pre('save', (next) => {
//     this.updatedAt = Date.now()
//     next();
// })

module.exports = mongoose.model('Post', PostSchema)