package ru.floretn.ha.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "t_categories", schema = "ha_data")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cat_pk")
    private long categoryId;
    @Column(name = "cat_ttl")
    private String title;
    @Column(name = "cat_lim")
    private int limit;
}
