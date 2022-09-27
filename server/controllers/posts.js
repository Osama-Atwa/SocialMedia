const Post = require('../Models/post');

exports.addPost =
(req,res,next)=>{
  const url =  req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userID
  });
  // console.log(req.userData.userID);
  // return res.status(200).json({});
  post.save().then(CreatedPost => {
    res.status(201).json({
      message: "post is added successfully",
      post: {
        ...CreatedPost,
        id:CreatedPost._id
      }
    });
  });
};

exports.getPosts = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  if(pageSize && currentPage)
  {
    postQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  let Posts;
  postQuery.then((documents)=>{
    // console.log(documents)
    Posts = documents;
    return Post.count();
  }).then( TotalPosts =>{
    // console.log(TotalPosts);
    res.status(200).json({
      message : "Posts fetched succesfully",
      body : Posts,
      totalPosts : TotalPosts
    });
  }
  );

};

exports.editPost = (req,res,next)=>{
  let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userID
  });
  // console.log(post);
  Post.updateOne({ _id:req.params.id,creator: req.userData.userID },post).then((result)=>{
    if(result.matchedCount > 0)
    {
      return res.status(200).json({message:"Updated Successfully!"});
    }

    return res.status(401).json({message:"Not Authorized!"});

  });
};


exports.getPost = (req,res,next)=>{
  Post.findOne({ _id:req.params.id }).then((post)=>{
    res.status(200).json(post);
  });
};

exports.deletPost = (req,res,next)=>{
  Post.deleteOne({ _id:req.params.id, creator: req.userData.userID }).then((result)=>{
    if(result.deletedCount > 0)
    {
      return res.status(200).json({message:"Updated Successfully!"});
    }

    return res.status(401).json({message:"Not Authorized!"});
  });
};
