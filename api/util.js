
exports.cleanProtectedFields = (data, protectedFields) => {
    return Object.keys(data)
        .filter(field => !protectedFields.includes(field))
        .reduce((object, key) => {
            return {
                ...object,
                [key]: data[key]
            }
        }, {})
}

exports.addPaginationSupportHeaders = (res, startRecord, endRecord, recordCount) => {
    const contentRange = `bytes : ${startRecord}-${endRecord}/${recordCount}`

    res.set('Access-Control-Expose-Headers', 'Content-Range')
    res.set('Content-Range', contentRange)
}

exports.getListPaginationArgs = (query) => {
    let range = [0, 9]
    let sort = ["id", "DESC"]

    if (query.range) {
        // transform range: '[0,9]' => array(0,9)
        range = query.range.substring(1, query.range.length - 1) // strip brackets []
            .split(",")
            .map(num => parseInt(num))
    }

    if (query.sort) {
        // transform sort: '["id","ASC"]' => array("id", "ASC")
        sort = query.sort.substring(1, query.sort.length - 1) // strip brackets []
            .split(",")
            .map(field => field.substring(1, field.length - 1)) // strip additional quotes
    }

    return {
        start: range[0],
        end: range[1],
        col: sort[0],
        dir: sort[1]
    }
}
