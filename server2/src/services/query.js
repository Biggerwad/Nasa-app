const DEFAUL_PAGE_NUMBER = 1;
const DEFAULT_LIMIT = 0;
// i.e the 0 means return everything

function getPagination(query) {
    // Geting the absolute value of the query, i also converts to number
    const page = Math.abs(query.skip) || DEFAUL_PAGE_NUMBER;
    const limit = Math.abs(query.limit) || DEFAULT_LIMIT;
    const skip = (page - 1) * limit;

    return {
        skip,
        limit,
    };

}

module.exports = {
    getPagination
}