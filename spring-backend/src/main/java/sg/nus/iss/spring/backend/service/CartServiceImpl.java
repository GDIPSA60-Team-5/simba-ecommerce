package sg.nus.iss.spring.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import sg.nus.iss.spring.backend.dto.CheckoutRequestDTO;
import sg.nus.iss.spring.backend.enums.OrderStatus;
import sg.nus.iss.spring.backend.interfacemethods.CartService;
import sg.nus.iss.spring.backend.model.*;
import sg.nus.iss.spring.backend.repository.CartRepository;
import sg.nus.iss.spring.backend.repository.DeliveryTypeRepository;
import sg.nus.iss.spring.backend.repository.OrderItemRepository;
import sg.nus.iss.spring.backend.repository.OrderRepository;
import sg.nus.iss.spring.backend.repository.PaymentTypeRepository;
import sg.nus.iss.spring.backend.repository.ProductRepository;


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
		CheckoutRequestDTO orderData = (CheckoutRequestDTO) session.getAttribute("order_data");
		
		// get payment type data from session
		String paymentType = (String) session.getAttribute("payment_type");
		PaymentType pType = paymentRepo.findByName(paymentType)
				.orElseGet(() -> paymentRepo.save(new PaymentType(paymentType)));

		
		// get delivery type data from order data
		Integer deliveryTypeId = orderData.getDeliveryTypeId();
		DeliveryType dType = deliRepo.findById(deliveryTypeId)
				.orElseThrow(() -> new Exception("DeliveryType not found"));


		// get dateTime of order and shipping address from order data
		LocalDateTime dateTime = LocalDateTime.now();
		String shippingAddress = orderData.getShippingAddress();
		
		// get orderGrandTotal from session
		float orderGrandTotal = (float) session.getAttribute("order_grand_total");
				
		// now create an order instance and save it to database
		Order order = new Order(user, pType, dType, OrderStatus.SHIPPING, dateTime, shippingAddress, orderGrandTotal);
		Order savedOrder = orderRepo.save(order);	

		// create order_item records for each cart_item
		for (CartItem cartItem : cartItems) {
			Product product = cartItem.getProduct();
			int orderQuantity = cartItem.getQuantity();
			float unitPriceAtTransaction = product.getPrice();
			
			// create an order_item instance
			OrderItem orderItem = new OrderItem(savedOrder, product, orderQuantity, unitPriceAtTransaction);
			
			// save each order_item instance in database
			orderItemRepo.save(orderItem);
			
			// update product stock for each confirmed product order
			int newStock = product.getQuantity() - orderQuantity;
			
			if (newStock < 0) {
				throw new RuntimeException("Stock mismatch post checkout");
			}
			product.setQuantity(newStock);
			productRepo.save(product);
		}
		
		return savedOrder;
	}
	
	
	//written by Haziq
	@Autowired
	private ProductRepository productRepo;
	
	@Transactional
	public void addToCart(User user, int productId, int quantity) {
		Product product = productRepo.findById(productId)
			.orElseThrow(() -> new RuntimeException("Product not found"));

		int userId = user.getId();
		Optional<CartItem> existingItemOpt = cartRepo.findByProductIdAndUserId(productId, userId);
;

		int existingQtyInCart = 0;

		if (existingItemOpt.isPresent()) {
		    existingQtyInCart = existingItemOpt.get().getQuantity();
		}

		int totalQty = existingQtyInCart + quantity;

		if (totalQty > product.getQuantity()) {
		    throw new RuntimeException("Not enough stock. You are requesting more than available (" + product.getQuantity() + ")");
		}

		if (existingItemOpt.isPresent()) {
		    CartItem existingItem = existingItemOpt.get();
		    existingItem.setQuantity(totalQty);
		    cartRepo.save(existingItem);
		} else {
		    CartItem newItem = new CartItem(user, product, quantity);
		    cartRepo.save(newItem);
		}
	}
	
	@Transactional
	public void removeProductFromCart(User user, int productId) {
		int userId = user.getId();
	    Optional<CartItem> cart = cartRepo.findByProductIdAndUserId(productId, userId);
;
	    if (cart.isEmpty()) throw new RuntimeException("Cart not found");

		cartRepo.deleteByProductId(productId);
	}
}
