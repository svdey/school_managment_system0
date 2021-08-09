const notice = require("../Model/user/notice");


exports.noticePost = async (req, res, next) => {
    var noticeData = req.body;
    if (noticeData) {
        noticeData = JSON.parse(JSON.stringify(noticeData));
        var data = {
            title: noticeData.title,
            details: noticeData.details,
            posted_by: noticeData.posted_by,
            date: noticeData.date,
        };
        // console.log("data--->", data);
        const createNotice = await notice.create(data);
        if (createNotice) {
            res.send({ success: " Notice published successfully" });
        } else {
            res.send({ error: "Something went wrong" });
        }
    }

}
exports.noticeDelete = async (req, res, next) => {
    var id = req.body.id;
    console.log("id-->", id);
    if (id) {
        const noticeDelete = await notice.remove({ _id: id });
        if (noticeDelete) {
            res.send({ success: " Notice removed successfully" });
        } else {
            res.send({ error: "Id is required" });
        }
    }
}


