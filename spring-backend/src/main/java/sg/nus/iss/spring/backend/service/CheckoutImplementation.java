package sg.nus.iss.spring.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import sg.nus.iss.spring.backend.interfacemethods.CheckoutInterface;
import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.model.DeliveryType;
import sg.nus.iss.spring.backend.model.Order;
import sg.nus.iss.spring.backend.model.PaymentType;
import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.repository.CartRepository;
import sg.nus.iss.spring.backend.repository.DeliveryTypeRepository;
import sg.nus.iss.spring.backend.repository.OrderRepository;
import sg.nus.iss.spring.backend.repository.PaymentTypeRepository;

@Service
@Transactional
public class CheckoutImplementation implements CheckoutInterface {
	@Autowired
	CartRepository cartRepo;
	
	@Autowired
	OrderRepository orderRepo;
	
	@Autowired
	PaymentTypeRepository paymentRepo;
	
	@Autowired
	DeliveryTypeRepository deliRepo;
	
	@Override
	public List<CartItem> listCartItems(int userId) {
		return cartRepo.findAllByUser_Id(userId);
	}
	
	@Override
	public CartItem updateCartOrderQty(CartItem cartItem) {
		return cartRepo.save(cartItem);
	}
	
	@Override
	public void removeCart(int userId) {
		cartRepo.deleteAllByUser_Id(userId);
	}
	
	@Override
	public Order saveOrderRecord(HttpSession session, List<CartItem> cartItems) throws Exception {
		User user = (User) session.getAttribute("authenticated_user");
		
		@SuppressWarnings("unchecked")
		Map<String, Object> orderData = (Map<String, Object>) session.getAttribute("order_data");
		
		String paymentType = (String) orderData.get("payment_type");
		Optional<PaymentType> existingPType = paymentRepo.findByName(paymentType);
		PaymentType pType;
		if (existingPType.isEmpty()) {
			pType = new PaymentType(paymentType);
		} else {
			pType = existingPType.get();
		}
		
		String deliType = (String) orderData.get("delivery_type");
		Optional<DeliveryType> existingDeliType = deliRepo.findByName(deliType);
		DeliveryType dType;
		if (existingDeliType.isEmpty()) {
			// Try to handle exception
			throw new Exception("DeliveryType not found");
		} else {
			dType = existingDeliType.get();
		}
		
		String status = "Order Confirmed";
		LocalDateTime dateTime = (LocalDateTime) orderData.get("date_time");
		String shippingAddress = (String) orderData.get("shipping_address");
		float goodsServiceTax = 9f;
		
		List<Product> products = cartItems.stream().map(CartItem::getProduct).collect(Collectors.toList());
		
		// now create an order instance
		Order order = new Order(user, pType, dType, status, dateTime, shippingAddress, goodsServiceTax,
				products);
		
		return orderRepo.save(order);	
	}
}
