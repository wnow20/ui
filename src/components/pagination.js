import Vue from 'vue'
import template from './tpl/pagination.html'
import _ from 'lodash'

const NO_URL = 'javascript:void(0);';
const PAGE_ITEM = {
    name: '',
    value: '',
    url: '',
    type: 'url', // or ajax
    disabled: false,
    active: false
};

var Pagination = Vue.extend({
    props: {
        currentPage: {
            type: Number,
            validator: function (value) {
                return value > 0
            },
            required: true,
            default: 1
        },
        pageSize: {
            type: Number,
            required: true,
            default: 20
        },
        totalCount: {
            type: Number,
            required: true,
            default: 0
        },
        // the number of buttons
        // recommend u give an odd number
        displayNum: {
            type: Number,
            default: 7
        },
        url: {
            type: String,
            default: NO_URL
        }
    },
    template,
    data() {
        return {

        }
    },
    computed: {
        first() {
            return 1;
        },
        isFirst() {
            return this.currentPage === this.first;
        },
        last() {
            return this.totalPage
        },
        isLast() {
            return this.currentPage === this.last;
        },
        prevItem() {
            return this.make_page_item(this.prev);
        },
        nextItem() {
            return this.make_page_item(this.next);
        },
        totalPage() {
            return Math.ceil(this.totalCount / this.pageSize)
        },
        type() {
            return this.url !== NO_URL? 'url' : 'ajax';
        },
        pages() {
            var list = [];
            var {begin, to} = getInterval(this.currentPage, this.first, this.last, this.displayNum);

            for (let i = begin; i <= to; i++) {
                list.push(this.make_page_item(i));
            }

            return list;
        }
    },
    methods: {
        make_page_item(pageNo) {
            var obj = {
                name: pageNo,
                value: pageNo,
                url: this.url,
                type: this.type,
                active: pageNo === this.currentPage? true : false
            }

            return _.extend({}, PAGE_ITEM, obj);
        },
        prev() {
            this.go(this.currentPage - 1);
        },
        next() {
            this.go(this.currentPage + 1);
        },
        go(page) {
            if (page > this.last) {
                return false;
            }
            if (page < this.first) {
                return false;
            }

            this.$set('currentPage', page);
        },
        notify() {
            this.$dispatch('change', {
                currentPage: this.currentPage,
                pageSize: this.pageSize
            });
        }
    },
    watch: {
        currentPage() {
            this.notify();
        },
        pageSize() {
            this.notify();
        }
    }
});

/**
 * Calculate begin and to point of pagination
 * @return {Object}
 */
function getInterval(currentPage, first, last, displayNum) {
    var half = Math.floor(displayNum / 2);
    var begin = currentPage - half;
    var to = currentPage + half;

    if (begin < first) {
        begin = first;
    }
    if (to > last) {
        to = last;
    }

    return {begin, to};
}

export default Pagination
