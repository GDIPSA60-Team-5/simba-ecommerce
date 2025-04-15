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
import sg.nus.iss.spring.backend.model.Cart;
import sg.nus.iss.spring.backend.model.CartItem;
import sg.nus.iss.spring.backend.model.DeliveryType;
import sg.nus.iss.spring.backend.model.Order;
import sg.nus.iss.spring.backend.model.OrderItem;
import sg.nus.iss.spring.backend.model.PaymentType;
import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.repository.CartItemRepository;
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
	
	//haziq added this 
	@Autowired  
	CartItemRepository cartItemRepo;
	
	@Override
	public List<CartItem> listCartItems(User user) {
		return cartRepo.findAllByUser(user);
	}
	
	@Override
	public CartItem updateCartOrderQty(CartItem cartItem) {
		return cartItemRepo.save(cartItem);
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
		String deliType = orderData.getDeliveryType();
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
		String shippingAddress = orderData.getShippingAddress();
				
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
	
	
	//written by Haziq
	@Autowired
	private ProductRepository productRepo;
	
	@Transactional
	public void addToCart(int cartId, int productId, int quantity) {
		Product product = productRepo.findById(productId)
			.orElseThrow(() -> new RuntimeException("Product not found"));

		Cart cart = cartRepo.findById(cartId)
			.orElseThrow(() -> new RuntimeException("Cart not found"));

		if (product.getQuantity() < quantity) {
			throw new RuntimeException("Not enough stock");
		}

		// Check if product already in cart
		Optional<CartItem> existingItemOpt = cart.getItems().stream()
			.filter(item -> item.getProduct().getId() == productId)
			.findFirst();
		
		 int currentQtyInCart = existingItemOpt.map(CartItem::getQuantity).orElse(0);
		 int totalRequestedQty = currentQtyInCart + quantity;
		 if (totalRequestedQty > product.getQuantity()) {
		        throw new RuntimeException("Not enough stock. You are requesting for more than what is available in stock (" + product.getQuantity() + ")");
		 }

		if (existingItemOpt.isPresent()) {
			CartItem existingItem = existingItemOpt.get();
			existingItem.setQuantity(existingItem.getQuantity() + quantity);
		} else {
			CartItem newItem = new CartItem();
			newItem.setProduct(product);
			newItem.setQuantity(quantity);
			newItem.setCart(cart);
			newItem.setUser(cart.getUser());

			cart.getItems().add(newItem); // Cart must have cascade
		}

		cartRepo.save(cart);
	}
	
	@Transactional
	public void reduceProductQuantity(int cartId, int productId) {
	    Cart cart = cartRepo.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));

	    for (CartItem item : cart.getItems()) {
	        if (item.getProduct().getId() == productId) {
	            if (item.getQuantity() > 1) {
	                item.setQuantity(item.getQuantity() - 1);
	            } else {
	                throw new IllegalStateException("Cannot reduce quantity below 1. Use remove instead.");
	            }
	            break;
	        }
	    }

	    cartRepo.save(cart);
	}
	
	@Transactional
	public void removeProductFromCart(int cartId, int productId) {
	    Cart cart = cartRepo.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));

	    CartItem itemToRemove = null;

	    for (CartItem item : cart.getItems()) {
	        if (item.getProduct().getId() == productId) {
	            itemToRemove = item;
	            break;
	        }
	    }

	    if (itemToRemove != null) {
	        cart.getItems().remove(itemToRemove); // orphanRemoval = true will delete it
	    }

	    cartRepo.save(cart);
	}
	
	@Override
	public Cart getCartById(int cartId) {
	    return cartRepo.findById(cartId)
	        .orElseThrow(() -> new RuntimeException("Cart not found"));
	}
	
	
	
	
	
	
	
}
