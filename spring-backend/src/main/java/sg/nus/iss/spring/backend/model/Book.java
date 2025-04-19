package sg.nus.iss.spring.backend.model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("BOOK")
public class Book extends Product {

    @ManyToOne(
    )
    @JoinColumn(name = "author_id")
    private Author author;

    public Book() {}

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }
}
