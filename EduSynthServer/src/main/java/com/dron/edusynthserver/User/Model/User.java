package com.dron.edusynthserver.User.Model;

import com.dron.edusynthserver.Session.Model.Participant;
import com.dron.edusynthserver.Quiz.Model.Quiz;
import jakarta.persistence.*;
import lombok.*;

import javax.security.auth.Subject;
import java.security.Principal;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "users")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
// хз насколько хорошая практика делать сущность бд и principal одной вещью, но лан
public class User implements Principal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;

    // TODO: добавить refreshtoken
    private String passwordHash;

    private String salt;

    private String email;

    @Builder.Default
    private int balance = 0;

    @Column(name = "profile_picture_url", nullable = false)
    private String profilePictureUrl;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Participant> participants;

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Quiz> createdQuizes;

    @Override
    public String toString()
    {
        return username;
    }

    @Override
    public String getName() {
        return username;
    }

    @Override
    public boolean implies(Subject subject) {
        return Principal.super.implies(subject);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, passwordHash, salt, email, balance, profilePictureUrl, role, participants, createdQuizes);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (id != user.id) return false;
        if (username != null ? !username.equals(user.username) : user.username != null) return false;
        if (passwordHash != null ? !passwordHash.equals(user.passwordHash) : user.passwordHash != null) return false;
        if (email != null ? !email.equals(user.email) : user.email != null) return false;
        if (role != user.role) return false;
        if (participants != null ? !participants.equals(user.participants) : user.participants != null) return false;
        return createdQuizes != null ? createdQuizes.equals(user.createdQuizes) : user.createdQuizes == null;
    }
}
