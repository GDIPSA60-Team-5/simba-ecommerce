package sg.nus.iss.spring.backend.dto;

public class OrderResponseDTO {
    private String clientSecret;

    public OrderResponseDTO(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }
}
