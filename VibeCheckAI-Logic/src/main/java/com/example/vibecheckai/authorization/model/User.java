package com.example.vibecheckai.authorization.model;

import com.example.vibecheckai.enums.SubscriptionLevel;
import jakarta.persistence.*;


@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
