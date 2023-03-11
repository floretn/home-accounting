package ru.floretn.ha.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "t_users", schema = "ha_data")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usr_pk")
    @JsonIgnore
    private long userId;
    @Column(name = "usr_name")
    private String name;
    @Column(name = "usr_locale")
    private String locale;
    @Column(name = "usr_bill")
    private int bill;
}
