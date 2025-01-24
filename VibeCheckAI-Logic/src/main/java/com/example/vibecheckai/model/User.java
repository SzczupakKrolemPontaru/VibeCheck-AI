package com.example.vibecheckai.model;

import com.example.vibecheckai.shared.enums.SubscriptionLevel;
import jakarta.persistence.*;


@Entity
@Table(name = "users")
public class User {

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SubscriptionLevel subscriptionLevel;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
        this.subscriptionLevel = SubscriptionLevel.FREE;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public SubscriptionLevel getSubscriptionLevel() {
        return subscriptionLevel;
    }

    public void setSubscriptionLevel(SubscriptionLevel subscriptionLevel) {
        this.subscriptionLevel = subscriptionLevel;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
