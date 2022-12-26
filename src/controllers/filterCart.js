

exports.filterDetails = async (req, res) => {

    let pipeline = [
        {
            $match: { "supercategoryId": req.query.supercategoryId}
        }
    ]

    if (req.query.isSort) {
        if(req.query.sort_key=="desc"){
            pipeline.push(
                {
                    $sort: {
                        sortprice:-1
                    }
                }
            )
        }else if(req.query.sort_key=="asc"){
            pipeline.push(
                {
                    $sort: {
                        sortprice:1
                    }
                }
            )
        }
    }
    if (req.query.isFilter) {
        if (req.query.isColor) {
           pipeline.push(
            {
                "$match": {
                  "attributes": {
                    "$elemMatch": {
                      "color": {
                        "$elemMatch": {
                          "colorCode": {
                            "$all": req.query.color_id
                          }
                        }
                      }
                    }
                  }
                }
              }
           )
        }
        if (req.query.isSize) {
            pipeline.push(
                {
                    $match:{
                        "attributes":{
                            "$elemMatch":{
                               "title":{
                                "$all":req.query.size_id
                               }
                            }
                        }
                    }
                }
            )
        }
        if(req.query.lower||req.query.greater){
            pipeline.push(
                {
                    $match: {
                      "sortprice": {
                        $gt: req.query.lower,
                        $lt: req.query.greater
                      }
                    }
                  }
            )
        }
    }
    let data = await productModel.find(filterData).sort({ name: req.query.isSort })
    return res.send(data)
}
// {
//     "supercategoryId": "63a29d9a3a9408bce8545609",
//      "isSort" : 1,
//     "isFilter" : 0,
//     "sort_key" : "asc",
//     "isColor" : 1,
//     "isSize" : 0,
//     "size_id" : ["M"],
//     "color_id" : ["#c48282"],
//     "lower":0,
//     "greater":1000
// }

/**
 * 
 *  {
    "$match": {
      "attributes": {
        "$elemMatch": {
          "color": {
            "$elemMatch": {
              "colorCode": {
                "$all": [
                  "#f2d43a"
                ]
              }
            }
          }
        }
      }
    }
  },
  {
    $match: {
      "sortprice": {
        $gt: 300,
        $lt: 1000
      }
    }
  },
   {
    $match: {
      "attributes": {
        "$elemMatch": {
          "title": {
            $all: [
              "M"
            ]
          }
        }
      }
    }
  },
   pipeline.push(
                {
                    $sort: {
                        sortprice:-1
                    }
                }
            )
 */