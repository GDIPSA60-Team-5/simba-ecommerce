package sg.nus.iss.spring.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductFilterRequestDTO {
    private String sortBy = "name";
    private String sortDir = "ASC";

    private Integer pageNo = 0;
    private Integer itemsPerPage = 10;

    private Integer categoryId;
    private Float minPrice;
    private Float maxPrice;
    private String keywords;
}
