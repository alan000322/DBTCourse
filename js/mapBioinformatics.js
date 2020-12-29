// Change Data START//
var datasBioinformatics = [
    {
        code: "",
        name: "細胞生物學（一）",
        category: "必",
        credit: "2",
        time: "F34",
        seme: "109(一)",
        urls: "",
        other: "每年開課"
    },
    {
        code: "",
        name: "細胞生物學（二）",
        category: "選",
        credit: "2",
        time: "F56",
        seme: "109(二)",
        urls: "",
        other: "每年開課"
    },
    {
        code: "",
        name: "結構生物學",
        category: "選",
        credit: "3",
        time: "R234",
        seme: "109(二)",
        urls: "",
        other: "非每年開課"
    },
    {
        code: "",
        name: "分子生物學（二）",
        category: "選",
        credit: "3",
        time: "M4W56",
        seme: "109(一)",
        urls: "",
        other: "每年開課"
    },
    {
        code: "",
        name: "物理化學（一）",
        category: "選",
        credit: "3",
        time: "W56R2",
        seme: "109(一)",
        urls: "",
        other: "每年開課"
    },
    {
        code: "",
        name: "有機化學（二）",
        category: "選",
        credit: "4",
        time: "T34R34",
        seme: "109(一)",
        urls: "",
        other: "每年開課"
    }


];
// Change Data END//






new Vue({
    el: "#vue-Bioinformatics",
    data: {
        checkAll: false,// 是否全选
        checkedRows: [],// 选中的行标，用于删除行
        infos: datasBioinformatics,// 表格数据
        newRow:{}// 新增的行数据，用于新增行
    }
})


