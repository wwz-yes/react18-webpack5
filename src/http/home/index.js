import useApi from "@/http/request";

export function getUserInfo(params) {
    return useApi({
        url: "/client/article/getArticleByType",
        params,
    });
}