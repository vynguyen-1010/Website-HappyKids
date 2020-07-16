var express = require('express');
var router = express.Router();
var images = [];
var multer  = require('multer');
var sanphamModel = require('../model/sanpham');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ '-' + file.originalname)
  }
})
 
var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
  sanphamModel.find({}, function (err, dulieu) {
    res.render('home', { title: 'Home', data: dulieu})
    })
});


/* GET shop collection page. */
router.get('/shop-collect', function(req, res, next) {
  sanphamModel.find({}, function (err, dulieu) {
    res.render('shop-collect', { title: 'Shop Collection', data: dulieu });
  })
});


/* GET our story page. */
router.get('/our-story', function(req, res, next) {
  res.render('our-story', { title: 'Our Story' });
});


/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});


/* GET item page. */
router.get('/item.:id', function(req, res, next) {
  var id = req.params.id;
  sanphamModel.find({_id: id}, function (err, dulieu) {
    res.render('item', { title: 'Item', data: dulieu });
  })
});

router.post('/item.:id', function(req, res, next) {
  var id = req.params.id;
  sanphamModel.findByIdAndUpdate(id, {$set: {
    title: req.body.title,
    des: req.body.des,
    cost: req.body.cost,
    images: images[0],
    quantity: req.body.quantity
    // cat: req.body.cat
  }}, function (err, dulieu) {
    dulieu.save();
  });
  console.log(req.body.title);
  console.log(req.body.quantity);
  res.redirect('/my-cart');
});


/* GET my account page. */
router.get('/my-account', function(req, res, next) {
  res.render('my-account', { title: 'Account' });
});


/* GET my cart page. */
router.get('/my-cart.:id', function(req, res, next) {
  var id = req.params.id;
  sanphamModel.find({_id: id}, function (err, dulieu) {
    res.render('my-cart', { title: 'Cart', data: dulieu });
  });
});
router.get('/my-cart-xoa.:id', function(req, res, next) {
  var id = req.params.id;
  sanphamModel.findByIdAndRemove(id, function (err, dulieu) {
    dulieu.save();
    res.redirect('/my-cart');
    });
});


/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});


/* GET sign up page. */
router.get('/sign-up', function(req, res, next) {
  res.render('sign-up', { title: 'Sign Up' });
});

// Xem dữ liệu
router.get('/xem', function(req, res, next) {
  sanphamModel.find({}, function (err, dulieu) {
    res.render('xem', { title: 'Xem dữ liệu', data: dulieu})
    })
});

// Xóa dữ liệu
router.get('/xoa.:idcanxoa', function(req, res, next) {
  var idcanxoa = req.params.idcanxoa;
  sanphamModel.findByIdAndRemove(idcanxoa, function (err, dulieu) {
    dulieu.save();
    res.redirect('/xem');
    });  
});

/* GET them du lieu. */
router.get('/them', function(req, res, next) {
  res.render('them', { title: 'Thêm dữ liệu' });
});

/* Post cho ảnh. */
router.post('/uploadfile', upload.any(), function(req, res, next) {
  images.pop(req.files.path); // đưa path của img vào mảng images
  images.push(req.files[0].path); // đưa path của img vào mảng images
  console.log(images);
  res.status(200).send(req.files); // gửi mã 200 khi up thành công
});


// Post cho them du lieu
router.post('/them', function(req, res, next) {
  var phantu = {
    'title': req.body.title,
    'des': req.body.des,
    'cost': req.body.cost
    // 'cat': req.body.cat
  }
  var dulieu = new sanphamModel(phantu);
  dulieu.save();
  res.redirect('/xem');
});

/* GET sửa du lieu. */
router.get('/sua.:idcansua', function(req, res, next) {
  var idcansua = req.params.idcansua;
  sanphamModel.find({_id: idcansua}, function (err, dulieu) {
    res.render('sua', { title: 'Sửa dữ liệu', data: dulieu });
  })
});

// Post dl cho phần sửa
router.post('/sua.:idcansua', function(req, res, next) {
  var idcansua = req.params.idcansua;
  sanphamModel.findByIdAndUpdate(idcansua, {$set: {
    title: req.body.title,
    des: req.body.des,
    cost: req.body.cost,
    images: images[0]
    // cat: req.body.cat
  }}, function (err, dulieu) {
    dulieu.save();
  });
  console.log(req.body.image);
  res.redirect('/xem');
});




module.exports = router;
