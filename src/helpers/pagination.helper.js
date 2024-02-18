// Utility functions for paginating user lists

const getPaginationMetadata = ({ page, limit }) => {
    const startIndex = (parseInt(page) - 1) * parseInt(limit) || 0;
    const endIndex = startIndex + parseInt(limit) || 10;
    return { startIndex, endIndex };
}

const getPaginatedResponse = (data, page, limit) => {
    return {
        page_data: data,
        page_information: {
            total_data: data.length,
            last_page: Math.ceil(data.length / limit),
            current_page: page,
            previous_page: 0 + (page - 1),
            next_page: page < Math.ceil(data.length / limit) ? page + 1 : 0
        }
    }
}

const getRecursivePaginatedResponse = (data, page, limit, totalCount) => {
    return {
        page_data: data,
        page_information: {
            total_data: totalCount,
            last_page: Math.ceil(totalCount / limit),
            current_page: page,
            previous_page: page > 1 ? page - 1 : null,
            next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
        },
    };
};

const getTotalCommentCount = async (Comments, postId) => {
    const totalCount = await Comments.count({
        where: {
            postId,
        },
    });

    return totalCount;
};

export { getPaginationMetadata, getPaginatedResponse, getRecursivePaginatedResponse, getTotalCommentCount };
