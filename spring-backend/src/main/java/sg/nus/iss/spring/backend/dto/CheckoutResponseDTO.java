package sg.nus.iss.spring.backend.dto;

public class CheckoutResponseDTO {
    private String clientSecret;

    public CheckoutResponseDTO(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }
}
