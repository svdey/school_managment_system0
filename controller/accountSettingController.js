const user = require("../Model/user/User");

exports.accountSettingPost = async (req, res, next) => {
    var accountData = req.body;
    if (accountData) {
        accountData = JSON.parse(JSON.stringify(accountData));
        var data = {
            name: accountData.name,
            gender: accountData.gender,
            address: accountData.address,
            phone: accountData.phone,
            email: accountData.email,
            scode: accountData.scode,
            lang: accountData.lang,
            jdate: accountData.jdate,
            session: accountData.session,
        }
        var id = req.body.id;
        console.log('id-->',id);
        const crateAccount = await user.updateOne(
            {_id: accountData.id},
            {$set: data}
            );
        if (crateAccount) {
            res.send({ success: " Account updated successfully" });
        } else {
            res.send({ error: "Something went wrong" });
        }
    }
}

exports.imageUpload = (req, res, next) => {
    console.log(req.file);
res.json({message:'Uploaded'});
}

