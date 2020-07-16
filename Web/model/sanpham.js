var mongoose = require('mongoose');
var sanpham = new mongoose.Schema({
    title: 'string',
    des: 'string',
    cost: 'number',
    images: 'array',
    quantity: 'number'
    // cat: 'string'
},{collection: 'sanpham'});
module.exports = mongoose.model('sanpham', sanpham)


// {
//     "title": "Body suits cotton",
//     "des": "Tạo cảm giác thoải mái trong từng chuyển động của bé yêu",
//     "cost": 10
// }
