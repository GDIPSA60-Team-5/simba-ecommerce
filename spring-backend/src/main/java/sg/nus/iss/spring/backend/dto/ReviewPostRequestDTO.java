package sg.nus.iss.spring.backend.dto;

public class ReviewPostRequestDTO {
    private String content;
    private float rating;

    public String getContent() {
        return content;
    }

    public float getRating() {
        return rating;
    }
}
