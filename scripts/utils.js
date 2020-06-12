const SortEnum = {
    asc: 1,
    desc: 2,
    byFinished: 10,
    byFinishedAsc : 11,
    byFinishedDesc: 12,
    byCreated: 20,
    byCreatedAsc: 21,
    byCreatedDesc: 22,
    byImportance: 30,
    byImportanceAsc: 31,
    byImportanceDesc: 32
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