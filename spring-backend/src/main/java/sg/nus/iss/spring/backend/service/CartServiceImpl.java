package sg.nus.iss.spring.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import sg.nus.iss.spring.backend.dto.OrderDetailsDTO;
import sg.nus.iss.spring.backend.interfacemethods.CartService;
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


/* Written by Aung Myin Moe */
@Service
@Transactional
public class CartServiceImpl implements CartService {
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
	public List<CartItem> listCartItems(User user) {
		return cartRepo.findAllByUser(user);
	}
	
	@Override
	public CartItem updateCartOrderQty(CartItem cartItem) {
		return cartRepo.save(cartItem);
	}
	
	@Override
	public void removeCart(User user) {
		cartRepo.deleteAllByUser(user);
	}
	
	@Override
	public Order saveOrderRecord(HttpSession session, List<CartItem> cartItems) throws Exception {
		/*
		 * extract parameters from the session and cartItems objects to create order and order_item records
		 * get user info from session
		 */
		User user = (User) session.getAttribute("authenticated_user");
		
		// get order data from session
		OrderDetailsDTO orderData = (OrderDetailsDTO) session.getAttribute("order_data");
		
		// get payment type data from session
		String paymentType = (String) session.getAttribute("payment_type");
		Optional<PaymentType> existingPType = paymentRepo.findByName(paymentType);
		PaymentType pType;
		if (existingPType.isEmpty()) {
			pType = new PaymentType(paymentType);
			paymentRepo.save(pType);
		} else {
			pType = existingPType.get();
		}
		
		// get delivery type data from order data
		String deliType = (String) orderData.getDeliveryType();
		Optional<DeliveryType> existingDeliType = deliRepo.findByName(deliType);
		DeliveryType dType;
		if (existingDeliType.isEmpty()) {
			throw new Exception("DeliveryType not found");
		} else {
			dType = existingDeliType.get();
		}
		
		// set status of order
		String status = "Order Confirmed";
		
		// get dateTime of order and shipping address from order data
		LocalDateTime dateTime = LocalDateTime.now();
		String shippingAddress = (String) orderData.getShippingAddress();
				
		// now create an order instance and save it to database
		Order order = new Order(user, pType, dType, status, dateTime, shippingAddress);
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
