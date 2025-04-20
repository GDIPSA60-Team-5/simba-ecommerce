package sg.nus.iss.spring.backend.dto;
/* Written By Phyo Nyi Nyi Paing */
public class ProductFilterRequestDTO extends PaginationFiltersDTO {
    private Integer categoryId;
    private Float minPrice;
    private Float maxPrice;
    private String keywords;

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Float getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Float minPrice) {
        this.minPrice = minPrice;
    }

    public Float getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(Float maxPrice) {
        this.maxPrice = maxPrice;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }
}
