package sg.nus.iss.spring.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import sg.nus.iss.spring.backend.interfacemethods.CheckoutInterface;
import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.model.DeliveryType;
import sg.nus.iss.spring.backend.model.Order;
import sg.nus.iss.spring.backend.model.OrderItem;
import sg.nus.iss.spring.backend.model.PaymentType;
import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.repository.CartRepository;
import sg.nus.iss.spring.backend.repository.DeliveryTypeRepository;
import sg.nus.iss.spring.backend.repository.OrderItemRepository;
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
	
	@Autowired
	OrderItemRepository orderItemRepo;
	
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
		/*
		 * extract parameters from the session and cartItems objects to create order and order_item records
		 * get user info from session
		 */
		User user = (User) session.getAttribute("authenticated_user");
		
		// get order data from session
		@SuppressWarnings("unchecked")
		Map<String, Object> orderData = (Map<String, Object>) session.getAttribute("order_data");
		
		// get payment type data from order data
		String paymentType = (String) orderData.get("payment_type");
		Optional<PaymentType> existingPType = paymentRepo.findByName(paymentType);
		PaymentType pType;
		if (existingPType.isEmpty()) {
			pType = new PaymentType(paymentType);
		} else {
			pType = existingPType.get();
		}
		
		// get delivery type data from order data
		String deliType = (String) orderData.get("delivery_type");
		Optional<DeliveryType> existingDeliType = deliRepo.findByName(deliType);
		DeliveryType dType;
		if (existingDeliType.isEmpty()) {
			// Try to handle exception
			throw new Exception("DeliveryType not found");
		} else {
			dType = existingDeliType.get();
		}
		
		// set status of order
		String status = "Order Confirmed";
		
		// get dateTime of order and shipping address from order data
		LocalDateTime dateTime = (LocalDateTime) orderData.get("date_time");
		String shippingAddress = (String) orderData.get("shipping_address");
		float goodsServiceTax = 9f;
				
		// now create an order instance and save it to database
		Order order = new Order(user, pType, dType, status, dateTime, shippingAddress, goodsServiceTax);
		Order savedOrder = orderRepo.save(order);	

		// create order_item records for each cart_item
		for (CartItem cartItem : cartItems) {
			Product product = cartItem.getProduct();
			int quantity = cartItem.getQuantity();
			float unitPriceAtTransaction = product.getPrice();
			
			// create an order_item instance
			OrderItem orderItem = new OrderItem(savedOrder, product, quantity, unitPriceAtTransaction);
			
			// save each order_item instance in database
			orderItemRepo.save(orderItem);
		}
		
		return savedOrder;
	}
}
