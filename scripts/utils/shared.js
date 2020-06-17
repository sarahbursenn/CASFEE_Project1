const SortEnum = {
    class_sort_asc: 1,
    class_sort_desc: 2,
    btn_span_sort_by_finished: 10,
    btn_span_sort_by_finished_asc : 11,
    btn_span_sort_by_finished_desc: 12,
    btn_span_sort_by_created: 20,
    btn_span_sort_by_created_asc: 21,
    btn_span_sort_by_created_desc: 22,
    btn_span_sort_by_importance: 30,
    btn_span_sort_by_importance_asc: 31,
    btn_span_sort_by_importance_desc: 32
};

const StyleEnum = {
    light : 1,
    dark: 2
};

const CookieEnum = {
    style: "notez_style",
    sortBy: "notez_sortBy",
    filterBy: "notez_filterBy"
};

function compare(v1, v2){
    // in case both are null
    if(v1 === v2){
        return 0;
    }

    if(v1 === null){
        return 1;
    }

    if(v2 === null){
        return -1;
    }

    return v1 - v2;
}