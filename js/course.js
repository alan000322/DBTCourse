


Vue.component('vTable', {
    props: {
        //表头列名称
        columns: {
            type: Array,
            default: function () {
                return [];
            }
        },
        //数据
        data: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    //为了不影响原始数据，这里定义了相应的需要操作的数据对象
    data: function () {
        return {
            currentColumns: [],
            currentData: []
        }
    },
    //render 实现方式
    render: function (h) {
        var that = this;

        /**
         * 创建列样式与表头
         */
        var ths = [];//<th> 标签数组
        var cols = [];//<cols> 标签数组
        this.currentColumns.forEach(function (col, index) {
            if (col.width) {//创建列样式
                cols.push(h('col', {
                    style: {
                        width: col.width
                    }
                }))
            }


            if (col.sortable) {
                ths.push(h('th', [
                    h('span', col.title),
                    //升序
                    h('a', {
                        class: {
                            on: col.sortType === 'asc'
                        },
                        on: {
                            click: function () {
                                that.sortByAsc(index)
                            }
                        }
                    }, '↑'),
                    //降序
                    h('a', {
                        class: {
                            on: col.sortType === 'desc'
                        },
                        on: {
                            click: function () {
                                that.sortByDesc(index);
                            }
                        }
                    }, '↓')
                ]));
            } else {
                ths.push(h('th', col.title));
            }
        });


        /**
         * 创建内容
         */
        var trs = [];//<tr> 标签数组
        this.currentData.forEach(function (row) {//遍历行
            var tds = [];//<td> 标签数组
            that.currentColumns.forEach(function (cell) {//遍历单元格
                tds.push(h('td', row[cell.key]));
            });
            trs.push(h('tr', tds));
        });

        return h('table', [
            h('colgroup', cols),
            h('thead', [
                h('tr', ths)
            ]),
            h('tbody', trs)
        ])
    },

    methods: {
        //初始化表头
        initColumns: function () {
            this.currentColumns = this.columns.map(function (col, index) {
                //新建字段，标识当前列排序类型；默认为“不排序”
                col.sortType = 'normal';
                //新建字段，标识当前列在数组中的索引
                col.index = index;
                return col;
            });
        },
        //初始化数据
        initData: function () {
            this.currentData = this.data.map(function (row, index) {
                //新建字段，标识当前行在数组中的索引
                row.index = index;
                return row;
            });
        },

        //排序
        order: function (index, type) {
            this.currentColumns.forEach(function (col) {
                col.sortType = 'normal';
            });

            //设置排序类型
            this.currentColumns[index].sortType = type;

            //设置排序函数
            var sortFunction;
            var key = this.currentColumns[index].key;
            switch (type) {
                default://默认为 asc 排序
                case 'asc':
                    sortFunction = function (a, b) {
                        return a[key] > b[key] ? 1 : -1;
                    };
                    break;
                case 'desc':
                    sortFunction = function (a, b) {
                        return a[key] < b[key] ? 1 : -1;
                    };
                    break;
            }
            this.currentData.sort(sortFunction);
        },

        //升序
        sortByAsc: function (index) {
            this.order(index, 'asc');
        },
        //降序
        sortByDesc: function (index) {
            this.order(index, 'desc');
        }
    },
    watch: {
        data: function () {
            this.initData();

            //找出排序字段
            var sortedColumn = this.currentColumns.filter(function (col) {
                return col.sortType !== 'normal';
            });

            if (sortedColumn.length > 0) {
                if (sortedColumn[0].sortType === 'asc') {
                    this.sortByAsc(sortedColumn[0].index);
                } else {
                    this.sortByDesc(sortedColumn[0].index);
                }
            }
        }
    },
    mounted() {
        this.initColumns();
        this.initData();
    }
});

var app = new Vue({
        el: '#app',
        data: {
            //title 、key 与 width 必填；sortable 选填
            columns: [
                {
                    title: '名称',
                    key: 'name',
                    width:'60%'
                },
                {
                    title: '数量',
                    key: 'num',
                    width:'20%',
                    sortable: true
                },
                {
                    title: '单价',
                    key: 'unitPrice',
                    width:'20%',
                    sortable: true
                }
            ],
            data: [
                {
                    name: '真果粒牛奶饮品',
                    num: 2,
                    unitPrice: 59.9
                },
                {
                    name: '苏泊尔（SUPOR）电压力锅 ',
                    num: 1,
                    unitPrice: 378.0
                },
                {
                    name: '乐事（Lay\'s）薯片',
                    num: 3,
                    unitPrice: 63.0
                }
            ]
        },
        methods:{
            add:function () {
                this.data.push( {
                    name: '良品铺子 休闲零食大礼包',
                    num: 5,
                    unitPrice: 59.80
                });
            }
        }
    });