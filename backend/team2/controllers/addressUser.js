const AddressUser = require("../model/addressUser");
const asyncHandler = require("../middleware/async");
const { log } = require("console");

const fetchAllAddressesUser = asyncHandler(async (req, res, next) => {
    query = {
        email: req.params.email,
    };
    let docfetch = await AddressUser.find(query);
    console.log('docfetch', docfetch[0])
    let name = docfetch[0].name;
    let phone = docfetch[0].phone;
    let result = docfetch[0].addresses;
    let response = [];

    for (let index = 0; index < result.length; index++) {
        response.push({ ...result[index]._doc, name: name, phone: phone });
    }
    res.status(201).json({ message: "success", res: response });
});






const addAddressesUser = asyncHandler(async (req, res, next) => {
    query = { email: req.body.email }; //req.body
    let finduser = await AddressUser.find(query)

    if (finduser.length !== 0) {
        console.log(req.body);
        try {
            const AddressRes = await AddressUser.updateMany({ email: req.body.email },
                {
                    $push: {
                        addresses: req.body.addresses
                    }
                }, { new: true })


            console.log(AddressRes)
            res.status(200).send(AddressRes)
        } catch (err) {
            console.log(err);
        }

    } else {
        let item = await AddressUser.create(req.body)
        res.json({ message: true, res: item });

    }

});
// const addAddressesUser = asyncHandler(async (req, res, next) => {
//     query = { email: req.body.email }; //req.body
//     let finduser = await AddressUser.find(query)
//     if (finduser.length !== 0) {
//         let docadd = await AddressUser.find(query)
//             .then((item) => {
//                 let index = item[0].addresses.length;

//                 item[0].addresses[index] = req.body.addresses;
//                 item[0].push(req.body)
//                 console.log("item", item)

//                 item[0].save();
//                 res.status(201).json({ message: "success", res: item[0].addresses });
//             });
//     } else {
//         let item = await AddressUser.findOneAndUpdate({ email: req.body.email }, { $addToSet: { name: req.body.name, phone: req.body.phone, addresses: [req.body.addresses] } }, {
//             new: true,
//             runValidators: true
//         })
//         res.json({ message: true, res: item });
//         // let docadd = await AddressUser.find(query)
//         // .then((item) => {
//         //     item[0] = req.body.addresses;
//         //     item[0] = req.body 
//         //     console.log("item",item)
//         //     item[""].save();
//         //     res.status(201).json({ message: "success", res: item });
//         // });
//     }
//     // console.log("docadd", docadd);
// });

const delAddressesUser = asyncHandler(async (req, res, next) => {
    let id = req.body.id; //req.body.
    let query = { email: req.body.email }; //req.body
    let docadd = await AddressUser.find(query).then((item) => {
        let audioIndex = item[0].addresses.map((item) => item._id).indexOf(id);
        item[0].addresses.splice(audioIndex, 1);
        item[0].save();
        res.status(201).json({ message: "success", res: item[0].addresses });
    });
});

const patchAddressUser = asyncHandler(async (req, res, next) => {
    let id = req.body.id; //req.body
    let query = { email: req.body.email }; //req.body
    let patch = req.body.address;
    let docadd = await AddressUser.find(query).then((item) => {
        let audioIndex = item[0].addresses.map((item) => item._id).indexOf(id);
        item[0].addresses[audioIndex] = patch;
        item[0].save();
        res.status(201).json({ message: "success", res: item[0].addresses });
    });
});

module.exports = {
    fetchAllAddressesUser,
    addAddressesUser,
    delAddressesUser,
    patchAddressUser,
};