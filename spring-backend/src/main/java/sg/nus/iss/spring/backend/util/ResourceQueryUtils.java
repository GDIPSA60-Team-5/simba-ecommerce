package sg.nus.iss.spring.backend.util;

/* Written By Paul */
public class ResourceQueryUtils {

    /* Prevent 0 or negative pages & Adjust for Spring Page index */
    public static int sanitizePageNo(Integer pageNo) {
        return (pageNo == null || pageNo < 1) ? 0 : pageNo - 1;
    }

    /* Prevent 0 or negative items per page */
    public static int sanitizeItemsPerPage(Integer itemsPerPage) {
        return (itemsPerPage == null || itemsPerPage < 1) ? 10 : itemsPerPage;
    }

    /* Prevent whitespaces and empty string */
    public static String sanitizeKeywords(String keywords) {
        return (keywords == null || keywords.trim().isEmpty()) ? null : keywords.trim().toLowerCase();
    }
}
