package sg.nus.iss.spring.backend.dto;
/* Written By Phyo Nyi Nyi Paing */
public class PaginationFiltersDTO {
    private String sortBy = "name";
    private String sortDir = "ASC";

    private Integer pageNo = 0;
    private Integer itemsPerPage = 10;

    public String getSortBy() {
        return sortBy;
    }

    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }

    public String getSortDir() {
        return sortDir;
    }

    public void setSortDir(String sortDir) {
        this.sortDir = sortDir;
    }

    public Integer getPageNo() {
        return pageNo;
    }

    public void setPageNo(Integer pageNo) {
        this.pageNo = pageNo;
    }

    public Integer getItemsPerPage() {
        return itemsPerPage;
    }

    public void setItemsPerPage(Integer itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
    }
}
