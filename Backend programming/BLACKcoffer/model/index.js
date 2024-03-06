const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({

    URL_ID:{
        type:String
    },
    URL:{
        type:String
    }

   /* positive_score:{
        type:Number
    },
    negative_score:{
        type:Number
    },
    polarity_score:{
        type:Number
    },
    subjectivity_score:{
        type:Number
    },
    average_sentence_length:{
        type:Number
    },
    percentage_of_complex_word:{
        type:Number
    },
    fog_index:{
        type:Number
    }*/
});

const article = mongoose.model("Article",articleSchema);

module.exports = article;