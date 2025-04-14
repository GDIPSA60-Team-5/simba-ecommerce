package sg.nus.iss.spring.backend;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import sg.nus.iss.spring.backend.model.Category;
import sg.nus.iss.spring.backend.model.Product;
import sg.nus.iss.spring.backend.repository.CategoryRepository;
import sg.nus.iss.spring.backend.repository.ProductRepository;

@SpringBootTest
public class ProductAndCategoryDataCreationTests {
    @Autowired
    private ProductRepository prepo;
    @Autowired
    private CategoryRepository crepo;


    @Test
    public void loadProductAndCategoryData() {
        Category programming = new Category("Programming");
        Category entertainment = new Category("Entertainment");
        Category travel = new Category("Travel");
        Category business = new Category("Business");
        crepo.save(programming);
        crepo.save(entertainment);
        crepo.save(travel);
        crepo.save(business);

        Product p1 = new Product();
        p1.setName("Introduction to Java Programming and Data Structures");
        p1.setDescription("Introduction to Java Programming and Data Structures");
        p1.setCategory(programming);
        p1.setBrand(" ");
        p1.setPrice(7.99f);
        p1.setQuantity(50);
        p1.setImageUrl("https://1.bp.blogspot.com/-qZpV5kciq-c/YEbvnwHx1lI/AAAAAAAAOCI/sIFFZB1j_n0RiohZQUzayFdiCH1606DWQCLcBGAsYHQ/s1070/introduction-to-java-programming-and-data-structures-12th-edition-y-daniel-liang-freelibros.jpg");
        p1.setRating(4.6f);
        prepo.save(p1);

        Product p2 = new Product();
        p2.setName("Java How to Program");
        p2.setDescription("Objects provides a clear, simple, engaging and entertaining introduction to Java, preparing college students to meet the Java programming challenges they’ll encounter in upper-level courses and in industry.");
        p2.setCategory(programming);
        p2.setBrand(" ");
        p2.setPrice(173.99f);
        p2.setQuantity(50);
        p2.setImageUrl("https://deitel.com/wp-content/uploads/2020/01/java-how-to-program-11e-early-objects-version.jpg");
        p2.setRating(4.3f);
        prepo.save(p2);

        Product p3 = new Product();
        p3.setName("Pro JPA 2 Second Edition");
        p3.setDescription("Pro JPA 2, Second Edition introduces, explains, and demonstrates how to use the new Java Persistence API (JPA) 2.1 from the perspective of one of the specification creators. A one-of-a-kind resource, it provides both theoretical and extremely practical coverage of JPA usage for both beginning and advanced developers");
        p3.setCategory(programming);
        p3.setBrand(" ");
        p3.setPrice(39.99f);
        p3.setQuantity(50);
        p3.setImageUrl("https://m.media-amazon.com/images/I/513YG5EUQwL.SY522.jpg");
        p3.setRating(4.5f);
        prepo.save(p3);

        Product p4 = new Product();
        p4.setName("Rick Steves Belgium: Bruges, Brussels, Antwerp & Ghent");
        p4.setDescription("Stroll through medieval squares with soaring bell towers and along quiet canals: experience Belgium with Rick Steves!");
        p4.setCategory(travel);
        p4.setBrand(" ");
        p4.setPrice(21.98f);
        p4.setQuantity(50);
        p4.setImageUrl("https://m.media-amazon.com/images/I/81R-g7X8v1L.SL1500.jpg");
        p4.setRating(5.0f);
        prepo.save(p4);

        Product p5 = new Product();
        p5.setName("Bucket To Greece Volume 17: A Comical Living Abroad Adventure");
        p5.setDescription("Abandoned in a bucket…to new adventures in Greece");
        p5.setCategory(travel);
        p5.setBrand(" ");
        p5.setPrice(4.99f);
        p5.setQuantity(50);
        p5.setImageUrl("https://m.media-amazon.com/images/I/915VWAhO6OL.SL1500.jpg");
        p5.setRating(4.8f);
        prepo.save(p5);

        Product p6 = new Product();
        p6.setName("Syl: Osmosis: A Monster Evolution LitRPG Adventure!");
        p6.setDescription("Syl has conquered the forest, survived goblin treachery, and infiltrated a town, disguised as an elf. Now Syl has set their sights upon the next big goal - conquer a flying island!");
        p6.setCategory(entertainment);
        p6.setBrand(" ");
        p6.setPrice(6.99f);
        p6.setQuantity(50);
        p6.setImageUrl("https://m.media-amazon.com/images/I/81p3RXbScLL.SL1500.jpg");
        p6.setRating(4.9f);
        prepo.save(p6);

        Product p7 = new Product();
        p7.setName("A Brief History of Chronomancy (Arcane Ascension Book 6)");
        p7.setDescription("“Matteo Lane is a liar. In the pages of Your Pasta Sucks, he repeats that he has no business writing a cookbook, all while masterfully (and hilariously) weaving an intricate tale of food and family and schooling the reader in the flavors, traditions, and techniques of Rome, Sicily, and his own Italian-American kitchen.”—Katie Parla, author of Food of the Italian Islands");
        p7.setCategory(entertainment);
        p7.setBrand(" ");
        p7.setPrice(26.98f);
        p7.setQuantity(50);
        p7.setImageUrl("https://m.media-amazon.com/images/I/710NS4So02L.SL1500.jpg");
        p7.setRating(4.9f);
        prepo.save(p7);

        Product p8 = new Product();
        p8.setName("Dividend Investing");
        p8.setDescription("Dividend Investing is the definitive book on how to construct a portfolio of dividend income paying stocks to create a dependable, consistent source of income.");
        p8.setCategory(business);
        p8.setBrand(" ");
        p8.setPrice(23.3f);
        p8.setQuantity(50);
        p8.setImageUrl("https://m.media-amazon.com/images/I/812YhiCHRwL.SL1500.jpg");
        p8.setRating(5.0f);
        prepo.save(p8);

        Product p9 = new Product();
        p9.setName("Selling Your Expertise");
        p9.setDescription("A Practical Guide for Women to Confidently");
        p9.setCategory(business);
        p9.setBrand(" ");
        p9.setPrice(2.99f);
        p9.setQuantity(50);
        p9.setImageUrl("https://m.media-amazon.com/images/I/71MGSJsa67L.SL1500.jpg");
        p9.setRating(5.0f);
        prepo.save(p9);


    }




}
